"""
{
  "id": "lesson_file_stdlib",
  "title": "标准库初识",
  "description": "认识 Python 自带的常见库。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 7,
  "chapterTitle": "第七章 文件与模块",
  "chapterOrder": 7,
  "order": 4,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "标准库",
      "content": "Python 自带了很多开箱即用的功能。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "random 示例",
      "content": "random 可以生成随机数。",
      "code": "import random\nprint(random.randint(1, 10))"
    },
    {
      "id": "s3",
      "type": "text",
      "title": "继续探索",
      "content": "以后你会接触 datetime、os、pathlib 等标准库。"
    }
  ]
}
"""

import random
print(random.randint(1, 10))
