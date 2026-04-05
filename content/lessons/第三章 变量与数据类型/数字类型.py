# @lesson.id: lesson_var_number
# @lesson.title: 数字类型
# @lesson.description:
# 认识整数和浮点数。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 3
# @lesson.chapter_title: 第三章 变量与数据类型
# @lesson.chapter_order: 3
# @lesson.order: 2
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 整数
# @step.content:
# 整数 `int` 没有小数部分，例如 `0`、`7`、`100`、`-3`。
# 
# 它常用来表示数量、编号、年龄、计数器等“完整个数”的数据。
# 
# ![Number types](/course-images/numbers-types.svg)

# @step.id: s2
# @step.type: text
# @step.title: 浮点数
# @step.content:
# 浮点数 `float` 带小数部分，例如 `3.14`、`0.5`、`-2.75`。
# 
# 当你需要表示平均分、价格、温度这类非整数数值时，通常会用浮点数。

# @step.id: s3
# @step.type: code
# @step.title: 查看类型
# @step.content:
# 可以用 `type()` 查看变量当前的数据类型。
# 
# 注意输出结果里会看到 `<class 'int'>` 这样的形式，它表示这个值是整数类型。
count = 10
print(type(count))
