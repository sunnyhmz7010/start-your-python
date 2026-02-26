import type { Lesson } from '@/types/lesson'

export const lesson_12_1: Lesson = {
  id: 'lesson_12_1',
  title: '面向对象编程',
  description: '学习Python的面向对象编程基础',
  difficulty: 'beginner',
  estimatedTime: 25,
  chapter: 12,
  order: 1,
  pseudoCode: `
# 面向对象编程
# 难度: 入门
# 预计时间: 25分钟

def object_oriented_programming():
    """面向对象编程"""
    
    # @step: 类的定义
    # @type: code
    define_class()
    
    # @step: 对象的创建和使用
    # @type: code
    create_and_use_objects()
    
    # @step: 类的方法和属性
    # @type: code
    class_methods_and_attributes()
    
    print("面向对象编程让代码更模块化和可维护！")

if __name__ == "__main__":
    object_oriented_programming()
`,
  steps: [
    {
      id: 'step_12_1_1',
      type: 'code',
      title: '类的定义',
      content: '使用class关键字定义类：',
      code: `# 类的定义
class Person:
    """Person类"""
    
    # 类属性
    species = "Homo sapiens"
    
    # 初始化方法
    def __init__(self, name, age):
        """初始化方法"""
        self.name = name  # 实例属性
        self.age = age    # 实例属性

# 类的文档字符串
print(Person.__doc__)

# 访问类属性
print(Person.species)`,
      hint: '类是对象的蓝图，定义了对象的属性和方法'
    },
    {
      id: 'step_12_1_2',
      type: 'code',
      title: '对象的创建和使用',
      content: '通过类创建对象并使用：',
      code: `# 创建对象
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

# 访问实例属性
print(person1.name)  # Alice
print(person1.age)   # 30
print(person2.name)  # Bob
print(person2.age)   # 25

# 访问类属性
print(person1.species)  # Homo sapiens
print(person2.species)  # Homo sapiens

# 修改实例属性
person1.age = 31
print(person1.age)  # 31

# 修改类属性
Person.species = "Human"
print(person1.species)  # Human
print(person2.species)  # Human`,
      hint: '每个对象都有自己的实例属性，但共享类属性'
    },
    {
      id: 'step_12_1_3',
      type: 'code',
      title: '类的方法和属性',
      content: '在类中定义方法：',
      code: `class Person:
    """Person类"""
    
    species = "Homo sapiens"
    
    def __init__(self, name, age):
        """初始化方法"""
        self.name = name
        self.age = age
    
    # 实例方法
    def greet(self):
        """问候方法"""
        return f"Hello, my name is {self.name}!"
    
    def celebrate_birthday(self):
        """庆祝生日方法"""
        self.age += 1
        return f"Happy birthday! Now I'm {self.age} years old."
    
    # 类方法
    @classmethod
    def get_species(cls):
        """获取物种方法"""
        return cls.species
    
    # 静态方法
    @staticmethod
    def is_adult(age):
        """判断是否成年"""
        return age >= 18

# 使用方法
person = Person("Alice", 30)
print(person.greet())  # Hello, my name is Alice!
print(person.celebrate_birthday())  # Happy birthday! Now I'm 31 years old.

# 使用类方法
print(Person.get_species())  # Homo sapiens

# 使用静态方法
print(Person.is_adult(18))  # True
print(Person.is_adult(17))  # False`,
      hint: '实例方法访问实例属性，类方法访问类属性，静态方法不访问任何属性'
    }
  ],
  prerequisites: ['lesson_11_1'],
  tags: ['面向对象', '类', '对象']
}
