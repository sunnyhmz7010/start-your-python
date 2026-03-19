"""
{
  "id": "lesson_loop_for",
  "title": "for循环",
  "description": "遍历一组数据。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 5,
  "chapterTitle": "第五章 循环与函数",
  "chapterOrder": 5,
  "order": 2,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "遍历",
      "content": "for 适合按顺序访问集合里的元素。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "range",
      "content": "range 常用来生成一串数字。",
      "code": "for i in range(3):\n    print(i)"
    },
    {
      "id": "s3",
      "type": "text",
      "title": "和 while 的区别",
      "content": "for 更适合“遍历”，while 更适合“条件控制”。"
    }
  ]
}
"""

for item in ["a", "b", "c"]:
    print(item)
