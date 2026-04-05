# @lesson.id: lesson_env_setup
# @lesson.title: 配置开发环境
# @lesson.description:
# 了解解释器、终端和 IDE 的基本关系。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 1
# @lesson.chapter_title: 第一章 Python环境准备
# @lesson.chapter_order: 1
# @lesson.order: 3
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 认识解释器
# @step.content:
# **解释器**负责把你写的 Python 代码读进去，再执行出来。
# 
# 对初学者来说，可以先把它理解成“真正干活的那个程序”。
# 
# 你写下 `print("hello")` 之后，解释器会负责把结果显示到屏幕上。
# 
# ![Terminal modes](/course-images/terminal-modes.svg)

# @step.id: s2
# @step.type: text
# @step.title: 认识编辑器和 IDE
# @step.content:
# 编辑器是“写代码的地方”，IDE 是“把写代码、项目管理、终端、运行按钮整合到一起的工作台”。
# 
# 你可以把关系先记成：
# - **解释器**：执行代码
# - **终端**：输入命令
# - **编辑器 / IDE**：编写和管理代码
# 
# 学 Python 早期，不需要追求复杂工具，先保证“能写、能跑、能看到结果”。

# @step.id: s3
# @step.type: code
# @step.title: 第一次打开终端
# @step.content:
# 终端里输入 `python` 后，会进入交互模式。
# 
# 交互模式适合做很短的小实验，比如立即测试一行语句是否能运行。
# 输入完 `print("ready")` 后，按回车就能马上看到结果。
print("ready")
