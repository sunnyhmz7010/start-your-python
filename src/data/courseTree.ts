import type { Chapter, LessonStep } from '@/types/lesson'
import { createChapter, createLesson } from './lessonFactories'

function textStep(id: string, title: string, content: string, hint?: string): LessonStep {
  return { id, type: 'text', title, content, hint }
}

function codeStep(id: string, title: string, content: string, code: string, hint?: string): LessonStep {
  return { id, type: 'code', title, content, code, hint }
}

const chapters: Chapter[] = [
  createChapter({
    id: 'chapter_1',
    title: '第一章 Python环境准备',
    folderName: '第一章 Python环境准备',
    description: '理解 Python、安装环境并完成第一次运行。',
    order: 1,
    lessons: [
      createLesson({
        id: 'lesson_env_what_is_python',
        title: 'Python是什么',
        description: '理解 Python 的定位、特点和常见应用场景。',
        chapter: 1,
        order: 1,
        pseudoCode: `# Python是什么.py\n\ndef lesson():\n    language = "Python"\n    features = ["易读", "跨平台", "生态丰富"]\n    print(language, features)\n`,
        steps: [
          textStep('s1', '认识 Python', 'Python 是一门高级、解释型、通用编程语言，适合初学者入门。'),
          textStep('s2', '应用场景', '常见方向包括 Web 开发、数据分析、自动化脚本和人工智能。'),
          codeStep('s3', '读懂示例', '看一下一个最小的 Python 程序是如何描述信息的。', `language = "Python"\nprint(language)`, '先关注变量和 print 的作用。')
        ]
      }),
      createLesson({
        id: 'lesson_env_install_python',
        title: '安装Python',
        description: '学会从官网下载并安装 Python。',
        chapter: 1,
        order: 2,
        pseudoCode: `# 安装Python.py\n\ndef install_python():\n    download_from_official_site()\n    run_installer()\n    verify_version()\n`,
        steps: [
          textStep('s1', '下载地址', '访问 python.org，选择适合系统的安装包。'),
          textStep('s2', '安装注意项', 'Windows 用户安装时要勾选 Add Python to PATH。'),
          codeStep('s3', '验证安装', '安装完成后，在终端中输入版本命令。', `python --version\npip --version`)
        ]
      }),
      createLesson({
        id: 'lesson_env_setup',
        title: '配置开发环境',
        description: '了解解释器、终端和 IDE 的基本关系。',
        chapter: 1,
        order: 3,
        pseudoCode: `# 配置开发环境.py\n\ndef setup():\n    choose_editor("PyCharm")\n    open_terminal()\n    run_python()\n`,
        steps: [
          textStep('s1', '认识解释器', '解释器负责执行 Python 代码。'),
          textStep('s2', '认识编辑器和 IDE', '编辑器用于写代码，IDE 会把项目、终端和运行功能集成起来。'),
          codeStep('s3', '第一次打开终端', '尝试在终端里输入 python 进入交互模式。', `python\nprint("ready")`)
        ]
      }),
      createLesson({
        id: 'lesson_env_first_run',
        title: '第一次运行Python',
        description: '在命令行和脚本文件中完成第一次运行。',
        chapter: 1,
        order: 4,
        pseudoCode: `# 第一次运行Python.py\n\nprint("Hello from Python")\n`,
        steps: [
          textStep('s1', '交互模式', '你可以直接在命令行里一行一行执行 Python。'),
          codeStep('s2', '脚本模式', '把代码保存成 .py 文件后再执行。', `print("Hello from Python")`),
          textStep('s3', '运行结果', '看到输出后，就说明你的 Python 环境已经工作正常。')
        ]
      })
    ]
  }),
  createChapter({
    id: 'chapter_2',
    title: '第二章 基础语法入门',
    folderName: '第二章 基础语法入门',
    description: '建立最基础的代码阅读和书写习惯。',
    order: 2,
    lessons: [
      createLesson({
        id: 'lesson_syntax_hello_world',
        title: 'Hello World',
        description: '编写第一个 Python 程序。',
        chapter: 2,
        order: 1,
        pseudoCode: `# Hello World.py\n\nprint("Hello, World!")\n`,
        steps: [
          codeStep('s1', 'print函数', 'print() 用来把内容输出到屏幕。', `print("Hello, World!")`),
          textStep('s2', '字符串', '双引号里的内容叫字符串，是文本数据。'),
          codeStep('s3', '再试一个输出', '可以把不同内容传给 print。', `print("Python 很有趣")`)
        ]
      }),
      createLesson({
        id: 'lesson_syntax_comments_indent',
        title: '注释与缩进',
        description: '理解 Python 的注释规则和缩进语法。',
        chapter: 2,
        order: 2,
        pseudoCode: `# 注释与缩进.py\n\n# 这是注释\nif True:\n    print("indent matters")\n`,
        steps: [
          textStep('s1', '注释', '# 开头的内容不会被执行，用来解释代码。'),
          textStep('s2', '缩进', 'Python 用缩进表示代码块，不是用花括号。'),
          codeStep('s3', '观察结构', '比较 if 外部和内部代码的对齐方式。', `if True:\n    print("inside")\nprint("outside")`)
        ]
      }),
      createLesson({
        id: 'lesson_syntax_input_output',
        title: '输入与输出',
        description: '学习 print 和 input 的基本用法。',
        chapter: 2,
        order: 3,
        pseudoCode: `# 输入与输出.py\n\nname = input("请输入名字: ")\nprint("你好", name)\n`,
        steps: [
          textStep('s1', '输出', 'print 用来输出文本和变量。'),
          textStep('s2', '输入', 'input 会读取用户在键盘输入的内容。'),
          codeStep('s3', '组合使用', '把输入结果再输出出来。', `name = input("请输入名字: ")\nprint("你好", name)`)
        ]
      }),
      createLesson({
        id: 'lesson_syntax_common_errors',
        title: '常见语法错误',
        description: '认识初学者最常遇到的报错类型。',
        chapter: 2,
        order: 4,
        pseudoCode: `# 常见语法错误.py\n\nprint("missing quote)\n`,
        steps: [
          textStep('s1', '括号和引号', '括号、引号不配对是最常见的问题之一。'),
          textStep('s2', '缩进错误', '缩进不一致会导致代码无法运行。'),
          codeStep('s3', '读报错信息', '先读最后一行，再定位对应代码。', `SyntaxError: unterminated string literal`)
        ]
      })
    ]
  }),
  createChapter({
    id: 'chapter_3',
    title: '第三章 变量与数据类型',
    folderName: '第三章 变量与数据类型',
    description: '掌握变量和最常见的数据类型。',
    order: 3,
    lessons: [
      createLesson({ id: 'lesson_var_basic', title: '变量基础', description: '理解变量的作用。', chapter: 3, order: 1, pseudoCode: `name = "Python"\nage = 30\n`, steps: [textStep('s1', '变量是什么', '变量可以理解成一个带名字的盒子。'), codeStep('s2', '赋值', '等号右边的值会放进左边的变量名。', `name = "Python"`), textStep('s3', '命名规则', '变量名建议见名知意，不要用空格开头。')] }),
      createLesson({ id: 'lesson_var_number', title: '数字类型', description: '认识整数和浮点数。', chapter: 3, order: 2, pseudoCode: `count = 10\nprice = 9.9\n`, steps: [textStep('s1', '整数', '整数没有小数部分。'), textStep('s2', '浮点数', '浮点数带小数。'), codeStep('s3', '查看类型', '可以用 type 看变量类型。', `count = 10\nprint(type(count))`)] }),
      createLesson({ id: 'lesson_var_string', title: '字符串类型', description: '学习字符串的基本概念。', chapter: 3, order: 3, pseudoCode: `message = "hello"\n`, steps: [textStep('s1', '字符串定义', '字符串表示文本。'), codeStep('s2', '拼接', '字符串可以拼接成新的文本。', `first = "Hello"\nsecond = "Python"\nprint(first + " " + second)`), textStep('s3', '长度', '可以用 len 计算字符数量。')] }),
      createLesson({ id: 'lesson_var_bool', title: '布尔类型', description: '认识 True 和 False。', chapter: 3, order: 4, pseudoCode: `is_ready = True\n`, steps: [textStep('s1', '布尔值', '布尔值只有 True 和 False 两种。'), textStep('s2', '使用场景', '常用于条件判断。'), codeStep('s3', '简单示例', '把判断结果保存到变量里。', `age = 18\nis_adult = age >= 18`)] }),
      createLesson({ id: 'lesson_var_convert', title: '类型转换', description: '在字符串和数字之间转换。', chapter: 3, order: 5, pseudoCode: `age_text = "18"\nage = int(age_text)\n`, steps: [textStep('s1', '为什么要转换', '用户输入通常是字符串。'), codeStep('s2', '转整数', '用 int 把字符串变成整数。', `age = int("18")`), codeStep('s3', '转字符串', '用 str 把数字变成字符串。', `message = str(100)`)] })
    ]
  }),
  createChapter({
    id: 'chapter_4',
    title: '第四章 运算与判断',
    folderName: '第四章 运算与判断',
    description: '学习运算符和条件分支。',
    order: 4,
    lessons: [
      createLesson({ id: 'lesson_op_math', title: '算术运算符', description: '学习加减乘除等运算。', chapter: 4, order: 1, pseudoCode: `result = 1 + 2\n`, steps: [codeStep('s1', '加减乘除', '最常见的算术运算。', `1 + 2\n3 * 4\n10 / 2`), textStep('s2', '整除和取余', '还有 // 和 % 两个常用运算符。'), codeStep('s3', '组合计算', '表达式可以写得更复杂。', `total = (2 + 3) * 4`)] }),
      createLesson({ id: 'lesson_op_compare', title: '比较运算符', description: '比较两个值的大小关系。', chapter: 4, order: 2, pseudoCode: `is_equal = 3 == 3\n`, steps: [textStep('s1', '比较结果', '比较运算的结果是布尔值。'), codeStep('s2', '常见符号', '包括 == != > < >= <=。', `print(3 == 3)\nprint(5 > 8)`), textStep('s3', '判断场景', '比较常用于 if 条件。')] }),
      createLesson({ id: 'lesson_op_logic', title: '逻辑运算符', description: '理解 and、or、not。', chapter: 4, order: 3, pseudoCode: `is_valid = age > 18 and has_ticket\n`, steps: [textStep('s1', 'and', '两个条件都为真时结果才为真。'), textStep('s2', 'or', '任意一个条件为真即可。'), codeStep('s3', 'not', 'not 可以把真假反过来。', `is_closed = not is_open`)] }),
      createLesson({ id: 'lesson_op_if', title: 'if语句', description: '使用条件控制程序流程。', chapter: 4, order: 4, pseudoCode: `score = 90\nif score >= 60:\n    print("及格")\n`, steps: [textStep('s1', '基本结构', 'if 后面写条件，下一行缩进写要执行的代码。'), codeStep('s2', '加入 else', '条件不满足时可以执行另一段逻辑。', `if score >= 60:\n    print("及格")\nelse:\n    print("未及格")`), textStep('s3', '多分支', '更复杂时可以继续加 elif。')] })
    ]
  }),
  createChapter({
    id: 'chapter_5',
    title: '第五章 循环与函数',
    folderName: '第五章 循环与函数',
    description: '掌握重复执行和代码复用。',
    order: 5,
    lessons: [
      createLesson({ id: 'lesson_loop_while', title: 'while循环', description: '条件满足时重复执行。', chapter: 5, order: 1, pseudoCode: `count = 0\nwhile count < 3:\n    print(count)\n    count += 1\n`, steps: [textStep('s1', 'while 条件', '只要条件为真，循环就会继续。'), codeStep('s2', '计数器', '通常用变量控制循环次数。', `count = 0\nwhile count < 3:\n    count += 1`), textStep('s3', '避免死循环', '要确保条件最终会变成假。')] }),
      createLesson({ id: 'lesson_loop_for', title: 'for循环', description: '遍历一组数据。', chapter: 5, order: 2, pseudoCode: `for item in ["a", "b", "c"]:\n    print(item)\n`, steps: [textStep('s1', '遍历', 'for 适合按顺序访问集合里的元素。'), codeStep('s2', 'range', 'range 常用来生成一串数字。', `for i in range(3):\n    print(i)`), textStep('s3', '和 while 的区别', 'for 更适合“遍历”，while 更适合“条件控制”。')] }),
      createLesson({ id: 'lesson_func_define', title: '定义函数', description: '把重复逻辑封装成函数。', chapter: 5, order: 3, pseudoCode: `def say_hello():\n    print("hello")\n`, steps: [textStep('s1', '为什么用函数', '函数让代码更清晰，也更容易复用。'), codeStep('s2', '定义函数', '使用 def 关键字定义函数。', `def say_hello():\n    print("hello")`), codeStep('s3', '调用函数', '定义后要调用函数才会执行。', `say_hello()`)] }),
      createLesson({ id: 'lesson_func_args_return', title: '函数参数与返回值', description: '让函数接收输入并返回结果。', chapter: 5, order: 4, pseudoCode: `def add(a, b):\n    return a + b\n`, steps: [textStep('s1', '参数', '参数让函数更灵活。'), codeStep('s2', '返回值', 'return 用来把结果带回调用处。', `def add(a, b):\n    return a + b`), codeStep('s3', '使用结果', '可以把返回值保存到变量里。', `result = add(1, 2)`)] })
    ]
  }),
  createChapter({
    id: 'chapter_6',
    title: '第六章 常用数据结构',
    folderName: '第六章 常用数据结构',
    description: '认识列表、元组、字典和集合。',
    order: 6,
    lessons: [
      createLesson({ id: 'lesson_ds_list', title: '列表', description: '列表是最常见的可变序列。', chapter: 6, order: 1, pseudoCode: `fruits = ["apple", "banana"]\n`, steps: [textStep('s1', '列表特点', '列表有顺序，可以增删改。'), codeStep('s2', '访问元素', '用下标访问列表元素。', `fruits[0]`), codeStep('s3', '添加元素', 'append 可以在末尾添加。', `fruits.append("orange")`)] }),
      createLesson({ id: 'lesson_ds_tuple', title: '元组', description: '元组是不可变序列。', chapter: 6, order: 2, pseudoCode: `point = (10, 20)\n`, steps: [textStep('s1', '元组特点', '元组创建后一般不修改。'), codeStep('s2', '读取元素', '元组也能用下标读取。', `point[1]`), textStep('s3', '使用场景', '适合表示固定结构的数据。')] }),
      createLesson({ id: 'lesson_ds_dict', title: '字典', description: '用键值对保存数据。', chapter: 6, order: 3, pseudoCode: `user = {"name": "Tom", "age": 18}\n`, steps: [textStep('s1', '键值对', '字典通过 key 找到 value。'), codeStep('s2', '读取数据', '通过键读取对应值。', `user["name"]`), codeStep('s3', '新增键值', '可以为字典增加新字段。', `user["city"] = "Shanghai"`)] }),
      createLesson({ id: 'lesson_ds_set', title: '集合', description: '集合适合去重。', chapter: 6, order: 4, pseudoCode: `numbers = {1, 2, 3}\n`, steps: [textStep('s1', '集合特点', '集合中的元素不重复。'), codeStep('s2', '自动去重', '重复值放入集合后只会保留一份。', `set([1, 1, 2])`), textStep('s3', '常见场景', '判断成员、去重都很常用。')] })
    ]
  }),
  createChapter({
    id: 'chapter_7',
    title: '第七章 文件与模块',
    folderName: '第七章 文件与模块',
    description: '学习文件操作和模块导入。',
    order: 7,
    lessons: [
      createLesson({ id: 'lesson_file_read', title: '读取文件', description: '打开并读取文本文件。', chapter: 7, order: 1, pseudoCode: `with open("notes.txt", "r", encoding="utf-8") as f:\n    content = f.read()\n`, steps: [textStep('s1', 'open 函数', 'open 用于打开文件。'), codeStep('s2', '读取内容', 'read 可以一次读完整个文件。', `with open("notes.txt", "r", encoding="utf-8") as f:\n    print(f.read())`), textStep('s3', '编码', '处理中文文本时通常显式写 utf-8。')] }),
      createLesson({ id: 'lesson_file_write', title: '写入文件', description: '向文件写入文本内容。', chapter: 7, order: 2, pseudoCode: `with open("notes.txt", "w", encoding="utf-8") as f:\n    f.write("hello")\n`, steps: [textStep('s1', '写模式', '"w" 表示写入模式。'), codeStep('s2', '写入文本', '使用 write 保存内容。', `f.write("hello")`), textStep('s3', '覆盖风险', '写模式会覆盖原文件内容。')] }),
      createLesson({ id: 'lesson_file_import', title: '模块导入', description: '使用 import 组织代码。', chapter: 7, order: 3, pseudoCode: `import math\nprint(math.sqrt(9))\n`, steps: [textStep('s1', '模块是什么', '模块就是别人写好的 Python 文件或库。'), codeStep('s2', '使用 import', '导入后就能使用模块里的功能。', `import math\nprint(math.sqrt(9))`), textStep('s3', '自己的模块', '你也可以把自己的代码拆到多个 .py 文件里。')] }),
      createLesson({ id: 'lesson_file_stdlib', title: '标准库初识', description: '认识 Python 自带的常见库。', chapter: 7, order: 4, pseudoCode: `import random\nprint(random.randint(1, 10))\n`, steps: [textStep('s1', '标准库', 'Python 自带了很多开箱即用的功能。'), codeStep('s2', 'random 示例', 'random 可以生成随机数。', `import random\nprint(random.randint(1, 10))`), textStep('s3', '继续探索', '以后你会接触 datetime、os、pathlib 等标准库。')] })
    ]
  }),
  createChapter({
    id: 'chapter_8',
    title: '第八章 面向对象入门',
    folderName: '第八章 面向对象入门',
    description: '理解类、对象和基础继承。',
    order: 8,
    lessons: [
      createLesson({ id: 'lesson_oop_class', title: '类与对象', description: '理解类和对象的关系。', chapter: 8, order: 1, pseudoCode: `class Dog:\n    pass\n\ndog = Dog()\n`, steps: [textStep('s1', '类', '类像模板，对象像按模板创建出来的实例。'), codeStep('s2', '创建对象', '通过类名后加括号来创建对象。', `dog = Dog()`), textStep('s3', '思维转变', '面向对象是用“对象”来组织程序。')] }),
      createLesson({ id: 'lesson_oop_attrs', title: '属性与方法', description: '为对象添加数据和行为。', chapter: 8, order: 2, pseudoCode: `class Dog:\n    def bark(self):\n        print("wang")\n`, steps: [textStep('s1', '属性', '属性是对象保存的数据。'), textStep('s2', '方法', '方法是对象能做的事。'), codeStep('s3', '调用方法', '对象.方法名() 可以调用行为。', `dog.bark()`)] }),
      createLesson({ id: 'lesson_oop_init', title: '构造方法', description: '通过 __init__ 初始化对象。', chapter: 8, order: 3, pseudoCode: `class Dog:\n    def __init__(self, name):\n        self.name = name\n`, steps: [textStep('s1', '初始化', '__init__ 会在创建对象时自动执行。'), codeStep('s2', '保存属性', '把传入参数保存到 self 上。', `self.name = name`), textStep('s3', '实例化', '创建对象时把参数传进去。')] }),
      createLesson({ id: 'lesson_oop_inherit', title: '简单继承', description: '理解子类复用父类能力。', chapter: 8, order: 4, pseudoCode: `class Animal:\n    pass\n\nclass Dog(Animal):\n    pass\n`, steps: [textStep('s1', '继承概念', '子类可以继承父类已有的属性和方法。'), codeStep('s2', '写法', '在类名括号里写父类名。', `class Dog(Animal):\n    pass`), textStep('s3', '适用场景', '当多个类有共同特征时可以考虑继承。')] })
    ]
  })
]

export { chapters }
