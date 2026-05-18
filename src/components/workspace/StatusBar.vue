<template>
  <footer class="status-bar">
    <span>{{ mode === 'editor' ? 'Editor' : 'Run' }}</span>
    <span>{{ lesson ? (lesson.fileName ?? `${lesson.title}.py`) : 'No file selected' }}</span>
    <span v-if="contentWarning" class="warning" data-testid="content-source-warning">{{ contentWarning }}</span>
    <span v-else>{{ contentSource === 'external' ? 'External lessons' : 'Bundled lessons' }}</span>
  </footer>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types/lesson'
import type { ContentSource } from '@/services/content/contentProvider'
import type { WorkspaceMode } from './types'

defineProps<{
  mode: WorkspaceMode
  lesson: Lesson | null
  contentSource: ContentSource
  contentWarning: string | null
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

.warning {
  color: #ffd37a;
}
</style>
