# Start Your Python Course Tree Restructure Design

## Overview

This revision restructures the lesson system so the PyCharm-style `Project` tree feels like a believable Python learning project rather than a course list with visual grouping labels.

The core correction is:

1. chapter folders must appear as Chinese directory names
2. lessons must appear as `.py` files inside those folders
3. each lesson file must map to both:
   - an editor-state pseudo Python source view
   - a run-state teaching content view

The current problem is not only visual. A project tree with one lesson per chapter is too coarse and does not resemble a realistic beginner learning project. The lesson model needs to be reorganized into smaller, more natural study units.

## Product Goal

When a user opens the app, the left `Project` tree should feel like a real beginner Python project:

```text
start-your-python
├─ 第一章 Python环境准备
│  ├─ Python是什么.py
│  ├─ 安装Python.py
│  ├─ 配置开发环境.py
│  └─ 第一次运行Python.py
├─ 第二章 基础语法入门
│  ├─ Hello World.py
│  ├─ 注释与缩进.py
│  ├─ 输入与输出.py
│  └─ 常见语法错误.py
...
```

This should make the learning flow feel like exploring source files rather than clicking a lesson website menu.

## Core UX Model

### 1. Folder-Based Course Tree

The left project tree must represent:

- chapter = folder
- lesson = `.py` file

The tree should preserve progression, but it must do so through directory hierarchy rather than through visual section headers that look like a content catalog.

### 2. Editor-State Lesson Files

Selecting a lesson file should display:

- a tab named after the `.py` file
- pseudo Python code for that lesson
- no forced lesson prose in the main editor area

This is the “opened file” state.

### 3. Run-State Lesson Expansion

Clicking `Run` should switch the selected lesson into run mode:

- the main editor area switches from pseudo code to the lesson’s real teaching content
- the right-side learning navigator appears
- the bottom `Run` tool window logs teaching-oriented run output

This preserves the dual-state model introduced in the previous revision.

## Course Structure Direction

The old model of “one lesson per chapter” should be replaced with a more natural beginner curriculum.

## Proposed chapter structure

### 第一章 Python环境准备

- `Python是什么.py`
- `安装Python.py`
- `配置开发环境.py`
- `第一次运行Python.py`

### 第二章 基础语法入门

- `Hello World.py`
- `注释与缩进.py`
- `输入与输出.py`
- `常见语法错误.py`

### 第三章 变量与数据类型

- `变量基础.py`
- `数字类型.py`
- `字符串类型.py`
- `布尔类型.py`
- `类型转换.py`

### 第四章 运算与判断

- `算术运算符.py`
- `比较运算符.py`
- `逻辑运算符.py`
- `if语句.py`

### 第五章 循环与函数

- `while循环.py`
- `for循环.py`
- `定义函数.py`
- `函数参数与返回值.py`

### 第六章 常用数据结构

- `列表.py`
- `元组.py`
- `字典.py`
- `集合.py`

### 第七章 文件与模块

- `读取文件.py`
- `写入文件.py`
- `模块导入.py`
- `标准库初识.py`

### 第八章 面向对象入门

- `类与对象.py`
- `属性与方法.py`
- `构造方法.py`
- `简单继承.py`

## Content Strategy

This revision should use the current lesson material as the base, but it should also fill obvious beginner gaps.

### Reuse priority

Whenever possible:

- split existing large lessons into smaller files
- preserve existing explanations and examples
- preserve the current pseudo-code approach

### Additions allowed

The revision should add small but important missing beginner units where the old structure is too sparse, such as:

- comments and indentation
- input and output
- common syntax mistakes
- module import basics

The goal is not to write a giant curriculum from scratch. The goal is to turn the current material into a believable file-based learning project.

## Data Model Direction

The lesson data model should be reorganized so it can represent:

- chapter folder metadata
- lesson file metadata
- editor-state pseudo code
- run-state teaching steps

The selected lesson still maps to one content object, but that object now needs to render naturally in both states.

## Visual Direction

The `Project` tree should look more like a real IDE hierarchy:

- root project folder
- nested chapter folders
- lesson files with `.py` names

The tree should avoid:

- web-style section cards
- visible lesson duration badges inside file rows
- oversized visual grouping blocks

The tree should feel denser, quieter, and more file-system-like.

## Functional Scope

This revision should implement:

1. chapter folders as Chinese directory names
2. lesson files as `.py`
3. reorganized multi-lesson course data
4. lesson selection from a real tree
5. editor-state pseudo code rendering per lesson
6. run-state teaching content rendering per lesson
7. bottom `Run` output that matches the selected lesson

## Non-Goals

This revision will not include:

- full curriculum authoring for every possible beginner topic
- real file IO inside the app
- executing real Python code
- cloud-delivered lessons
- advanced exercises or grading

## Success Criteria

This revision is successful if:

1. the left project tree feels like a real file hierarchy
2. chapters no longer look like superficial group headers
3. lesson granularity feels natural for beginners
4. opening a lesson file and running it feels coherent
5. the app remains usable after the curriculum restructure

## Risks

1. splitting lessons too mechanically could create thin or repetitive lesson files
2. adding too much new content in one pass could slow down delivery
3. changing the lesson tree without updating persistence mappings could break resume behavior
4. trying to perfect the entire curriculum at once could derail the UI task

## Recommended Next Step

Write an implementation plan focused on:

1. course data restructuring
2. Chinese folder + `.py` tree rendering
3. lesson id and persistence migration
4. editor/run content mapping for the new lesson units
5. verification of selection, run, and progress behavior
