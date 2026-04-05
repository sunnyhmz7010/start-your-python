# @lesson.id: lesson_ds_list
# @lesson.title: 列表
# @lesson.description:
# 列表是最常见的可变序列。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 6
# @lesson.chapter_title: 第六章 常用数据结构
# @lesson.chapter_order: 6
# @lesson.order: 1
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 列表特点
# @step.content:
# 列表有顺序、可重复、还能增删改，是最常见的数据结构之一。
# 
# 当你想保存“一串相关数据”时，首先就可以考虑列表。
# 
# ![List sequence](/course-images/list-sequence.svg)

# @step.id: s2
# @step.type: code
# @step.title: 访问元素
# @step.content:
# 列表可以用下标访问元素，下标从 `0` 开始。
fruits = ["apple", "banana", "orange"]
print(fruits[0])

# @step.id: s3
# @step.type: code
# @step.title: 添加元素
# @step.content:
# `append()` 可以在列表末尾添加新元素。
fruits = ["apple", "banana"]
fruits.append("orange")
print(fruits)
