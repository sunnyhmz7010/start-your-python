# @lesson.id: lesson_op_if
# @lesson.title: if语句
# @lesson.description:
# 使用条件控制程序流程。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 4
# @lesson.chapter_title: 第四章 运算与判断
# @lesson.chapter_order: 4
# @lesson.order: 4
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 基本结构
# @step.content:
# `if` 后面写条件，下一行缩进写要执行的代码。
# 
# 你可以把它理解成：“如果条件成立，就执行下面这段代码。”
# 
# ![If flow](/course-images/if-flow.svg)

# @step.id: s2
# @step.type: code
# @step.title: 加入 else
# @step.content:
# 条件不满足时，可以让程序执行另一段逻辑。
score = 75
if score >= 60:
    print("及格")
else:
    print("未及格")

# @step.id: s3
# @step.type: text
# @step.title: 多分支
# @step.content:
# 更复杂的情况可以继续加 `elif`。
# 
# 例如分数分成优秀、良好、及格、不及格，就适合用多分支来表达。
