import type { Lesson } from '@/types/lesson'

export const lesson_3_1: Lesson = {
  id: 'lesson_3_1',
  title: 'Python语法基础',
  description: '了解Python的基本语法规则',
  difficulty: 'beginner',
  estimatedTime: 15,
  chapter: 3,
  order: 1,
  pseudoCode: `
# Python语法基础
# 难度: 入门
# 预计时间: 15分钟

def syntax_basics():
    """Python语法基础知识"""
    
    # @step: 注释
    # @type: code
    write_comments()
    
    # @step: 缩进
    # @type: code
    use_indentation()
    
    # @step: 多行语句
    # @type: code
    multi_line_statements()
    
    print("Python语法简洁明了！")

if __name__ == "__main__":
    syntax_basics()
`,
  steps: [
    {
      id: 'step_3_1_1',
      type: 'code',
      title: '注释',
      content: '注释是程序中不会执行的文字，用于解释代码：',
      code: `# 单行注释

"""
多行注释
可以写很多行
"""

'''
另一种多行注释
使用三个单引号
'''

# 注释示例
# 这是一个计算函数
def calculate():
    # 执行计算
    result = 1 + 1
    return result  # 返回结果`,
      hint: '注释可以帮助你和其他人理解代码的含义'
    },
    {
      id: 'step_3_1_2',
      type: 'code',
      title: '缩进',
      content: 'Python使用缩进来表示代码块，这是Python的一大特色：',
      code: `# 正确的缩进
if True:
    print("条件成立")
    print("这是缩进的代码块")

# 错误的缩进
if True:
print("缺少缩进会报错")

# 缩进示例
def function():
    print("函数内容")
    if True:
        print("嵌套的代码块")
        for i in range(3):
            print(i)  # 更深层的缩进`,
      hint: 'Python的缩进通常使用4个空格或1个制表符'
    },
    {
      id: 'step_3_1_3',
      type: 'code',
      title: '多行语句',
      content: '当语句太长时，可以使用反斜杠或括号来换行：',
      code: `# 使用反斜杠
total = 1 + 2 + 3 + \
        4 + 5 + 6

# 使用括号
total = (1 + 2 + 3 +
         4 + 5 + 6)

# 列表、字典等可以直接换行
my_list = [
    1, 2, 3,
    4, 5, 6
]

my_dict = {
    'name': 'Python',
    'version': 3.12,
    'popular': True
}`,
      hint: '合理的换行可以提高代码的可读性'
    }
  ],
  prerequisites: ['lesson_2_1'],
  tags: ['语法', '基础', '入门']
}
