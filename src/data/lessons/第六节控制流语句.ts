import type { Lesson } from '@/types/lesson'

export const lesson_6_1: Lesson = {
  id: 'lesson_6_1',
  title: 'if语句',
  description: '学习Python的if条件语句',
  difficulty: 'beginner',
  estimatedTime: 15,
  chapter: 6,
  order: 1,
  pseudoCode: `
# if语句
# 难度: 入门
# 预计时间: 15分钟

def if_statements():
    """if条件语句"""
    
    # @step: 基本if语句
    # @type: code
    basic_if()
    
    # @step: if-else语句
    # @type: code
    if_else()
    
    # @step: if-elif-else语句
    # @type: code
    if_elif_else()
    
    print("控制流语句让程序更智能！")

if __name__ == "__main__":
    if_statements()
`,
  steps: [
    {
      id: 'step_6_1_1',
      type: 'code',
      title: '基本if语句',
      content: 'if语句用于根据条件执行不同的代码：',
      code: `# 基本if语句
age = 18

if age >= 18:
    print("你已经成年了！")
    print("可以投票了")

# 注意缩进
if True:
print("缺少缩进会报错")  # 错误！`,
      hint: 'if语句后的代码块必须缩进'
    },
    {
      id: 'step_6_1_2',
      type: 'code',
      title: 'if-else语句',
      content: 'if-else语句提供了两种选择：',
      code: `# if-else语句
age = 16

if age >= 18:
    print("你已经成年了！")
else:
    print("你还未成年！")

# 另一个例子
score = 85

if score >= 60:
    print("考试及格了！")
else:
    print("考试不及格，需要补考！")`,
      hint: 'else子句处理条件不满足的情况'
    },
    {
      id: 'step_6_1_3',
      type: 'code',
      title: 'if-elif-else语句',
      content: 'if-elif-else语句处理多个条件：',
      code: `# if-elif-else语句
score = 85

if score >= 90:
    print("优秀！")
elif score >= 80:
    print("良好！")
elif score >= 60:
    print("及格！")
else:
    print("不及格！")

# 另一个例子
grade = "B"

if grade == "A":
    print("非常好！")
elif grade == "B":
    print("不错！")
elif grade == "C":
    print("需要努力！")
else:
    print("加油！")`,
      hint: 'elif可以有多个，else是可选的'
    }
  ],
  prerequisites: ['lesson_5_1'],
  tags: ['控制流', 'if语句', '条件']
}
