<template>
  <IdeFrame
    :current-lesson="currentLesson"
    :is-python-running="runtimeStore.isBusy"
    :is-lesson-running="lessonStore.isLessonRunning"
    :python-status="runtimeStore.status"
    @run="handleRunLesson"
  >
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
          :is-python-running="runtimeStore.isBusy"
          :python-status="runtimeStore.status"
          @update-code="lessonStore.updateEditorCode"
          @run-step-code="handleRunStepCode"
          @answer-quiz="handleAnswerQuiz"
        />
        <LessonBottomPanel
          :active-tab="activeBottomTab"
          :terminal-output="runtimeStore.terminalOutput"
          :is-python-missing="runtimeStore.isPythonMissing"
          :problem-messages="problemMessages"
          :python-info="pythonInfo"
          @change-tab="lessonStore.setActiveBottomTab"
          @submit-input="runtimeStore.submitInput"
          @stop-run="runtimeStore.stopRun"
          @recheck-python="() => runtimeStore.detectPython(true)"
          @open-install-lesson="handleOpenInstallPythonLesson"
        />
        <StatusBar
          :mode="workspaceMode"
          :lesson="currentLesson"
          :content-source="lessonStore.contentStatus.source"
          :content-warning="lessonStore.contentStatus.warning?.message ?? null"
        />
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
import { computed, onMounted, ref, watch } from 'vue'
import EditorTabs from '@/components/workspace/EditorTabs.vue'
import IdeFrame from '@/components/workspace/IdeFrame.vue'
import LessonBottomPanel from '@/components/workspace/LessonBottomPanel.vue'
import LessonMainPanel from '@/components/workspace/LessonMainPanel.vue'
import LessonStepsPanel from '@/components/workspace/LessonStepsPanel.vue'
import LessonTree from '@/components/workspace/LessonTree.vue'
import ProjectToolWindow from '@/components/workspace/ProjectToolWindow.vue'
import StatusBar from '@/components/workspace/StatusBar.vue'
import { useLessonCatalog } from '@/composables/useLessonCatalog'
import { useRuntimeStore } from '@/stores/runtime'
import type { Lesson, QuizAnswerPayload } from '@/types/lesson'

type PendingStepRun = {
  lessonId: string
  stepId: string
  totalSteps: number
}

const {
  lessonStore,
  progressStore,
  chapters,
  currentLesson,
  currentStepIndex,
  currentStep,
  editorCode,
  completedLessonIds,
  completedStepIds,
  bootstrap,
  selectLesson,
  markStepCompleted,
  markCurrentStepCompleted,
  toggleCurrentStepCompleted
} = useLessonCatalog()
const runtimeStore = useRuntimeStore()
const pendingStepRun = ref<PendingStepRun | null>(null)
const workspaceMode = computed(() => lessonStore.workspaceMode)
const activeBottomTab = computed(() => lessonStore.activeBottomTab)
const problemMessages = computed(() =>
  lessonStore.contentStatus.warning
    ? [
        lessonStore.contentStatus.warning.detail
          ? `${lessonStore.contentStatus.warning.message} ${lessonStore.contentStatus.warning.detail}`
          : lessonStore.contentStatus.warning.message
      ]
    : []
)
const pythonInfo = computed(() => {
  if (!runtimeStore.python.available) {
    return null
  }

  return [
    runtimeStore.python.command,
    runtimeStore.python.version,
    runtimeStore.python.executablePath
  ].filter(Boolean).join(' · ')
})

function handleSelectLesson(lesson: Lesson) {
  selectLesson(lesson)
}

function handleRunLesson() {
  if (!currentLesson.value) {
    return
  }

  lessonStore.enterRunMode()
  lessonStore.setActiveBottomTab('terminal')
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
  pendingStepRun.value = {
    lessonId: currentLesson.value.id,
    stepId: step.id,
    totalSteps: currentLesson.value.steps.length
  }
  const started = await runtimeStore.runCode(code)
  if (!started) {
    pendingStepRun.value = null
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

  const step = currentLesson.value.steps[currentStepIndex.value]
  const isLastStep = currentStepIndex.value >= currentLesson.value.steps.length - 1
  if (isLastStep) {
    markStepCompleted(currentLesson.value.id, step.id, currentLesson.value.steps.length)
    return
  }

  markStepCompleted(currentLesson.value.id, step.id, currentLesson.value.steps.length)
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
  toggleCurrentStepCompleted()
}

function handleAnswerQuiz(payload: QuizAnswerPayload) {
  if (!payload.isCorrect || !currentLesson.value || !currentStep.value) {
    return
  }

  progressStore.setRecentLesson(currentLesson.value.id)
  markCurrentStepCompleted()
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

function handleOpenInstallPythonLesson() {
  const installLesson = lessonStore.getLessonById('lesson_env_install_python')
  if (!installLesson) {
    return
  }

  handleSelectLesson(installLesson)
  lessonStore.setWorkspaceMode('editor')
}

watch(
  () => runtimeStore.lastRunState,
  (state) => {
    if (!state || !pendingStepRun.value) {
      return
    }

    const pending = pendingStepRun.value
    pendingStepRun.value = null

    if (state.status !== 'completed' || state.exitCode !== 0) {
      return
    }

    progressStore.setRecentLesson(pending.lessonId)
    markStepCompleted(pending.lessonId, pending.stepId, pending.totalSteps)
  }
)

onMounted(async () => {
  await runtimeStore.initialize()
  await bootstrap()
  if (lessonStore.contentStatus.warning) {
    lessonStore.setActiveBottomTab('problems')
  }
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
