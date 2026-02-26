import type { Lesson } from '@/types/lesson'

export const lesson_4_1: Lesson = {
  id: 'lesson_4_1',
  title: '变量和数据类型',
  description: '了解Python的变量定义和基本数据类型',
  difficulty: 'beginner',
  estimatedTime: 20,
  chapter: 4,
  order: 1,
  pseudoCode: `
# 变量和数据类型
# 难度: 入门
# 预计时间: 20分钟

def variables_and_types():
    """变量和数据类型"""
    
    # @step: 变量定义
    # @type: code
    define_variables()
    
    # @step: 数据类型
    # @type: code
    explore_data_types()
    
    # @step: 类型转换
    # @type: code
    type_conversion()
    
    print("变量和数据类型是编程的基础！")

if __name__ == "__main__":
    variables_and_types()
`,
  steps: [
    {
      id: 'step_4_1_1',
      type: 'code',
      title: '变量定义',
      content: '变量是用来存储数据的容器，在Python中定义变量非常简单：',
      code: `# 变量定义
name = "Python"
age = 32
price = 99.99
is_popular = True

# 变量命名规则
# 1. 只能包含字母、数字和下划线
# 2. 不能以数字开头
# 3. 区分大小写
# 4. 不能使用关键字

# 好的变量名
user_name = "Alice"
student_age = 20

# 不好的变量名
1name = "Bob"  # 以数字开头
user-name = "Charlie"  # 包含连字符`,
      hint: '变量名应该具有描述性，让代码更容易理解'
    },
    {
      id: 'step_4_1_2',
      type: 'code',
      title: '数据类型',
      content: 'Python有多种内置数据类型：',
      code: `# 数据类型
name = "Python"  # 字符串 (str)
age = 32         # 整数 (int)
price = 99.99    # 浮点数 (float)
is_popular = True  # 布尔值 (bool)

# 查看类型
print(type(name))     # <class 'str'>
print(type(age))      # <class 'int'>
print(type(price))    # <class 'float'>
print(type(is_popular))  # <class 'bool'>`,
      hint: '不同的数据类型有不同的用途和操作'
    },
    {
      id: 'step_4_1_3',
      type: 'code',
      title: '类型转换',
      content: '可以在不同数据类型之间进行转换：',
      code: `# 类型转换
str_num = "123"
int_num = int(str_num)
print(int_num)  # 123

num = 456
str_num = str(num)
print(str_num)  # "456"

str_float = "3.14"
float_num = float(str_float)
print(float_num)  # 3.14

pi = 3.14
int_pi = int(pi)
print(int_pi)  # 3

# 布尔值转换
bool_true = bool(1)
print(bool_true)  # True

bool_false = bool(0)
print(bool_false)  # False`,
      hint: '类型转换在处理不同类型的数据时非常重要'
    }
  ],
  prerequisites: ['lesson_3_1'],
  tags: ['变量', '数据类型', '基础']
}
