"""
{
  "id": "lesson_loop_while",
  "title": "while循环",
  "description": "条件满足时重复执行。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 5,
  "chapterTitle": "第五章 循环与函数",
  "chapterOrder": 5,
  "order": 1,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "while 条件",
      "content": "只要条件为真，循环就会继续。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "计数器",
      "content": "通常用变量控制循环次数。",
      "code": "count = 0\nwhile count < 3:\n    count += 1"
    },
    {
      "id": "s3",
      "type": "text",
      "title": "避免死循环",
      "content": "要确保条件最终会变成假。"
    }
  ]
}
"""

count = 0
while count < 3:
    print(count)
    count += 1
