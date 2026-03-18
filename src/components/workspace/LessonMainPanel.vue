<template>
  <section class="main-panel">
    <EditorCodeView v-if="workspaceMode === 'editor'" :lesson="lesson" />
    <RunLessonView v-else :lesson="lesson" :step="step" />
  </section>
</template>

<script setup lang="ts">
import type { Lesson, LessonStep } from '@/types/lesson'
import type { WorkspaceMode } from './types'
import EditorCodeView from './EditorCodeView.vue'
import RunLessonView from './RunLessonView.vue'

defineProps<{
  lesson: Lesson | null
  step: LessonStep | null
  workspaceMode: WorkspaceMode
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
