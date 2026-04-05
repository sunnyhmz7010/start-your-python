# @lesson.id: lesson_var_bool
# @lesson.title: 布尔类型
# @lesson.description:
# 认识 True 和 False。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 3
# @lesson.chapter_title: 第三章 变量与数据类型
# @lesson.chapter_order: 3
# @lesson.order: 4
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 布尔值
# @step.content:
# 布尔值只有两种：`True` 和 `False`。
# 
# 你可以把它们理解成“是 / 否”、“开 / 关”、“满足 / 不满足”。
# 
# ![Booleans as a switch](/course-images/booleans-switch.svg)

# @step.id: s2
# @step.type: text
# @step.title: 使用场景
# @step.content:
# 布尔值最常见的用途就是条件判断。
# 
# 比如：
# - 用户是否登录
# - 分数是否及格
# - 文件是否存在

# @step.id: s3
# @step.type: code
# @step.title: 简单示例
# @step.content:
# 把比较结果保存进变量后，后面就可以继续拿这个结果做判断。
age = 18
is_adult = age >= 18
print(is_adult)
