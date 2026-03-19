# @lesson.id: lesson_func_args_return
# @lesson.title: 函数参数与返回值
# @lesson.description:
# 让函数接收输入并返回结果。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 5
# @lesson.chapter_title: 第五章 循环与函数
# @lesson.chapter_order: 5
# @lesson.order: 4
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 参数
# @step.content:
# 参数让函数更灵活。

# @step.id: s2
# @step.type: code
# @step.title: 返回值
# @step.content:
# return 用来把结果带回调用处。
def add(a, b):
    return a + b

# @step.id: s3
# @step.type: code
# @step.title: 使用结果
# @step.content:
# 可以把返回值保存到变量里。
result = add(1, 2)
