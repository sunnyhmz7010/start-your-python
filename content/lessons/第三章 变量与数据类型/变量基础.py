# @lesson.id: lesson_var_basic
# @lesson.title: 变量基础
# @lesson.description:
# 理解变量的作用。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 3
# @lesson.chapter_title: 第三章 变量与数据类型
# @lesson.chapter_order: 3
# @lesson.order: 1
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 变量是什么
# @step.content:
# 可以先把变量想成一个**带标签的盒子**。
# 
# 盒子外面的标签是变量名，盒子里面装的是值。
# 
# ![Variable as a labeled box](/course-images/variables-box.svg)

# @step.id: s2
# @step.type: code
# @step.title: 赋值
# @step.content:
# `=` 在这里不是数学里的“相等”，而是“把右边的值交给左边的变量名保存”。
# 
# 读这行代码时，可以直接念成：把字符串 `"Python"` 赋给变量 `name`。
name = "Python"

# @step.id: s3
# @step.type: text
# @step.title: 命名规则
# @step.content:
# 变量名尽量做到**见名知意**。
# 
# 初学阶段先记住这几条就够了：
# - 用字母、数字、下划线组成
# - 不要以数字开头
# - 不要和 `if`、`for`、`class` 这样的关键字重名
# - 名字尽量表达用途，例如 `user_name`、`total_score`
