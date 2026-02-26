import type { Lesson } from '@/types/lesson'

export const lesson_7_1: Lesson = {
  id: 'lesson_7_1',
  title: '循环结构',
  description: '学习Python的for和while循环',
  difficulty: 'beginner',
  estimatedTime: 20,
  chapter: 7,
  order: 1,
  pseudoCode: `
# 循环结构
# 难度: 入门
# 预计时间: 20分钟

def loops():
    """循环结构"""
    
    # @step: for循环
    # @type: code
    for_loop()
    
    # @step: while循环
    # @type: code
    while_loop()
    
    # @step: 循环控制
    # @type: code
    loop_control()
    
    print("循环让程序更高效！")

if __name__ == "__main__":
    loops()
`,
  steps: [
    {
      id: 'step_7_1_1',
      type: 'code',
      title: 'for循环',
      content: 'for循环用于遍历序列或可迭代对象：',
      code: `# for循环
# 遍历字符串
for char in "Python":
    print(char)

# 遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 使用range()函数
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5

for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8`,
      hint: 'for循环是最常用的循环类型'
    },
    {
      id: 'step_7_1_2',
      type: 'code',
      title: 'while循环',
      content: 'while循环在条件为真时重复执行：',
      code: `# while循环
count = 0
while count < 5:
    print(count)
    count += 1  # 重要：避免无限循环

# 另一个例子
guess = 0
secret_number = 7

while guess != secret_number:
    guess = int(input("猜一个数字:"))
    if guess < secret_number:
        print("太小了！")
    elif guess > secret_number:
        print("太大了！")
    else:
        print("恭喜你猜对了！")`,
      hint: '使用while循环时要确保条件最终会变为False'
    },
    {
      id: 'step_7_1_3',
      type: 'code',
      title: '循环控制',
      content: '使用break和continue控制循环：',
      code: `# break语句：跳出循环
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue语句：跳过当前迭代
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9

# 实际应用
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for num in numbers:
    if num < 5:
        continue
    if num > 8:
        break
    print(num)  # 5, 6, 7, 8`,
      hint: 'break和continue可以让循环更加灵活'
    }
  ],
  prerequisites: ['lesson_6_1'],
  tags: ['循环', 'for', 'while']
}
