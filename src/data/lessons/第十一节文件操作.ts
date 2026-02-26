import type { Lesson } from '@/types/lesson'

export const lesson_11_1: Lesson = {
  id: 'lesson_11_1',
  title: '文件操作',
  description: '学习Python的文件读写操作',
  difficulty: 'beginner',
  estimatedTime: 20,
  chapter: 11,
  order: 1,
  pseudoCode: `
# 文件操作
# 难度: 入门
# 预计时间: 20分钟

def file_operations():
    """文件操作"""
    
    # @step: 文件写入
    # @type: code
    write_to_file()
    
    # @step: 文件读取
    # @type: code
    read_from_file()
    
    # @step: 文件追加
    # @type: code
    append_to_file()
    
    print("文件操作是Python中重要的功能！")

if __name__ == "__main__":
    file_operations()
`,
  steps: [
    {
      id: 'step_11_1_1',
      type: 'code',
      title: '文件写入',
      content: '使用open()函数和write()方法写入文件：',
      code: `# 文件写入
# 打开文件（如果不存在则创建）
file = open("example.txt", "w", encoding="utf-8")

# 写入内容
file.write("Hello, World!\n")
file.write("这是一个测试文件。\n")
file.write("Python文件操作很简单！\n")

# 关闭文件
file.close()

# 使用with语句（推荐）
with open("example2.txt", "w", encoding="utf-8") as f:
    f.write("使用with语句写入文件\n")
    f.write("自动关闭文件，更安全！\n")

# with语句会自动关闭文件，避免资源泄露`,
      hint: '使用with语句操作文件更加安全可靠'
    },
    {
      id: 'step_11_1_2',
      type: 'code',
      title: '文件读取',
      content: '使用open()函数和read()方法读取文件：',
      code: `# 文件读取
# 读取整个文件
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# 逐行读取
with open("example.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())  # strip()去除换行符

# 读取所有行到列表
with open("example.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    print(lines)

# 读取指定长度
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read(10)  # 读取前10个字符
    print(content)`,
      hint: '不同的读取方式适用于不同的场景'
    },
    {
      id: 'step_11_1_3',
      type: 'code',
      title: '文件追加',
      content: '使用"a"模式追加内容到文件：',
      code: `# 文件追加
with open("example.txt", "a", encoding="utf-8") as f:
    f.write("\n这是追加的内容！\n")
    f.write("Python文件操作真方便！\n")

# 查看追加后的文件
with open("example.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

# 文件模式说明
# "r" - 只读模式（默认）
# "w" - 写入模式（覆盖原有内容）
# "a" - 追加模式（在文件末尾添加）
# "x" - 创建模式（仅创建新文件）
# "b" - 二进制模式
# "+" - 读写模式`,
      hint: '使用正确的文件模式非常重要'
    }
  ],
  prerequisites: ['lesson_10_1'],
  tags: ['文件操作', '读写', 'IO']
}
