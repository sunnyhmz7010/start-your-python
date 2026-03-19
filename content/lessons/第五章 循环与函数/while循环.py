# @lesson.id: lesson_loop_while
# @lesson.title: while循环
# @lesson.description:
# 条件满足时重复执行。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 5
# @lesson.chapter_title: 第五章 循环与函数
# @lesson.chapter_order: 5
# @lesson.order: 1
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: while 条件
# @step.content:
# 只要条件为真，循环就会继续。

# @step.id: s2
# @step.type: code
# @step.title: 计数器
# @step.content:
# 通常用变量控制循环次数。
count = 0
while count < 3:
    count += 1

# @step.id: s3
# @step.type: text
# @step.title: 避免死循环
# @step.content:
# 要确保条件最终会变成假。
