"""
{
  "id": "lesson_env_setup",
  "title": "配置开发环境",
  "description": "了解解释器、终端和 IDE 的基本关系。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 1,
  "chapterTitle": "第一章 Python环境准备",
  "chapterOrder": 1,
  "order": 3,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "认识解释器",
      "content": "解释器负责执行 Python 代码。"
    },
    {
      "id": "s2",
      "type": "text",
      "title": "认识编辑器和 IDE",
      "content": "编辑器用于写代码，IDE 会把项目、终端和运行功能集成起来。"
    },
    {
      "id": "s3",
      "type": "code",
      "title": "第一次打开终端",
      "content": "尝试在终端里输入 python 进入交互模式。",
      "code": "python\nprint(\"ready\")"
    }
  ]
}
"""

# 配置开发环境.py

def setup():
    choose_editor("PyCharm")
    open_terminal()
    run_python()
