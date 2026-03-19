"""
{
  "id": "lesson_var_convert",
  "title": "类型转换",
  "description": "在字符串和数字之间转换。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 3,
  "chapterTitle": "第三章 变量与数据类型",
  "chapterOrder": 3,
  "order": 5,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "为什么要转换",
      "content": "用户输入通常是字符串。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "转整数",
      "content": "用 int 把字符串变成整数。",
      "code": "age = int(\"18\")"
    },
    {
      "id": "s3",
      "type": "code",
      "title": "转字符串",
      "content": "用 str 把数字变成字符串。",
      "code": "message = str(100)"
    }
  ]
}
"""

age_text = "18"
age = int(age_text)
