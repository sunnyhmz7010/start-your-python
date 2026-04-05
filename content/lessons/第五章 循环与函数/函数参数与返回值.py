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
# 参数让函数更灵活，因为不同输入可以得到不同结果。
# 
# 你可以把参数理解成“函数工作前拿到的材料”。
# 
# ![Parameters and return](/course-images/params-return.svg)

# @step.id: s2
# @step.type: code
# @step.title: 返回值
# @step.content:
# `return` 用来把计算结果带回调用处。
def add(a, b):
    return a + b

print(add(1, 2))

# @step.id: s3
# @step.type: code
# @step.title: 使用结果
# @step.content:
# 函数的返回值可以先保存到变量里，后面继续使用。
def add(a, b):
    return a + b

result = add(1, 2)
print(result * 10)
