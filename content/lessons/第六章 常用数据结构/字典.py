# @lesson.id: lesson_ds_dict
# @lesson.title: 字典
# @lesson.description:
# 用键值对保存数据。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 6
# @lesson.chapter_title: 第六章 常用数据结构
# @lesson.chapter_order: 6
# @lesson.order: 3
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 键值对
# @step.content:
# 字典通过 `key -> value` 的方式保存数据。
# 
# 当你想用“名字”去找内容，而不是靠位置编号时，字典非常适合。
# 
# ![Dictionary mapping](/course-images/dict-map.svg)

# @step.id: s2
# @step.type: code
# @step.title: 读取数据
# @step.content:
# 通过键读取对应的值。
user = {"name": "Sunny", "city": "Shanghai"}
print(user["name"])

# @step.id: s3
# @step.type: code
# @step.title: 新增键值
# @step.content:
# 字典可以随时增加新字段。
user = {"name": "Sunny"}
user["city"] = "Shanghai"
print(user)
