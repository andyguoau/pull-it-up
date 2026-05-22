(() => {
  if (window.__pullItUpGeminiBridge) return;
  window.__pullItUpGeminiBridge = true;

  let lastResponseCounts = {};

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "piuGeminiLatestResponse") {
      sendResponse({
        ok: true,
        responseText: latestAssistantText()
      });
      return false;
    }

    if (message?.type !== "piuGeminiPrompt") return false;

    fillGeminiPrompt(message.prompt, message.autoSend !== false)
      .then(sendResponse)
      .catch((error) => sendResponse({
        ok: false,
        message: error instanceof Error ? error.message : String(error)
      }));
    return true;
  });

  async function fillGeminiPrompt(prompt, autoSend) {
    const cleanedPrompt = String(prompt || "").trim();
    if (!cleanedPrompt) throw new Error("No prompt was provided.");

    const selectors = [
      "message-content",
      ".message-content",
      "div.model-response",
      "[data-test-id='model-response']"
    ];
    lastResponseCounts = {};
    for (const selector of selectors) {
      lastResponseCounts[selector] = Array.from(document.querySelectorAll(selector)).filter(isVisible).length;
    }

    const composer = await waitFor(findComposer, 15000, "Could not find the Gemini message box. Make sure you are logged in and a chat is open.");
    setComposerText(composer, cleanedPrompt);

    if (!autoSend) {
      return { ok: true, sent: false };
    }

    const sendButton = await waitFor(findEnabledSendButton, 8000, "Could not find an enabled Gemini send button after filling the prompt.");
    sendButton.click();
    return { ok: true, sent: true };
  }

  function findComposer() {
    const selectors = [
      "rich-textarea div[contenteditable='true']",
      "rich-textarea .ql-editor",
      "div[aria-label='Enter a prompt here']",
      "div[aria-label*='prompt'][contenteditable='true']",
      "div[contenteditable='true'][role='textbox']",
      "textarea",
      "[contenteditable='true']"
    ];

    for (const selector of selectors) {
      const node = Array.from(document.querySelectorAll(selector)).find(isVisible);
      if (node) return node;
    }
    return null;
  }

  function setComposerText(composer, value) {
    composer.focus();

    if (composer instanceof HTMLTextAreaElement || composer instanceof HTMLInputElement) {
      const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(composer), "value");
      if (descriptor?.set) {
        descriptor.set.call(composer, value);
      } else {
        composer.value = value;
      }
      composer.dispatchEvent(new Event("input", { bubbles: true }));
      composer.dispatchEvent(new Event("change", { bubbles: true }));
      return;
    }

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(composer);
    selection.removeAllRanges();
    selection.addRange(range);

    const inserted = document.execCommand("insertText", false, value);
    if (!inserted || !text(composer.textContent)) {
      composer.textContent = value;
    }

    composer.dispatchEvent(new InputEvent("input", {
      bubbles: true,
      inputType: "insertText",
      data: value
    }));
  }

  function findEnabledSendButton() {
    const selectors = [
      "button[aria-label='Send message']",
      "button[aria-label*='Send']",
      "button[data-test-id='send-button']",
      "button.send-button",
      "button[type='submit']"
    ];

    for (const selector of selectors) {
      const button = Array.from(document.querySelectorAll(selector))
        .find((node) => isVisible(node) && !isDisabled(node));
      if (button) return button;
    }
    return null;
  }

  function isDisabled(node) {
    return node.disabled
      || node.getAttribute("aria-disabled") === "true"
      || node.classList.contains("disabled");
  }

  function isVisible(node) {
    if (!(node instanceof Element)) return false;
    const rect = node.getBoundingClientRect();
    const style = window.getComputedStyle(node);
    return rect.width > 0
      && rect.height > 0
      && style.visibility !== "hidden"
      && style.display !== "none";
  }

  function text(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function waitFor(getValue, timeoutMs, timeoutMessage) {
    return new Promise((resolve, reject) => {
      const startedAt = Date.now();
      const timer = window.setInterval(() => {
        const value = getValue();
        if (value) {
          window.clearInterval(timer);
          resolve(value);
          return;
        }
        if (Date.now() - startedAt > timeoutMs) {
          window.clearInterval(timer);
          reject(new Error(timeoutMessage));
        }
      }, 250);
    });
  }

  function latestAssistantText() {
    const selectors = [
      "message-content",
      ".message-content",
      "div.model-response",
      "[data-test-id='model-response']"
    ];

    for (const selector of selectors) {
      const nodes = Array.from(document.querySelectorAll(selector)).filter(isVisible);
      const baseline = lastResponseCounts[selector] || 0;
      if (nodes.length < baseline) {
        lastResponseCounts[selector] = 0;
      }
      if (nodes.length > (lastResponseCounts[selector] || 0)) {
        const lastNode = nodes[nodes.length - 1];
        const value = responseText(lastNode.innerText || lastNode.textContent || "");
        if (value) return value;
      }
    }
    return "";
  }

  function responseText(value) {
    return String(value || "")
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }
})();
