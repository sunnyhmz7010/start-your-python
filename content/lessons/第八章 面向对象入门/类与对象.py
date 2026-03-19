"""
{
  "id": "lesson_oop_class",
  "title": "类与对象",
  "description": "理解类和对象的关系。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 8,
  "chapterTitle": "第八章 面向对象入门",
  "chapterOrder": 8,
  "order": 1,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "类",
      "content": "类像模板，对象像按模板创建出来的实例。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "创建对象",
      "content": "通过类名后加括号来创建对象。",
      "code": "dog = Dog()"
    },
    {
      "id": "s3",
      "type": "text",
      "title": "思维转变",
      "content": "面向对象是用“对象”来组织程序。"
    }
  ]
}
"""

class Dog:
    pass

dog = Dog()
