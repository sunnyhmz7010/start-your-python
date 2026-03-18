<template>
  <footer class="status-bar">
    <span>{{ mode === 'editor' ? 'Editor' : 'Run' }}</span>
    <span>{{ lesson ? (lesson.fileName ?? `${lesson.title}.py`) : 'No file selected' }}</span>
  </footer>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types/lesson'
import type { WorkspaceMode } from './types'

defineProps<{
  mode: WorkspaceMode
  lesson: Lesson | null
}>()
</script>

<style scoped>
.status-bar {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background: #2b2f36;
  border-top: 1px solid #313540;
  color: #9ca7b6;
  font-size: 12px;
}
</style>
