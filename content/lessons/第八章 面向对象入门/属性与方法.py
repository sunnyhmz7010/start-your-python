# @lesson.id: lesson_oop_attrs
# @lesson.title: 属性与方法
# @lesson.description:
# 为对象添加数据和行为。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 8
# @lesson.chapter_title: 第八章 面向对象入门
# @lesson.chapter_order: 8
# @lesson.order: 2
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 属性
# @step.content:
# 属性是对象保存的数据，比如名字、年龄、颜色。
# 
# 它描述的是“对象有什么”。
# 
# ![Attributes and methods](/course-images/attributes-methods.svg)

# @step.id: s2
# @step.type: text
# @step.title: 方法
# @step.content:
# 方法是对象能做的事，本质上就是写在类里的函数。
# 
# 它描述的是“对象会做什么”。

# @step.id: s3
# @step.type: code
# @step.title: 调用方法
# @step.content:
# 对象.方法名() 的写法可以调用对象行为。
class Dog:
    def bark(self):
        print("wang")

dog = Dog()
dog.bark()
