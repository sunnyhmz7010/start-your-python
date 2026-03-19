"""
{
  "id": "lesson_file_write",
  "title": "写入文件",
  "description": "向文件写入文本内容。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 7,
  "chapterTitle": "第七章 文件与模块",
  "chapterOrder": 7,
  "order": 2,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "写模式",
      "content": "\"w\" 表示写入模式。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "写入文本",
      "content": "使用 write 保存内容。",
      "code": "f.write(\"hello\")"
    },
    {
      "id": "s3",
      "type": "text",
      "title": "覆盖风险",
      "content": "写模式会覆盖原文件内容。"
    }
  ]
}
"""

with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("hello")
