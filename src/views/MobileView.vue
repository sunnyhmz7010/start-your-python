<template>
  <div class="mobile-shell">
    <header class="mobile-header">
      <div>
        <p class="eyebrow">Mobile Reader</p>
        <h1>Start Your Python</h1>
        <p class="subtitle">纯课程阅读模式，不依赖系统 Python。</p>
      </div>
      <div class="header-actions">
        <button type="button" class="catalog-toggle" @click="isCatalogOpen = true">选择课程</button>
        <a class="desktop-link" href="/desktop">桌面版工作区</a>
      </div>
    </header>

    <main class="mobile-body">
      <aside
        class="lesson-browser"
        :class="{ 'is-open': isCatalogOpen }"
        :aria-hidden="!isCatalogOpen"
      >
        <div class="browser-header">
          <div>
            <p class="eyebrow">Course Catalog</p>
            <h2>课程目录</h2>
          </div>
          <button type="button" class="browser-close" @click="isCatalogOpen = false">关闭</button>
        </div>
        <div class="chapter-list">
          <details v-for="chapter in chapters" :key="chapter.id" class="chapter-group" open>
            <summary>{{ chapter.title }}</summary>
            <div class="lesson-list">
              <button
                v-for="lesson in chapter.lessons"
                :key="lesson.id"
                type="button"
                class="lesson-button"
                :class="{ active: currentLesson?.id === lesson.id }"
                @click="handleSelectLesson(lesson)"
              >
                <span>{{ lesson.title }}</span>
                <span v-if="completedLessonIds.includes(lesson.id)" class="lesson-complete">已完成</span>
              </button>
            </div>
          </details>
        </div>
      </aside>
      <button
        v-if="isCatalogOpen"
        type="button"
        class="browser-backdrop"
        aria-label="关闭课程目录"
        @click="isCatalogOpen = false"
      />

      <section v-if="currentLesson" class="lesson-reader" data-testid="mobile-reader">
        <div class="reader-toolbar">
          <button type="button" class="catalog-entry" @click="isCatalogOpen = true">
            {{ currentLesson.chapterTitle }} / {{ currentLesson.title }}
          </button>
          <span class="reader-progress">步骤 {{ currentStepIndex + 1 }} / {{ currentLesson.steps.length }}</span>
        </div>

        <div class="lesson-summary">
          <div class="summary-copy">
            <p class="eyebrow">{{ currentLesson.chapterTitle }}</p>
            <h2>{{ currentLesson.title }}</h2>
            <p class="description">{{ currentLesson.description }}</p>
          </div>
          <div class="summary-meta">
            <span>{{ currentLesson.estimatedTime }} 分钟</span>
            <span>{{ difficultyLabel(currentLesson.difficulty) }}</span>
            <span>{{ completedLessonIds.includes(currentLesson.id) ? '已完成' : '学习中' }}</span>
          </div>
        </div>

        <div class="step-strip">
          <button
            v-for="(step, index) in currentLesson.steps"
            :key="step.id"
            type="button"
            class="step-chip"
            :class="{ active: currentStepIndex === index, completed: completedStepIds.includes(step.id) }"
            @click="handleGotoStep(index)"
          >
            {{ index + 1 }}. {{ step.title }}
          </button>
        </div>

        <article v-if="currentStep" class="step-card">
          <div class="step-header">
            <div>
              <p class="eyebrow">当前步骤</p>
              <h3>{{ currentStep.title }}</h3>
            </div>
            <button
              type="button"
              class="mark-button"
              data-testid="mobile-mark-step"
              @click="handleToggleCurrentStepCompleted"
            >
              {{ completedStepIds.includes(currentStep.id) ? '取消已读' : '标记已读' }}
            </button>
          </div>

          <MarkdownContent class="step-content" :source="currentStep.content" />

          <pre v-if="currentStep.code" class="step-code"><code>{{ currentStep.code }}</code></pre>

          <div v-if="currentStep.hint" class="step-hint">
            <p class="eyebrow">提示</p>
            <p>{{ currentStep.hint }}</p>
          </div>
        </article>

        <div class="reader-actions">
          <button type="button" class="secondary" :disabled="currentStepIndex === 0" @click="handlePreviousStep">
            上一步
          </button>
          <button type="button" class="primary" :disabled="!currentLesson" @click="handleNextStep">
            {{ isLastStep ? '完成本课' : '下一步' }}
          </button>
          <button type="button" class="ghost" @click="handleResetLessonProgress">
            重置本课
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MarkdownContent from '@/components/content/MarkdownContent.vue'
import { useLessonCatalog } from '@/composables/useLessonCatalog'
import type { Lesson } from '@/types/lesson'

const {
  lessonStore,
  progressStore,
  chapters,
  currentLesson,
  currentStepIndex,
  currentStep,
  completedLessonIds,
  completedStepIds,
  bootstrap,
  selectLesson
} = useLessonCatalog()

const isCatalogOpen = ref(false)

const isLastStep = computed(() => {
  if (!currentLesson.value) {
    return false
  }

  return currentStepIndex.value >= currentLesson.value.steps.length - 1
})

function difficultyLabel(level: Lesson['difficulty']) {
  const labels: Record<Lesson['difficulty'], string> = {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级'
  }

  return labels[level]
}

function handleSelectLesson(lesson: Lesson) {
  selectLesson(lesson)
  isCatalogOpen.value = false
}

function handleGotoStep(index: number) {
  if (!currentLesson.value) {
    return
  }

  lessonStore.setCurrentStep(index)
  progressStore.updateCurrentStep(currentLesson.value.id, lessonStore.currentStepIndex)
}

function handlePreviousStep() {
  if (!currentLesson.value || currentStepIndex.value === 0) {
    return
  }

  lessonStore.prevStep()
  progressStore.updateCurrentStep(currentLesson.value.id, lessonStore.currentStepIndex)
}

function handleNextStep() {
  if (!currentLesson.value || !currentStep.value) {
    return
  }

  progressStore.setStepCompleted(
    currentLesson.value.id,
    currentStep.value.id,
    true,
    currentLesson.value.steps.length
  )

  if (!isLastStep.value) {
    lessonStore.nextStep()
    progressStore.updateCurrentStep(currentLesson.value.id, lessonStore.currentStepIndex)
  }
}

function handleToggleCurrentStepCompleted() {
  if (!currentLesson.value || !currentStep.value) {
    return
  }

  const isCompleted = progressStore.isStepCompleted(currentLesson.value.id, currentStep.value.id)
  progressStore.setStepCompleted(
    currentLesson.value.id,
    currentStep.value.id,
    !isCompleted,
    currentLesson.value.steps.length
  )
}

function handleResetLessonProgress() {
  if (!currentLesson.value) {
    return
  }

  const confirmed = window.confirm(`确定要重置《${currentLesson.value.title}》的阅读进度吗？`)
  if (!confirmed) {
    return
  }

  progressStore.resetLessonProgress(currentLesson.value.id)
  lessonStore.setCurrentStep(0)
}

onMounted(async () => {
  await bootstrap()
})
</script>

<style scoped>
.mobile-shell {
  height: 100vh;
  overflow: auto;
  background:
    radial-gradient(circle at top, rgba(110, 168, 255, 0.18), transparent 32%),
    linear-gradient(180deg, #0f1722 0%, #141f2c 100%);
  color: #e7edf7;
}

.mobile-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 18px 20px;
  border-bottom: 1px solid rgba(164, 183, 208, 0.16);
}

.header-actions {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8ab4ff;
}

h1,
h2,
h3 {
  margin: 0;
}

.subtitle,
.description,
.step-content,
.step-hint p {
  color: #b8c5d7;
  line-height: 1.65;
}

.desktop-link {
  align-self: flex-start;
  color: #eff6ff;
  text-decoration: none;
  background: rgba(106, 150, 219, 0.16);
  border: 1px solid rgba(129, 171, 236, 0.28);
  padding: 10px 12px;
  border-radius: 999px;
  font-size: 13px;
}

.mobile-body {
  padding: 18px;
  position: relative;
}

.lesson-browser,
.lesson-reader,
.step-card {
  border: 1px solid rgba(170, 186, 210, 0.15);
  background: rgba(18, 28, 40, 0.82);
  backdrop-filter: blur(10px);
  border-radius: 18px;
}

.lesson-browser,
.lesson-reader {
  padding: 16px;
}

.lesson-browser {
  position: fixed;
  inset: auto 0 0;
  z-index: 30;
  max-height: min(72vh, 720px);
  border-radius: 24px 24px 0 0;
  overflow: auto;
  transform: translateY(calc(100% + 16px));
  transition: transform 0.24s ease;
}

.lesson-browser.is-open {
  transform: translateY(0);
}

.browser-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
}

.browser-close,
.catalog-toggle,
.catalog-entry {
  border: none;
  cursor: pointer;
}

.browser-close,
.catalog-toggle {
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(53, 108, 255, 0.16);
  color: #eef5ff;
  border: 1px solid rgba(106, 150, 219, 0.24);
}

.browser-backdrop {
  position: fixed;
  inset: 0;
  z-index: 20;
  border: none;
  background: rgba(6, 10, 16, 0.56);
}

.chapter-list {
  margin-top: 12px;
  display: grid;
  gap: 10px;
}

.chapter-group {
  border: 1px solid rgba(164, 183, 208, 0.12);
  border-radius: 14px;
  padding: 12px;
  background: rgba(10, 16, 25, 0.45);
}

.chapter-group summary {
  cursor: pointer;
  font-weight: 600;
  color: #eef4fb;
}

.lesson-list {
  display: grid;
  gap: 8px;
  margin-top: 12px;
}

.lesson-button,
.step-chip,
.reader-actions button,
.mark-button {
  border: none;
  cursor: pointer;
}

.lesson-button {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(33, 48, 67, 0.78);
  color: #dce5f2;
  text-align: left;
}

.lesson-button.active {
  background: linear-gradient(135deg, #2b5dac 0%, #274783 100%);
  color: #fff;
}

.lesson-complete {
  flex-shrink: 0;
  color: #9de6ad;
  font-size: 12px;
}

.lesson-summary {
  display: grid;
  gap: 12px;
}

.reader-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 16px;
}

.catalog-entry {
  flex: 1 1 240px;
  min-width: 0;
  border-radius: 14px;
  padding: 12px 14px;
  text-align: left;
  background: rgba(39, 55, 77, 0.95);
  color: #eef4fb;
}

.reader-progress {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 8px 12px;
  background: rgba(95, 123, 158, 0.18);
  color: #dbe7f8;
  font-size: 12px;
}

.summary-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.summary-meta span {
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(95, 123, 158, 0.18);
  color: #dbe7f8;
  font-size: 12px;
}

.step-strip {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  margin: 18px 0;
  padding-bottom: 4px;
}

.step-chip {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 10px 14px;
  background: rgba(34, 46, 63, 0.9);
  color: #cfdae8;
  white-space: nowrap;
}

.step-chip.active {
  background: #4f8cff;
  color: #fff;
}

.step-chip.completed {
  box-shadow: inset 0 0 0 1px #4db26a;
}

.step-card {
  padding: 16px;
}

.step-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.mark-button {
  border-radius: 999px;
  padding: 8px 12px;
  background: #203451;
  color: #eef5ff;
}

.step-code {
  margin-top: 16px;
  padding: 14px;
  border-radius: 12px;
  background: #0d1520;
  color: #d9e4f3;
  white-space: pre-wrap;
  font-family: 'JetBrains Mono', Consolas, monospace;
}

.step-hint {
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(62, 87, 120, 0.18);
}

.reader-actions {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;
}

.reader-actions button {
  border-radius: 12px;
  padding: 12px;
  color: #eef4fb;
}

.secondary {
  background: #2b3748;
}

.primary {
  background: #356cff;
}

.ghost {
  background: rgba(68, 82, 101, 0.7);
}

.reader-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 680px) {
  .mobile-header {
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .reader-actions {
    grid-template-columns: 1fr;
  }

  .step-header {
    flex-direction: column;
  }
}

@media (min-width: 861px) {
  .mobile-body {
    display: grid;
    grid-template-columns: minmax(280px, 360px) minmax(0, 1fr);
    gap: 18px;
    align-items: start;
  }

  .lesson-browser {
    position: sticky;
    top: 18px;
    inset: auto;
    max-height: calc(100vh - 36px);
    border-radius: 18px;
    transform: none;
  }

  .browser-header {
    display: none;
  }

  .browser-backdrop,
  .catalog-toggle {
    display: none;
  }
}
</style>
