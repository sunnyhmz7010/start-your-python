"""
{
  "id": "lesson_func_define",
  "title": "定义函数",
  "description": "把重复逻辑封装成函数。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 5,
  "chapterTitle": "第五章 循环与函数",
  "chapterOrder": 5,
  "order": 3,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "为什么用函数",
      "content": "函数让代码更清晰，也更容易复用。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "定义函数",
      "content": "使用 def 关键字定义函数。",
      "code": "def say_hello():\n    print(\"hello\")"
    },
    {
      "id": "s3",
      "type": "code",
      "title": "调用函数",
      "content": "定义后要调用函数才会执行。",
      "code": "say_hello()"
    }
  ]
}
"""

def say_hello():
    print("hello")
