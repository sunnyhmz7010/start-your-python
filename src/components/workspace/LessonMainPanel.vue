<template>
  <section class="main-panel">
    <EditorCodeView
      v-if="workspaceMode === 'editor'"
      :lesson="lesson"
      :code="editorCode"
      :is-python-running="isPythonRunning"
      :python-status="pythonStatus"
      @update-code="$emit('updateCode', $event)"
    />
    <RunLessonView
      v-else
      :lesson="lesson"
      :step="step"
      :is-python-running="isPythonRunning"
      :python-status="pythonStatus"
      @run-step-code="$emit('runStepCode', $event)"
      @answer-quiz="$emit('answerQuiz', $event)"
    />
  </section>
</template>

<script setup lang="ts">
import type { Lesson, LessonStep, QuizAnswerPayload } from '@/types/lesson'
import type { PythonRuntimeStatus } from '@/types/runtime'
import type { WorkspaceMode } from './types'
import EditorCodeView from './EditorCodeView.vue'
import RunLessonView from './RunLessonView.vue'

defineProps<{
  lesson: Lesson | null
  step: LessonStep | null
  workspaceMode: WorkspaceMode
  editorCode: string
  isPythonRunning: boolean
  pythonStatus: PythonRuntimeStatus
}>()

defineEmits<{
  updateCode: [code: string]
  runStepCode: [step: LessonStep]
  answerQuiz: [payload: QuizAnswerPayload]
}>()
</script>

<style scoped>
.main-panel {
  flex: 1;
  min-height: 0;
  display: flex;
  background: #1f2229;
}
</style>
