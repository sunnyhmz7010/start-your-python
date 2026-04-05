# @lesson.id: lesson_oop_class
# @lesson.title: 类与对象
# @lesson.description:
# 理解类和对象的关系。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 8
# @lesson.chapter_title: 第八章 面向对象入门
# @lesson.chapter_order: 8
# @lesson.order: 1
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 类
# @step.content:
# 类像模板，对象像按模板创建出来的实例。
# 
# 当你发现很多东西“结构差不多、行为也差不多”时，就可以考虑用类来描述。
# 
# ![Class and object](/course-images/oop-factory.svg)

# @step.id: s2
# @step.type: code
# @step.title: 创建对象
# @step.content:
# 先定义类，再通过类名加括号创建对象。
class Dog:
    pass

dog = Dog()
print(type(dog))

# @step.id: s3
# @step.type: text
# @step.title: 思维转变
# @step.content:
# 面向对象的思路，是把程序拆成一个个“有状态、有行为”的对象。
