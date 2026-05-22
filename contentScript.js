const WINDOW_SECONDS = 30;
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

const PANEL_POSITION_KEY = "pullItUpPanelPositionV2";
const PANEL_EDGE_DRAG_SIZE = 12;

const I18N = {
  en: {
    pullItUp: "Pull it up",
    pullItDown: "Pull it down",
    titleYouTube: "Fact-check the latest YouTube claim",
    titleX: "Send this post to your selected AI assistant",
    readyYouTube: "Ready on YouTube.",
    readyX: "Ready on X.",
    readingYouTube: "Reading recent YouTube captions...",
    readingX: "Reading this X post...",
    readingVisibleX: "Reading the visible X post...",
    openingAssistant: "Opening selected assistant window...",
    loadedFirstResponse: "Loaded first response. Auto-refreshing every 5 seconds...",
    sentTo: "Sent to {targets}. First check in 1 second...",
    autoRefresh: "Auto refresh #{attempt}: checking assistant... {time}",
    refreshingResponse: "Refreshing assistant response...",
    updatedResponse: "Updated response. Auto-refreshing...",
    waitingForReply: "Still waiting for reply... ({seconds}s)",
    noResponse2Min: "No response found after 2 minutes. The assistant tab may be paused in the background.",
    noNewTextYet: "No new text yet. Checking again in 5 seconds...",
    responseUpToDate: "Response is up to date.",
    loadedLatestResponse: "Loaded latest response.",
    noResponseFoundYet: "No response found yet. The assistant tab may be paused in the background.",
    noResponseFound: "No response found yet.",
    checkBtn: "Check",
    sent: "Sent",
    refreshReply: "Refresh reply",
    modeWebpage: "Mode: selected AI web page, no API key used by Pull It Up for this content.",
    response: "Response",
    sentToDesc: "Sent this content to {targets}.",
    working: "Working",
    readingSelectedXCheckingClaim: "Reading the selected X post and checking the claim...",
    readingRecentCaptionsCheckingClaim: "Reading recent captions and checking the claim...",
    setupNeeded: "Setup needed",
    noClaimFound: "No claim found",
    noClaimMessage: "No checkable recent claim was found.",
    openSettings: "Open settings",
    claim: "Claim",
    confidence: "{confidence} confidence",
    model: "Model: {provider} / {model}",
    modelFallback: "Model: rule fallback",
    search: "Search: {provider}",
    goal: "Goal: {goal}",
    tokens: "Tokens: {input} in / {output} out / {total} total",
    sources: "Sources",
    noSourcesFound: "No sources found.",
    sourceLabel: "Source",
    searchSkipped: "skipped",
    searchWeb: "web search",
    searchLocalFallback: "local fallback",
    goalOriginal: "find original source",
    goalAuthoritative: "find authoritative reference",
    usingVisibleCaptions: "Using visible YouTube captions from this playback session.",
    sendingToAssistant: "Sending {content} to your selected AI assistant. First check runs after 1 second.",
    thisXPost: "this X post",
    theVisibleXPost: "the visible X post",
    recentYTCaptions: "recent YouTube captions",
    errorNoXText: "No readable X post or article text found on this page.",
    errorNoCaptions: "No caption text found near the current playback time.",
    errorSendFailed: "Could not send this content to the selected AI assistant."
  },
  zh: {
    pullItUp: "拉起核查",
    pullItDown: "收起面板",
    titleYouTube: "核查最新的 YouTube 内容",
    titleX: "将此推文发送给选定的 AI 助手",
    readyYouTube: "YouTube 已就绪。",
    readyX: "X (Twitter) 已就绪。",
    readingYouTube: "正在读取最近的 YouTube 字幕...",
    readingX: "正在读取此 X 推文...",
    readingVisibleX: "正在读取可见的 X 推文...",
    openingAssistant: "正在打开选定的 AI 助手窗口...",
    loadedFirstResponse: "已加载第一条回复。每 5 秒自动刷新一次...",
    sentTo: "已发送给 {targets}。将在 1 秒后进行首次检查...",
    autoRefresh: "自动刷新 #{attempt}: 正在检查助手... {time}",
    refreshingResponse: "正在刷新助手回复...",
    updatedResponse: "已更新回复。自动刷新中...",
    waitingForReply: "仍在等待回复... ({seconds}秒)",
    noResponse2Min: "2 分钟内未找到回复。助手标签页可能已在后台挂起。",
    noNewTextYet: "暂无新回复。5 秒后再次检查...",
    responseUpToDate: "回复已是最新。",
    loadedLatestResponse: "已加载最新回复。",
    noResponseFoundYet: "尚未找到回复。助手标签页可能已在后台挂起。",
    noResponseFound: "尚未找到回复。",
    checkBtn: "核查",
    sent: "已发送",
    refreshReply: "刷新回复",
    modeWebpage: "运行模式：选定的 AI 网页版，本插件在此不使用 API Key。",
    response: "回复",
    sentToDesc: "已将内容发送至 {targets}。",
    working: "正在处理",
    readingSelectedXCheckingClaim: "正在读取选定的 X 推文并核查内容...",
    readingRecentCaptionsCheckingClaim: "正在读取最近的字幕并核查内容...",
    setupNeeded: "需要设置",
    noClaimFound: "未找到可核查的声明",
    noClaimMessage: "未找到最近的可核查的声明内容。",
    openSettings: "打开设置",
    claim: "提取的声明",
    confidence: "{confidence} 置信度",
    model: "模型: {provider} / {model}",
    modelFallback: "模型: 规则回退",
    search: "搜索: {provider}",
    goal: "目标: {goal}",
    tokens: "Token 消耗: 输入 {input} / 输出 {output} / 总计 {total}",
    sources: "参考来源",
    noSourcesFound: "未找到参考来源。",
    sourceLabel: "来源",
    searchSkipped: "已跳过",
    searchWeb: "网页搜索",
    searchLocalFallback: "本地备用搜索",
    goalOriginal: "寻找原始来源",
    goalAuthoritative: "寻找权威参考",
    usingVisibleCaptions: "使用本次播放中可见的 YouTube 字幕。",
    sendingToAssistant: "正在将{content}发送至选定的 AI 助手。将在 1 秒后进行首次检查。",
    thisXPost: "此 X 推文",
    theVisibleXPost: "可见的 X 推文",
    recentYTCaptions: "最近的 YouTube 字幕",
    errorNoXText: "此页面上未找到可读取的 X 推文或文章内容。",
    errorNoCaptions: "在当前播放时间附近未找到字幕内容。",
    errorSendFailed: "无法将此内容发送到选定的 AI 助手。"
  }
};

let currentLang = "en";

async function loadLanguageSetting() {
  try {
    const settings = await chrome.storage.local.get({ extensionLanguage: "en" });
    currentLang = settings.extensionLanguage === "zh" ? "zh" : "en";
  } catch {
    currentLang = "en";
  }
}

function t(key, vars = {}) {
  let str = I18N[currentLang]?.[key] || I18N.en[key] || "";
  for (const [k, v] of Object.entries(vars)) {
    str = str.replace(`{${k}}`, v);
  }
  return str;
}
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

let captionCache = {
  videoId: "",
  segments: [],
  loadedAt: 0
};
let liveCaptionSegments = [];
let lastLiveCaptionText = "";
let lastLiveCaptionVideoId = "";
let liveCaptureTimer = 0;
let xButtonObserver = null;
let xButtonInjectTimer = 0;
let chatGPTAutoRefreshTimer = 0;
let chatGPTAutoRefreshLastText = "";
let chatGPTAutoRefreshInFlight = false;
let chatGPTAutoRefreshNoChangeCount = 0;
let chatGPTAutoRefreshEmptyCount = 0;
let chatGPTAutoRefreshAttempt = 0;
let panelDragState = null;
let panelDragPosition = null;
let panelResizeListenerBound = false;

function getVideoId() {
  return new URL(location.href).searchParams.get("v") || "";
}

function isYouTubePage() {
  return location.hostname.includes("youtube.com");
}

function isXPage() {
  return location.hostname === "x.com"
    || location.hostname.endsWith(".x.com")
    || location.hostname === "twitter.com"
    || location.hostname.endsWith(".twitter.com");
}

function getVideoElement() {
  return document.querySelector("video");
}

function getPlayerElement() {
  return document.querySelector(".html5-video-player") || document.querySelector("#movie_player");
}

function text(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function createShell() {
  const player = isYouTubePage() ? getPlayerElement() : null;
  const existing = document.getElementById("pull-it-up-root");
  if (existing) {
    updateRootPlacement(isPanelExpanded());
    const btn = existing.querySelector(".piu-button");
    if (btn) {
      btn.textContent = t("pullItUp");
      btn.title = isYouTubePage() ? t("titleYouTube") : t("titleX");
    }
    const collapse = existing.querySelector(".piu-collapse");
    if (collapse) {
      collapse.textContent = t("pullItDown");
    }
    const status = existing.querySelector(".piu-status");
    if (status && (status.textContent.trim().startsWith("Ready on") || status.textContent.trim().includes("已就绪"))) {
      status.textContent = isYouTubePage() ? t("readyYouTube") : t("readyX");
    }
    return;
  }

  const root = document.createElement("div");
  root.id = "pull-it-up-root";
  if (!player) root.classList.add("piu-floating");
  root.innerHTML = `
    <div class="piu-panel" data-expanded="false">
      <div class="piu-top">
        <button class="piu-button" type="button" title="${escapeHtml(isYouTubePage() ? t("titleYouTube") : t("titleX"))}">${escapeHtml(t("pullItUp"))}</button>
      </div>
      <div class="piu-body">
        <div class="piu-status">${escapeHtml(isYouTubePage() ? t("readyYouTube") : t("readyX"))}</div>
        <div class="piu-result" hidden></div>
        <button class="piu-collapse" type="button">${escapeHtml(t("pullItDown"))}</button>
      </div>
    </div>
  `;
  (player || document.documentElement).appendChild(root);
  updateRootPlacement(false);

  root.querySelector(".piu-panel")?.addEventListener("pointerdown", startPanelDrag);
  root.querySelector(".piu-button").addEventListener("click", handleMainButtonClick);
  root.querySelector(".piu-collapse").addEventListener("click", () => setPanelExpanded(false));
}

function updateRootPlacement(expanded) {
  const root = document.getElementById("pull-it-up-root");
  if (!root) return;

  if (isYouTubePage()) {
    const player = getPlayerElement();
    root.classList.toggle("piu-youtube-popout", expanded);
    root.classList.remove("piu-x-page");
    root.classList.remove("piu-x-popout");
    root.classList.remove("piu-page-popout");
    if (expanded) {
      if (root.parentElement !== document.documentElement) {
        document.documentElement.appendChild(root);
      }
      root.classList.add("piu-floating");
      positionYouTubeButtonOverPlayer(root, player);
      return;
    }

    if (player) {
      if (root.parentElement !== player) player.appendChild(root);
      root.classList.remove("piu-floating");
    } else {
      if (root.parentElement !== document.documentElement) {
        document.documentElement.appendChild(root);
      }
      root.classList.add("piu-floating");
    }
    return;
  }

  if (root.parentElement !== document.documentElement) {
    document.documentElement.appendChild(root);
  }
  root.classList.add("piu-floating");
  root.classList.toggle("piu-x-page", isXPage());
  root.classList.toggle("piu-x-popout", isXPage() && expanded);
  root.classList.remove("piu-youtube-popout");
  root.classList.remove("piu-page-popout");
}

function positionYouTubeButtonOverPlayer(root, player = getPlayerElement()) {
  if (!root || !player) return;
  const rect = player.getBoundingClientRect();
  const right = Math.max(16, window.innerWidth - rect.right + 16);
  const bottom = Math.max(16, window.innerHeight - rect.bottom + 76);
  root.style.position = "fixed";
  root.style.left = "";
  root.style.top = "";
  root.style.right = `${right}px`;
  root.style.bottom = `${bottom}px`;
}

function isPanelExpanded() {
  return document.querySelector("#pull-it-up-root .piu-panel")?.getAttribute("data-expanded") === "true";
}

function setPanelExpanded(expanded) {
  const panel = document.querySelector("#pull-it-up-root .piu-panel");
  const button = document.querySelector("#pull-it-up-root .piu-button");
  if (!panel || !button) return;
  if (!expanded) clearPanelDragStyles();
  updateRootPlacement(expanded);
  panel.setAttribute("data-expanded", String(expanded));
  if (expanded) applyPanelOpenPosition();
  if (!expanded) stopChatGPTAutoRefresh();
  button.textContent = "Pull it up";
  button.title = "Fact-check the latest YouTube claim";
}

function startPanelDrag(event) {
  if (!isPanelExpanded() || event.button !== 0) return;
  const root = document.getElementById("pull-it-up-root");
  const dragElement = getPanelDragElement();
  if (!root || !dragElement || !isPanelBorderDrag(event, dragElement)) return;

  const rect = dragElement.getBoundingClientRect();
  panelDragState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    left: rect.left,
    top: rect.top,
    moved: false
  };
  root.classList.add("piu-dragging");
  setPanelElementPosition(dragElement, rect.left, rect.top);

  event.currentTarget.setPointerCapture?.(event.pointerId);
  window.addEventListener("pointermove", dragPanel);
  window.addEventListener("pointerup", stopPanelDrag, { once: true });
  window.addEventListener("pointercancel", stopPanelDrag, { once: true });
  event.preventDefault();
}

function dragPanel(event) {
  if (!panelDragState) return;
  const dragElement = getPanelDragElement();
  if (!dragElement) return;

  const dx = event.clientX - panelDragState.startX;
  const dy = event.clientY - panelDragState.startY;
  if (Math.abs(dx) + Math.abs(dy) > 4) panelDragState.moved = true;
  const clamped = clampPanelPosition(panelDragState.left + dx, panelDragState.top + dy, dragElement);
  setPanelElementPosition(dragElement, clamped.left, clamped.top);
  panelDragPosition = clamped;
  event.preventDefault();
}

function stopPanelDrag() {
  const root = document.getElementById("pull-it-up-root");
  const shouldSave = Boolean(panelDragState?.moved && panelDragPosition);
  if (root) root.classList.remove("piu-dragging");
  panelDragState = null;
  window.removeEventListener("pointermove", dragPanel);
  window.removeEventListener("pointerup", stopPanelDrag);
  window.removeEventListener("pointercancel", stopPanelDrag);
  if (shouldSave) savePanelDragPosition();
}

function applyPanelOpenPosition() {
  if (panelDragPosition) {
    applyPanelDragPosition();
    return;
  }
  applyDefaultPanelPosition();
}

function applyPanelDragPosition() {
  const dragElement = getPanelDragElement();
  if (!dragElement || !panelDragPosition) return;
  const clamped = clampPanelPosition(panelDragPosition.left, panelDragPosition.top, dragElement);
  panelDragPosition = clamped;
  setPanelElementPosition(dragElement, clamped.left, clamped.top);
}

function applyDefaultPanelPosition() {
  if (!isYouTubePage()) return;
  const body = document.querySelector("#pull-it-up-root .piu-body");
  if (!body) return;

  const player = getPlayerElement();
  const right = 18;
  const margin = 12;
  const fallbackWidth = Math.min(560, Math.max(320, window.innerWidth - (margin * 2)));
  const playerRight = player?.getBoundingClientRect().right || 0;
  const adaptiveLeft = Math.round(playerRight + 12);
  const adaptiveWidth = window.innerWidth - adaptiveLeft - right;
  const left = adaptiveWidth >= 320
    ? adaptiveLeft
    : Math.max(margin, window.innerWidth - fallbackWidth - right);
  const width = adaptiveWidth >= 320 ? adaptiveWidth : fallbackWidth;

  body.style.position = "fixed";
  body.style.left = `${left}px`;
  body.style.right = "auto";
  body.style.width = `${width}px`;
  body.style.top = "auto";
  body.style.bottom = "24px";
}

function setPanelElementPosition(element, left, top) {
  element.style.position = "fixed";
  element.style.left = `${left}px`;
  element.style.top = `${top}px`;
  element.style.right = "auto";
  element.style.bottom = "auto";
}

function getPanelDragElement() {
  if (isYouTubePage()) return document.querySelector("#pull-it-up-root .piu-body");
  return document.getElementById("pull-it-up-root");
}

function clearPanelDragStyles() {
  const root = document.getElementById("pull-it-up-root");
  const body = document.querySelector("#pull-it-up-root .piu-body");
  [root, body].forEach((element) => {
    if (!element) return;
    element.style.left = "";
    element.style.top = "";
    element.style.right = "";
    element.style.bottom = "";
    element.style.position = "";
    element.style.width = "";
  });
}

function isPanelBorderDrag(event, panel) {
  if (event.target?.closest?.("button, a, input, textarea, select, [role='button']")) return false;
  const rect = panel.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return x <= PANEL_EDGE_DRAG_SIZE
    || y <= PANEL_EDGE_DRAG_SIZE
    || rect.width - x <= PANEL_EDGE_DRAG_SIZE
    || rect.height - y <= PANEL_EDGE_DRAG_SIZE;
}

function clampPanelPosition(left, top, root) {
  const rect = root.getBoundingClientRect();
  const margin = 8;
  const maxLeft = Math.max(margin, window.innerWidth - rect.width - margin);
  const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
  return {
    left: Math.min(Math.max(margin, left), maxLeft),
    top: Math.min(Math.max(margin, top), maxTop)
  };
}

async function loadPanelDragPosition() {
  try {
    const values = await chrome.storage.local.get({ [PANEL_POSITION_KEY]: null });
    const saved = values[PANEL_POSITION_KEY];
    if (!saved) return;
    const left = Number(saved.left);
    const top = Number(saved.top);
    if (!Number.isFinite(left) || !Number.isFinite(top)) return;
    panelDragPosition = { left, top };
    if (isPanelExpanded()) applyPanelOpenPosition();
  } catch {
    // Position persistence is best-effort.
  }
}

function savePanelDragPosition() {
  if (!panelDragPosition) return;
  chrome.storage.local.set({
    [PANEL_POSITION_KEY]: {
      left: Math.round(panelDragPosition.left),
      top: Math.round(panelDragPosition.top)
    }
  });
}

function bindPanelResizeListener() {
  if (panelResizeListenerBound) return;
  panelResizeListenerBound = true;
  window.addEventListener("resize", () => {
    const root = document.getElementById("pull-it-up-root");
    if (isYouTubePage() && isPanelExpanded()) positionYouTubeButtonOverPlayer(root);
    if (isPanelExpanded()) applyPanelOpenPosition();
  });
}

function handleMainButtonClick() {
  if (isXPage()) return;
  runFactCheck();
}

function startLiveCaptionCapture() {
  if (!isYouTubePage()) return;
  if (liveCaptureTimer) return;
  liveCaptureTimer = window.setInterval(captureVisibleCaptionText, 500);
}

function captureVisibleCaptionText() {
  const video = getVideoElement();
  const videoId = getVideoId();
  if (!video || !videoId) return;

  if (lastLiveCaptionVideoId !== videoId) {
    lastLiveCaptionVideoId = videoId;
    lastLiveCaptionText = "";
    liveCaptionSegments = [];
  }

  const captionText = cleanVisibleCaptionText(readVisibleCaptionText());
  if (!captionText) return;
  const isSameCaptionWindow = captionText === lastLiveCaptionText;
  lastLiveCaptionText = captionText;
  if (isSameCaptionWindow) return;

  const currentTime = video.currentTime || 0;
  liveCaptionSegments.push({
    start: Math.max(0, currentTime - 2),
    duration: 2.5,
    text: captionText,
    source: "visible_caption"
  });

  const minTime = Math.max(0, currentTime - WINDOW_SECONDS - 30);
  liveCaptionSegments = liveCaptionSegments
    .filter((segment) => segment.start >= minTime)
    .slice(-240);
}

function readVisibleCaptionText() {
  const selectors = [
    ".ytp-caption-segment",
    ".caption-window .captions-text",
    ".ytp-caption-window-container"
  ];
  const parts = [];
  for (const selector of selectors) {
    document.querySelectorAll(selector).forEach((node) => {
      const value = text(node.textContent || "");
      if (value) parts.push(value);
    });
    if (parts.length) break;
  }
  return text([...new Set(parts)].join(" "));
}

function cleanVisibleCaptionText(value) {
  return text(value)
    .replace(/\b[A-Za-z][A-Za-z\s-]*\s+\(auto-generated\)\s+Click for settings\b/gi, "")
    .replace(/\bClick for settings\b/gi, "")
    .replace(/\b[A-Za-z][A-Za-z\s-]*\s+\(auto-generated\)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getCaptionDelta(previous, current) {
  const prev = cleanVisibleCaptionText(previous);
  const next = cleanVisibleCaptionText(current);
  if (!next || next === prev || prev.includes(next)) return "";
  if (!prev) return next;
  if (next.startsWith(prev)) return text(next.slice(prev.length));

  const tokenDelta = getCaptionTokenDelta(prev, next);
  if (tokenDelta !== null) return tokenDelta;

  const max = Math.min(prev.length, next.length);
  for (let size = max; size >= 8; size -= 1) {
    if (prev.slice(-size) === next.slice(0, size)) {
      return text(next.slice(size));
    }
  }
  return next;
}

function getCaptionTokenDelta(previous, current) {
  const prevTokens = previous.split(/\s+/).filter(Boolean);
  const nextTokens = current.split(/\s+/).filter(Boolean);
  const maxOverlap = Math.min(prevTokens.length, nextTokens.length);

  for (let size = maxOverlap; size >= 1; size -= 1) {
    const prevTail = prevTokens.slice(-size).join(" ");
    const nextHead = nextTokens.slice(0, size).join(" ");
    if (prevTail === nextHead) {
      return text(nextTokens.slice(size).join(" "));
    }
  }

  return null;
}

function setStatus(message, mode = "idle") {
  const status = document.querySelector("#pull-it-up-root .piu-status");
  if (!status) return;
  status.textContent = message;
  status.dataset.mode = mode;
}

function showLoadingState(sourceLabel = "") {
  const box = document.querySelector("#pull-it-up-root .piu-result");
  if (!box) return;
  box.hidden = false;
  box.innerHTML = `
    <div class="piu-card">
      <div class="piu-label">${escapeHtml(t("working"))}</div>
      <p>${escapeHtml(sourceLabel || (isXPage() ? t("readingSelectedXCheckingClaim") : t("readingRecentCaptionsCheckingClaim")))}</p>
    </div>
  `;
}

function renderResult(result) {
  const box = document.querySelector("#pull-it-up-root .piu-result");
  const panel = document.querySelector("#pull-it-up-root .piu-panel");
  if (!box || !panel) return;
  setPanelExpanded(true);
  box.hidden = false;

  if (!result.ok) {
    box.innerHTML = `
      <div class="piu-card">
        <div class="piu-label">${escapeHtml(result.reason === "missing_api_key" ? t("setupNeeded") : t("noClaimFound"))}</div>
        <p>${escapeHtml(result.message || t("noClaimMessage"))}</p>
        ${result.reason === "missing_api_key" ? `<button class="piu-settings" type="button">${escapeHtml(t("openSettings"))}</button>` : ""}
      </div>
    `;
    box.querySelector(".piu-settings")?.addEventListener("click", () => {
      sendRuntimeMessage({ type: "openOptions" });
    });
    return;
  }

  const sources = (result.sources || []).slice(0, 3).map((source, index) => `
    <a class="piu-source" href="${escapeAttr(source.url)}" target="_blank" rel="noreferrer">
      <span>${index + 1}</span>
      <strong>${escapeHtml(source.title || source.host || t("sourceLabel"))}</strong>
      <small>${escapeHtml(source.host || "")}</small>
    </a>
  `).join("");

  box.innerHTML = `
    <div class="piu-card">
      <div class="piu-label">${escapeHtml(t("claim"))}</div>
      <p class="piu-claim">${escapeHtml(result.claim)}</p>
      <div class="piu-verdict">
        <span>${escapeHtml(result.verdict)}</span>
        <small>${escapeHtml(t("confidence", { confidence: result.confidence }))}</small>
      </div>
      <div class="piu-model">${escapeHtml(result.model_used ? t("model", { provider: result.model_provider || "llm", model: result.model || "enabled" }) : t("modelFallback"))}</div>
      <div class="piu-model">${escapeHtml(result.search_provider ? t("search", { provider: formatSearchProvider(result.search_provider) }) : "")}</div>
      ${result.source_goal ? `<div class="piu-model">${escapeHtml(t("goal", { goal: formatSourceGoal(result.source_goal) }))}</div>` : ""}
      ${result.model_usage_total?.total_tokens ? `<div class="piu-model">${escapeHtml(t("tokens", { input: result.model_usage_total.input_tokens, output: result.model_usage_total.output_tokens, total: result.model_usage_total.total_tokens }))}</div>` : ""}
      <p>${escapeHtml(result.rationale)}</p>
      ${result.source_note ? `<p>${escapeHtml(result.source_note)}</p>` : ""}
      ${result.model_error ? `<p class="piu-error">${escapeHtml(result.model_error)}</p>` : ""}
      <div class="piu-label">${escapeHtml(t("sources"))}</div>
      <div class="piu-sources">${sources || `<p>${escapeHtml(t("noSourcesFound"))}</p>`}</div>
    </div>
  `;
}

function formatSearchProvider(value) {
  if (value === "model_knowledge_no_search") return t("searchSkipped");
  if (String(value || "").includes("web_search")) return t("searchWeb");
  if (value === "local_duckduckgo") return t("searchLocalFallback");
  return value;
}

function formatSourceGoal(value) {
  if (value === "find_original_source") return t("goalOriginal");
  if (value === "find_authoritative_reference") return t("goalAuthoritative");
  if (value === "verify_claim") return "verify claim";
  return value;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/'/g, "&#39;");
}

function findPlayerResponseInHtml(html) {
  const marker = "ytInitialPlayerResponse";
  const start = html.indexOf(marker);
  if (start < 0) return null;
  const equals = html.indexOf("=", start);
  if (equals < 0) return null;

  let index = html.indexOf("{", equals);
  if (index < 0) return null;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = index; i < html.length; i += 1) {
    const char = html[i];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === "\\") {
      escaped = true;
      continue;
    }
    if (char === "\"") {
      inString = !inString;
      continue;
    }
    if (inString) continue;
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) {
      return JSON.parse(html.slice(index, i + 1));
    }
  }
  return null;
}

function chooseCaptionTrack(playerResponse) {
  const tracks = playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
  if (!tracks.length) return null;
  return tracks.find((track) => track.languageCode?.startsWith("en") && track.kind !== "asr")
    || tracks.find((track) => track.languageCode?.startsWith("en"))
    || tracks[0];
}

async function loadCaptionSegments() {
  const videoId = getVideoId();
  if (!videoId) throw new Error("Open a YouTube watch page first.");
  if (captionCache.videoId === videoId && captionCache.segments.length) {
    return captionCache.segments;
  }

  setStatus(t("readingYouTube"), "loading");
  const page = await fetch(location.href, { credentials: "include" });
  const html = await page.text();
  const playerResponse = findPlayerResponseInHtml(html);
  const track = chooseCaptionTrack(playerResponse);
  if (!track?.baseUrl) {
    throw new Error("This video has no readable caption track yet. The next version needs live audio transcription for videos like this.");
  }

  let segments = [];
  try {
    segments = await fetchCaptionSegments(track.baseUrl);
  } catch (error) {
    const liveSegments = recentLiveSegments();
    if (liveSegments.length) {
      setStatus("Using visible YouTube captions from this playback session.", "warn");
      return liveSegments;
    }
    throw error;
  }

  captionCache = {
    videoId,
    segments,
    loadedAt: Date.now()
  };
  return segments;
}

function recentLiveSegments() {
  const video = getVideoElement();
  if (!video) return [];
  const currentTime = video.currentTime || 0;
  const startTime = Math.max(0, currentTime - WINDOW_SECONDS);
  return liveCaptionSegments.filter((segment) => {
    const segmentEnd = segment.start + Math.max(segment.duration, 1);
    return segmentEnd >= startTime && segment.start <= currentTime + 2;
  });
}

function recentSegments(allSegments) {
  const video = getVideoElement();
  if (!video) throw new Error("Could not find the YouTube video player.");
  const currentTime = video.currentTime;
  const startTime = Math.max(0, currentTime - WINDOW_SECONDS);
  return allSegments.filter((segment) => {
    const segmentEnd = segment.start + Math.max(segment.duration, 1);
    return segmentEnd >= startTime && segment.start <= currentTime + 2;
  });
}

async function runFactCheck(options = {}) {
  try {
    stopChatGPTAutoRefresh();
    setPanelExpanded(true);
    const contentLabel = isXPage()
      ? (options.xArticle ? t("thisXPost") : t("theVisibleXPost"))
      : t("recentYTCaptions");
    showLoadingState(t("sendingToAssistant", { content: contentLabel }));
    setStatus(isXPage() ? (options.xArticle ? t("readingX") : t("readingVisibleX")) : t("readingYouTube"), "loading");
    const context = isXPage() ? collectXContext(options.xArticle) : await collectYouTubeContext();
    const segments = context.segments;
    if (!segments.length) {
      throw new Error(isXPage() ? t("errorNoXText") : t("errorNoCaptions"));
    }

    setStatus(t("openingAssistant"), "loading");
    const result = await sendRuntimeMessage({
      type: "sendToAssistants",
      payload: {
        prompt: await buildAssistantPrompt(context),
        autoSend: true,
        focusTab: false,
        waitForResponse: false,
        useBackgroundWindow: true,
        resetAfterCount: 5
      }
    });

    if (!result?.ok) {
      throw new Error(result?.message || t("errorSendFailed"));
    }

    renderAssistantHandoff(result);
    startChatGPTAutoRefresh(getAssistantResponseText(result));
    setStatus(getAssistantResponseText(result) ? t("loadedFirstResponse") : t("sentTo", { targets: formatAssistantTargets(result) }), "loading");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(message, "error");
    setPanelExpanded(true);
    renderResult({ ok: false, message });
  }
}

async function sendXArticleToAssistants(article) {
  return runFactCheck({ xArticle: article });
}

async function buildAssistantPrompt(context) {
  const content = buildPromptContent(context);
  const prompt = await getAssistantPrompt(context);
  return [
    prompt,
    "",
    JSON.stringify({ content }, null, 2)
  ].join("\n");
}

async function getAssistantPrompt(context) {
  try {
    const isYouTubeContent = context?.contentType === "youtube_captions";
    const settings = await chrome.storage.local.get({
      extensionLanguage: "en",
      xCheckPrompt: DEFAULT_X_PROMPT,
      youtubePrompt: DEFAULT_YOUTUBE_PROMPT
    });
    const currentLang = settings.extensionLanguage === "zh" ? "zh" : "en";
    const defaultYoutube = currentLang === "zh" ? DEFAULT_YOUTUBE_PROMPT_ZH : DEFAULT_YOUTUBE_PROMPT;
    const defaultX = currentLang === "zh" ? DEFAULT_X_PROMPT_ZH : DEFAULT_X_PROMPT;

    if (isYouTubeContent) {
      const youtubePrompt = String(settings.youtubePrompt || "").trim();
      return youtubePrompt || defaultYoutube;
    }
    const prompt = String(settings.xCheckPrompt || "").trim();
    if (OLD_DEFAULT_X_PROMPTS.includes(prompt)) return defaultX;
    return prompt || defaultX;
  } catch {
    return context?.contentType === "youtube_captions" ? DEFAULT_YOUTUBE_PROMPT : DEFAULT_X_PROMPT;
  }
}

function buildPromptContent(context) {
  if (context?.contentType === "youtube_captions") {
    return getYouTubeTranscriptTextForPrompt(context.segments);
  }
  return getTranscriptTextForPrompt(context.segments);
}

function getYouTubeTranscriptTextForPrompt(segments = []) {
  return stitchYouTubeCaptionSegments(segments)
    .slice(0, 4000);
}

function getTranscriptTextForPrompt(segments = []) {
  return compactTranscriptText(segments
    .map((segment) => text(segment.text))
    .filter(Boolean)
    .join("\n"))
    .slice(0, 4000);
}

function compactTranscriptText(value) {
  const lines = String(value || "")
    .split("\n")
    .map(cleanVisibleCaptionText)
    .filter(Boolean);
  const merged = [];

  for (const line of lines) {
    const last = merged[merged.length - 1] || "";
    if (!last) {
      merged.push(line);
      continue;
    }
    if (last === line || last.includes(line)) continue;
    if (line.startsWith(last)) {
      merged[merged.length - 1] = line;
      continue;
    }
    const delta = getCaptionDelta(last, line);
    merged.push(delta || line);
  }

  return merged.join("\n");
}

function stitchYouTubeCaptionSegments(segments = []) {
  const pieces = normalizeYouTubeCaptionSegments(segments);
  if (!pieces.length) return "";

  const sentences = [];
  let current = null;

  for (const piece of pieces) {
    if (!current) {
      current = { ...piece };
      continue;
    }

    if (shouldBreakYouTubeCaptionLine(current, piece)) {
      sentences.push(current);
      current = { ...piece };
      continue;
    }

    current.text = joinCaptionFragments(current.text, piece.text);
    current.end = Math.max(current.end, piece.end);
  }

  if (current) sentences.push(current);
  return sentences
    .map((sentence) => `${formatCaptionTimeRange(sentence.start, sentence.end)} ${sentence.text}`)
    .join("\n");
}

function normalizeYouTubeCaptionSegments(segments = []) {
  const normalized = [];
  const sorted = [...segments].sort((a, b) => Number(a.start || 0) - Number(b.start || 0));

  for (const segment of sorted) {
    const line = cleanVisibleCaptionText(segment?.text || "");
    if (!line) continue;
    const start = Number(segment?.start || 0);
    const duration = Number(segment?.duration || 0);
    const end = start + Math.max(duration, 0.5);
    const isVisibleCaption = segment?.source === "visible_caption";
    const last = normalized[normalized.length - 1] || null;
    const lastText = isVisibleCaption ? (last?.rawText || "") : (last?.text || "");

    let pieceText = line;
    if (isVisibleCaption && last) {
      if (lastText === line || lastText.includes(line)) continue;
      if (lastText && line.startsWith(lastText)) {
        pieceText = text(line.slice(lastText.length));
        if (!pieceText) continue;
      } else {
        pieceText = getCaptionDelta(lastText, line);
        if (!pieceText) continue;
      }
    } else if (lastText === line && start - last.end < 0.2) {
      last.end = Math.max(last.end, end);
      continue;
    }

    normalized.push({
      start: Number.isFinite(start) ? start : 0,
      end: Number.isFinite(end) ? end : (Number.isFinite(start) ? start + 0.5 : 0.5),
      rawText: line,
      text: pieceText
    });
  }

  return normalized.filter((piece) => piece.text);
}

function shouldBreakYouTubeCaptionLine(current, next) {
  const gap = next.start - current.end;
  if (gap > 0.8) return true;
  if (/[.!?]["')\]]?$/.test(current.text) && /^[A-Z"']/.test(next.text)) return true;
  if (current.text.length > 220 && /[.!?]["')\]]?$/.test(current.text)) return true;
  if (/^>>?\s/.test(next.text)) return true;
  if (/^[A-Z][A-Za-z .'-]{1,28}:$/.test(next.text)) return true;
  return false;
}

function joinCaptionFragments(current, next) {
  const cleanedNext = next.replace(/^>>?\s*/, "");
  if (!cleanedNext) return current;
  if (/^[,.;:!?)]/.test(cleanedNext)) return `${current}${cleanedNext}`;
  if (/[-/)]$/.test(current)) return `${current}${cleanedNext}`;
  return `${current} ${cleanedNext}`;
}

function formatCaptionTimeRange(start, end) {
  return `[${formatCaptionTime(start)}-${formatCaptionTime(end)}]`;
}

function formatCaptionTime(value) {
  const seconds = Math.max(0, Math.floor(Number(value) || 0));
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

function renderAssistantHandoff(result) {
  const box = document.querySelector("#pull-it-up-root .piu-result");
  const panel = document.querySelector("#pull-it-up-root .piu-panel");
  if (!box || !panel) return;
  setPanelExpanded(true);
  box.hidden = false;
  const targets = formatAssistantTargets(result);
  const responseText = getAssistantResponseText(result);
  const activeName = (result.results || []).find((item) => item.responseText)?.name || t("response");
  box.innerHTML = `
    <div class="piu-card">
      <div class="piu-label">${responseText ? escapeHtml(activeName) : escapeHtml(t("sent"))}</div>
      ${responseText
        ? `<pre class="piu-assistant-response">${escapeHtml(responseText)}</pre>`
        : `<p>${escapeHtml(t("sentToDesc", { targets }))}</p>`}
      <button class="piu-refresh-reply" type="button">${escapeHtml(t("refreshReply"))}</button>
      <p class="piu-model">${escapeHtml(t("modeWebpage"))}</p>
    </div>
  `;

  box.querySelector(".piu-refresh-reply")?.addEventListener("click", refreshChatGPTReply);
}

async function refreshChatGPTReply(options = {}) {
  try {
    if (options.auto && chatGPTAutoRefreshInFlight) return;
    if (options.auto) chatGPTAutoRefreshInFlight = true;
    if (options.auto) {
      chatGPTAutoRefreshAttempt += 1;
      setStatus(t("autoRefresh", { attempt: chatGPTAutoRefreshAttempt, time: formatClockTime() }), "loading");
    } else {
      setStatus(t("refreshingResponse"), "loading");
    }
    const result = await sendRuntimeMessage({ type: "refreshAssistantResponse" });
    if (!result?.ok) {
      throw new Error(result?.message || "Could not refresh assistant response.");
    }
    const responseText = getAssistantResponseText(result);
    renderAssistantHandoff(result);

    if (options.auto) {
      if (responseText && responseText !== chatGPTAutoRefreshLastText) {
        chatGPTAutoRefreshLastText = responseText;
        chatGPTAutoRefreshEmptyCount = 0;
        chatGPTAutoRefreshNoChangeCount = 0;
        setStatus(t("updatedResponse"), "loading");
        return;
      }

      if (!responseText) {
        chatGPTAutoRefreshEmptyCount += 1;
        if (chatGPTAutoRefreshEmptyCount < 60) {
          setStatus(t("waitingForReply", { seconds: chatGPTAutoRefreshEmptyCount * 2 }), "loading");
          return;
        }
        stopChatGPTAutoRefresh();
        setStatus(t("noResponse2Min"), "warn");
        return;
      }

      chatGPTAutoRefreshNoChangeCount += 1;
      if (chatGPTAutoRefreshNoChangeCount < 4) {
        setStatus(t("noNewTextYet"), "loading");
        return;
      }
      stopChatGPTAutoRefresh();
      setStatus(responseText ? t("responseUpToDate") : t("noResponseFoundYet"), responseText ? "done" : "warn");
      return;
    }

    chatGPTAutoRefreshLastText = responseText;
    setStatus(responseText ? t("loadedLatestResponse") : t("noResponseFound"), responseText ? "done" : "warn");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    setStatus(message, "error");
  } finally {
    if (options.auto) chatGPTAutoRefreshInFlight = false;
  }
}

function startChatGPTAutoRefresh(initialText = "") {
  stopChatGPTAutoRefresh();
  chatGPTAutoRefreshLastText = initialText || "";
  chatGPTAutoRefreshNoChangeCount = 0;
  chatGPTAutoRefreshEmptyCount = initialText ? 0 : 1;
  chatGPTAutoRefreshAttempt = 0;
  chatGPTAutoRefreshTimer = window.setTimeout(() => {
    refreshChatGPTReply({ auto: true });
    chatGPTAutoRefreshTimer = window.setInterval(() => {
      refreshChatGPTReply({ auto: true });
    }, 2000);
  }, 1000);
}

function stopChatGPTAutoRefresh() {
  if (!chatGPTAutoRefreshTimer) return;
  window.clearTimeout(chatGPTAutoRefreshTimer);
  window.clearInterval(chatGPTAutoRefreshTimer);
  chatGPTAutoRefreshTimer = 0;
  chatGPTAutoRefreshInFlight = false;
  chatGPTAutoRefreshNoChangeCount = 0;
  chatGPTAutoRefreshEmptyCount = 0;
  chatGPTAutoRefreshAttempt = 0;
}

function formatClockTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function getAssistantResponseText(result) {
  const activeResult = (result.results || []).find((item) => item.responseText);
  return activeResult?.responseText || "";
}

function formatAssistantTargets(result) {
  const names = (result.results || [])
    .map((item) => item.name || item.target)
    .filter(Boolean);
  if (!names.length) return "your selected assistant";
  return names.join(" and ");
}

async function collectYouTubeContext() {
  const allSegments = await loadCaptionSegments();
  return {
    contentType: "youtube_captions",
    videoId: getVideoId(),
    title: document.title,
    currentTime: getVideoElement()?.currentTime || 0,
    windowSeconds: WINDOW_SECONDS,
    segments: recentSegments(allSegments)
  };
}

function collectXContext(articleOverride = null) {
  const article = articleOverride || getBestXArticle();
  const postText = article ? extractXArticleText(article) : extractXFallbackText();
  const cleaned = text(postText);
  if (!cleaned) return { contentType: "x_post", title: document.title, segments: [] };

  return {
    contentType: isXArticleUrl() ? "x_article" : "x_post",
    title: buildXTitle(cleaned),
    currentTime: 0,
    windowSeconds: 0,
    segments: [{
      id: `x_${Date.now()}`,
      text: cleaned,
      start: 0,
      duration: 1,
      source: isXArticleUrl() ? "x_article" : "x_post"
    }]
  };
}

function isXArticleUrl() {
  return /\/i\/article\//.test(location.pathname) || /\/articles?\//.test(location.pathname);
}

function buildXTitle(content) {
  const prefix = isXArticleUrl() ? "X article" : "X post";
  return `${prefix}: ${content.slice(0, 90)}`;
}

function getBestXArticle() {
  const articles = Array.from(document.querySelectorAll("article"));
  if (!articles.length) return null;

  if (/\/status\/\d+/.test(location.pathname)) {
    const withText = articles.find((article) => extractXArticleText(article).length > 20);
    if (withText) return withText;
  }

  const viewportCenter = window.innerHeight / 2;
  return articles
    .map((article) => {
      const rect = article.getBoundingClientRect();
      const textLength = extractXArticleText(article).length;
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      const distance = Math.abs((rect.top + rect.height / 2) - viewportCenter);
      return { article, visible, distance, textLength };
    })
    .filter((item) => item.visible && item.textLength > 20)
    .sort((a, b) => a.distance - b.distance || b.textLength - a.textLength)[0]?.article || null;
}

function injectXInlineButtons() {
  if (!isXPage()) return;

  document.querySelectorAll("article").forEach((article) => {
    if (article.querySelector(":scope .piu-x-inline")) return;
    if (extractXArticleText(article).length < 20) return;

    article.classList.add("piu-x-article");
    const wrapper = document.createElement("div");
    wrapper.className = "piu-x-inline";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "piu-x-button";
    button.textContent = t("checkBtn");
    button.title = t("titleX");
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      sendXArticleToAssistants(article);
    });
    wrapper.appendChild(button);
    article.appendChild(wrapper);
  });
}

function startXButtonObserver() {
  if (!isXPage() || xButtonObserver || !document.body) return;

  xButtonObserver = new MutationObserver((mutations) => {
    if (!mutations.some((mutation) => mutation.addedNodes.length)) return;
    scheduleXButtonInjection();
  });

  xButtonObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

  scheduleXButtonInjection();
}

function scheduleXButtonInjection() {
  if (!isXPage()) return;
  window.clearTimeout(xButtonInjectTimer);
  xButtonInjectTimer = window.setTimeout(() => {
    injectXInlineButtons();
  }, 250);
}

function extractXArticleText(article) {
  const parts = extractXArticleParts(article);
  const formatted = formatXArticleParts(parts);
  if (formatted) return formatted;

  const pieces = [];
  article.querySelectorAll('[data-testid="tweetText"], [data-testid="card.layoutLarge.detail"], div[lang], span[lang]').forEach((node) => {
    const value = text(node.textContent || "");
    if (value) pieces.push(value);
  });

  const unique = [...new Set(pieces)]
    .filter((piece) => !isXUiText(piece));

  if (unique.length) return unique.join("\n");

  return text(article.innerText || "")
    .split("\n")
    .map((line) => text(line))
    .filter((line) => line && !isXUiText(line))
    .slice(0, 24)
    .join("\n");
}

function extractXArticleParts(article) {
  const tweetTextNodes = Array.from(article.querySelectorAll('[data-testid="tweetText"]'))
    .filter((node) => text(node.textContent || "") && !isXUiText(text(node.textContent || "")));
  const cardDetailNodes = Array.from(article.querySelectorAll('[data-testid="card.layoutLarge.detail"]'))
    .filter((node) => text(node.textContent || "") && !isXUiText(text(node.textContent || "")));

  if (!tweetTextNodes.length && !cardDetailNodes.length) return null;

  const primaryTextNode = tweetTextNodes[0] || cardDetailNodes[0];
  const primaryText = collectUniqueText([primaryTextNode]);
  const primaryAuthor = extractXAuthorNear(primaryTextNode, article) || extractFirstXAuthor(article);
  const quoteNodes = tweetTextNodes.slice(1);
  const quoteParts = [];

  quoteNodes.forEach((node) => {
    const quoteText = collectUniqueText([node]);
    if (!quoteText) return;
    const quoteAuthor = extractXAuthorNear(node, article, primaryAuthor);
    quoteParts.push({
      author: quoteAuthor || "Unknown",
      text: quoteText
    });
  });

  return {
    primary: {
      author: primaryAuthor || "Unknown",
      text: primaryText
    },
    quotes: quoteParts
  };
}

function formatXArticleParts(parts) {
  if (!parts?.primary?.text) return "";
  const blocks = [
    [
      `Post author: ${parts.primary.author || "Unknown"}`,
      "Post content:",
      parts.primary.text
    ].join("\n")
  ];

  (parts.quotes || []).forEach((quote, index) => {
    if (!quote.text) return;
    blocks.push([
      `${index === 0 ? "Quoted/original post" : `Quoted/original post ${index + 1}`} author: ${quote.author || "Unknown"}`,
      `${index === 0 ? "Quoted/original post" : `Quoted/original post ${index + 1}`} content:`,
      quote.text
    ].join("\n"));
  });

  return blocks.join("\n\n");
}

function collectUniqueText(nodes) {
  return [...new Set(nodes
    .map((node) => text(node?.textContent || ""))
    .filter((value) => value && !isXUiText(value)))]
    .join("\n");
}

function extractXAuthorNear(node, article, excludedAuthor = "") {
  if (!node) return "";
  const blocks = Array.from(article.querySelectorAll('[data-testid="User-Name"]'));
  const precedingBlocks = blocks.filter((block) => {
    const position = block.compareDocumentPosition(node);
    return position & Node.DOCUMENT_POSITION_FOLLOWING;
  });
  const candidates = precedingBlocks.length ? precedingBlocks.reverse() : blocks;
  const excluded = normalizeAuthor(excludedAuthor);

  for (const block of candidates) {
    const author = parseXAuthorBlock(block);
    if (author && normalizeAuthor(author) !== excluded) return author;
  }

  return "";
}

function extractFirstXAuthor(article) {
  const block = article.querySelector('[data-testid="User-Name"]');
  return parseXAuthorBlock(block);
}

function parseXAuthorBlock(block) {
  if (!block) return "";
  const raw = String(block.innerText || block.textContent || "");
  const lines = raw
    .split(/\n+/)
    .map((line) => text(line))
    .filter(Boolean)
    .filter((line) => !isXUiText(line) && !/^(Follow|Following|Subscribe)$/i.test(line));

  const rawText = text(raw);
  const handle = lines.find((line) => /^@[\w_]+$/.test(line))
    || rawText.match(/@[\w_]+/)?.[0]
    || "";
  const name = lines.find((line) => line !== handle && !line.includes(handle) && !/^@/.test(line) && !/^\d+[smhd]$/.test(line))
    || (handle ? rawText.split(handle)[0] : "");
  return [name, handle].filter(Boolean).join(" ");
}

function normalizeAuthor(value) {
  return text(value).toLowerCase();
}

function extractXFallbackText() {
  const main = document.querySelector("main") || document.body;
  return Array.from(main.querySelectorAll('[data-testid="tweetText"], article, div[lang], span[lang]'))
    .map((node) => text(node.textContent || ""))
    .filter((value) => value && value.length > 20 && !isXUiText(value))
    .slice(0, 8)
    .join("\n");
}

function isXUiText(value) {
  return /^(Reply|Repost|Like|View|Share|Quote|Bookmark|Follow|Following|Subscribe|Show more|Translate post|Promoted|Ad|Log in|Sign up)$/i.test(value)
    || /^\d+(\.\d+)?[KMB]?$/.test(value)
    || /^[·•]$/.test(value);
}

function sendRuntimeMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      const error = chrome.runtime.lastError;
      if (error) {
        reject(new Error(error.message));
        return;
      }
      resolve(response);
    });
  });
}

async function fetchCaptionSegments(baseUrl) {
  const attempts = ["vtt", "json3", "srv3"];
  const errors = [];

  for (const fmt of attempts) {
    try {
      const captionUrl = new URL(baseUrl);
      captionUrl.searchParams.set("fmt", fmt);
      const response = await fetch(captionUrl.toString(), { credentials: "include" });
      const body = await response.text();
      if (!response.ok) throw new Error(`${fmt} returned ${response.status}`);
      if (!body.trim()) throw new Error(`${fmt} returned an empty caption body`);

      const segments = parseCaptionBody(body, fmt);
      if (segments.length) return segments;
      throw new Error(`${fmt} had no caption segments`);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
  }

  throw new Error(`Could not read this video's caption track yet. If this video has captions, try letting it play for a few seconds and click Pull it up again. Details: ${errors.join(" | ")}`);
}

function parseCaptionBody(body, fmt) {
  const trimmed = body.trim();
  if (fmt === "json3" || trimmed.startsWith("{")) {
    const data = JSON.parse(trimmed);
    return (data.events || [])
      .filter((event) => Array.isArray(event.segs))
      .map((event) => ({
        start: Number(event.tStartMs || 0) / 1000,
        duration: Number(event.dDurationMs || 0) / 1000,
        text: text(event.segs.map((seg) => seg.utf8 || "").join(""))
      }))
      .filter((segment) => segment.text);
  }

  if (trimmed.startsWith("<")) {
    return parseXmlCaptions(trimmed);
  }

  return parseVttCaptions(trimmed);
}

function parseXmlCaptions(xml) {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  return Array.from(doc.querySelectorAll("text, p"))
    .map((node) => ({
      start: Number(node.getAttribute("start") || node.getAttribute("t") || 0) / (node.hasAttribute("t") ? 1000 : 1),
      duration: Number(node.getAttribute("dur") || node.getAttribute("d") || 0) / (node.hasAttribute("d") ? 1000 : 1),
      text: text(node.textContent || "")
    }))
    .filter((segment) => segment.text);
}

function parseVttCaptions(vtt) {
  const segments = [];
  const blocks = vtt.split(/\n{2,}/);
  for (const block of blocks) {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    const timeLine = lines.find((line) => line.includes("-->"));
    if (!timeLine) continue;
    const [startRaw, endRaw] = timeLine.split("-->").map((part) => part.trim().split(/\s+/)[0]);
    const start = parseVttTime(startRaw);
    const end = parseVttTime(endRaw);
    const body = lines.slice(lines.indexOf(timeLine) + 1).join(" ");
    if (!Number.isFinite(start) || !text(body)) continue;
    segments.push({
      start,
      duration: Number.isFinite(end) ? Math.max(0, end - start) : 0,
      text: text(body.replace(/<[^>]+>/g, " "))
    });
  }
  return segments;
}

function parseVttTime(value) {
  const parts = String(value || "").split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return Number.NaN;
}

function boot() {
  loadLanguageSetting().then(() => {
    createShell();
    loadPanelDragPosition();
    bindPanelResizeListener();
    startLiveCaptionCapture();
    injectXInlineButtons();
    startXButtonObserver();
  });
}

boot();
let lastUrl = location.href;
setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    captionCache = { videoId: "", segments: [], loadedAt: 0 };
    liveCaptionSegments = [];
    lastLiveCaptionText = "";
    loadLanguageSetting().then(() => {
      boot();
      setPanelExpanded(false);
      setStatus(isYouTubePage() ? t("readyYouTube") : t("readyX"));
    });
  }
}, 1000);
