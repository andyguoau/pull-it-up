const targetChatGPTInput = document.getElementById("target-chatgpt");
const targetGeminiInput = document.getElementById("target-gemini");
const youtubePromptInput = document.getElementById("youtube-prompt");
const xPromptInput = document.getElementById("x-prompt");
const languageSelect = document.getElementById("extension-language");
const statusEl = document.getElementById("status");

const DEFAULT_X_PROMPT = [
  "Help with this content in the user's native language.",
  "Do only the most useful task: translate, explain context/slang/memes, or fact-check.",
  "Fact-check only clear factual, data, news, source, or disputed claims; include sources when useful."
].join("\n");

const DEFAULT_YOUTUBE_PROMPT = [
  "Fact-check or explain these recent YouTube captions.",
  "If there is a clear factual, data, news, source, or disputed claim, verify it and include useful sources.",
  "If there is no factual claim, briefly explain the context or meaning."
].join("\n");

const DEFAULT_X_PROMPT_ZH = [
  "请使用中文提供对这段内容的帮助。",
  "只执行最有用的任务：翻译、解释背景/俚语/网络梗，或进行事实核查。",
  "仅对明确的事实、数据、新闻、来源或有争议的声明进行核查；在有用时提供来源。"
].join("\n");

const DEFAULT_YOUTUBE_PROMPT_ZH = [
  "核查或解释这些最近的 YouTube 字幕。",
  "如果有明确的事实、数据、新闻、来源或有争议的声明，请予以验证并提供有用的来源。",
  "如果没有事实性声明，请简要解释背景或含义。"
].join("\n");

const OLD_DEFAULT_X_PROMPTS = [
  "请核查或者解释这条X/Twitter",
  [
    "请根据这条 X/Twitter 的内容，判断最需要哪一种帮助：翻译、解释网络梗/缩写/上下文，或事实核查。",
    "只做最有用的一项，不要每次把三种需求都做完。",
    "如果只是外语、梗、缩写或隐含语境，直接翻译或解释；只有明显涉及可疑事实、数据、新闻、来源或争议时才做事实核查，并尽量给来源。"
  ].join("\n"),
  [
    "如果这条 X/Twitter 的主要内容是其他语言，先翻译成中文。",
    "请根据这条 X/Twitter 的内容，判断最需要哪一种帮助：翻译、解释网络梗/缩写/上下文，或事实核查。",
    "只做最有用的一项，不要每次把三种需求都做完。",
    "如果只是外语、梗、缩写或隐含语境，直接翻译或解释；只有明显涉及可疑事实、数据、新闻、来源或争议时才做事实核查，并尽量给来源。"
  ].join("\n"),
  [
    "If the X/Twitter post is mainly in a language other than the user's native language, translate it into the user's native language first.",
    "Then decide what kind of help is most useful for this X/Twitter post: translation, explaining memes/slang/abbreviations/context, or fact-checking.",
    "Do only the most useful one. Do not perform all three tasks every time.",
    "If the post is mainly foreign-language text, a meme, slang, an abbreviation, or implicit context, translate or explain it directly. Only fact-check when it makes a questionable factual, data, news, source, or disputed claim, and include sources when useful."
  ].join("\n"),
  [
    "Help with this X/Twitter post in the user's native language.",
    "Do only the most useful task: translate, explain context/slang/memes, or fact-check.",
    "Fact-check only clear factual, data, news, source, or disputed claims; include sources when useful."
  ].join("\n")
];

const OPTIONS_I18N = {
  en: {
    title: "Pull It Up Settings",
    heading: "Pull It Up",
    description: "Choose which logged-in assistant web app Pull It Up should use. No API key is required.",
    targetLegend: "Assistant target",
    targetHint: "You can select one or both. Stay logged in to the selected assistant in Chrome.",
    youtubePromptSpan: "YouTube prompt",
    xPromptSpan: "X prompt",
    saveBtn: "Save",
    resetBtn: "Reset prompt",
    statusSaved: "Saved.",
    statusReset: "Prompts reset.",
    targetCheckError: "Select at least one target. Gemini was kept on."
  },
  zh: {
    title: "Pull It Up 设置",
    heading: "Pull It Up",
    description: "选择 Pull It Up 应使用哪一个已登录的 AI 助手网页版。无需 API Key。",
    targetLegend: "目标 AI 助手",
    targetHint: "你可以选择一个或两个。请保持在 Chrome 中登录所选的 AI 助手。",
    youtubePromptSpan: "YouTube 提示词",
    xPromptSpan: "X (Twitter) 提示词",
    saveBtn: "保存设置",
    resetBtn: "重置提示词",
    statusSaved: "设置已保存。",
    statusReset: "提示词已重置。",
    targetCheckError: "请至少选择一个目标。已自动保留 Gemini。"
  }
};

function updateOptionsLanguage(lang) {
  const dict = OPTIONS_I18N[lang] || OPTIONS_I18N.en;
  document.title = dict.title;
  document.getElementById("options-heading").textContent = dict.heading;
  document.getElementById("options-desc").textContent = dict.description;
  document.getElementById("options-legend").textContent = dict.targetLegend;
  document.getElementById("options-hint").textContent = dict.targetHint;
  document.getElementById("youtube-prompt-label").textContent = dict.youtubePromptSpan;
  document.getElementById("x-prompt-label").textContent = dict.xPromptSpan;
  document.getElementById("save").textContent = dict.saveBtn;
  document.getElementById("reset-prompt").textContent = dict.resetBtn;
}

chrome.storage.local.get({
  extensionLanguage: "en",
  xAssistantTargets: ["gemini"],
  xCheckPrompt: DEFAULT_X_PROMPT,
  youtubePrompt: DEFAULT_YOUTUBE_PROMPT
}, (settings) => {
  chrome.storage.local.remove(["openaiApiKey", "openaiModel"]);

  const currentLang = settings.extensionLanguage === "zh" ? "zh" : "en";
  languageSelect.value = currentLang;
  updateOptionsLanguage(currentLang);

  const defaultYoutube = currentLang === "zh" ? DEFAULT_YOUTUBE_PROMPT_ZH : DEFAULT_YOUTUBE_PROMPT;
  const defaultX = currentLang === "zh" ? DEFAULT_X_PROMPT_ZH : DEFAULT_X_PROMPT;

  youtubePromptInput.value = String(settings.youtubePrompt || "").trim() || defaultYoutube;
  
  const storedPrompt = String(settings.xCheckPrompt || "").trim();
  const xCheckPrompt = OLD_DEFAULT_X_PROMPTS.includes(storedPrompt)
    ? defaultX
    : (storedPrompt || defaultX);
  xPromptInput.value = xCheckPrompt;
  
  if (OLD_DEFAULT_X_PROMPTS.includes(storedPrompt)) {
    chrome.storage.local.set({ xCheckPrompt });
  }

  const targets = Array.isArray(settings.xAssistantTargets) && settings.xAssistantTargets.length
    ? settings.xAssistantTargets
    : ["gemini"];
  targetChatGPTInput.checked = targets.includes("chatgpt");
  targetGeminiInput.checked = targets.includes("gemini");
});

languageSelect.addEventListener("change", () => {
  const newLang = languageSelect.value;
  const oldLang = newLang === "zh" ? "en" : "zh";
  
  const defaultXOld = oldLang === "zh" ? DEFAULT_X_PROMPT_ZH : DEFAULT_X_PROMPT;
  const defaultXNew = newLang === "zh" ? DEFAULT_X_PROMPT_ZH : DEFAULT_X_PROMPT;
  if (xPromptInput.value.trim() === defaultXOld) {
    xPromptInput.value = defaultXNew;
  }
  
  const defaultYoutubeOld = oldLang === "zh" ? DEFAULT_YOUTUBE_PROMPT_ZH : DEFAULT_YOUTUBE_PROMPT;
  const defaultYoutubeNew = newLang === "zh" ? DEFAULT_YOUTUBE_PROMPT_ZH : DEFAULT_YOUTUBE_PROMPT;
  if (youtubePromptInput.value.trim() === defaultYoutubeOld) {
    youtubePromptInput.value = defaultYoutubeNew;
  }

  updateOptionsLanguage(newLang);
});

document.getElementById("save").addEventListener("click", () => {
  const extensionLanguage = languageSelect.value;
  const xAssistantTargets = getSelectedTargets(extensionLanguage);
  
  const defaultX = extensionLanguage === "zh" ? DEFAULT_X_PROMPT_ZH : DEFAULT_X_PROMPT;
  const defaultYoutube = extensionLanguage === "zh" ? DEFAULT_YOUTUBE_PROMPT_ZH : DEFAULT_YOUTUBE_PROMPT;

  const xCheckPrompt = xPromptInput.value.trim() || defaultX;
  const youtubePrompt = youtubePromptInput.value.trim() || defaultYoutube;
  
  chrome.storage.local.set({ extensionLanguage, xAssistantTargets, xCheckPrompt, youtubePrompt }, () => {
    chrome.storage.local.remove(["openaiApiKey", "openaiModel"], () => {
      setStatus(OPTIONS_I18N[extensionLanguage].statusSaved);
    });
  });
});

document.getElementById("reset-prompt").addEventListener("click", () => {
  const extensionLanguage = languageSelect.value;
  const defaultX = extensionLanguage === "zh" ? DEFAULT_X_PROMPT_ZH : DEFAULT_X_PROMPT;
  const defaultYoutube = extensionLanguage === "zh" ? DEFAULT_YOUTUBE_PROMPT_ZH : DEFAULT_YOUTUBE_PROMPT;

  youtubePromptInput.value = defaultYoutube;
  xPromptInput.value = defaultX;
  chrome.storage.local.set({
    xCheckPrompt: defaultX,
    youtubePrompt: defaultYoutube
  }, () => {
    setStatus(OPTIONS_I18N[extensionLanguage].statusReset);
  });
});

function setStatus(message) {
  statusEl.textContent = message;
  window.setTimeout(() => {
    statusEl.textContent = "";
  }, 2500);
}

function getSelectedTargets(lang) {
  const targets = [];
  if (targetChatGPTInput.checked) targets.push("chatgpt");
  if (targetGeminiInput.checked) targets.push("gemini");
  if (targets.length) return targets;

  targetGeminiInput.checked = true;
  setStatus(OPTIONS_I18N[lang || "en"].targetCheckError);
  return ["gemini"];
}
