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
- Neutralinojs
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
npm run neu:build
```

## 项目结构

```text
src/
  components/workspace/   IDE 风格学习工作区组件
  data/                   内置课程内容
  services/content/       内容提供层
  stores/                 学习状态与进度状态
  utils/                  本地持久化等工具
  views/                  页面入口
tests/                    Vitest 测试
docs/ROADMAP.md           后续版本路线
```

## Release Checklist

1. 运行 `npm run typecheck`
2. 运行 `npm run test`
3. 运行 `npm run build`
4. 运行 `npm run neu:build`

## 路线图

见 [docs/ROADMAP.md](docs/ROADMAP.md)。

## 许可证

[MIT](LICENSE)
