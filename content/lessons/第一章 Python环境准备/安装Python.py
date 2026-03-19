"""
{
  "id": "lesson_env_install_python",
  "title": "安装Python",
  "description": "学会从官网下载并安装 Python。",
  "difficulty": "beginner",
  "estimatedTime": 10,
  "chapter": 1,
  "chapterTitle": "第一章 Python环境准备",
  "chapterOrder": 1,
  "order": 2,
  "prerequisites": [],
  "tags": [],
  "steps": [
    {
      "id": "s1",
      "type": "text",
      "title": "下载地址",
      "content": "访问 python.org，选择适合系统的安装包。"
    },
    {
      "id": "s2",
      "type": "text",
      "title": "安装注意项",
      "content": "Windows 用户安装时要勾选 Add Python to PATH。"
    },
    {
      "id": "s3",
      "type": "code",
      "title": "验证安装",
      "content": "安装完成后，在终端中输入版本命令。",
      "code": "python --version\npip --version"
    }
  ]
}
"""

# 安装Python.py

def install_python():
    download_from_official_site()
    run_installer()
    verify_version()
