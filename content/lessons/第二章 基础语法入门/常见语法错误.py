# @lesson.id: lesson_syntax_common_errors
# @lesson.title: 常见语法错误
# @lesson.description:
# 认识初学者最常遇到的报错类型。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 2
# @lesson.chapter_title: 第二章 基础语法入门
# @lesson.chapter_order: 2
# @lesson.order: 4
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 括号和引号
# @step.content:
# 括号、引号不配对，是最常见的新手错误之一。
# 
# 例如少写一个引号、少写一个右括号，解释器就无法判断代码边界。
# 
# ![Syntax errors](/course-images/syntax-errors.svg)

# @step.id: s2
# @step.type: text
# @step.title: 缩进错误
# @step.content:
# 缩进不一致时，Python 不知道哪些代码属于同一个代码块。
# 
# 这类报错不一定复杂，但特别常见，所以要养成“冒号后缩进、同层对齐”的习惯。

# @step.id: s3
# @step.type: text
# @step.title: 读报错信息
# @step.content:
# 报错信息不需要一次全看懂，先抓最关键的两处：
# - **最后一行**：通常会告诉你错误类型
# - **行号位置**：帮助你回到对应代码
# 
# 例如 `SyntaxError: unterminated string literal` 的意思通常是“字符串没有正常结束”。
