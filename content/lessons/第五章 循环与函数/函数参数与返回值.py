"""
{
  "id": "lesson_func_args_return",
  "title": "函数参数与返回值",
  "description": "让函数接收输入并返回结果。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 5,
  "chapterTitle": "第五章 循环与函数",
  "chapterOrder": 5,
  "order": 4,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "参数",
      "content": "参数让函数更灵活。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "返回值",
      "content": "return 用来把结果带回调用处。",
      "code": "def add(a, b):\n    return a + b"
    },
    {
      "id": "s3",
      "type": "code",
      "title": "使用结果",
      "content": "可以把返回值保存到变量里。",
      "code": "result = add(1, 2)"
    }
  ]
}
"""

def add(a, b):
    return a + b
