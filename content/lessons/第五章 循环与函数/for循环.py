# @lesson.id: lesson_loop_for
# @lesson.title: for循环
# @lesson.description:
# 遍历一组数据。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 5
# @lesson.chapter_title: 第五章 循环与函数
# @lesson.chapter_order: 5
# @lesson.order: 2
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 遍历
# @step.content:
# `for` 更适合按顺序访问一组数据里的每个元素。
# 
# 当你已经知道“要遍历谁”时，`for` 通常比 `while` 更自然。
# 
# ![Looping road](/course-images/loops-road.svg)

# @step.id: s2
# @step.type: code
# @step.title: range
# @step.content:
# `range()` 常用来生成一串连续数字，适合做固定次数循环。
for i in range(3):
    print(i)

# @step.id: s3
# @step.type: text
# @step.title: 和 while 的区别
# @step.content:
# `for` 更适合“遍历”，`while` 更适合“条件控制”。
# 
# 看到列表、字符串、`range()` 这类可遍历对象时，优先想到 `for`。
