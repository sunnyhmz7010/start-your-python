import type { Lesson } from '@/types/lesson'

export const lesson_1_1: Lesson = {
  id: 'lesson_1_1',
  title: 'Python简介与安装',
  description: '了解Python并学会安装Python环境',
  difficulty: 'beginner',
  estimatedTime: 15,
  chapter: 1,
  order: 1,
  pseudoCode: `
# Python简介与安装
# 难度: 入门
# 预计时间: 15分钟

def introduction_to_python():
    """了解Python是什么，为什么学习Python"""
    
    # @step: 什么是Python
    # @type: text
    learn_what_is_python()
    
    # @step: Python的应用领域
    # @type: text
    explore_python_applications()
    
    print("Python是一门优秀的编程语言！")

def install_python():
    """学习如何在不同操作系统上安装Python"""
    
    # @step: 下载Python
    # @type: text
    download_python_installer()
    
    # @step: 安装配置
    # @type: text
    run_installation()
    
    # @step: 验证安装
    # @type: code
    # @code: python --version
    verify_installation()
    
    print("Python环境安装完成！")

def configure_environment():
    """配置Python开发环境"""
    
    # @step: 环境变量配置
    # @type: text
    setup_path()
    
    # @step: pip包管理器
    # @type: text
    learn_pip()
    
    print("环境配置完成，可以开始编程了！")

if __name__ == "__main__":
    introduction_to_python()
    install_python()
    configure_environment()
`,
  steps: [
    {
      id: 'step_1_1_1',
      type: 'text',
      title: '什么是Python',
      content: `Python是一门高级、解释型、通用的编程语言。由Guido van Rossum于1991年创建。

Python的特点：
• 简洁易读 - 语法清晰，接近自然语言
• 跨平台 - Windows、Mac、Linux都能运行
• 丰富的库 - 拥有海量的第三方库
• 应用广泛 - Web开发、数据分析、人工智能、自动化等

Python非常适合初学者入门，是学习编程的理想选择！`
    },
    {
      id: 'step_1_1_2',
      type: 'text',
      title: 'Python的应用领域',
      content: `Python在众多领域都有广泛应用：

🌐 Web开发
  - Django、Flask框架
  - 后端API开发

📊 数据分析
  - Pandas、NumPy
  - 数据可视化

🤖 人工智能
  - TensorFlow、PyTorch
  - 机器学习、深度学习

🔧 自动化脚本
  - 办公自动化
  - 系统运维

🎮 游戏开发
  - Pygame
  - 游戏原型开发`
    },
    {
      id: 'step_1_1_3',
      type: 'text',
      title: '下载Python',
      content: `下载Python的步骤：

1. 访问Python官网
   https://www.python.org/downloads/

2. 选择版本
   - 推荐下载Python 3.12.x（最新稳定版）
   - 点击"Download Python 3.12.x"按钮

3. 选择安装包
   - Windows: 下载Windows installer (64-bit)
   - Mac: 下载macOS installer
   - Linux: 通常已预装，可用包管理器安装

💡 提示：下载时选择适合你操作系统的版本`
    },
    {
      id: 'step_1_1_4',
      type: 'text',
      title: '安装Python',
      content: `Windows安装步骤：

1. 双击运行下载的安装程序

2. ⚠️ 重要：勾选 "Add Python to PATH"
   这一步非常重要！会将Python添加到系统环境变量

3. 点击 "Install Now" 进行安装

4. 等待安装完成，点击 "Close"

Mac安装步骤：
1. 双击.pkg文件
2. 按照安装向导操作
3. 完成安装`
    },
    {
      id: 'step_1_1_5',
      type: 'code',
      title: '验证安装',
      content: '打开命令行/终端，输入以下命令验证安装：',
      code: `# 检查Python版本
python --version

# 或者
python3 --version

# 检查pip包管理器
pip --version`,
      hint: '如果显示版本号（如Python 3.12.0），说明安装成功！'
    },
    {
      id: 'step_1_1_6',
      type: 'text',
      title: 'pip包管理器',
      content: `pip是Python的包管理工具，用于安装第三方库。

常用命令：

# 安装包
pip install 包名

# 查看已安装的包
pip list

# 升级包
pip install --upgrade 包名

# 卸载包
pip uninstall 包名

# 使用国内镜像加速
pip install 包名 -i https://pypi.tuna.tsinghua.edu.cn/simple

💡 使用国内镜像可以大大加快下载速度！`
    }
  ],
  prerequisites: [],
  tags: ['入门', '环境', '安装']
}
