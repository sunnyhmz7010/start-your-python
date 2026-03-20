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
          :editor-code="editorCode"
          @update-code="lessonStore.updateEditorCode"
          @run-step-code="handleRunStepCode"
        />
        <LessonBottomPanel
          :active-tab="activeBottomTab"
          :console-output="lessonStore.consoleOutput"
          :terminal-output="runtimeStore.terminalOutput"
          :can-submit-input="runtimeStore.canSubmitInput"
          :is-python-missing="runtimeStore.isPythonMissing"
          @change-tab="lessonStore.setActiveBottomTab"
          @submit-input="handleSubmitInput"
          @stop-run="runtimeStore.stopRun"
          @recheck-python="() => runtimeStore.detectPython(true)"
          @open-install-lesson="handleOpenInstallPythonLesson"
        />
        <StatusBar :mode="workspaceMode" :lesson="currentLesson" />
      </section>

      <LessonStepsPanel
        v-if="currentLesson && workspaceMode === 'run'"
        :lesson="currentLesson"
        :current-step-index="currentStepIndex"
        :completed-step-ids="completedStepIds"
        @goto-step="handleGotoStep"
        @next-step="handleNextStep"
        @previous-step="handlePreviousStep"
        @toggle-current-step-completed="handleToggleCurrentStepCompleted"
        @reset-lesson-progress="handleResetLessonProgress"
        @reset-all-progress="handleResetAllProgress"
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
import { useRuntimeStore } from '@/stores/runtime'
import type { Lesson } from '@/types/lesson'

const lessonStore = useLessonStore()
const progressStore = useProgressStore()
const runtimeStore = useRuntimeStore()

const chapters = computed(() => lessonStore.chapters)
const currentLesson = computed(() => lessonStore.currentLesson)
const currentStepIndex = computed(() => lessonStore.currentStepIndex)
const currentStep = computed(() => lessonStore.currentStep)
const workspaceMode = computed(() => lessonStore.workspaceMode)
const activeBottomTab = computed(() => lessonStore.activeBottomTab)
const editorCode = computed(() => lessonStore.currentEditorCode)

const completedLessonIds = computed(() =>
  Object.values(progressStore.progress.lessons)
    .filter((item) => item.completed)
    .map((item) => item.lessonId)
)

const completedStepIds = computed(() => {
  if (!currentLesson.value) {
    return []
  }

  const stepStates = progressStore.getProgress(currentLesson.value.id)?.stepStates ?? {}
  return Object.entries(stepStates)
    .filter(([, completed]) => completed)
    .map(([stepId]) => stepId)
})

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

async function handleRunStepCode(step: Lesson['steps'][number]) {
  if (!currentLesson.value) {
    return
  }

  const code = step.runnableCode ?? step.code
  if (!code) {
    return
  }

  lessonStore.setActiveBottomTab('terminal')
  progressStore.setRecentLesson(currentLesson.value.id)
  await runtimeStore.runCode(code)
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

  const step = currentLesson.value.steps[currentStepIndex.value]
  const isLastStep = currentStepIndex.value >= currentLesson.value.steps.length - 1
  if (isLastStep) {
    progressStore.setStepCompleted(
      currentLesson.value.id,
      step.id,
      true,
      currentLesson.value.steps.length
    )
    if (progressStore.isLessonCompleted(currentLesson.value.id)) {
      lessonStore.completeLesson()
    }
    return
  }

  progressStore.setStepCompleted(
    currentLesson.value.id,
    step.id,
    true,
    currentLesson.value.steps.length
  )
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

  const confirmed = window.confirm(`确定要重置《${currentLesson.value.title}》的学习进度吗？`)
  if (!confirmed) {
    return
  }

  progressStore.resetLessonProgress(currentLesson.value.id)
  lessonStore.setCurrentStep(0)
}

function handleResetAllProgress() {
  const confirmed = window.confirm('确定要清空全部学习进度吗？此操作无法撤销。')
  if (!confirmed) {
    return
  }

  progressStore.resetProgress()
  if (currentLesson.value) {
    lessonStore.setCurrentStep(0)
  }
}

async function handleSubmitInput(input: string) {
  await runtimeStore.submitInput(input)
}

function handleOpenInstallPythonLesson() {
  const installLesson = lessonStore.getLessonById('lesson_env_install_python')
  if (!installLesson) {
    return
  }

  handleSelectLesson(installLesson)
  lessonStore.setWorkspaceMode('editor')
}

onMounted(async () => {
  progressStore.loadProgress()
  await runtimeStore.initialize()
  await lessonStore.loadLessons()
  selectInitialLesson()
})
</script>

<style scoped>
.workspace-layout {
  display: flex;
  height: calc(100vh - 76px);
  min-height: 0;
  overflow: hidden;
}

.editor-column {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #1f2229;
  overflow: hidden;
}

@media (max-width: 980px) {
  .workspace-layout {
    flex-direction: column;
    height: auto;
    min-height: calc(100vh - 76px);
    overflow: auto;
  }
}
</style>
