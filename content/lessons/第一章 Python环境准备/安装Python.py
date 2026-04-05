# @lesson.id: lesson_env_install_python
# @lesson.title: 安装Python
# @lesson.description:
# 学会从官网下载并安装 Python。
# @lesson.difficulty: beginner
# @lesson.estimated_time: 10
# @lesson.chapter: 1
# @lesson.chapter_title: 第一章 Python环境准备
# @lesson.chapter_order: 1
# @lesson.order: 2
# @lesson.prerequisites: 
# @lesson.tags: 

# @step.id: s1
# @step.type: text
# @step.title: 下载地址
# @step.content:
# 推荐从 **Python 官网**下载对应系统的安装包。
# 
# 如果你用的是 Windows，通常选择最新版的 64 位安装器即可；如果是 macOS，则下载对应芯片架构的安装包。
# 
# ![Python install checklist](/course-images/python-install-checklist.svg)

# @step.id: s2
# @step.type: text
# @step.title: 安装注意项
# @step.content:
# Windows 安装时最容易漏掉的一步，是勾选 **Add Python to PATH**。
# 
# 这一步的意义是：让终端能直接识别 `python` 和 `pip` 命令。
# 
# 如果没勾选，安装本身可能成功，但后面在命令行里输入 `python --version` 时会提示找不到命令。

# @step.id: s3
# @step.type: code
# @step.title: 验证安装
# @step.content:
# 安装完成后，打开终端或命令提示符，用下面的命令确认环境是否真的可用。
# 
# 你应该至少看到：
# - `python --version` 能返回 Python 版本
# - `pip --version` 能返回 pip 版本
python --version
pip --version
