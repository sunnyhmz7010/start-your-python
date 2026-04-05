# @lesson.id: lesson_ds_set
# @lesson.title: 集合
# @lesson.description:
# 集合适合去重。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 6
# @lesson.chapter_title: 第六章 常用数据结构
# @lesson.chapter_order: 6
# @lesson.order: 4
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 集合特点
# @step.content:
# 集合中的元素不重复，也不强调顺序。
# 
# 它特别适合做“去重”和“快速判断某个值是否存在”。
# 
# ![Set unique values](/course-images/set-unique.svg)

# @step.id: s2
# @step.type: code
# @step.title: 自动去重
# @step.content:
# 重复值放入集合后，只会保留一份。
numbers = {1, 1, 2, 3, 3}
print(numbers)

# @step.id: s3
# @step.type: text
# @step.title: 常见场景
# @step.content:
# 如果你有一串名字、标签或编号，想去掉重复项，集合会很方便。
