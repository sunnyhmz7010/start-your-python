"""
{
  "id": "lesson_oop_init",
  "title": "构造方法",
  "description": "通过 __init__ 初始化对象。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 8,
  "chapterTitle": "第八章 面向对象入门",
  "chapterOrder": 8,
  "order": 3,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "初始化",
      "content": "__init__ 会在创建对象时自动执行。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "保存属性",
      "content": "把传入参数保存到 self 上。",
      "code": "self.name = name"
    },
    {
      "id": "s3",
      "type": "text",
      "title": "实例化",
      "content": "创建对象时把参数传进去。"
    }
  ]
}
"""

class Dog:
    def __init__(self, name):
        self.name = name
