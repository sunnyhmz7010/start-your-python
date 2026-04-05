# @lesson.id: lesson_op_logic
# @lesson.title: 逻辑运算符
# @lesson.description:
# 理解 and、or、not。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 4
# @lesson.chapter_title: 第四章 运算与判断
# @lesson.chapter_order: 4
# @lesson.order: 3
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: and
# @step.content:
# `and` 表示“并且”，两个条件都为真时结果才为真。
# 
# 它适合描述“必须同时满足”的场景。
# 
# ![Logical operators](/course-images/logical-gates.svg)

# @step.id: s2
# @step.type: text
# @step.title: or
# @step.content:
# `or` 表示“或者”，只要有一个条件为真，结果就为真。
# 
# 它适合描述“满足其中之一即可”的场景。

# @step.id: s3
# @step.type: code
# @step.title: not
# @step.content:
# `not` 会把真假反过来。
is_open = False
is_closed = not is_open
print(is_closed)
