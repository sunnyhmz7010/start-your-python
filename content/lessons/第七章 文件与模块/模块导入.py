# @lesson.id: lesson_file_import
# @lesson.title: 模块导入
# @lesson.description:
# 使用 import 组织代码。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 7
# @lesson.chapter_title: 第七章 文件与模块
# @lesson.chapter_order: 7
# @lesson.order: 3
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 模块是什么
# @step.content:
# 模块可以理解成“别人已经写好的 Python 文件”。
# 
# 你导入模块后，就能直接使用里面的函数、变量和工具。
# 
# ![Import network](/course-images/import-network.svg)

# @step.id: s2
# @step.type: code
# @step.title: 使用 import
# @step.content:
# 导入后，就能通过 `模块名.功能名` 的方式调用模块里的能力。
import math
print(math.sqrt(9))

# @step.id: s3
# @step.type: text
# @step.title: 自己的模块
# @step.content:
# 以后你也可以把自己的代码拆到多个 `.py` 文件里，让项目结构更清晰。
