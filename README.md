# Pull It Up 🚀

[English](#english) | [中文](#中文)

---

## English

**Pull It Up** is a lightweight, zero-configuration Chrome extension that bridges **Twitter/X** and **YouTube** with your logged-in Web AI Assistants (**Google Gemini** & **ChatGPT**).

Unlike other AI extensions, **no API keys are required**. It leverages your existing browser sessions to fact-check posts and summarize videos for free!

---

### ✨ Key Features

- **No API Keys Needed**: Interacts directly with your already logged-in Gemini or ChatGPT web accounts. 100% free.
- **One-Click X (Twitter) Fact-Checking**: Automatically injects a **"Check"** button below tweets. Clicking it pulls up a sleek side panel with structured AI analysis.
- **YouTube Caption Summarization**: Injects a **"Pull it up"** button near the player. Automatically extracts video transcripts and generates concise summaries.
- **Bilingual Interface (EN / ZH)**: Toggle the entire UI (settings, tooltips, buttons, status indicators, and prompts) between English and Chinese instantly.
- **Background Keep-Alive Engine**: Bypasses Chrome's background tab CPU throttling using a specialized background window routing system. Your queries compile flawlessly without tab active focus.
- **Ultra-Fast Polling**: Adaptive 2-second refresh polling (1s, 3s, 5s, 7s...) ensuring near-instantaneous response loading in your current viewport.
- **Custom prompts**: Customize X/YouTube system templates directly in the modern Options page.

---

### 📦 Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/pull-it-up.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** (top-left) and select the `extension` folder inside this repository.
5. Done! Pin the extension to your toolbar.

---

### ⚙️ Usage Configuration

1. Click the extension icon and select **Options** (or right-click -> Options).
2. Choose your preferred language (English / 中文).
3. Select your target assistant(s) (Gemini, ChatGPT, or both).
4. Keep the selected assistants logged in on Chrome (e.g., stay logged in at [Gemini](https://gemini.google.com) or [ChatGPT](https://chatgpt.com)).
5. Customize your fact-checking/summarization prompts if desired, and click **Save**.

---

## 中文

**Pull It Up** 是一款轻量级、免配置的 Chrome 浏览器插件。它将 **Twitter/X** 和 **YouTube** 无缝对接至您已登录的 AI 网页助手（**Google Gemini** 与 **ChatGPT**）。

与其他同类插件不同，**它不需要任何 API 密钥 (API Key)**。它直接利用您已有的网页端会话，完全免费地为您校验推文真实性、生成视频摘要！

---

### ✨ 核心功能

- **免 API 密钥**：直接桥接您已在浏览器登录的 Gemini 或 ChatGPT 个人账户，零成本使用。
- **推文一键核查**：自动在推特/X帖子下方注入 **“校验”** 按钮。点击即可在当前页面右侧滑出悬浮面板，展示结构化的 AI 深度分析。
- **YouTube 视频字幕提炼**：自动在播放器上方生成 **“Pull it up”** 按钮。一键读取视频字幕，让 AI 为您生成核心要点和时间线总结。
- **中英双语完美本地化**：支持一键切换系统语言，所有的按钮、状态信息、设置页以及默认 Prompt 都会立刻自动本地化。
- **后台防挂起引擎**：针对 Chrome 对后台标签页的休眠限制，采用特殊的后台独立窗口调度机制。即便不把 AI 网页拉到前台，也能稳定生成文字。
- **极速响应轮询**：优化至 2 秒周期的刷新检测（第 1s、3s、5s、7s...），让 AI 的文字生成第一时间渲染到您的当前屏幕上。
- **高度自定义 Prompt**：在设置页中支持完全自定义提示词模板，定制属于您的总结或校验风格。

---

### 📦 安装方法

1. 克隆或下载本仓库代码到本地：
   ```bash
   git clone https://github.com/YOUR_USERNAME/pull-it-up.git
   ```
2. 打开 Chrome 浏览器，进入扩展程序管理页面：`chrome://extensions/`。
3. 开启右上角的 **“开发者模式” (Developer mode)**。
4. 点击左上角的 **“加载已解压的扩展程序” (Load unpacked)**，选择本项目中的 `extension` 文件夹。
5. 安装完成！点击浏览器右上角的拼图图标，将 **Pull It Up** 固定到工具栏。

---

### ⚙️ 使用与配置

1. 点击插件图标，选择 **选项 (Options)** 打开配置页面。
2. 选择您的 UI 语言（中文 / English）。
3. 勾选您要使用的 AI 助手目标（可单选或多选 ChatGPT / Gemini）。
4. **确保您已在 Chrome 中登录了对应的网页端**（如已登录 [Gemini](https://gemini.google.com) 或 [ChatGPT](https://chatgpt.com) 账号）。
5. 根据需要修改自定义提示词模板，点击 **Save (保存)** 即可。

---

### 📄 License

This project is licensed under the [MIT License](LICENSE).
