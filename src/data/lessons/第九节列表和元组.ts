import type { Lesson } from '@/types/lesson'

export const lesson_9_1: Lesson = {
  id: 'lesson_9_1',
  title: '列表和元组',
  description: '学习Python的列表和元组数据结构',
  difficulty: 'beginner',
  estimatedTime: 20,
  chapter: 9,
  order: 1,
  pseudoCode: `
# 列表和元组
# 难度: 入门
# 预计时间: 20分钟

def lists_and_tuples():
    """列表和元组"""
    
    # @step: 列表操作
    # @type: code
    list_operations()
    
    # @step: 元组操作
    # @type: code
    tuple_operations()
    
    # @step: 列表方法
    # @type: code
    list_methods()
    
    print("列表和元组是Python中重要的数据结构！")

if __name__ == "__main__":
    lists_and_tuples()
`,
  steps: [
    {
      id: 'step_9_1_1',
      type: 'code',
      title: '列表操作',
      content: '列表是可变的序列，用于存储多个值：',
      code: `# 列表定义
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "apple", True, 3.14]

# 访问元素
print(fruits[0])  # 第一个元素: apple
print(fruits[-1])  # 最后一个元素: cherry

# 修改元素
fruits[1] = "orange"
print(fruits)  # ["apple", "orange", "cherry"]

# 切片
print(numbers[1:4])  # [2, 3, 4]
print(numbers[:3])   # [1, 2, 3]
print(numbers[2:])   # [3, 4, 5]`,
      hint: '列表是Python中最常用的数据结构之一'
    },
    {
      id: 'step_9_1_2',
      type: 'code',
      title: '元组操作',
      content: '元组是不可变的序列，使用圆括号定义：',
      code: `# 元组定义
fruits = ("apple", "banana", "cherry")
numbers = (1, 2, 3, 4, 5)
single = (42,)  # 单个元素的元组需要加逗号

# 访问元素
print(fruits[0])  # apple
print(fruits[-1])  # cherry

# 切片
print(numbers[1:4])  # (2, 3, 4)

# 元组是不可变的
# fruits[1] = "orange"  # 这会报错！

# 元组的优点
# 1. 比列表更节省内存
# 2. 作为字典键
# 3. 保护数据不被修改`,
      hint: '元组适合存储不需要修改的数据'
    },
    {
      id: 'step_9_1_3',
      type: 'code',
      title: '列表方法',
      content: '列表有很多有用的方法：',
      code: `# 列表方法
fruits = ["apple", "banana", "cherry"]

# 添加元素
fruits.append("orange")
print(fruits)  # ["apple", "banana", "cherry", "orange"]

# 插入元素
fruits.insert(1, "grape")
print(fruits)  # ["apple", "grape", "banana", "cherry", "orange"]

# 删除元素
fruits.remove("banana")
print(fruits)  # ["apple", "grape", "cherry", "orange"]

# 弹出元素
last_fruit = fruits.pop()
print(last_fruit)  # orange
print(fruits)  # ["apple", "grape", "cherry"]

# 排序
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]

# 反转
fruits.reverse()
print(fruits)  # ["cherry", "grape", "apple"]`,
      hint: '列表方法让列表操作更加方便'
    }
  ],
  prerequisites: ['lesson_8_1'],
  tags: ['列表', '元组', '数据结构']
}
