# @lesson.id: lesson_env_what_is_python
# @lesson.title: Python是什么
# @lesson.description:
# 理解 Python 的定位、特点和常见应用场景。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 1
# @lesson.chapter_title: 第一章 Python环境准备
# @lesson.chapter_order: 1
# @lesson.order: 1
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 认识 Python
# @step.content:
# Python 是一门**高级、解释型、通用**的编程语言。
# 
# 它常被推荐给初学者，原因通常有三点：
# - 语法接近自然语言，第一眼不容易被符号吓住
# - 能很快写出能运行的小程序，反馈快
# - 学会基础后，可以继续往自动化、数据分析、Web、AI 等方向走
# 
# ![Python ecosystem](/course-images/python-ecosystem.svg)

# @step.id: s2
# @step.type: text
# @step.title: 应用场景
# @step.content:
# 在真实项目里，Python 经常出现在这些场景：
# - **Web 开发**：快速搭建网站和接口
# - **自动化脚本**：批量处理文件、整理数据、自动执行重复任务
# - **数据分析**：读取表格、做清洗、画图
# - **人工智能**：训练模型、调用现成 AI 工具链
# 
# 你现在学到的 `print`、变量、循环，看起来简单，但后面这些方向都要依赖这些基础。

# @step.id: s3
# @step.type: code
# @step.title: 读懂示例
# @step.content:
# 先看一个最小示例，感受 Python 代码的阅读方式。
# 
# 这段程序做了两件事：
# 1. 把字符串 `"Python"` 放进变量 `language`
# 2. 用 `print()` 把变量里的内容显示出来
# @step.hint:
# 先不用记住所有术语，重点看“变量存值”和“print 输出”这两个动作。
language = "Python"
print(language)
