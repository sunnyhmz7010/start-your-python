# @lesson.id: lesson_syntax_input_output
# @lesson.title: 输入与输出
# @lesson.description:
# 学习 print 和 input 的基本用法。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 2
# @lesson.chapter_title: 第二章 基础语法入门
# @lesson.chapter_order: 2
# @lesson.order: 3
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 输出
# @step.content:
# `print()` 负责把结果显示出来。
# 
# 你可以输出：
# - 固定文本
# - 变量里的值
# - 多个内容拼在一起的结果

# @step.id: s2
# @step.type: text
# @step.title: 输入
# @step.content:
# `input()` 会暂停程序，等待用户在键盘输入内容。
# 
# 它拿到的结果默认是**文本**，通常会先放进一个变量里，后面再继续处理。
# 
# ![Input output cycle](/course-images/input-output-cycle.svg)

# @step.id: s3
# @step.type: code
# @step.title: 组合使用
# @step.content:
# 这是最常见的新手练习：先问一个问题，再把用户输入的答案输出出来。
# 
# 运行时可以试着输入自己的名字，观察变量 `name` 是怎样接住输入结果的。
name = input("请输入名字: ")
print("你好", name)
