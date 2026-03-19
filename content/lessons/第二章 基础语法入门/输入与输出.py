"""
{
  "id": "lesson_syntax_input_output",
  "title": "输入与输出",
  "description": "学习 print 和 input 的基本用法。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 2,
  "chapterTitle": "第二章 基础语法入门",
  "chapterOrder": 2,
  "order": 3,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "输出",
      "content": "print 用来输出文本和变量。"
    },
    {
      "id": "s2",
      "type": "text",
      "title": "输入",
      "content": "input 会读取用户在键盘输入的内容。"
    },
    {
      "id": "s3",
      "type": "code",
      "title": "组合使用",
      "content": "把输入结果再输出出来。",
      "code": "name = input(\"请输入名字: \")\nprint(\"你好\", name)"
    }
  ]
}
"""

# 输入与输出.py

name = input("请输入名字: ")
print("你好", name)
