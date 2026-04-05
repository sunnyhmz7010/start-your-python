# @lesson.id: lesson_file_stdlib
# @lesson.title: 标准库初识
# @lesson.description:
# 认识 Python 自带的常见库。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 7
# @lesson.chapter_title: 第七章 文件与模块
# @lesson.chapter_order: 7
# @lesson.order: 4
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 标准库
# @step.content:
# Python 自带了很多开箱即用的工具集合，这些就叫**标准库**。
# 
# 它们帮你省掉很多重复造轮子的工作。
# 
# ![Standard library toolbox](/course-images/stdlib-toolbox.svg)

# @step.id: s2
# @step.type: code
# @step.title: random 示例
# @step.content:
# `random` 是标准库的一部分，可以生成随机数。
import random
print(random.randint(1, 10))

# @step.id: s3
# @step.type: text
# @step.title: 继续探索
# @step.content:
# 以后你还会接触 `datetime`、`os`、`pathlib`、`math` 等标准库。
# 
# 它们几乎覆盖了文件、时间、路径、数学等常见需求。
