import type { Lesson } from '@/types/lesson'

export const lesson_5_1: Lesson = {
  id: 'lesson_5_1',
  title: '运算符和表达式',
  description: '了解Python的各种运算符和表达式',
  difficulty: 'beginner',
  estimatedTime: 15,
  chapter: 5,
  order: 1,
  pseudoCode: `
# 运算符和表达式
# 难度: 入门
# 预计时间: 15分钟

def operators_and_expressions():
    """运算符和表达式"""
    
    # @step: 算术运算符
    # @type: code
    arithmetic_operators()
    
    # @step: 比较运算符
    # @type: code
    comparison_operators()
    
    # @step: 逻辑运算符
    # @type: code
    logical_operators()
    
    print("运算符是构建表达式的基本元素！")

if __name__ == "__main__":
    operators_and_expressions()
`,
  steps: [
    {
      id: 'step_5_1_1',
      type: 'code',
      title: '算术运算符',
      content: '算术运算符用于执行数学计算：',
      code: `# 算术运算符
a = 10
b = 3

print(a + b)  # 加法: 13
print(a - b)  # 减法: 7
print(a * b)  # 乘法: 30
print(a / b)  # 除法: 3.333...
print(a // b) # 整除: 3
print(a % b)  # 取余: 1
print(a ** b) # 幂运算: 1000`,
      hint: '算术运算符是最基本的运算符类型'
    },
    {
      id: 'step_5_1_2',
      type: 'code',
      title: '比较运算符',
      content: '比较运算符用于比较两个值：',
      code: `# 比较运算符
a = 10
b = 5

print(a > b)   # 大于: True
print(a < b)   # 小于: False
print(a >= b)  # 大于等于: True
print(a <= b)  # 小于等于: False
print(a == b)  # 等于: False
print(a != b)  # 不等于: True`,
      hint: '比较运算符返回布尔值（True或False）'
    },
    {
      id: 'step_5_1_3',
      type: 'code',
      title: '逻辑运算符',
      content: '逻辑运算符用于组合多个条件：',
      code: `# 逻辑运算符
x = True
y = False

print(x and y)  # 与: False
print(x or y)   # 或: True
print(not x)    # 非: False

# 实际应用
age = 25
has_id = True

can_enter = age >= 18 and has_id
print(can_enter)  # True`,
      hint: '逻辑运算符在控制流中非常重要'
    }
  ],
  prerequisites: ['lesson_4_1'],
  tags: ['运算符', '表达式', '基础']
}
