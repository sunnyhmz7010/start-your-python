# Start Your Python

![PyCharm Style UI](https://img.shields.io/badge/UI-PyCharm_Darcula-brightgreen)
![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D)
![Neutralinojs](https://img.shields.io/badge/Neutralinojs-Desktop-F5DE19)

**Start Your Python** 是一个专为零基础用户打造的交互式 Python 桌面学习应用。它采用了 1:1 完美复刻的 PyCharm Darcula (经典黑夜) 主题界面，旨在让初学者在真实还原的 IDE 环境中无缝、沉浸式地学习 Python 编程。

## ✨ 核心特性

- 🖥️ **PyCharm IDE 沉浸式模拟**
  - 完美复刻 Darcula 经典配色板 (`#3C3F41` 面板、`#2B2B2B` 编辑器)。
  - 定制的滚动条、顶部蓝条 Tab、极具质感的工具栏按钮与 Hover 状态。
  - 左侧项目树形目录、底部控制台终端与右侧学习引导完美整合。
- 📚 **12章渐进式课程体系**
  - 从 Python 环境安装一直到面向对象编程 (OOP)。
  - 将每个核心概念拆分为小步骤，结合图文、代码和提示循序渐进。
- 🎮 **真正的"运行"体验**
  - 点击工具栏经典的绿色运行按钮 (▶) 或使用 `Shift` + `F10` 快捷键，触发交互式学习流程。
  - CodeMirror 深度集成的代码阅读与执行体验。
- 📊 **智能学习进度追踪**
  - 自动记录各个章节与子课程的学习情况。
  - 直观的打钩 (✓) 完成状态与底部完成率展示。

## 🛠️ 技术栈

该项目已全面重构为现代前端与轻量级跨平台桌面架构：

- **核心框架**: Vue 3 (Composition API, `<script setup>`)
- **路由与状态**: Vue Router + Pinia
- **代码高亮**: CodeMirror 6 (高度定制的 `@codemirror/theme-one-dark` 和 `@codemirror/lang-python`)
- **构建工具**: Vite
- **桌面端打包**: Neutralinojs (无需庞大的 Electron 即可构建极速轻量桌面应用)

## 🚀 快速开始

### 1. 环境准备

确保你已经安装了 [Node.js](https://nodejs.org/) (建议 v18+)

### 2. 安装依赖

```bash
npm install
```

### 3. 开发环境预览 (Web 模式)

在浏览器中查看 PyCharm 风格的 UI：

```bash
npm run dev
```

### 4. 桌面端预览 (Neutralinojs 模式)

作为独立窗口的原生桌面应用启动：

```bash
npm run neu:dev
```

### 5. 构建生产版本

同时打包 Web 产物与跨平台桌面程序 (Windows/macOS/Linux)：

```bash
npm run neu:build
```

产物会输出在 `dist/` 文件夹中。

## 📁 目录结构

```text
start-your-python/
├── src/
│   ├── assets/        # 静态资源
│   ├── components/    # 共享 UI 组件
│   ├── data/          # 课程与章节数据配置
│   ├── router/        # Vue 路由配置
│   ├── stores/        # Pinia 状态管理
│   ├── styles/        # 全局样式
│   ├── types/         # TypeScript 类型定义
│   ├── views/         # 页面视图 (如核心的 HomeView.vue)
│   ├── App.vue        # 根组件
│   └── main.ts        # 入口文件
├── neutralino.config.json # Neutralinojs 桌面端配置
├── vite.config.ts         # Vite 构建配置
└── package.json           # 项目依赖
```

## 📚 课程内容概览

| 章节 | 内容 |
|------|------|
| 第1章 | Python环境安装 |
| 第2章 | 第一个Python程序 |
| 第3章 | 变量与数据类型 |
| 第4章 | 运算符与表达式 |
| 第5章 | 条件语句 |
| 第6章 | 循环语句 |
| 第7章 | 函数基础 |
| 第8章 | 列表与元组 |
| 第9章 | 字典与集合 |
| 第10章 | 文件操作 |
| 第11章 | 模块与包 |
| 第12章 | 面向对象入门 |

## 📝 许可证

本项目基于 [MIT License](LICENSE) 开源。欢迎任何人将其作为编程教育工具或界面参考的基础库。