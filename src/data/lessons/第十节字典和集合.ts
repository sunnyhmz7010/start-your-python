import type { Lesson } from '@/types/lesson'

export const lesson_10_1: Lesson = {
  id: 'lesson_10_1',
  title: '字典和集合',
  description: '学习Python的字典和集合数据结构',
  difficulty: 'beginner',
  estimatedTime: 20,
  chapter: 10,
  order: 1,
  pseudoCode: `
# 字典和集合
# 难度: 入门
# 预计时间: 20分钟

def dictionaries_and_sets():
    """字典和集合"""
    
    # @step: 字典操作
    # @type: code
    dictionary_operations()
    
    # @step: 集合操作
    # @type: code
    set_operations()
    
    # @step: 字典方法
    # @type: code
    dictionary_methods()
    
    print("字典和集合是Python中重要的数据结构！")

if __name__ == "__main__":
    dictionaries_and_sets()
`,
  steps: [
    {
      id: 'step_10_1_1',
      type: 'code',
      title: '字典操作',
      content: '字典是键值对的集合，使用花括号定义：',
      code: `# 字典定义
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York",
    "skills": ["Python", "JavaScript", "Java"]
}

# 访问值
print(person["name"])  # Alice
print(person.get("age"))  # 30
print(person.get("salary", "Not available"))  # 键不存在时返回默认值

# 修改值
person["age"] = 31
print(person["age"])  # 31

# 添加新键值对
person["job"] = "Developer"
print(person)

# 删除键值对
del person["city"]
print(person)`,
      hint: '字典是按键查找值的高效数据结构'
    },
    {
      id: 'step_10_1_2',
      type: 'code',
      title: '集合操作',
      content: '集合是无序的、唯一元素的集合，使用花括号定义：',
      code: `# 集合定义
fruits = {"apple", "banana", "cherry"}
numbers = {1, 2, 3, 4, 5}

# 集合自动去重
duplicates = {1, 2, 2, 3, 3, 3}
print(duplicates)  # {1, 2, 3}

# 添加元素
fruits.add("orange")
print(fruits)  # {"apple", "banana", "cherry", "orange"}

# 删除元素
fruits.remove("banana")
print(fruits)  # {"apple", "cherry", "orange"}

# 集合运算
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a.union(b))  # {1, 2, 3, 4, 5, 6}
print(a.intersection(b))  # {3, 4}
print(a.difference(b))  # {1, 2}`,
      hint: '集合适合存储需要去重的元素'
    },
    {
      id: 'step_10_1_3',
      type: 'code',
      title: '字典方法',
      content: '字典有很多有用的方法：',
      code: `# 字典方法
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# 获取所有键
keys = person.keys()
print(keys)  # dict_keys(["name", "age", "city"])

# 获取所有值
values = person.values()
print(values)  # dict_values(["Alice", 30, "New York"])

# 获取所有键值对
items = person.items()
print(items)  # dict_items([("name", "Alice"), ("age", 30), ("city", "New York")])

# 遍历字典
for key, value in person.items():
    print(f"{key}: {value}")`,
      hint: '字典方法让字典操作更加方便'
    }
  ],
  prerequisites: ['lesson_9_1'],
  tags: ['字典', '集合', '数据结构']
}
