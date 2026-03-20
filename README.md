# Start Your Python

`Start Your Python` 是一个面向 Python 初学者的桌面学习器。它不是通用 IDE，而是一个用 `PyCharm` 工作区形态承载入门课程的本地应用：

- 左侧是章节文件夹和真实 `.py` 课程文件
- 中间默认显示伪 Python 代码编辑态
- 右上角主 `Run` 用来进入课程讲解和步骤推进
- 课程内容中的代码块可以单独运行到终端
- 底部保留 `Problems / Terminal / Run` 工具窗口

当前桌面壳基于 `Tauri`，前端基于 `Vue 3 + Vite`。

## 项目定位

这个项目主要服务 Python 入门自学者，目标不是替代真实 IDE，而是降低“第一次打开 Python 学习环境就被复杂工具劝退”的门槛。

它重点解决的是：

- 用熟悉的 IDE 结构承载课程，而不是网页卡片式学习
- 把课程拆成真实文件树，减少“这只是个假界面”的割裂感
- 保留本地优先体验，打开就能学，不依赖账号系统

## 当前能力

- PyCharm 风格工作区布局
- 中文章节目录 + `.py` 课程文件树
- 编辑态 / 运行态双态切换
- 课程内容代码块真实运行到系统 Python
- 底部 `Terminal` 支持真实输出、错误输出和 `input()` 交互
- 没检测到 Python 时，可直接跳转到安装课程并重新检测
- 底部 `Terminal` 和 `Run` 工具窗口
- 本地学习进度记录和最近学习
- 真实课程文件目录，课程源位于 [content/lessons](content/lessons)

## 当前不做

- 内置 Python 运行时
- 云同步和账号体系
- AI 导师聊天
- 自动判题和复杂练习系统

## 技术栈

- Vue 3
- TypeScript
- Pinia
- Vue Router
- Vite
- Tauri
- Vitest

## 运行项目

安装依赖：

```bash
npm install
```

Web 开发：

```bash
npm run dev
```

桌面开发：

```bash
npm run tauri:dev
```

## 构建桌面版

生成 Windows 可执行文件：

```bash
npm run tauri:build
```

默认产物路径：

```text
src-tauri/target/release/start-your-python.exe
```

整理成更像发布版的目录和 zip：

```bash
npm run tauri:release
```

默认会生成：

```text
release/windows/StartYourPython-v<version>-win-x64/
release/windows/StartYourPython-v<version>-win-x64.zip
```

如果后续网络环境正常、需要继续生成安装包：

```bash
npm run tauri:bundle
```

## Windows 前置环境

在 Windows 上使用 Tauri 构建前，需要先安装：

- Rust toolchain
- Visual Studio Build Tools 的 C++ 构建组件

## 质量校验

```bash
npm run typecheck
npm run test
npm run build
npm run tauri:build
```

## 课程文件结构

课程内容不是写死在组件里的，它们来自真实文件目录：

```text
content/lessons/
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

应用启动后会直接读取这些 `.py` 文件来生成左侧项目树和课程内容。课程内容中的代码块也会优先调用系统 Python 解释器执行。

## 项目结构

```text
content/lessons/          真实课程文件目录
src/
  components/workspace/   PyCharm 风格工作区组件
  services/content/       本地内容读取与解析
  stores/                 学习状态与进度状态
  utils/                  本地持久化等工具
  views/                  页面入口
src-tauri/                Tauri 桌面壳
tests/                    Vitest 测试
docs/ROADMAP.md           后续路线图
```

## 路线图

见 [docs/ROADMAP.md](docs/ROADMAP.md)。

## 许可证

[MIT](LICENSE)
