<template>
  <div class="run-view" data-testid="run-lesson-view">
    <div v-if="lesson" class="run-shell">
      <div class="run-header">
        <span class="badge">课程</span>
        <h2>{{ lesson.title }}</h2>
        <p>{{ lesson.description }}</p>
      </div>

      <div class="run-card">
        <p class="label">当前步骤</p>
        <h3>{{ step?.title ?? '准备开始' }}</h3>
        <MarkdownContent class="content" :source="step?.content ?? '点击右侧步骤开始学习。'" />
        <QuizStep v-if="step?.type === 'quiz'" :step="step" @answer="$emit('answerQuiz', $event)" />
      </div>

      <div v-if="step?.code" class="run-card code">
        <div class="code-header">
          <p class="label">示例代码</p>
          <button
            data-testid="step-run-button"
            type="button"
            class="step-run-button"
            :disabled="isPythonRunning"
            @click="$emit('runStepCode', step)"
          >
            {{ runButtonLabel }}
          </button>
        </div>
        <pre><code>{{ step.runnableCode ?? step.code }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MarkdownContent from '@/components/content/MarkdownContent.vue'
import QuizStep from '@/components/content/QuizStep.vue'
import type { Lesson, LessonStep, QuizAnswerPayload } from '@/types/lesson'
import type { PythonRuntimeStatus } from '@/types/runtime'

const props = defineProps<{
  lesson: Lesson | null
  step: LessonStep | null
  isPythonRunning: boolean
  pythonStatus: PythonRuntimeStatus
}>()

defineEmits<{
  runStepCode: [step: LessonStep]
  answerQuiz: [payload: QuizAnswerPayload]
}>()

const runButtonLabel = computed(() => {
  if (props.pythonStatus === 'checking') return '检查中...'
  if (props.pythonStatus === 'starting') return '启动中...'
  if (props.pythonStatus === 'running') return '运行中...'
  return '运行该代码'
})
</script>

<style scoped>
.run-view {
  flex: 1;
  min-height: 0;
  overflow: auto;
  background: #1f2229;
  padding: 18px;
}

.run-header h2,
.run-card h3 {
  margin: 0;
  color: #edf3fb;
}

.run-header p,
.content {
  color: #c7cfda;
  line-height: 1.6;
}

.badge,
.label {
  font-size: 12px;
  color: #8ea0b5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.run-card {
  margin-top: 16px;
  border: 1px solid #333946;
  border-radius: 10px;
  padding: 16px;
  background: #242932;
}

.code pre {
  margin: 0;
  white-space: pre-wrap;
  color: #d9e1eb;
  font-family: 'JetBrains Mono', Consolas, monospace;
}

.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.step-run-button {
  border: 1px solid #3f7f53;
  background: #2f5d3b;
  color: #edf7ef;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
}

.step-run-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
