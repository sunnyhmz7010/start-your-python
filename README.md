# Start Your Python

`Start Your Python` 是一个面向 Python 初学者的本地优先学习应用。它现在采用 `PyCharm New UI Dark` 风格的双态工作区：

- 默认是 `.py` 课件文件的编辑态
- 点击 `Run` 后进入课程内容运行态
- 底部 `Run` 工具窗口输出教学型运行日志

## 当前状态

当前版本定位为 `v1.1.0` 的可维护 MVP，重点是：

- PyCharm New UI 风格课程工作区
- 中文章节目录和 `.py` 课程文件出现在项目树中
- 多课时课程结构，不再是一章一课
- 编辑态 / 运行态双态切换
- 内置 Python 入门课程内容
- 本地学习进度与最近学习记录
- 为未来远程课程源预留内容提供层

当前不包含：

- 真正执行本地 Python 代码
- 账号体系或云同步
- AI 导师聊天
- 自动评分系统

## 技术栈

- Vue 3
- TypeScript
- Pinia
- Vue Router
- Vite
- Tauri
- Vitest

## 本地开发

```bash
npm install
npm run dev
```

## 质量校验

```bash
npm run typecheck
npm run test
npm run build
```

## 桌面构建

```bash
npm run tauri:build
```

默认产出是可直接运行的 Windows `exe`，路径为：

```text
src-tauri/target/release/start-your-python.exe
```

如果要整理成更像发布版的目录和压缩包，可以运行：

```bash
npm run tauri:release
```

它会生成：

```text
release/windows/StartYourPython-v1.1.0-win-x64/
release/windows/StartYourPython-v1.1.0-win-x64.zip
```

如果后续机器网络环境正常，需要继续生成安装包，可额外运行：

```bash
npm run tauri:bundle
```

## 桌面开发

```bash
npm run tauri:dev
```

## Windows 桌面前置环境

在 Windows 上使用 Tauri 打包前，需要先安装：

- Rust toolchain
- Visual Studio Build Tools 的 C++ 构建组件

## 项目结构

```text
content/lessons/          真实课程文件目录（章节文件夹 + .py 课程文件）
src/
  components/workspace/   IDE 风格学习工作区组件
  services/content/       内容提供层
  stores/                 学习状态与进度状态
  utils/                  本地持久化等工具
  views/                  页面入口
src-tauri/                Tauri 桌面壳
tests/                    Vitest 测试
docs/ROADMAP.md           后续版本路线
```

## Release Checklist

1. 运行 `npm run typecheck`
2. 运行 `npm run test`
3. 运行 `npm run build`
4. 运行 `npm run tauri:build`

## 路线图

见 [docs/ROADMAP.md](docs/ROADMAP.md)。

## 许可证

[MIT](LICENSE)
