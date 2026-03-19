"""
{
  "id": "lesson_file_read",
  "title": "读取文件",
  "description": "打开并读取文本文件。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 7,
  "chapterTitle": "第七章 文件与模块",
  "chapterOrder": 7,
  "order": 1,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "open 函数",
      "content": "open 用于打开文件。"
    },
    {
      "id": "s2",
      "type": "code",
      "title": "读取内容",
      "content": "read 可以一次读完整个文件。",
      "code": "with open(\"notes.txt\", \"r\", encoding=\"utf-8\") as f:\n    print(f.read())"
    },
    {
      "id": "s3",
      "type": "text",
      "title": "编码",
      "content": "处理中文文本时通常显式写 utf-8。"
    }
  ]
}
"""

with open("notes.txt", "r", encoding="utf-8") as f:
    content = f.read()
