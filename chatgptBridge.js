(() => {
  if (window.__pullItUpChatGPTBridge) return;
  window.__pullItUpChatGPTBridge = true;

  let lastResponseCounts = {};

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === "piuChatGPTLatestResponse") {
      sendResponse({
        ok: true,
        responseText: latestAssistantText()
      });
      return false;
    }

    if (message?.type !== "piuChatGPTPrompt") return false;

    fillChatGPTPrompt(message.prompt, {
      autoSend: message.autoSend !== false,
      waitForResponse: Boolean(message.waitForResponse)
    })
      .then(sendResponse)
      .catch((error) => sendResponse({
        ok: false,
        message: error instanceof Error ? error.message : String(error)
      }));
    return true;
  });

  async function fillChatGPTPrompt(prompt, options) {
    const cleanedPrompt = String(prompt || "").trim();
    if (!cleanedPrompt) throw new Error("No prompt was provided.");

    lastResponseCounts = {
      assistant: Array.from(document.querySelectorAll("[data-message-author-role='assistant']")).filter(isVisible).length,
      markdown: Array.from(document.querySelectorAll(".markdown")).filter(isVisible).length
    };

    const composer = await waitFor(findComposer, 15000, "Could not find the ChatGPT message box. Make sure you are logged in and a chat is open.");
    const previousAssistantText = latestAssistantText();
    setComposerText(composer, cleanedPrompt);

    if (!options.autoSend) {
      return { ok: true, sent: false };
    }

    const sendButton = await waitFor(findEnabledSendButton, 8000, "Could not find an enabled ChatGPT send button after filling the prompt.");
    sendButton.click();

    if (!options.waitForResponse) {
      return { ok: true, sent: true };
    }

    const responseText = await waitForAssistantResponse(previousAssistantText, 150000);
    return { ok: true, sent: true, responseText };
  }

  function findComposer() {
    const selectors = [
      "textarea[data-testid='prompt-textarea']",
      "textarea#prompt-textarea",
      "textarea[placeholder]",
      "div#prompt-textarea[contenteditable='true']",
      "main form textarea",
      "main form [contenteditable='true']",
      "[contenteditable='true'][role='textbox']",
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
      "button[data-testid='send-button']",
      "button[aria-label='Send prompt']",
      "button[aria-label='Send message']",
      "button[aria-label*='Send']",
      "main form button[type='submit']"
    ];

    for (const selector of selectors) {
      const button = Array.from(document.querySelectorAll(selector))
        .find((node) => isVisible(node) && !isDisabled(node));
      if (button) return button;
    }
    return null;
  }

  async function waitForAssistantResponse(previousAssistantText, timeoutMs) {
    const startedAt = Date.now();
    const firstReturnMs = Math.min(timeoutMs, 10000);

    return new Promise((resolve, reject) => {
      const timer = window.setInterval(() => {
        const currentText = latestAssistantText();
        const hasNewText = currentText
          && currentText !== previousAssistantText
          && currentText.length > 8;

        if (Date.now() - startedAt > firstReturnMs) {
          window.clearInterval(timer);
          resolve(hasNewText ? currentText : "");
          return;
        }

        if (Date.now() - startedAt > timeoutMs) {
          window.clearInterval(timer);
          if (currentText && currentText !== previousAssistantText) {
            resolve(currentText);
            return;
          }
          reject(new Error("Timed out waiting for ChatGPT response."));
        }
      }, 500);
    });
  }

  function latestAssistantText() {
    const assistantNodes = Array.from(document.querySelectorAll("[data-message-author-role='assistant']"))
      .filter(isVisible);
    const markdownNodes = Array.from(document.querySelectorAll(".markdown")).filter(isVisible);

    const assistantBaseline = lastResponseCounts.assistant || 0;
    if (assistantNodes.length < assistantBaseline) {
      lastResponseCounts.assistant = 0;
    }
    const markdownBaseline = lastResponseCounts.markdown || 0;
    if (markdownNodes.length < markdownBaseline) {
      lastResponseCounts.markdown = 0;
    }

    if (assistantNodes.length > (lastResponseCounts.assistant || 0)) {
      const assistantNode = assistantNodes[assistantNodes.length - 1];
      if (assistantNode) {
        const markdown = assistantNode.querySelector(".markdown") || assistantNode;
        const value = responseText(markdown.innerText || markdown.textContent || "");
        if (value) return value;
      }
    }

    if (markdownNodes.length > (lastResponseCounts.markdown || 0)) {
      const markdownNode = markdownNodes[markdownNodes.length - 1];
      return responseText(markdownNode?.innerText || markdownNode?.textContent || "");
    }
    return "";
  }

  function isGenerating() {
    const selectors = [
      "button[data-testid='stop-button']",
      "button[aria-label*='Stop']",
      "button[aria-label*='stop']",
      "button[aria-label*='停止']"
    ];

    for (const selector of selectors) {
      const button = Array.from(document.querySelectorAll(selector))
        .find((node) => isVisible(node) && !isDisabled(node));
      if (button) return true;
    }

    return Boolean(Array.from(document.querySelectorAll("button"))
      .find((button) => /stop|停止/i.test(button.getAttribute("aria-label") || button.textContent || "")
        && isVisible(button)
        && !isDisabled(button)));
  }

  function isDisabled(node) {
    return node.disabled
      || node.getAttribute("aria-disabled") === "true"
      || node.dataset.disabled === "true";
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

  function responseText(value) {
    return String(value || "")
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
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
})();
