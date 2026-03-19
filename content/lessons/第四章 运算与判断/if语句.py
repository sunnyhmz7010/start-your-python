"""
{
  "id": "lesson_op_if",
  "title": "if语句",
  "description": "使用条件控制程序流程。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 4,
  "chapterTitle": "第四章 运算与判断",
  "chapterOrder": 4,
  "order": 4,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "基本结构",
      "content": "if 后面写条件，下一行缩进写要执行的代码。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "加入 else",
      "content": "条件不满足时可以执行另一段逻辑。",
      "code": "if score >= 60:\n    print(\"及格\")\nelse:\n    print(\"未及格\")"
    },
    {
      "id": "s3",
      "type": "text",
      "title": "多分支",
      "content": "更复杂时可以继续加 elif。"
    }
  ]
}
"""

score = 90
if score >= 60:
    print("及格")
