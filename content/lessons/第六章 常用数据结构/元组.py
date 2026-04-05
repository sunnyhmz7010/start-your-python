# @lesson.id: lesson_ds_tuple
# @lesson.title: 元组
# @lesson.description:
# 元组是不可变序列。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 6
# @lesson.chapter_title: 第六章 常用数据结构
# @lesson.chapter_order: 6
# @lesson.order: 2
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 元组特点
# @step.content:
# 元组和列表有点像，都是有顺序的序列。
# 
# 最大区别是：元组创建后通常**不再修改**。
# 
# ![Tuple fixed sequence](/course-images/tuple-fixed.svg)

# @step.id: s2
# @step.type: code
# @step.title: 读取元素
# @step.content:
# 元组也能像列表一样，用下标读取元素。
point = (3, 5)
print(point[1])

# @step.id: s3
# @step.type: text
# @step.title: 使用场景
# @step.content:
# 当一组数据结构固定、不希望被随意修改时，元组很合适。
# 
# 例如坐标 `(x, y)`、日期 `(year, month, day)`。
