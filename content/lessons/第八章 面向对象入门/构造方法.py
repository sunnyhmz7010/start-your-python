# @lesson.id: lesson_oop_init
# @lesson.title: 构造方法
# @lesson.description:
# 通过 __init__ 初始化对象。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 8
# @lesson.chapter_title: 第八章 面向对象入门
# @lesson.chapter_order: 8
# @lesson.order: 3
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 初始化
# @step.content:
# `__init__` 会在创建对象时自动执行。
# 
# 它常用来给对象设置初始状态。
# 
# ![Attributes and methods](/course-images/attributes-methods.svg)

# @step.id: s2
# @step.type: code
# @step.title: 保存属性
# @step.content:
# 构造方法里通常会把传入参数保存到 `self` 上。
class Dog:
    def __init__(self, name):
        self.name = name

# @step.id: s3
# @step.type: code
# @step.title: 实例化
# @step.content:
# 创建对象时，把需要的初始参数传进去。
class Dog:
    def __init__(self, name):
        self.name = name

dog = Dog("Milo")
print(dog.name)
