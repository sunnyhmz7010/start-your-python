# Start Your Python

`Start Your Python` 是一个面向 Python 初学者的桌面学习应用。它不是通用 IDE，而是一个用 `PyCharm` 风格工作区承载课程、示例代码和真实终端运行体验的本地学习器。

当前技术栈：
- `Vue 3 + Vite`
- `Tauri`
- `Pinia`
- `Vitest`

## 当前能力

- PyCharm 风格工作区布局
- 中文章节目录 + `.py` 课程文件树
- 中间编辑区与课程内容双态切换
- 课程内容代码块可调用系统 Python 运行
- 底部 `Terminal` 支持真实输出、错误输出和 `input()` 交互
- 没检测到 Python 时，可直接跳转到安装课程并重新检测
- 本地学习进度记录和最近学习
- 真实课程文件目录，课程源位于 [content/lessons](content/lessons)

## 当前不做

- 内置 Python 运行时
- 云同步和账号体系
- AI 导师聊天
- 自动判题和复杂练习系统

## 开发与构建

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

桌面构建：

```bash
npm run tauri:build
```

发布目录整理：

```bash
npm run tauri:release
```

质量校验：

```bash
npm run typecheck
npm run test
npm run build
npm run tauri:build
```

Windows 构建前置环境：
- Rust toolchain
- Visual Studio Build Tools 的 C++ 构建组件

## 课程目录

课程内容来自真实文件目录：

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

应用启动后会直接读取这些 `.py` 文件来生成左侧项目树和课程内容，课程中的代码块可调用系统 Python 解释器执行。

## 项目结构

```text
content/lessons/          真实课程文件目录
src/
  components/workspace/   PyCharm 风格工作区组件
  services/content/       本地内容读取与解析
  services/runtime/       系统 Python 运行时接入
  stores/                 学习状态、进度与终端状态
  views/                  页面入口
src-tauri/                Tauri 桌面壳
tests/                    Vitest 测试
docs/ROADMAP.md           后续路线图
```

## 路线图

见 [docs/ROADMAP.md](docs/ROADMAP.md)。

## 许可证

[MIT](LICENSE)
