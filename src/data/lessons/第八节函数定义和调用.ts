import type { Lesson } from '@/types/lesson'

export const lesson_8_1: Lesson = {
  id: 'lesson_8_1',
  title: '函数定义和调用',
  description: '学习Python的函数定义和调用',
  difficulty: 'beginner',
  estimatedTime: 20,
  chapter: 8,
  order: 1,
  pseudoCode: `
# 函数定义和调用
# 难度: 入门
# 预计时间: 20分钟

def functions():
    """函数定义和调用"""
    
    # @step: 函数定义
    # @type: code
    define_function()
    
    # @step: 函数参数
    # @type: code
    function_parameters()
    
    # @step: 函数返回值
    # @type: code
    function_return()
    
    print("函数让代码更模块化！")

if __name__ == "__main__":
    functions()
`,
  steps: [
    {
      id: 'step_8_1_1',
      type: 'code',
      title: '函数定义',
      content: '函数是可重用的代码块，使用def关键字定义：',
      code: `# 函数定义
def greet():
    """打印问候语"""
    print("Hello, World!")

# 函数调用
greet()

# 带文档字符串的函数
def calculate_area(width, height):
    """
    计算矩形面积
    
    参数:
        width: 矩形宽度
        height: 矩形高度
        
    返回:
        矩形面积
    """
    area = width * height
    return area`,
      hint: '函数可以让代码更加模块化和可重用'
    },
    {
      id: 'step_8_1_2',
      type: 'code',
      title: '函数参数',
      content: '函数可以接收参数，让函数更加灵活：',
      code: `# 位置参数
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8

# 默认参数
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob", "Hi")  # Hi, Bob!

# 关键字参数
def describe_person(name, age, city):
    print(f"姓名: {name}, 年龄: {age}, 城市: {city}")

describe_person(name="Alice", age=30, city="New York")
describe_person(city="Beijing", name="Bob", age=25)  # 顺序可以改变`,
      hint: '参数让函数能够处理不同的输入'
    },
    {
      id: 'step_8_1_3',
      type: 'code',
      title: '函数返回值',
      content: '函数可以使用return语句返回值：',
      code: `# 返回单个值
def square(x):
    return x * x

result = square(5)
print(result)  # 25

# 返回多个值
def get_name_and_age():
    name = "Alice"
    age = 30
    return name, age

name, age = get_name_and_age()
print(name, age)  # Alice 30

# 无返回值的函数
def print_message():
    print("Hello!")

result = print_message()
print(result)  # None`,
      hint: '返回值让函数能够产生结果供其他代码使用'
    }
  ],
  prerequisites: ['lesson_7_1'],
  tags: ['函数', '定义', '调用']
}
