# @lesson.id: lesson_file_read
# @lesson.title: 读取文件
# @lesson.description:
# 打开并读取文本文件。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 7
# @lesson.chapter_title: 第七章 文件与模块
# @lesson.chapter_order: 7
# @lesson.order: 1
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: open 函数
# @step.content:
# open 用于打开文件。

# @step.id: s2
# @step.type: code
# @step.title: 读取内容
# @step.content:
# read 可以一次读完整个文件。
with open("notes.txt", "r", encoding="utf-8") as f:
    print(f.read())

# @step.id: s3
# @step.type: text
# @step.title: 编码
# @step.content:
# 处理中文文本时通常显式写 utf-8。
