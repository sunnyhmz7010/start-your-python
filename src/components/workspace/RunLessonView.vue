<template>
  <div class="run-view" data-testid="run-lesson-view">
    <div v-if="lesson" class="run-shell">
      <div class="run-header">
        <span class="badge">Run</span>
        <h2>{{ lesson.title }}</h2>
        <p>{{ lesson.description }}</p>
      </div>

      <div class="run-card">
        <p class="label">当前步骤</p>
        <h3>{{ step?.title ?? '准备开始' }}</h3>
        <p class="content">{{ step?.content ?? '点击右侧步骤开始学习。' }}</p>
      </div>

      <div v-if="step?.code" class="run-card code">
        <div class="code-header">
          <p class="label">示例</p>
          <button
            data-testid="step-run-button"
            type="button"
            class="step-run-button"
            @click="$emit('runStepCode', step)"
          >
            Run
          </button>
        </div>
        <pre><code>{{ step.code }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Lesson, LessonStep } from '@/types/lesson'

defineProps<{
  lesson: Lesson | null
  step: LessonStep | null
}>()

defineEmits<{
  runStepCode: [step: LessonStep]
}>()
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
</style>
