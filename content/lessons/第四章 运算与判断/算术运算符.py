# @lesson.id: lesson_op_math
# @lesson.title: 算术运算符
# @lesson.description:
# 学习加减乘除等运算。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 4
# @lesson.chapter_title: 第四章 运算与判断
# @lesson.chapter_order: 4
# @lesson.order: 1
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 加减乘除
# @step.content:
# Python 里最常见的算术运算包括加法、减法、乘法和除法。
# 
# 这些运算和数学里的直觉基本一致，只是写成代码时要用符号表达。
# 
# ![Arithmetic operators](/course-images/arithmetic-board.svg)

# @step.id: s2
# @step.type: code
# @step.title: 整除和取余
# @step.content:
# 除了普通除法 `/`，还有两个特别常见的运算：
# - `//`：整除，只保留整数部分
# - `%`：取余，得到余数
print(7 // 3)
print(7 % 3)

# @step.id: s3
# @step.type: code
# @step.title: 组合计算
# @step.content:
# 表达式可以组合起来计算，括号会改变运算顺序。
total = (2 + 3) * 4
print(total)
