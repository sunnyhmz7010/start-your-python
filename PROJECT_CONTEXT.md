# Project Context

## 项目定义

`Start Your Python` 是一个面向 Python 初学者的桌面学习应用。

它的核心方向不是做通用 IDE，而是做一个尽量接近 `PyCharm` 工作区体验的教学型桌面软件：

- 左侧是章节文件夹和 `.py` 课程文件
- 中间是 Python 风格编辑器
- 底部是 `Problems / Terminal / Run`
- 课程内容来自真实的 `content/lessons/**/*.py` 文件

当前桌面壳是 `Tauri`，前端是 `Vue 3 + Vite`。

## 当前状态

- 已发布版本：`v1.0.0`、`v1.0.1`
- 当前发布命名：
  - Release 标题：`Start Your Python vX.Y.Z`
  - Windows 资产：`StartYourPython-vX.Y.Z-win-x64.zip`
- 当前课程源目录：`content/lessons`
- 当前学习进度：保存在本地存储中，不做云同步

## 当前产品能力

- PyCharm 风格工作区布局
- 中文章节目录 + `.py` 课程文件树
- 课程文件驱动的内容解析
- 右侧步骤学习面板
- 本地学习进度记录
- 步骤级完成状态、重置本课、清空全部进度
- Tauri Windows 桌面打包

## 当前明确不做

- 云同步和账号体系
- AI 聊天导师
- 复杂题库和自动判题
- 多人协作
- 完整 PyCharm 级项目管理

## v1.1 目标

`v1.1` 的目标是把项目从“像 IDE 的学习器”推进到“更接近真实 PyCharm 的教学型 PyCharm”：

- 编辑器中的代码可以真实修改
- 右上角主 `Run` 只负责进入课程内容态
- 课程内容中的代码块 `Run` 才会调用系统 Python
- 底部终端显示真实输出、错误输出和 `input()` 交互
- 如果系统没装 Python，引导用户学习安装课程并重新检测

## 下次继续开发时的最短提示词

直接说：

`继续开发 start-your-python，先看 PROJECT_CONTEXT.md、NEXT_TASKS.md 和最新 v1.1 spec。`
