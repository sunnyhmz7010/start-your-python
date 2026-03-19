"""
{
  "id": "lesson_oop_inherit",
  "title": "简单继承",
  "description": "理解子类复用父类能力。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 8,
  "chapterTitle": "第八章 面向对象入门",
  "chapterOrder": 8,
  "order": 4,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "继承概念",
      "content": "子类可以继承父类已有的属性和方法。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "写法",
      "content": "在类名括号里写父类名。",
      "code": "class Dog(Animal):\n    pass"
    },
    {
      "id": "s3",
      "type": "text",
      "title": "适用场景",
      "content": "当多个类有共同特征时可以考虑继承。"
    }
  ]
}
"""

class Animal:
    pass

class Dog(Animal):
    pass
