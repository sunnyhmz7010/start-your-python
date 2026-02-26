import type { Chapter, Lesson } from '@/types/lesson'
import { lesson_1_1 } from './第一节部署python'
import { lesson_2_1 } from './第二节HelloWorld'
import { lesson_3_1 } from './第三节Python语法基础'
import { lesson_4_1 } from './第四节变量和数据类型'
import { lesson_5_1 } from './第五节运算符和表达式'
import { lesson_6_1 } from './第六节控制流语句'
import { lesson_7_1 } from './第七节循环结构'
import { lesson_8_1 } from './第八节函数定义和调用'
import { lesson_9_1 } from './第九节列表和元组'
import { lesson_10_1 } from './第十节字典和集合'
import { lesson_11_1 } from './第十一节文件操作'
import { lesson_12_1 } from './第十二节面向对象编程'

// 导入所有课程
const lessons: Lesson[] = [
  lesson_1_1,
  lesson_2_1,
  lesson_3_1,
  lesson_4_1,
  lesson_5_1,
  lesson_6_1,
  lesson_7_1,
  lesson_8_1,
  lesson_9_1,
  lesson_10_1,
  lesson_11_1,
  lesson_12_1
]

// 组织成章节结构
export const chapters: Chapter[] = [
  {
    id: 'ch1',
    title: '第1章：Python环境安装',
    description: '学习如何安装和配置Python开发环境',
    order: 1,
    lessons: lessons.filter(lesson => lesson.chapter === 1)
  },
  {
    id: 'ch2',
    title: '第2章：第一个Python程序',
    description: '编写你的第一个Python程序',
    order: 2,
    lessons: lessons.filter(lesson => lesson.chapter === 2)
  },
  {
    id: 'ch3',
    title: '第3章：Python基础语法',
    description: '学习Python的基本语法规则',
    order: 3,
    lessons: lessons.filter(lesson => lesson.chapter === 3)
  },
  {
    id: 'ch4',
    title: '第4章：变量和数据类型',
    description: '学习Python的变量和基本数据类型',
    order: 4,
    lessons: lessons.filter(lesson => lesson.chapter === 4)
  },
  {
    id: 'ch5',
    title: '第5章：运算符和表达式',
    description: '学习Python的运算符和表达式',
    order: 5,
    lessons: [] // 待添加
  },
  {
    id: 'ch6',
    title: '第6章：控制流语句',
    description: '学习Python的控制流语句',
    order: 6,
    lessons: [] // 待添加
  },
  {
    id: 'ch7',
    title: '第7章：循环结构',
    description: '学习Python的循环结构',
    order: 7,
    lessons: [] // 待添加
  },
  {
    id: 'ch8',
    title: '第8章：函数',
    description: '学习Python的函数定义和使用',
    order: 8,
    lessons: [] // 待添加
  },
  {
    id: 'ch9',
    title: '第9章：列表和元组',
    description: '学习Python的列表和元组',
    order: 9,
    lessons: [] // 待添加
  },
  {
    id: 'ch10',
    title: '第10章：字典和集合',
    description: '学习Python的字典和集合',
    order: 10,
    lessons: [] // 待添加
  },
  {
    id: 'ch11',
    title: '第11章：文件操作',
    description: '学习Python的文件操作',
    order: 11,
    lessons: [] // 待添加
  },
  {
    id: 'ch12',
    title: '第12章：面向对象编程',
    description: '学习Python的面向对象编程',
    order: 12,
    lessons: [] // 待添加
  }
]

export default chapters
