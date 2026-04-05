# @lesson.id: lesson_var_convert
# @lesson.title: 类型转换
# @lesson.description:
# 在字符串和数字之间转换。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 3
# @lesson.chapter_title: 第三章 变量与数据类型
# @lesson.chapter_order: 3
# @lesson.order: 5
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 为什么要转换
# @step.content:
# 用户输入通常默认是字符串，但程序有时需要数字参与计算。
# 
# 这时就需要做**类型转换**。
# 
# ![Type conversion bridge](/course-images/type-conversion-bridge.svg)

# @step.id: s2
# @step.type: code
# @step.title: 转整数
# @step.content:
# 用 `int()` 可以把看起来像整数的字符串转换成真正的整数。
# 
# 转换成功后，这个值才能参与加减乘除。
age = int("18")
print(age + 2)

# @step.id: s3
# @step.type: code
# @step.title: 转字符串
# @step.content:
# 用 `str()` 可以把数字转换成字符串，方便和其他文本拼接。
message = str(100)
print("分数是 " + message)
