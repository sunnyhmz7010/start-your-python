"""
{
  "id": "lesson_oop_attrs",
  "title": "属性与方法",
  "description": "为对象添加数据和行为。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 8,
  "chapterTitle": "第八章 面向对象入门",
  "chapterOrder": 8,
  "order": 2,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "属性",
      "content": "属性是对象保存的数据。"
    },
    {
      "id": "s2",
      "type": "text",
      "title": "方法",
      "content": "方法是对象能做的事。"
    },
    {
      "id": "s3",
      "type": "code",
      "title": "调用方法",
      "content": "对象.方法名() 可以调用行为。",
      "code": "dog.bark()"
    }
  ]
}
"""

class Dog:
    def bark(self):
        print("wang")
