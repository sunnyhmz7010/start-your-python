<div align="center">
  <img src="https://raw.githubusercontent.com/sunnyhmz7010/start-your-python/refs/heads/main/public/icon.png" alt="Start Your Python Logo" width="120" />
  <h1>Start Your Python</h1>
  <p>面向 Python 初学者的本地学习工作区，把中文课程、示例代码和真实终端运行放在一个 PyCharm 风格界面里</p>
</div>

<p align="center">
  <a href="https://github.com/sunnyhmz7010/start-your-python/releases"><img src="https://img.shields.io/github/v/release/sunnyhmz7010/start-your-python?label=Release&color=3b82f6" alt="Release" /></a>
  <a href="https://github.com/sunnyhmz7010/start-your-python/blob/main/LICENSE"><img src="https://img.shields.io/github/license/sunnyhmz7010/start-your-python?color=10b981" alt="License" /></a>
  <a href="https://github.com/sunnyhmz7010/start-your-python/actions/workflows/ci.yaml"><img src="https://img.shields.io/github/actions/workflow/status/sunnyhmz7010/start-your-python/ci.yaml?branch=main&label=CI" alt="CI" /></a>
</p>

<p align="center">
  <a href="https://github.com/sunnyhmz7010/start-your-python/releases">下载发布包</a> ·
  <a href="https://github.com/sunnyhmz7010/start-your-python/issues">反馈问题</a>
</p>

---

## ✨ 为什么做这个应用

Python 入门最容易卡在“看懂教程”和“真的跑起来”之间。Start Your Python 的目标，就是给初学者提供一个本地、清楚、可继续的 Python 学习工作区。

- 用接近桌面 IDE 的界面组织中文课程、源码和步骤内容
- 让课程代码块可以调用本机 Python 解释器真实运行
- 在底部 Terminal 中展示 stdout、stderr 和 `input()` 交互
- 同时提供 Android 课程阅读体验，方便移动端复习

## 📸 截图预览

<p align="center">
  截图占位
</p>

## 🚀 核心能力

### 🧭 学习工作区

- PyCharm 风格布局：课程树、编辑区、步骤内容和底部工具窗口
- 中文章节目录直接来自 `lessons/` 下的真实 `.py` 文件
- 编辑态用于查看课程源码，学习态用于按步骤阅读讲解和示例
- 学习进度保存在本机设备，代码运行成功、答题正确或手动标记后会更新进度

### 🖥️ 真实运行

- 桌面端课程代码块可调用本机 Python 解释器运行
- Terminal 支持标准输出、错误输出和 `input()` 输入
- 课程步骤代码以退出码 0 完成时，会自动标记该步骤完成
- 未检测到 Python 时，可跳转到安装课程并重新检测
- Python 运行时来自用户系统，应用本身不捆绑 Python

### 📱 移动阅读

- Android 构建提供课程阅读体验
- 移动端使用专门的阅读布局
- 适合在手机上复习课程步骤和示例代码

### 📚 课程内容

- 课程使用 `.py` 文件承载注解、讲解和示例代码
- 应用会读取课程文件生成课程树和步骤内容
- 支持阅读、代码、隐藏运行上下文和随堂测验步骤
- 课程图片可放在 `public/course-images/` 并在课程 Markdown 中引用
- 课程讲解中可按上下文放入外部参考链接，例如菜鸟教程、Python 官方文档或工具官网

## ⚡ 快速开始

### 📋 运行要求

- Windows 桌面端运行代码需要系统已安装 Python
- Android 端用于课程阅读，不依赖系统 Python

检查本机 Python：

```bash
python --version
```

Windows 也可以使用：

```bash
py -3 --version
```

### 📦 安装

1. 从 [Releases](https://github.com/sunnyhmz7010/start-your-python/releases) 下载对应架构的 Windows 便携包，例如 `StartYourPython-vX.Y.Z-win-amd64.zip` 或 `StartYourPython-vX.Y.Z-win-arm64.zip`
2. 解压后直接运行根目录里的 `Start Your Python.exe`
3. 压缩包根目录会同时包含课程文件目录 `lessons/`

## 📖 使用方式

### 1. 🧑‍🎓 阅读课程

打开应用后，从左侧课程树选择章节。课程内容来自：

```text
lessons/
```

示例结构：

```text
lessons/
├─ 第一章 Python环境准备/
│  ├─ Python是什么.py
│  ├─ 安装Python.py
│  ├─ 配置开发环境.py
│  └─ 第一次运行Python.py
├─ 第二章 基础语法入门/
│  ├─ Hello World.py
│  ├─ 注释与缩进.py
│  ├─ 输入与输出.py
│  └─ 常见语法错误.py
...
```

### 2. ▶️ 运行示例

桌面端可以在课程步骤里运行示例代码。运行结果会出现在底部 Terminal 中：

- `print()` 输出显示为 stdout
- 语法错误和运行异常显示为 stderr
- `input()` 会进入交互输入流程
- 课程步骤运行成功后会更新本课进度；编辑器自由运行不会影响课程进度

### 3. ✅ 完成进度

课程步骤可以通过三种方式完成：

- 点击“下一步”或“标记本步完成”
- 课程代码步骤运行成功并以退出码 0 结束
- 随堂测验选择正确答案

### 4. 🖼️ 引用课程图片

课程图片放在：

```text
public/course-images/
```

课程 Markdown 中可使用：

```markdown
![图片说明](/course-images/name.svg)
```

## 🧠 功能细节

### 🗂️ 本地课程模型

- 课程树按文件夹和 `.py` 文件组织
- 课程内容可以和真实 Python 示例代码放在同一个文件里
- 课程加载、解析和渲染逻辑与用户本地文件结构保持一致

### ✍️ 课程注解格式

课程文件通过注释声明元信息和学习步骤。代码步骤会显示注解后的 Python 代码，`runtime` 可提供运行时需要但不展示给初学者的上下文。

```python
# @lesson.id: lesson_syntax_hello_world
# @lesson.title: Hello World
# @lesson.description: 学习 print 输出。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 5
# @lesson.chapter: 2
# @lesson.chapter_title: 第二章 基础语法入门
# @lesson.chapter_order: 2
# @lesson.order: 1

# @step.id: s1
# @step.type: code
# @step.title: print 函数
# @step.content:
# print 会把括号里的内容显示到终端。更多基础例子可参考
# [菜鸟教程 Python3 教程](https://www.runoob.com/python3/python3-tutorial.html)。
print("Hello, Python!")

# @step.id: q1
# @step.type: quiz
# @step.title: 小测验
# @step.content: 哪个函数可以输出内容？
# @step.option: a | print()
# @step.option: b | input()
# @step.correct_answer: a
```

### 🧪 终端交互

- 支持标准输出和错误输出分流
- 支持交互式输入
- 支持 Python 环境检测和重新检测
- 适合初学者观察代码运行结果和错误反馈

### 🔐 本地优先

- 不需要账号系统
- 不依赖云端同步
- 学习状态保存在本机
- 适合离线学习和本地课程维护

## 🧱 技术栈

- 前端框架：Vue 3、TypeScript
- 构建工具：Vite
- 状态管理：Pinia
- 桌面端：Tauri 2、Rust
- 移动端：Capacitor 7、Android
- 内容渲染：Marked、课程文件解析、HTML 清理
- 测试与类型检查：Vitest、Vue Test Utils、vue-tsc

## 🗂️ 项目架构

```text
start-your-python/
├─ src/                         # Vue 应用源码
│  ├─ components/                # 工作区、课程内容等 UI 组件
│  │  ├─ content/                # Markdown 和课程内容渲染
│  │  └─ workspace/              # PyCharm 风格学习工作区
│  ├─ services/                  # 课程加载、内容解析、Python 运行时检测与执行
│  ├─ stores/                    # 学习进度、终端状态等 Pinia store
│  ├─ router/                    # 页面路由
│  ├─ views/                     # 桌面端和移动端页面视图
│  └─ utils/                     # HTML 清理等通用工具
├─ src-tauri/                    # Tauri 桌面壳、Rust 命令和应用配置
├─ lessons/                      # 中文 Python 课程源码与步骤内容
├─ public/                       # Web 静态资源、favicon 和课程图片
├─ resources/                    # Tauri/Capacitor 图标生成源资源
├─ scripts/                      # 发布和打包脚本
├─ tests/                        # Vitest 测试
├─ capacitor.config.ts           # Capacitor 移动端配置
├─ vite.config.ts                # Vite 构建配置
└─ package.json                  # npm 脚本、依赖和版本信息
```

## 👨‍💻 本地开发

### 🧰 环境

- Node `22+`
- Rust stable
- Visual Studio Build Tools with C++ components

### 🔨 构建 Web 应用

```bash
npm install
npm run build
```

### 🖥️ 桌面开发

```bash
npm run tauri:dev
```

构建桌面应用：

```bash
npm run tauri:build
```

### 📱 移动构建

```bash
npm run build:mobile
npm run android:sync
```

### ✅ 质量检查

```bash
npm run typecheck
npm run test
```

## 🔐 安全报告

如果发现安全问题，请不要公开披露细节。请优先参考仓库中的 [SECURITY.md](./SECURITY.md) 提交安全报告。

## 📄 许可证

本项目基于 [GPL-3.0](./LICENSE) 开源。

## ⭐ 星标历史

[![Star History Chart](https://api.star-history.com/svg?repos=sunnyhmz7010/start-your-python&type=Date)](https://star-history.com/#sunnyhmz7010/start-your-python&Date)

<div align="center">
  <sub>Built with ❤️ by Sunny</sub>
</div>
