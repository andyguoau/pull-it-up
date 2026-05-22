const DEFAULT_X_ASSISTANTS = ["gemini"];
const CHATGPT_RESET_AFTER = 5;
const CHATGPT_CONVERSATION_COUNT_KEY = "chatgptConversationCount";
const WEB_ASSISTANTS = {
  chatgpt: {
    name: "ChatGPT",
    url: "https://chatgpt.com/",
    tabPatterns: ["https://chatgpt.com/*", "https://chat.openai.com/*"],
    bridgeFile: "chatgptBridge.js",
    messageType: "piuChatGPTPrompt",
    latestMessageType: "piuChatGPTLatestResponse"
  },
  gemini: {
    name: "Gemini",
    url: "https://gemini.google.com/app",
    tabPatterns: ["https://gemini.google.com/*"],
    bridgeFile: "geminiBridge.js",
    messageType: "piuGeminiPrompt",
    latestMessageType: "piuGeminiLatestResponse"
  }
};

chrome.runtime.onInstalled.addListener(clearLegacyApiSettings);
chrome.runtime.onStartup.addListener(clearLegacyApiSettings);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === "openOptions") {
    chrome.runtime.openOptionsPage();
    sendResponse({ ok: true });
    return false;
  }

  if (message?.type === "sendToAssistants" || message?.type === "sendToChatGPT") {
    sendToAssistants(message.payload || {}, sender)
      .then(sendResponse)
      .catch((error) => sendResponse({
        ok: false,
        reason: "assistant_handoff_failed",
        message: error instanceof Error ? error.message : String(error)
      }));
    return true;
  }

  if (message?.type === "refreshChatGPTResponse" || message?.type === "refreshAssistantResponse") {
    refreshAssistantResponse()
      .then(sendResponse)
      .catch((error) => sendResponse({
        ok: false,
        reason: "assistant_refresh_failed",
        message: error instanceof Error ? error.message : String(error)
      }));
    return true;
  }

  return false;
});

async function refreshAssistantResponse() {
  const selectedTargets = await getSelectedAssistantTargets();
  const results = [];

  for (const target of selectedTargets) {
    const assistant = WEB_ASSISTANTS[target];
    if (!assistant) continue;

    try {
      const tab = await findOrOpenAssistantTab(assistant, { active: false });
      await waitForTabReady(tab.id, 15000);
      const result = await readAssistantLatestResponse(tab, assistant);
      results.push({
        target,
        name: assistant.name,
        ok: true,
        tabId: tab.id,
        sent: true,
        responseText: result.responseText || ""
      });
    } catch (error) {
      results.push({
        target,
        name: assistant.name,
        ok: false,
        responseText: "",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  return {
    ok: true,
    results
  };
}

async function sendToAssistants(payload, sender = {}) {
  const prompt = String(payload.prompt || "").trim();
  if (!prompt) throw new Error("No prompt was provided.");

  const selectedTargets = await getSelectedAssistantTargets(payload.targets);
  const results = [];

  for (const target of selectedTargets) {
    results.push(await sendToAssistant(target, prompt, {
      autoSend: payload.autoSend !== false,
      focusTab: payload.focusTab === true,
      waitForResponse: payload.waitForResponse === true,
      useBackgroundWindow: payload.useBackgroundWindow === true,
      resetAfterCount: Number(payload.resetAfterCount) || CHATGPT_RESET_AFTER
    }));
  }

  return {
    ok: true,
    results,
    sent: results.every((result) => result.sent !== false),
    targets: results.map((result) => result.target)
  };
}

async function getSelectedAssistantTargets(payloadTargets) {
  const rawTargets = Array.isArray(payloadTargets) && payloadTargets.length
    ? payloadTargets
    : (await storageGet({ xAssistantTargets: DEFAULT_X_ASSISTANTS })).xAssistantTargets;

  const targets = (Array.isArray(rawTargets) ? rawTargets : DEFAULT_X_ASSISTANTS)
    .filter((target) => WEB_ASSISTANTS[target]);

  return targets.length ? [...new Set(targets)] : DEFAULT_X_ASSISTANTS;
}

async function sendToAssistant(target, prompt, options = {}) {
  const assistant = WEB_ASSISTANTS[target];
  if (!assistant) throw new Error(`Unsupported assistant: ${target}`);

  const tab = options.useBackgroundWindow
    ? await getRotatingAssistantTab(target, assistant, {
      resetAfterCount: options.resetAfterCount
    })
    : await findOrOpenAssistantTab(assistant, { active: Boolean(options.focusTab) });
  if (options.focusTab) {
    await focusTab(tab);
  }
  await waitForTabReady(tab.id, 15000);
  const waitForResponse = Boolean(options.waitForResponse && target === "chatgpt");

  let result;
  try {
    result = await tabsSendMessage(tab.id, {
      type: assistant.messageType,
      prompt,
      autoSend: options.autoSend !== false,
      waitForResponse
    });
  } catch {
    await scriptingExecute({
      target: { tabId: tab.id },
      files: [assistant.bridgeFile]
    });
    await delay(600);
    result = await tabsSendMessage(tab.id, {
      type: assistant.messageType,
      prompt,
      autoSend: options.autoSend !== false,
      waitForResponse
    });
  }

  if (!result?.ok) {
    throw new Error(result?.message || `${assistant.name} did not accept the prompt.`);
  }

  return {
    target,
    name: assistant.name,
    ok: true,
    tabId: tab.id,
    sent: result.sent !== false,
    responseText: result.responseText || ""
  };
}

async function readAssistantLatestResponse(tab, assistant) {
  const type = assistant.latestMessageType || "piuChatGPTLatestResponse";
  let result;
  try {
    result = await tabsSendMessage(tab.id, { type });
  } catch {
    await scriptingExecute({
      target: { tabId: tab.id },
      files: [assistant.bridgeFile]
    });
    await delay(600);
    result = await tabsSendMessage(tab.id, { type });
  }

  if (!result?.ok) {
    throw new Error(result?.message || `Could not read the latest ${assistant.name} response.`);
  }
  return result;
}

async function findOrOpenAssistantTab(assistant, options = {}) {
  const existing = await findExistingAssistantTab(assistant);
  if (existing) return existing;
  return tabsCreate({ url: assistant.url, active: Boolean(options.active) });
}

async function findExistingAssistantTab(assistant) {
  for (const pattern of assistant.tabPatterns) {
    const tabs = await tabsQuery({ url: pattern });
    const usable = tabs.find((tab) => tab.id && !tab.discarded);
    if (usable) return usable;
  }
  return null;
}

async function replaceAssistantTab(assistant, options = {}) {
  await closeAssistantTabs(assistant);
  if (options.useBackgroundWindow) {
    return createAssistantWindow(assistant);
  }
  return tabsCreate({ url: assistant.url, active: Boolean(options.active) });
}

async function getRotatingAssistantTab(target, assistant, options = {}) {
  const resetAfterCount = Math.max(1, Number(options.resetAfterCount) || CHATGPT_RESET_AFTER);
  const countKey = `${target}ConversationCount`;
  const values = await storageGet({ [countKey]: 0 });
  const currentCount = Number(values[countKey]) || 0;
  const existing = await findExistingAssistantTab(assistant);
  const shouldReplace = !existing || currentCount >= resetAfterCount;
  const tab = shouldReplace
    ? await replaceAssistantTab(assistant, { useBackgroundWindow: true })
    : existing;
  await storageSet({ [countKey]: shouldReplace ? 1 : currentCount + 1 });
  return tab;
}

async function createAssistantWindow(assistant) {
  const windowInfo = await windowsCreate({
    url: assistant.url,
    type: "popup",
    focused: false,
    width: 460,
    height: 720,
    left: 40,
    top: 40
  });
  const tab = windowInfo.tabs?.[0];
  if (!tab?.id) throw new Error(`Could not create ${assistant.name} window.`);
  return tab;
}

async function closeAssistantTabs(assistant) {
  const tabIds = [];
  for (const pattern of assistant.tabPatterns) {
    const tabs = await tabsQuery({ url: pattern });
    for (const tab of tabs) {
      if (tab.id) tabIds.push(tab.id);
    }
  }

  const uniqueTabIds = [...new Set(tabIds)];
  if (uniqueTabIds.length) {
    await tabsRemove(uniqueTabIds);
  }
}

async function focusTab(tab) {
  if (tab.windowId) {
    try {
      await windowsUpdate(tab.windowId, { focused: true });
    } catch {
      // Focusing can fail for minimized or closing windows; activating the tab is still useful.
    }
  }
  if (tab.id) {
    await tabsUpdate(tab.id, { active: true });
  }
}

function waitForTabReady(tabId, timeoutMs) {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      chrome.tabs.onUpdated.removeListener(listener);
      resolve();
    };
    const listener = (updatedTabId, changeInfo) => {
      if (updatedTabId === tabId && changeInfo.status === "complete") finish();
    };
    chrome.tabs.onUpdated.addListener(listener);
    chrome.tabs.get(tabId, (tab) => {
      if (chrome.runtime.lastError || tab?.status === "complete") {
        finish();
      }
    });
    setTimeout(() => {
      if (Date.now() - startedAt >= timeoutMs) finish();
    }, timeoutMs);
  });
}

function tabsQuery(queryInfo) {
  return new Promise((resolve) => {
    chrome.tabs.query(queryInfo, resolve);
  });
}

function tabsCreate(createProperties) {
  return new Promise((resolve, reject) => {
    chrome.tabs.create(createProperties, (tab) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(tab);
    });
  });
}

function tabsUpdate(tabId, updateProperties) {
  return new Promise((resolve, reject) => {
    chrome.tabs.update(tabId, updateProperties, (tab) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(tab);
    });
  });
}

function tabsRemove(tabIds) {
  return new Promise((resolve, reject) => {
    chrome.tabs.remove(tabIds, () => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve();
    });
  });
}

function tabsSendMessage(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(response);
    });
  });
}

function windowsUpdate(windowId, updateInfo) {
  return new Promise((resolve, reject) => {
    chrome.windows.update(windowId, updateInfo, (windowInfo) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(windowInfo);
    });
  });
}

function windowsCreate(createData) {
  return new Promise((resolve, reject) => {
    chrome.windows.create(createData, (windowInfo) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(windowInfo);
    });
  });
}

function scriptingExecute(injection) {
  return new Promise((resolve, reject) => {
    chrome.scripting.executeScript(injection, (result) => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message));
      else resolve(result);
    });
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function storageGet(keys) {
  return chrome.storage.local.get(keys);
}

function storageSet(values) {
  return chrome.storage.local.set(values);
}

function clearLegacyApiSettings() {
  chrome.storage.local.remove(["openaiApiKey", "openaiModel"]);
}
