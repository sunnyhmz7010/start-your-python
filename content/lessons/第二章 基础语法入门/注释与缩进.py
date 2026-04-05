# @lesson.id: lesson_syntax_comments_indent
# @lesson.title: 注释与缩进
# @lesson.description:
# 理解 Python 的注释规则和缩进语法。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 2
# @lesson.chapter_title: 第二章 基础语法入门
# @lesson.chapter_order: 2
# @lesson.order: 2
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 注释
# @step.content:
# 以 `#` 开头的内容叫**注释**，不会被 Python 执行。
# 
# 注释的主要用途是：
# - 解释某段代码要做什么
# - 给未来的自己留提示
# - 帮同学或同事更快读懂程序
# 
# ![Syntax structure](/course-images/syntax-structure.svg)

# @step.id: s2
# @step.type: text
# @step.title: 缩进
# @step.content:
# Python 用**缩进**表示代码块，而不是像某些语言那样用花括号。
# 
# 看到一行后面带冒号 `:`，下一层通常就要缩进。
# 同一代码块里的缩进要保持一致，否则程序会报错。

# @step.id: s3
# @step.type: code
# @step.title: 观察结构
# @step.content:
# 观察下面 `if` 语句的结构。
# 
# 重点看两件事：
# - `if True:` 后面有冒号
# - 只有缩进进去的那一行，才属于 `if` 代码块
if True:
    print("inside")
print("outside")
