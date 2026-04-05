# @lesson.id: lesson_file_write
# @lesson.title: 写入文件
# @lesson.description:
# 向文件写入文本内容。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 7
# @lesson.chapter_title: 第七章 文件与模块
# @lesson.chapter_order: 7
# @lesson.order: 2
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 写模式
# @step.content:
# `"w"` 表示写入模式。
# 
# 打开文件后，程序可以把新内容写进去。
# 
# ![Files and folders](/course-images/files-folders.svg)

# @step.id: s2
# @step.type: code
# @step.title: 写入文本
# @step.content:
# 使用 `write()` 可以把文本保存到文件中。
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("hello")

# @step.id: s3
# @step.type: text
# @step.title: 覆盖风险
# @step.content:
# 写入模式会覆盖原文件内容。
# 
# 如果你想保留旧内容继续追加，后面会学到追加模式 `"a"`。
