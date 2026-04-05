# @lesson.id: lesson_oop_inherit
# @lesson.title: 简单继承
# @lesson.description:
# 理解子类复用父类能力。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 8
# @lesson.chapter_title: 第八章 面向对象入门
# @lesson.chapter_order: 8
# @lesson.order: 4
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 继承概念
# @step.content:
# 子类可以继承父类已有的属性和方法。
# 
# 这能减少重复代码，让“相似对象”共享基础能力。
# 
# ![Inheritance branches](/course-images/inheritance-branches.svg)

# @step.id: s2
# @step.type: code
# @step.title: 写法
# @step.content:
# 在类名括号里写父类名，就表示子类继承父类。
class Animal:
    def eat(self):
        print("eat")

class Dog(Animal):
    pass

# @step.id: s3
# @step.type: code
# @step.title: 适用场景
# @step.content:
# 当多个类有共同特征时，可以把共性放到父类里。
class Animal:
    def eat(self):
        print("eat")

class Dog(Animal):
    pass

dog = Dog()
dog.eat()
