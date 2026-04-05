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
# `while` 的意思是：**只要条件为真，就一直重复执行**。
# 
# 它适合那种“还没满足结束条件，就继续做”的场景。
# 
# ![Looping road](/course-images/loops-road.svg)

# @step.id: s2
# @step.type: code
# @step.title: 计数器
# @step.content:
# `while` 常常配合计数器变量一起使用，控制循环次数。
count = 0
while count < 3:
    print(count)
    count += 1

# @step.id: s3
# @step.type: text
# @step.title: 避免死循环
# @step.content:
# 写 `while` 时一定要确认：条件最终会变成假。
# 
# 如果条件一直成立，程序就会陷入死循环。
