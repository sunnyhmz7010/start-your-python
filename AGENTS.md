# AGENTS.md

## 项目概况

| 维度 | 内容 |
|------|------|
| 产品定位 | 面向中文 Python 初学者的本地学习工作区，非云端 IDE |
| UX 方向 | PyCharm 风格：课程树 + 编辑器 + 步骤内容 + 真实终端 |
| 目标用户 | 中文 Python 初学者 |
| 当前版本 | `1.6.0` |

### 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Vue 3、TypeScript |
| 构建 | Vite |
| 状态管理 | Pinia |
| 桌面端 | Tauri 2、Rust |
| 移动端 | Capacitor 7、Android |
| 内容渲染 | Marked、课程文件解析、HTML 清理 |
| 测试 | Vitest、Vue Test Utils、vue-tsc |

### 关键路径

| 用途 | 路径 |
|------|------|
| Vue 应用源码 | `src/` |
| Tauri 桌面壳 | `src-tauri/` |
| 课程内容 | `lessons/` |
| 课程图片 | `public/course-images/` |
| 图标源资源 | `resources/` |
| 测试 | `tests/` |
| 脚本 | `scripts/` |

## 架构约束

### 产品约束

- 不引入账号系统、云同步或 AI 功能（除非明确要求）
- 保持本地学习工具定位
- 课程内容来自 `lessons/` 下的 `.py` 文件
- 产品文案保持中文

### 运行时模型

| 特性 | 说明 |
|------|------|
| 课程渲染 | 从 `.py` 文件读取注解生成课程树和步骤内容 |
| 代码执行 | 桌面端调用系统 Python 解释器，支持 stdout/stderr/input() |
| 进度更新 | 仅在步骤代码以退出码 0 完成、答题正确或手动标记时更新 |
| Python 来源 | 外部系统 Python，应用不捆绑 |
| 移动端 | 纯阅读体验，不依赖系统 Python |

### 代码执行路径

| 端 | 能力 |
|----|------|
| 桌面端 | 课程代码块 → 系统 Python → Terminal 输出 |
| 移动端 | 仅课程阅读，无代码执行 |

## 开发规范

### 命令速查

| 场景 | 命令 |
|------|------|
| 安装依赖 | `npm install` |
| Web 开发 | `npm run dev` |
| 类型检查 | `npm run typecheck` |
| 测试 | `npm run test` |
| Web 构建 | `npm run build` |
| 移动构建 | `npm run build:mobile` |
| 桌面开发 | `npm run tauri:dev` |
| 桌面构建 | `npm run tauri:build` |
| 发布打包 | `npm run tauri:release` |
| 图标生成 | `npm run icons:generate` |

> **注意**：`npm run build` 和 `npm run build:mobile` 不可并行执行，两者写入同一 `build/` 目录会导致 Vite `ENOTEMPTY` 错误。

### 代码组织

| 模块 | 路径 |
|------|------|
| 工作区 UI | `src/components/workspace/` |
| 课程内容渲染 | `src/components/content/MarkdownContent.vue` |
| 内容解析加载 | `src/services/content/` |
| Python 运行时 | `src/services/runtime/` |
| 状态管理 | `src/stores/` |
| HTML 清理 | `src/utils/sanitizeHtml.ts`（v-html 前必须保留） |

### 编码风格

- 保持变更精准，避免大范围 UI 重写
- 图标源文件以 `resources/icon.png` 为准，使用对应脚本生成各端图标
- 课程内容渲染前必须经过 `sanitizeHtml.ts` 清理

## 移植性/踩坑经验

### Windows 构建依赖

| 依赖 | 说明 |
|------|------|
| Rust 工具链 | Tauri 必需 |
| Visual Studio Build Tools | 需安装 C++ 组件 |
| Cargo bin 路径 | npm 脚本已自动追加，修改时需保持 |

### CI/CD 配置

- GitHub Actions 工作流设置 `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` 抑制 Node 20 弃用警告
- 修改 CI/CD 工作流时保持此标志

## 版本历史

### 版本标签格式

| 类型 | 格式 |
|------|------|
| 稳定版 | `v1.3.0` |
| 预发布 | `v1.2.1-beta.1` |

### 发布检查清单

发布时需同步更新：
- `package.json` 版本号
- `src-tauri/Cargo.toml` 版本号
- `src-tauri/tauri.conf.json` 版本号
- `README.md`（如打包目标、截图、运行时行为或功能描述有变）

### 产物命名规范

| 平台 | 命名格式 |
|------|----------|
| Windows 便携包 | `StartYourPython-vX.Y.Z-win-{amd64\|arm64}.zip` |
| Android APK | `StartYourPython-vX.Y.Z-android-{abi}-release.apk` |

### 产物结构要求

- Windows 便携包根目录直接包含 `Start Your Python.exe` + `lessons/`，不套额外文件夹
- 可执行文件名固定为 `Start Your Python.exe`，不含版本号

### Android 签名

- 包名：`com.sunny.startyourpython`
- CD 构建架构：`arm64-v8a`、`x86_64`
- 签名密钥存储在项目本地 `release-signing/`（已 gitignore），需与 GitHub Secrets 同步：
  - `ANDROID_KEYSTORE_BASE64`
  - `ANDROID_KEYSTORE_PASSWORD`
  - `ANDROID_KEY_ALIAS`
  - `ANDROID_KEY_PASSWORD`


