# @lesson.id: lesson_func_define
# @lesson.title: 定义函数
# @lesson.description:
# 把重复逻辑封装成函数。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 5
# @lesson.chapter_title: 第五章 循环与函数
# @lesson.chapter_order: 5
# @lesson.order: 3
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 为什么用函数
# @step.content:
# 函数可以把重复逻辑收起来，写一次，后面反复使用。
# 
# 它能让代码更清晰，也更容易维护。
# 
# ![Function blueprint](/course-images/function-blueprint.svg)

# @step.id: s2
# @step.type: code
# @step.title: 定义函数
# @step.content:
# 使用 `def` 关键字定义函数，函数体需要缩进。
def say_hello():
    print("hello")

# @step.id: s3
# @step.type: code
# @step.title: 调用函数
# @step.content:
# 函数定义好之后，要调用它才会真正执行。
def say_hello():
    print("hello")

say_hello()
