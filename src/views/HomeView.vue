<template>
  <div class="pycharm-container">
    <!-- 顶部菜单栏 -->
    <div class="menu-bar">
      <div class="menu-item">文件(<u>F</u>)</div>
      <div class="menu-item">编辑(<u>E</u>)</div>
      <div class="menu-item">视图(<u>V</u>)</div>
      <div class="menu-item">导航(<u>N</u>)</div>
      <div class="menu-item">代码(<u>C</u>)</div>
      <div class="menu-item">重构(<u>R</u>)</div>
      <div class="menu-item">运行(<u>U</u>)</div>
      <div class="menu-item">工具(<u>T</u>)</div>
      <div class="menu-item">VCS</div>
      <div class="menu-item">窗口(<u>W</u>)</div>
      <div class="menu-item">帮助(<u>H</u>)</div>
    </div>

    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-group">
        <button class="toolbar-btn" title="打开文件 (Ctrl+O)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M2 3h4.586L8 4.414 8.414 4H14v9H2V3zm0-1a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H8.414l-1-1H2z"/></svg>
        </button>
        <button class="toolbar-btn" title="全部保存 (Ctrl+S)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M4 1h8l3 3v10a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm1 1v3h6V2H5zm5 5a2 2 0 100 4 2 2 0 000-4z"/></svg>
        </button>
      </div>
      <div class="toolbar-separator"></div>
      <div class="toolbar-group">
        <button class="toolbar-btn" title="撤销 (Ctrl+Z)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M7 4v1H4v2h1V6h2v1l2-1.5L7 4z"/><path fill="currentColor" d="M8 7a4 4 0 110 8 4 4 0 010-8zm0 1a3 3 0 100 6 3 3 0 000-6z"/></svg>
        </button>
        <button class="toolbar-btn" title="重做 (Ctrl+Shift+Z)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M9 4v1h3v2h-1V6H9v1L7 5.5 9 4z"/><path fill="currentColor" d="M8 7a4 4 0 110 8 4 4 0 010-8zm0 1a3 3 0 100 6 3 3 0 000-6z"/></svg>
        </button>
      </div>
      <div class="toolbar-separator"></div>
      <div class="toolbar-group">
        <button class="toolbar-btn run-btn" @click="runLesson" title="运行 (Shift+F10)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M4 3l10 5-10 5V3z"/></svg>
          <span>运行</span>
        </button>
        <button class="toolbar-btn debug-btn" title="调试 (Shift+F9)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M5 2h6v2h1v2h1v3h-1v1h1v3h-1v1h-1v1H6v-1H5v-1H4v-3H3V9H2V6h1V4h1V2h1zm1 1v2h4V3H6zM5 6v1h1V6H5zm5 0v1h1V6h-1zm-3 3v4h1V9H7z"/></svg>
        </button>
        <button class="toolbar-btn stop-btn" title="停止 (Ctrl+F2)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M4 4h8v8H4z"/></svg>
        </button>
      </div>
      <div class="toolbar-separator"></div>
      <div class="toolbar-group">
        <button class="toolbar-btn" title="全局搜索 (Shift+Shift)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M10.5 1a4.5 4.5 0 013.5 7.36V9l.35.35 2 2 .15.35v.59l-.5.5-.5.5h-.59l-.35-.15-2-2L12 10.5h-.64A4.5 4.5 0 1110.5 1zm0 1a3.5 3.5 0 102.46 6h.54l.35.15 1.5 1.5.5-.5-1.5-1.5L14 7.36V6.8A3.5 3.5 0 0010.5 2z"/></svg>
        </button>
        <button class="toolbar-btn" title="设置 (Ctrl+Alt+S)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM8 1l.94.12.35.82 1.12.47.87-.35.7.63-.35.87.47 1.12.82.35L13 7v1l-.12.94-.82.35-.47 1.12.35.87-.63.7-.87-.35-1.12.47-.35.82L8 15H7l-.94-.12-.35-.82-1.12-.47-.87.35-.7-.63.35-.87-.47-1.12-.82-.35L2 9V8l.12-.94.82-.35.47-1.12-.35-.87.63-.7.87.35 1.12-.47.35-.82L7 1h1zm0 1l-.59.08-.28.65-1.53.63-.69-.28-.56.5.28.69-.63 1.53-.65.28L4 7v1l.08.59.65.28.63 1.53-.28.69.5.56.69-.28 1.53.63.28.65L7 14h1l.59-.08.28-.65 1.53-.63.69.28.56-.5-.28-.69.63-1.53.65-.28L12 9V8l-.08-.59-.65-.28-.63-1.53.28-.69-.5-.56-.69.28-1.53-.63-.28-.65L8 2z"/></svg>
        </button>
      </div>
      <div class="toolbar-right">
        <span class="project-name">Start Your Python</span>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 左侧工具条 -->
      <div class="left-stripe">
        <div class="stripe-btn active" title="项目 (Alt+1)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M2 2h5v5H2V2zm1 1v3h3V3H3zm6-1h5v5H9V2zm1 1v3h3V3h-3zM2 9h5v5H2V9zm1 1v3h3v-3H3z"/></svg>
        </div>
        <div class="stripe-btn" title="收藏 (Alt+2)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M8 1l2.35 4.76 5.26.76-3.8 3.71.9 5.24L8 13.13l-4.71 2.47.9-5.24L.39 6.52l5.26-.76L8 1z"/></svg>
        </div>
        <div class="stripe-btn" title="结构 (Alt+7)">
          <svg viewBox="0 0 16 16" width="16" height="16"><path fill="currentColor" d="M3 2h10v1H3V2zm0 4h10v1H3V6zm0 4h10v1H3v-1zm0 4h6v1H3v-1z"/></svg>
        </div>
      </div>

      <!-- 左侧项目面板 -->
      <div class="project-panel">
        <div class="panel-title-bar">
          <span class="panel-title">项目</span>
          <div class="panel-actions">
            <button class="panel-action-btn" title="刷新">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M13 8a5 5 0 01-9 3l1-1a3.5 3.5 0 007-2 3.5 3.5 0 00-7-2l1-1a5 5 0 008 3z"/></svg>
            </button>
            <button class="panel-action-btn" title="全部折叠">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 4h12v1H2V4zm0 4h12v1H2V8zm0 4h12v1H2v-1z"/></svg>
            </button>
            <button class="panel-action-btn" title="设置">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM8 1l.94.12.35.82 1.12.47.87-.35.7.63-.35.87.47 1.12.82.35L13 7v1l-.12.94-.82.35-.47 1.12.35.87-.63.7-.87-.35-1.12.47-.35.82L8 15H7l-.94-.12-.35-.82-1.12-.47-.87.35-.7-.63.35-.87-.47-1.12-.82-.35L2 9V8l.12-.94.82-.35.47-1.12-.35-.87.63-.7.87.35 1.12-.47.35-.82L7 1h1zm0 1l-.59.08-.28.65-1.53.63-.69-.28-.56.5.28.69-.63 1.53-.65.28L4 7v1l.08.59.65.28.63 1.53-.28.69.5.56.69-.28 1.53.63.28.65L7 14h1l.59-.08.28-.65 1.53-.63.69.28.56-.5-.28-.69.63-1.53.65-.28L12 9V8l-.08-.59-.65-.28-.63-1.53.28-.69-.5-.56-.69.28-1.53-.63-.28-.65L8 2z"/></svg>
            </button>
          </div>
        </div>
        <div class="project-tree">
          <div class="tree-root">
            <div class="tree-item project-root" @click="toggleProject">
              <span class="tree-icon">{{ projectExpanded ? '▼' : '▶' }}</span>
              <svg class="tree-folder-icon" viewBox="0 0 16 16" width="16" height="16"><path fill="#f0c674" d="M1 3h6l1 1h7v10H1V3zm1 1v9h12V5H7.586l-1-1H2z"/></svg>
              <span class="tree-name">Start Your Python</span>
            </div>
            <div v-if="projectExpanded" class="tree-children">
              <div v-for="chapter in chapters" :key="chapter.id" class="tree-item chapter-item">
                <div class="tree-node" @click="toggleChapter(chapter.id)">
                  <span class="tree-icon">{{ expandedChapters.includes(chapter.id) ? '▼' : '▶' }}</span>
                  <svg class="tree-folder-icon" viewBox="0 0 16 16" width="16" height="16"><path fill="#f0c674" d="M1 3h6l1 1h7v10H1V3zm1 1v9h12V5H7.586l-1-1H2z"/></svg>
                  <span class="tree-name">{{ chapter.title }}</span>
                </div>
                <div v-if="expandedChapters.includes(chapter.id)" class="tree-children">
                  <div 
                    v-for="lesson in chapter.lessons" 
                    :key="lesson.id"
                    class="tree-item lesson-item"
                    :class="{ 'selected': currentLesson?.id === lesson.id }"
                    @click="selectLesson(lesson)"
                  >
                    <span class="tree-icon"></span>
                    <svg class="tree-file-icon" viewBox="0 0 16 16" width="16" height="16"><path fill="#5c9cdc" d="M2 1h7l1 1h1l1 1v11a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm0 1v12h10V4h-2V2H2z"/><path fill="#5c9cdc" d="M4 6h6v1H4V6zm0 2h6v1H4V8zm0 2h4v1H4v-1z"/></svg>
                    <span class="tree-name">{{ lesson.title }}.py</span>
                    <span v-if="isLessonCompleted(lesson.id)" class="status-icon">✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中间编辑器区域 -->
      <div class="editor-area">
        <!-- 编辑器标签栏 -->
        <div class="editor-tabs">
          <div v-if="currentLesson" class="editor-tab active">
            <svg class="tab-icon" viewBox="0 0 16 16" width="14" height="14"><path fill="#5c9cdc" d="M2 1h7l1 1h1l1 1v11a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm0 1v12h10V4h-2V2H2z"/></svg>
            <span class="tab-name">{{ currentLesson.title }}.py</span>
            <button class="tab-close">×</button>
          </div>
          <div v-else class="editor-tab empty">
            <span class="tab-name">欢迎使用 PyCharm</span>
          </div>
          <div class="tabs-actions">
            <button class="tab-action-btn" title="Split">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M1 1h6v6H1V1zm8 0h6v6H9V1zM1 9h6v6H1V9zm8 0h6v6H9V9z"/></svg>
            </button>
            <button class="tab-action-btn" title="Maximize">
              <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M3 3h10v10H3V3zm1 1v8h8V4H4z"/></svg>
            </button>
          </div>
        </div>

        <!-- 面包屑导航 -->
        <div v-if="currentLesson" class="breadcrumb">
          <span class="breadcrumb-item">Start Your Python</span>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-item">{{ currentChapter?.title }}</span>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-item current">{{ currentLesson.title }}.py</span>
        </div>

        <!-- 编辑器内容 -->
        <div class="editor-content">
          <div v-if="currentLesson" class="code-area">
            <div ref="editorContainer" class="codemirror-editor"></div>
          </div>
          <div v-else class="welcome-screen">
            <div class="welcome-content">
              <h1>欢迎使用 PyCharm</h1>
              <div class="welcome-section">
                <h3>开始学习</h3>
                <p>从左侧项目面板选择一个课程开始学习</p>
              </div>
              <div class="welcome-section">
                <h3>课程内容</h3>
                <ul>
                  <li>第1章：Python环境安装</li>
                  <li>第2章：第一个Python程序</li>
                  <li>第3章：Python基础语法</li>
                  <li>第4章：变量和数据类型</li>
                  <li>第5章：运算符和表达式</li>
                  <li>第6章：控制流语句</li>
                  <li>第7章：循环结构</li>
                  <li>第8章：函数</li>
                  <li>第9章：列表和元组</li>
                  <li>第10章：字典和集合</li>
                  <li>第11章：文件操作</li>
                  <li>第12章：面向对象编程</li>
                </ul>
              </div>
              <div class="welcome-section">
                <h3>快捷键</h3>
                <p><kbd>Shift</kbd> + <kbd>F10</kbd> 运行课程</p>
                <p><kbd>Ctrl</kbd> + <kbd>S</kbd> 保存进度</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧步骤面板 -->
        <div v-if="currentLesson" class="steps-panel" :style="{ width: stepsPanelWidth + 'px' }">
          <div class="steps-resize-handle" @mousedown="startResizeStepsPanel"></div>
          <div class="panel-title-bar">
            <span class="panel-title">学习步骤</span>
            <div class="panel-actions">
              <button class="panel-action-btn" title="关闭" @click="closeStepsPanel">×</button>
            </div>
          </div>
          <div class="steps-content">
            <div 
              v-for="(step, index) in currentLesson.steps" 
              :key="step.id"
              class="step-item"
              :class="{ 'active': index === currentStepIndex, 'completed': index < currentStepIndex }"
              @click="gotoStep(index)"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-info">
                <div class="step-title">{{ step.title }}</div>
                <div class="step-type">{{ getStepTypeName(step.type) }}</div>
              </div>
            </div>
          </div>
          <div class="step-detail" v-if="currentStep">
            <div class="step-detail-header">
              <h4>{{ currentStep.title }}</h4>
            </div>
            <div class="step-detail-content">
              <div v-if="currentStep.type === 'text'" class="step-text">
                {{ currentStep.content }}
              </div>
              <div v-else-if="currentStep.type === 'code'" class="step-code">
                <pre><code>{{ currentStep.code }}</code></pre>
                <div v-if="currentStep.hint" class="step-hint">
                  💡 {{ currentStep.hint }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部工具栏 -->
    <div class="bottom-bar">
      <div class="bottom-tabs">
        <div class="bottom-tab" :class="{ 'active': activeBottomTab === 'terminal' }" @click="activeBottomTab = 'terminal'">
          <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 3h12v10H2V3zm1 1v8h10V4H3zm1 2h2v1H4V6zm0 2h1v1H4V8z"/></svg>
          <span>终端</span>
        </div>
        <div class="bottom-tab" :class="{ 'active': activeBottomTab === 'todo' }" @click="activeBottomTab = 'todo'">
          <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 2h12v12H2V2zm1 1v10h10V3H3zm2 2h6v1H5V5zm0 3h6v1H5V8zm0 3h4v1H5v-1z"/></svg>
          <span>TODO</span>
          <span class="badge">3</span>
        </div>
        <div class="bottom-tab" :class="{ 'active': activeBottomTab === 'problems' }" @click="activeBottomTab = 'problems'">
          <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M8 1l7 14H1L8 1zm0 2L2.5 14h11L8 3zM7 7h2v4H7V7zm0 5h2v2H7v-2z"/></svg>
          <span>问题</span>
          <span class="badge success">0</span>
        </div>
        <div class="bottom-tab" :class="{ 'active': activeBottomTab === 'console' }" @click="activeBottomTab = 'console'">
          <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M2 3h12v10H2V3zm1 1v8h10V4H3zm1 2h2v1H4V6zm0 2h1v1H4V8z"/></svg>
          <span>Python 控制台</span>
        </div>
        <div class="bottom-tab" :class="{ 'active': activeBottomTab === 'run' }" @click="activeBottomTab = 'run'">
          <svg viewBox="0 0 16 16" width="14" height="14"><path fill="currentColor" d="M4 3l10 5-10 5V3z"/></svg>
          <span>运行</span>
        </div>
      </div>
      <div class="bottom-content">
        <div v-if="activeBottomTab === 'terminal'" class="terminal-content">
          <div class="terminal-output">
            <pre>{{ consoleOutput || 'Python 3.12.0 (default, Jan 1 2024, 00:00:00)\n[GCC 9.4.0] on linux\nType "help", "copyright", "credits" or "license" for more information.\n>>>' }}</pre>
          </div>
        </div>
        <div v-else-if="activeBottomTab === 'console'" class="console-content">
          <div class="console-output">
            <pre>{{ consoleOutput || 'Python 控制台已就绪' }}</pre>
          </div>
        </div>
        <div v-else class="empty-content">
          <p>{{ activeBottomTab === 'todo' ? '没有待办事项' : activeBottomTab === 'problems' ? '没有发现问题' : '准备就绪' }}</p>
        </div>
      </div>
      <div class="bottom-resize"></div>
    </div>

    <!-- 状态栏 -->
    <div class="status-bar">
      <div class="status-left">
        <span class="status-item success">
          <svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1a6 6 0 100 12A6 6 0 008 2zm3.35 3.35l.71.71L7 11.12l-2.35-2.35.7-.71L7 9.71l4.35-4.36z"/></svg>
          {{ currentLesson?.title || '未选择课程' }}
        </span>
        <span class="status-separator"></span>
        <span class="status-item">步骤: {{ currentStepIndex + 1 }}/{{ currentLesson?.steps.length || 0 }}</span>
        <span class="status-separator"></span>
        <span class="status-item">完成率: {{ completionRate }}%</span>
      </div>
      <div class="status-right">
        <span class="status-item">
          <svg viewBox="0 0 16 16" width="12" height="12"><path fill="currentColor" d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 1a6 6 0 100 12A6 6 0 008 2z"/></svg>
          Python 3.12
        </span>
        <span class="status-separator"></span>
        <span class="status-item">UTF-8</span>
        <span class="status-separator"></span>
        <span class="status-item">LF</span>
        <span class="status-separator"></span>
        <span class="status-item">空格: 4</span>
        <span class="status-separator"></span>
        <span class="status-item">行: 1, 列: 1</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useLessonStore } from '@/stores/lesson'
import { useProgressStore } from '@/stores/progress'
import type { Lesson } from '@/types/lesson'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine } from '@codemirror/view'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap } from '@codemirror/commands'

const lessonStore = useLessonStore()
const progressStore = useProgressStore()

const editorContainer = ref<HTMLElement | null>(null)
let editor: EditorView | null = null

const projectExpanded = ref(true)
const expandedChapters = ref<string[]>([])
const activeBottomTab = ref('terminal')
const stepsPanelWidth = ref(280)
const showStepsPanel = ref(true)
const isResizing = ref(false)

const chapters = computed(() => lessonStore.chapters)
const currentLesson = computed(() => lessonStore.currentLesson)
const currentStepIndex = computed(() => lessonStore.currentStepIndex)
const consoleOutput = computed(() => lessonStore.consoleOutput)
const completionRate = computed(() => {
  const totalLessons = lessonStore.allLessons.length
  return Math.round(progressStore.getCompletionRate(totalLessons) * 100)
})

const currentChapter = computed(() => {
  if (!currentLesson.value) return null
  return chapters.value.find(ch => ch.lessons.some(l => l.id === currentLesson.value?.id))
})

const currentStep = computed(() => {
  if (!currentLesson.value || currentStepIndex.value >= currentLesson.value.steps.length) {
    return null
  }
  return currentLesson.value.steps[currentStepIndex.value]
})

const toggleProject = () => {
  projectExpanded.value = !projectExpanded.value
}

const toggleChapter = (chapterId: string) => {
  const index = expandedChapters.value.indexOf(chapterId)
  if (index > -1) {
    expandedChapters.value.splice(index, 1)
  } else {
    expandedChapters.value.push(chapterId)
  }
}

const selectLesson = (lesson: Lesson) => {
  lessonStore.selectLesson(lesson)
  nextTick(() => {
    createEditor()
  })
}

const createEditor = () => {
  if (!editorContainer.value || !currentLesson.value) return
  
  if (editor) {
    editor.destroy()
  }
  
  const state = EditorState.create({
    doc: currentLesson.value.pseudoCode,
    extensions: [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      python(),
      oneDark,
      keymap.of(defaultKeymap),
      EditorView.updateListener.of(update => {
        if (update.docChanged && currentLesson.value) {
          // Save editor content
        }
      })
    ]
  })
  
  editor = new EditorView({
    state,
    parent: editorContainer.value
  })
}

const runLesson = () => {
  lessonStore.runLesson()
  if (currentLesson.value) {
    progressStore.updateCurrentStep(currentLesson.value.id, 0)
  }
}

const gotoStep = (index: number) => {
  lessonStore.currentStepIndex = index
  if (currentLesson.value) {
    progressStore.updateCurrentStep(currentLesson.value.id, index)
  }
}

const isLessonCompleted = (lessonId: string): boolean => {
  return progressStore.isLessonCompleted(lessonId)
}

const getStepTypeName = (type: string): string => {
  const names: Record<string, string> = {
    'text': '文本',
    'code': '代码',
    'image': '图片',
    'video': '视频',
    'quiz': '测验',
    'interactive': '互动'
  }
  return names[type] || '文本'
}

const startResizeStepsPanel = (e: MouseEvent) => {
  e.preventDefault()
  isResizing.value = true
  
  const onMouseMove = (e: MouseEvent) => {
    if (!isResizing.value) return
    const newWidth = window.innerWidth - e.clientX - 8
    if (newWidth >= 200 && newWidth <= 500) {
      stepsPanelWidth.value = newWidth
    }
  }
  
  const onMouseUp = () => {
    isResizing.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }
  
  document.body.style.cursor = 'ew-resize'
  document.body.style.userSelect = 'none'
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const closeStepsPanel = () => {
  showStepsPanel.value = false
}

watch(currentLesson, () => {
  if (currentLesson.value) {
    nextTick(() => {
      createEditor()
    })
  }
})

onMounted(() => {
  lessonStore.loadLessons()
  progressStore.loadProgress()
  expandedChapters.value = chapters.value.map(ch => ch.id)
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}
::-webkit-scrollbar-track {
  background: #2b2b2b;
}
::-webkit-scrollbar-thumb {
  background: #43464a;
  border-radius: 0;
  border: 3px solid #2b2b2b;
}
::-webkit-scrollbar-thumb:hover {
  background: #4b4e52;
}
::-webkit-scrollbar-corner {
  background: #2b2b2b;
}

.pycharm-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #2b2b2b;
  color: #a9b7c6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 13px;
  overflow: hidden;
}

/* Menu Bar */
.menu-bar {
  height: 28px;
  background-color: #3C3F41;
  display: flex;
  align-items: center;
  padding: 0 4px;
  user-select: none;
}

.menu-item {
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 13px;
  color: #bbb;
}

.menu-item:hover {
  background-color: #4C5052;
  color: #fff;
}

.menu-item u {
  text-decoration: none;
}

/* Toolbar */
.toolbar {
  height: 36px;
  background-color: #3C3F41;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-bottom: 1px solid #323232;
  gap: 4px;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  color: #afb1b3;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.toolbar-btn:hover {
  background-color: #4c5052;
}

.toolbar-btn.run-btn {
  padding: 0 8px;
  color: #59a869;
}
.toolbar-btn.run-btn span {
  color: #afb1b3;
}
.toolbar-btn.run-btn:hover {
  background-color: #4c5052;
}

.toolbar-btn.debug-btn { color: #3592c4; }
.toolbar-btn.stop-btn { color: #e55252; }

.toolbar-separator {
  width: 1px;
  height: 20px;
  background-color: #323232;
  margin: 0 6px;
}

.toolbar-right {
  margin-left: auto;
  padding-right: 8px;
}

.project-name {
  font-weight: 500;
  color: #afb1b3;
}

/* Main Content */
.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Left Stripe */
.left-stripe {
  width: 36px;
  background-color: #3C3F41;
  border-right: 1px solid #323232;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
}

.stripe-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #afb1b3;
  cursor: pointer;
  margin-bottom: 4px;
}

.stripe-btn:hover {
  background-color: #4c5052;
}

.stripe-btn.active {
  background-color: #4c5052;
  color: #ffffff;
}

/* Project Panel */
.project-panel {
  width: 250px;
  background-color: #3C3F41;
  border-right: 1px solid #323232;
  display: flex;
  flex-direction: column;
}

.panel-title-bar {
  height: 28px;
  background-color: #3c3f41;
  border-bottom: 1px solid #323232;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 13px;
  color: #afb1b3;
}

.panel-actions {
  display: flex;
  gap: 2px;
}

.panel-action-btn {
  background: transparent;
  border: none;
  color: #afb1b3;
  cursor: pointer;
  border-radius: 3px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel-action-btn:hover {
  background-color: #4c5052;
}

.project-tree {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.tree-root {
  user-select: none;
}

.tree-item, .tree-node {
  display: flex;
  align-items: center;
  padding: 2px 4px 2px 8px;
  cursor: pointer;
  height: 24px;
}

.tree-item:hover, .tree-node:hover {
  background-color: #2d2f30;
}

.tree-item.selected {
  background-color: #2f65ca;
  color: white;
}

.tree-icon {
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  margin-right: 2px;
  color: #777;
}

.tree-folder-icon, .tree-file-icon {
  margin-right: 4px;
  flex-shrink: 0;
}

.tree-name {
  flex: 1;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-children {
  margin-left: 12px;
}

.status-icon {
  color: #59a869;
  font-size: 10px;
  margin-left: 4px;
}

/* Editor Area */
.editor-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  background-color: #2b2b2b;
}

/* Editor Tabs */
.editor-tabs {
  height: 34px;
  background-color: #3C3F41;
  display: flex;
  align-items: flex-end;
  border-bottom: none;
  overflow: hidden;
}

.editor-tab {
  height: 34px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 12px;
  background-color: #3c3f41;
  border-right: 1px solid #323232;
  border-top: 3px solid transparent;
  color: #afb1b3;
  cursor: pointer;
  min-width: 120px;
  font-size: 13px;
}

.editor-tab:hover {
  background-color: #2d2f30;
}

.editor-tab.active {
  background-color: #2b2b2b;
  color: #a9b7c6;
  border-top: 3px solid #4a88c7;
  border-right: 1px solid #323232;
}

.tab-icon { margin-right: 6px; }
.tab-name { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.tab-close {
  background: transparent; border: none; color: #777; cursor: pointer;
  font-size: 14px; margin-left: 4px; width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center; border-radius: 3px;
}
.tab-close:hover { background-color: rgba(255, 255, 255, 0.1); color: #d4d4d4; }
.editor-tab.empty { cursor: default; }
.editor-tab.empty:hover { background-color: transparent; }

.tabs-actions { margin-left: auto; display: flex; align-items: center; padding: 0 4px; height: 100%; }
.tab-action-btn { background: transparent; border: none; color: #afb1b3; cursor: pointer; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 3px; }
.tab-action-btn:hover { background-color: #4c5052; }

/* Breadcrumb */
.breadcrumb {
  height: 24px; background-color: #2b2b2b; border-bottom: 1px solid #323232;
  display: flex; align-items: center; padding: 0 12px; color: #afb1b3;
}
.breadcrumb-item { cursor: pointer; }
.breadcrumb-item:hover { text-decoration: underline; }
.breadcrumb-item.current { color: #a9b7c6; cursor: default; }
.breadcrumb-item.current:hover { text-decoration: none; }
.breadcrumb-separator { margin: 0 6px; color: #777; }

/* Editor Content */
.editor-content { flex: 1; display: flex; overflow: hidden; background-color: #2b2b2b; }
.code-area { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
.codemirror-editor { flex: 1; overflow: auto; font-family: 'JetBrains Mono', Consolas, Menlo, monospace; font-size: 14px; }

/* Welcome Screen */
.welcome-screen { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; color: #afb1b3; }
.welcome-content { max-width: 600px; width: 100%; }
.welcome-content h1 { font-weight: normal; margin-bottom: 30px; color: #a9b7c6; }
.welcome-section { margin-bottom: 24px; }
.welcome-section h3 { font-weight: normal; color: #a9b7c6; margin-bottom: 12px; border-bottom: 1px solid #323232; padding-bottom: 4px; }
.welcome-section ul { list-style: none; padding: 0; }
.welcome-section li { padding: 4px 0; }
kbd { background-color: #3c3f41; padding: 2px 6px; border-radius: 3px; font-family: monospace; border: 1px solid #323232; font-size: 11px; }

/* Steps Panel */
.steps-panel { min-width: 200px; max-width: 500px; background-color: #2b2b2b; border-left: 1px solid #323232; display: flex; flex-direction: column; position: relative; }
.steps-resize-handle { position: absolute; left: -2px; top: 0; bottom: 0; width: 4px; cursor: ew-resize; background-color: transparent; z-index: 10; }
.steps-resize-handle:hover { background-color: #4a88c7; }
.steps-content { flex: 1; overflow-y: auto; padding: 8px; }
.step-item { display: flex; align-items: center; padding: 6px 8px; margin-bottom: 2px; border-radius: 4px; cursor: pointer; }
.step-item:hover { background-color: #2d2f30; }
.step-item.active { background-color: #2f65ca; color: white; }
.step-item.completed { opacity: 0.7; }
.step-number { width: 20px; height: 20px; background-color: #3c3f41; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; margin-right: 8px; flex-shrink: 0; }
.step-item.active .step-number { background-color: #4a88c7; color: white; }
.step-info { flex: 1; min-width: 0; }
.step-title { font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.step-type { font-size: 10px; color: #777; }
.step-item.active .step-type { color: #a9b7c6; }

.step-detail { height: 40%; border-top: 1px solid #323232; display: flex; flex-direction: column; background-color: #2b2b2b; }
.step-detail-header { padding: 8px 12px; border-bottom: 1px solid #323232; background-color: #3c3f41; }
.step-detail-header h4 { margin: 0; font-weight: normal; font-size: 13px; }
.step-detail-content { flex: 1; overflow-y: auto; padding: 12px; font-size: 13px; line-height: 1.5; }
.step-code { background-color: #1e1f22; border-radius: 4px; padding: 8px; margin-top: 8px; overflow-x: auto; }
.step-code pre { margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
.step-hint { margin-top: 8px; padding: 8px; background-color: rgba(74, 136, 199, 0.1); border-left: 3px solid #4a88c7; font-size: 12px; }

/* Bottom Bar (Tool Window Area) */
.bottom-bar { 
  height: 250px; 
  background-color: #2b2b2b; 
  border-top: 1px solid #323232; 
  display: flex; 
  flex-direction: column; 
  position: relative;
}

.bottom-tabs { 
  height: 28px; 
  background-color: #3C3F41; 
  border-bottom: 1px solid #323232; 
  display: flex; 
  align-items: center; 
}

.bottom-tab { 
  display: flex; 
  align-items: center; 
  padding: 0 12px; 
  cursor: pointer; 
  color: #afb1b3; 
  height: 100%;
  border-right: 1px solid #323232; 
}
.bottom-tab:hover { background-color: #2d2f30; }
.bottom-tab.active { background-color: #4c5052; color: #ffffff; }
.bottom-tab svg { margin-right: 4px; }

.badge {
  background-color: #555;
  color: white;
  border-radius: 10px;
  padding: 0 5px;
  font-size: 10px;
  margin-left: 6px;
}
.badge.success { background-color: #4a9c6d; }

.bottom-content {
  flex: 1;
  overflow: hidden;
  background-color: #2b2b2b;
}

.terminal-content, .console-content {
  height: 100%;
  padding: 8px 12px;
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 13px;
  overflow-y: auto;
}

.terminal-output pre, .console-output pre {
  margin: 0;
  color: #a9b7c6;
  white-space: pre-wrap;
  word-break: break-all;
}

.empty-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
}

.bottom-resize {
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 4px;
  cursor: ns-resize;
  z-index: 10;
}
.bottom-resize:hover { background-color: #4A88C7; }

/* Status Bar */
.status-bar { height: 24px; background-color: #3C3F41; border-top: 1px solid #323232; display: flex; align-items: center; justify-content: space-between; padding: 0 10px; font-size: 11px; color: #afb1b3; }
.status-left, .status-right { display: flex; align-items: center; }
.status-item { display: flex; align-items: center; padding: 0 4px; cursor: pointer; height: 22px; }
.status-item:hover { background-color: rgba(255, 255, 255, 0.1); }
.status-item svg { margin-right: 4px; }
.status-item.success { color: #59a869; }
.status-separator { width: 1px; height: 12px; background-color: #4c5052; margin: 0 4px; }

/* Override CodeMirror styles for Darcula */
:deep(.cm-editor) { height: 100%; outline: none; }
:deep(.cm-scroller) { font-family: 'JetBrains Mono', Consolas, Menlo, monospace !important; }
:deep(.cm-gutters) { background-color: #313335 !important; color: #606366 !important; border-right: 1px solid #323232 !important; }
:deep(.cm-activeLineGutter) { background-color: #323232 !important; color: #a4a3a3 !important; }
:deep(.cm-activeLine) { background-color: #323232 !important; }
</style>