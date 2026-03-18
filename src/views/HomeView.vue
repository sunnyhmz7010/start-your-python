<template>
  <IdeFrame :current-lesson="currentLesson" @run="handleRunLesson">
    <div class="workspace-layout">
      <ProjectToolWindow>
        <LessonTree
          :chapters="chapters"
          :current-lesson-id="currentLesson?.id ?? null"
          :completed-lesson-ids="completedLessonIds"
          @select-lesson="handleSelectLesson"
        />
      </ProjectToolWindow>

      <section class="editor-column">
        <EditorTabs :current-lesson="currentLesson" />
        <LessonMainPanel
          :lesson="currentLesson"
          :step="currentStep"
          :workspace-mode="workspaceMode"
        />
        <LessonBottomPanel
          :active-tab="activeBottomTab"
          :console-output="lessonStore.consoleOutput"
          @change-tab="lessonStore.setActiveBottomTab"
        />
        <StatusBar :mode="workspaceMode" :lesson="currentLesson" />
      </section>

      <LessonStepsPanel
        v-if="workspaceMode === 'run'"
        :lesson="currentLesson"
        :current-step-index="currentStepIndex"
        @goto-step="handleGotoStep"
        @next-step="handleNextStep"
        @previous-step="handlePreviousStep"
      />
    </div>
  </IdeFrame>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import EditorTabs from '@/components/workspace/EditorTabs.vue'
import IdeFrame from '@/components/workspace/IdeFrame.vue'
import LessonBottomPanel from '@/components/workspace/LessonBottomPanel.vue'
import LessonMainPanel from '@/components/workspace/LessonMainPanel.vue'
import LessonStepsPanel from '@/components/workspace/LessonStepsPanel.vue'
import LessonTree from '@/components/workspace/LessonTree.vue'
import ProjectToolWindow from '@/components/workspace/ProjectToolWindow.vue'
import StatusBar from '@/components/workspace/StatusBar.vue'
import { useLessonStore } from '@/stores/lesson'
import { useProgressStore } from '@/stores/progress'
import type { Lesson } from '@/types/lesson'

const lessonStore = useLessonStore()
const progressStore = useProgressStore()

const chapters = computed(() => lessonStore.chapters)
const currentLesson = computed(() => lessonStore.currentLesson)
const currentStepIndex = computed(() => lessonStore.currentStepIndex)
const currentStep = computed(() => lessonStore.currentStep)
const workspaceMode = computed(() => lessonStore.workspaceMode)
const activeBottomTab = computed(() => lessonStore.activeBottomTab)

const completedLessonIds = computed(() =>
  Object.values(progressStore.progress.lessons)
    .filter((item) => item.completed)
    .map((item) => item.lessonId)
)

function selectInitialLesson() {
  const recentLessonId = progressStore.progress.recentLessonId
  const recentLesson = recentLessonId ? lessonStore.getLessonById(recentLessonId) : null
  const selected = recentLesson ?? lessonStore.allLessons[0] ?? null

  if (!selected) {
    return
  }

  lessonStore.selectLesson(selected)
  const savedStep = progressStore.getProgress(selected.id)?.currentStep ?? 0
  lessonStore.setCurrentStep(savedStep)
}

function handleSelectLesson(lesson: Lesson) {
  lessonStore.selectLesson(lesson)
  const savedStep = progressStore.getProgress(lesson.id)?.currentStep ?? 0
  lessonStore.setCurrentStep(savedStep)
  progressStore.setRecentLesson(lesson.id)
}

function handleRunLesson() {
  if (!currentLesson.value) {
    return
  }

  lessonStore.enterRunMode()
  progressStore.setRecentLesson(currentLesson.value.id)
  progressStore.updateCurrentStep(currentLesson.value.id, currentStepIndex.value)
}

function handleGotoStep(index: number) {
  if (!currentLesson.value) {
    return
  }

  lessonStore.setCurrentStep(index)
  lessonStore.appendConsoleOutput(`[Run] 跳转到步骤 ${lessonStore.currentStepIndex + 1}: ${lessonStore.currentStep?.title}\n`)
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
  selectInitialLesson()
})
</script>

<style scoped>
.workspace-layout {
  display: flex;
  min-height: calc(100vh - 76px);
}

.editor-column {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #1f2229;
}

@media (max-width: 1200px) {
  .workspace-layout {
    flex-direction: column;
  }
}
</style>
