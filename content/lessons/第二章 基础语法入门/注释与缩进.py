"""
{
  "id": "lesson_syntax_comments_indent",
  "title": "注释与缩进",
  "description": "理解 Python 的注释规则和缩进语法。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 2,
  "chapterTitle": "第二章 基础语法入门",
  "chapterOrder": 2,
  "order": 2,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "注释",
      "content": "# 开头的内容不会被执行，用来解释代码。"
    },
    {
      "id": "s2",
      "type": "text",
      "title": "缩进",
      "content": "Python 用缩进表示代码块，不是用花括号。"
    },
    {
      "id": "s3",
      "type": "code",
      "title": "观察结构",
      "content": "比较 if 外部和内部代码的对齐方式。",
      "code": "if True:\n    print(\"inside\")\nprint(\"outside\")"
    }
  ]
}
"""

# 注释与缩进.py

# 这是注释
if True:
    print("indent matters")
