# 课程编辑指南

本文档介绍如何使用伪Python代码格式创建和维护课程内容。

## 课程文件结构

课程数据存储在 `lib/data/lessons_data.dart` 中，每个课程包含以下字段：

```dart
Lesson(
  id: 'lesson_1_1',           // 唯一标识符
  title: 'Python简介与安装',    // 课程标题
  description: '了解Python...', // 课程描述
  difficulty: 'beginner',      // 难度: beginner/intermediate/advanced
  estimatedTime: 15,           // 预计学习时间（分钟）
  chapter: 1,                  // 所属章节
  order: 1,                    // 章节内排序
  pseudoCode: '''...''',       // 伪Python代码
  steps: [...],                // 解析后的学习步骤
  prerequisites: [],           // 前置课程ID
  tags: ['入门', '环境'],      // 标签
)
```

## 伪Python代码格式

伪代码使用Python语法风格，通过特殊注释标记学习步骤：

```python
# 课程标题
# 难度: 入门
# 预计时间: 15分钟

def function_name():
    """步骤描述（docstring会作为步骤内容）"""
    
    # @step: 步骤标题
    # @type: text/code/quiz/image/video
    # @code: 实际代码示例（可选）
    # @hint: 提示信息（可选）
    some_function()
    
    print("完成！")

if __name__ == "__main__":
    function_name()
```

## 步骤类型说明

| 类型 | 说明 | 特殊标记 |
|------|------|----------|
| `text` | 纯文本内容 | 无 |
| `code` | 代码示例 | `@code: 代码内容` |
| `quiz` | 选择题 | `@options: JSON格式选项` |
| `image` | 图片展示 | `@image: 图片路径` |
| `video` | 视频展示 | `@video: 视频路径` |
| `interactive` | 交互练习 | `@interactive: true` |

## 添加新课程

### 方法一：直接编辑 lessons_data.dart

1. 打开 `lib/data/lessons_data.dart`
2. 在对应章节的 `lessons` 数组中添加新的 `Lesson` 对象
3. 填写伪代码和步骤内容

### 方法二：使用课程模板

```dart
Lesson(
  id: 'lesson_X_Y',
  title: '课程标题',
  description: '课程描述',
  difficulty: 'beginner',
  estimatedTime: 15,
  chapter: X,
  order: Y,
  pseudoCode: '''
# 课程标题
# 难度: 入门
# 预计时间: 15分钟

def step_one():
    """第一步：学习内容描述"""
    
    # @step: 步骤标题
    # @type: text
    do_something()
    
    print("步骤一完成！")

def step_two():
    """第二步：代码示例"""
    
    # @step: 代码示例
    # @type: code
    # @code: print("Hello, World!")
    show_code()
    
    print("步骤二完成！")

if __name__ == "__main__":
    step_one()
    step_two()
''',
  steps: [
    LessonStep(
      id: 'step_X_Y_1',
      type: 'text',
      title: '步骤标题',
      content: '详细的学习内容...',
    ),
    LessonStep(
      id: 'step_X_Y_2',
      type: 'code',
      title: '代码示例',
      content: '代码说明',
      code: 'print("Hello, World!")',
      hint: '这是提示信息',
    ),
  ],
  prerequisites: ['lesson_X_Y-1'],
  tags: ['标签1', '标签2'],
),
```

## 内容编写建议

### 文本内容
- 使用清晰简洁的语言
- 适当使用emoji增加趣味性
- 分点列出关键信息
- 提供实际应用场景

### 代码示例
- 代码要有注释说明
- 从简单到复杂递进
- 展示实际运行结果
- 提供常见错误示例

### 选择题格式
```dart
LessonStep(
  id: 'quiz_1',
  type: 'quiz',
  title: '测验题目',
  content: '以下哪个是Python的正确变量名？',
  options: [
    QuizOption(id: 'a', text: '1name', isCorrect: false),
    QuizOption(id: 'b', text: 'my_name', isCorrect: true),
    QuizOption(id: 'c', text: 'my-name', isCorrect: false),
    QuizOption(id: 'd', text: 'class', isCorrect: false),
  ],
  correctAnswer: 'b',
),
```

## 课程大纲参考

1. **第1章：Python环境安装**
   - Python简介与安装
   - 开发环境配置

2. **第2章：第一个Python程序**
   - Hello World
   - 交互式模式

3. **第3章：变量与数据类型**
   - 变量基础
   - 数据类型

4. **第4章：运算符与表达式**
   - 算术运算符
   - 比较与逻辑运算符

5. **第5章：条件语句**
   - if条件判断

6. **第6章：循环语句**
   - for循环
   - while循环

7. **第7章：函数基础**
   - 函数定义与调用

8. **第8章：列表与元组**
   - 列表基础

9. **第9章：字典与集合**
   - 字典基础

10. **第10章：文件操作**
    - 文件读写

11. **第11章：模块与包**
    - 模块导入

12. **第12章：面向对象入门**
    - 类与对象

## 测试课程

修改课程内容后，运行应用查看效果：

```bash
flutter run
```

## 注意事项

1. 每个课程的 `id` 必须唯一
2. `prerequisites` 中的课程ID必须存在
3. 步骤ID建议使用 `step_章节_课程_序号` 格式
4. 代码示例使用4个空格缩进
5. 中文内容确保UTF-8编码
