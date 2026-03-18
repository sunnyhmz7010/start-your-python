<template>
  <section class="main-panel">
    <div v-if="lesson" class="lesson-shell">
      <div class="lesson-meta">
        <p class="chapter">{{ chapter?.title ?? '当前课程' }}</p>
        <h1>{{ lesson.title }}</h1>
        <p class="description">{{ lesson.description }}</p>
      </div>

      <div class="cards">
        <article class="card">
          <p class="card-label">当前步骤</p>
          <h3>{{ step?.title ?? '先从右侧步骤开始' }}</h3>
          <p class="body">{{ step?.content ?? '选择一个步骤开始学习。' }}</p>
        </article>

        <article class="card code-card">
          <p class="card-label">课程代码</p>
          <pre><code>{{ lesson.pseudoCode }}</code></pre>
        </article>
      </div>
    </div>

    <div v-else class="empty-state">
      <p class="empty-label">IDE 风格学习器</p>
      <h1>从左侧选择一节课开始</h1>
      <p>课程、步骤和学习反馈会在这个工作区里同步变化。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Chapter, Lesson, LessonStep } from '@/types/lesson'

defineProps<{
  lesson: Lesson | null
  chapter: Chapter | null
  step: LessonStep | null
}>()
</script>

<style scoped>
.main-panel {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.lesson-shell,
.empty-state {
  min-height: 100%;
}

.chapter,
.empty-label,
.card-label {
  margin: 0 0 8px;
  font-size: 12px;
  color: #8ea0b5;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 10px;
  color: #f5f7fa;
  font-size: 32px;
}

.description,
.body,
.empty-state p {
  color: #c0c8d2;
  line-height: 1.6;
}

.cards {
  display: grid;
  gap: 16px;
  margin-top: 18px;
}

.card {
  border: 1px solid #32363a;
  border-radius: 12px;
  background: #262b33;
  padding: 18px;
}

.card h3 {
  margin: 0 0 8px;
  color: #e9eef5;
}

.code-card pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: 'JetBrains Mono', Consolas, monospace;
  color: #d8e0ea;
  line-height: 1.5;
}

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
