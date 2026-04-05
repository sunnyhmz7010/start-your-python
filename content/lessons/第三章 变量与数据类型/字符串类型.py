# @lesson.id: lesson_var_string
# @lesson.title: 字符串类型
# @lesson.description:
# 学习字符串的基本概念。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 3
# @lesson.chapter_title: 第三章 变量与数据类型
# @lesson.chapter_order: 3
# @lesson.order: 3
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 字符串定义
# @step.content:
# 字符串用于表示文本，也就是程序里的文字内容。
# 
# 常见写法是用单引号或双引号包起来，例如 `"hello"`、`'Python'`。
# 
# ![Strings as pieces of text](/course-images/strings-pieces.svg)

# @step.id: s2
# @step.type: code
# @step.title: 拼接
# @step.content:
# 字符串之间可以用 `+` 拼接成新的文本。
# 
# 拼接时要自己决定是否加入空格，否则两个单词会直接连在一起。
first = "Hello"
second = "Python"
print(first + " " + second)

# @step.id: s3
# @step.type: text
# @step.title: 长度
# @step.content:
# `len()` 可以计算字符串长度，也就是一共有多少个字符。
# 
# 例如 `len("Python")` 的结果是 `6`。
