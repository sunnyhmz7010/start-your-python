<template>
  <div class="workspace-shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Start Your Python</p>
        <h1>IDE 风格 Python 自学工作区</h1>
      </div>
      <button class="run-button" type="button" :disabled="!currentLesson" @click="handleRunLesson">
        开始本节学习
      </button>
    </header>

    <main class="workspace-main">
      <LessonTree
        :chapters="chapters"
        :current-lesson-id="currentLesson?.id ?? null"
        :completed-lesson-ids="completedLessonIds"
        @select-lesson="handleSelectLesson"
      />

      <section class="workspace-center">
        <RecentLessonCard
          v-if="recentLesson"
          :lesson="recentLesson"
          :current-step="recentLessonStep"
          @resume="handleSelectLesson(recentLesson)"
        />

        <LessonMainPanel
          :lesson="currentLesson"
          :chapter="currentChapter"
          :step="currentStep"
        />

        <LessonBottomPanel
          :lesson="currentLesson"
          :step="currentStep"
          :console-output="lessonStore.consoleOutput"
        />
      </section>

      <LessonStepsPanel
        :lesson="currentLesson"
        :current-step-index="currentStepIndex"
        @goto-step="handleGotoStep"
        @next-step="handleNextStep"
        @previous-step="handlePreviousStep"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import LessonBottomPanel from '@/components/workspace/LessonBottomPanel.vue'
import LessonMainPanel from '@/components/workspace/LessonMainPanel.vue'
import LessonStepsPanel from '@/components/workspace/LessonStepsPanel.vue'
import LessonTree from '@/components/workspace/LessonTree.vue'
import RecentLessonCard from '@/components/workspace/RecentLessonCard.vue'
import { useLessonStore } from '@/stores/lesson'
import { useProgressStore } from '@/stores/progress'
import type { Lesson } from '@/types/lesson'

const lessonStore = useLessonStore()
const progressStore = useProgressStore()

const chapters = computed(() => lessonStore.chapters)
const currentLesson = computed(() => lessonStore.currentLesson)
const currentStepIndex = computed(() => lessonStore.currentStepIndex)
const currentStep = computed(() => lessonStore.currentStep)
const currentChapter = computed(() => {
  if (!currentLesson.value) {
    return null
  }

  return chapters.value.find((chapter) =>
    chapter.lessons.some((lesson) => lesson.id === currentLesson.value?.id)
  ) ?? null
})

const completedLessonIds = computed(() =>
  Object.values(progressStore.progress.lessons)
    .filter((item) => item.completed)
    .map((item) => item.lessonId)
)

const recentLesson = computed(() => {
  const lessonId = progressStore.progress.recentLessonId
  if (!lessonId) {
    return null
  }

  return lessonStore.getLessonById(lessonId) ?? null
})

const recentLessonStep = computed(() => {
  if (!recentLesson.value) {
    return 0
  }

  return progressStore.getProgress(recentLesson.value.id)?.currentStep ?? 0
})

function restoreLessonProgress(lesson: Lesson) {
  const savedStep = progressStore.getProgress(lesson.id)?.currentStep ?? 0
  lessonStore.setCurrentStep(savedStep)
  progressStore.setRecentLesson(lesson.id)
}

function handleSelectLesson(lesson: Lesson) {
  lessonStore.selectLesson(lesson)
  restoreLessonProgress(lesson)
}

function handleRunLesson() {
  lessonStore.runLesson()

  if (currentLesson.value) {
    progressStore.updateCurrentStep(currentLesson.value.id, 0)
    progressStore.setRecentLesson(currentLesson.value.id)
  }
}

function handleGotoStep(index: number) {
  if (!currentLesson.value) {
    return
  }

  lessonStore.setCurrentStep(index)
  progressStore.updateCurrentStep(currentLesson.value.id, lessonStore.currentStepIndex)
}

function handleNextStep() {
  if (!currentLesson.value) {
    return
  }

  const isLastStep = currentStepIndex.value >= currentLesson.value.steps.length - 1
  if (isLastStep) {
    lessonStore.completeLesson()
    progressStore.markLessonCompleted(currentLesson.value.id)
    return
  }

  lessonStore.nextStep()
  progressStore.updateCurrentStep(currentLesson.value.id, lessonStore.currentStepIndex)
}

function handlePreviousStep() {
  if (!currentLesson.value) {
    return
  }

  lessonStore.prevStep()
  progressStore.updateCurrentStep(currentLesson.value.id, lessonStore.currentStepIndex)
}

onMounted(async () => {
  progressStore.loadProgress()
  await lessonStore.loadLessons()

  if (recentLesson.value) {
    handleSelectLesson(recentLesson.value)
  }
})
</script>

<style scoped>
.workspace-shell {
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(79, 140, 255, 0.18), transparent 28%),
    linear-gradient(180deg, #171b20 0%, #1d232b 100%);
  color: #eef3f8;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  border-bottom: 1px solid #2a313b;
  background: rgba(19, 23, 29, 0.82);
  backdrop-filter: blur(8px);
}

.eyebrow {
  margin: 0 0 4px;
  color: #8ea0b5;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.topbar h1 {
  margin: 0;
  font-size: 24px;
}

.run-button {
  border: none;
  border-radius: 999px;
  padding: 12px 18px;
  background: #4f8cff;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
}

.run-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.workspace-main {
  display: flex;
  min-height: calc(100vh - 83px);
}

.workspace-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

@media (max-width: 1200px) {
  .workspace-main {
    flex-direction: column;
  }

  :deep(.lesson-tree),
  :deep(.steps-panel) {
    width: 100%;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid #32363a;
  }
}
</style>
