import type { Lesson } from '@/types/lesson'

export const lesson_2_1: Lesson = {
  id: 'lesson_2_1',
  title: 'Hello World',
  description: '编写经典的第一个程序',
  difficulty: 'beginner',
  estimatedTime: 10,
  chapter: 2,
  order: 1,
  pseudoCode: `
# Hello World - 你的第一个Python程序
# 难度: 入门
# 预计时间: 10分钟

def say_hello():
    """输出Hello World"""
    
    # @step: 使用print函数
    # @type: code
    print("Hello, World!")
    
    print("恭喜你完成了第一个程序！")

def interactive_mode():
    """Python交互式模式"""
    
    # @step: 进入交互模式
    # @type: text
    enter_interactive()
    
    # @step: 执行简单计算
    # @type: code
    calculate()
    
    print("交互模式非常适合快速测试代码！")

if __name__ == "__main__":
    say_hello()
    interactive_mode()
`,
  steps: [
    {
      id: 'step_2_1_1',
      type: 'code',
      title: 'print函数',
      content: 'print()是Python最常用的函数，用于输出内容到屏幕：',
      code: `# 输出文字
print("Hello, World!")

# 输出数字
print(123)

# 输出多个内容
print("Python", "很", "有趣")

# 输出计算结果
print(1 + 2)`,
      hint: 'print函数会自动在输出末尾添加换行'
    },
    {
      id: 'step_2_1_2',
      type: 'text',
      title: '交互式模式',
      content: `Python有两种运行模式：

1️⃣ 交互式模式（REPL）
   - 在命令行输入 python 进入
   - 适合快速测试代码
   - 输入一行，执行一行

2️⃣ 脚本模式
   - 将代码保存为.py文件
   - 使用 python 文件名.py 运行
   - 适合编写完整程序

进入交互模式：
> python
>>> print("Hello")
Hello
>>> 1 + 1
2
>>> exit()  # 退出`
    },
    {
      id: 'step_2_1_3',
      type: 'code',
      title: '简单计算',
      content: 'Python可以直接进行数学计算：',
      code: `# 基本运算
>>> 1 + 1
2
>>> 10 - 5
5
>>> 3 * 4
12
>>> 10 / 2
5.0
>>> 10 // 3  # 整除
3
>>> 10 % 3   # 取余
1
>>> 2 ** 3   # 幂运算
8`,
      hint: 'Python的交互式模式非常适合进行快速计算'
    }
  ],
  prerequisites: ['lesson_1_1'],
  tags: ['入门', 'print', '基础']
}
