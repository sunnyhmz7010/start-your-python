<template>
  <footer class="status-bar">
    <span>{{ mode === 'editor' ? '编辑器' : '课程运行' }}</span>
    <span>{{ lesson ? (lesson.fileName ?? `${lesson.title}.py`) : '未选择文件' }}</span>
    <span v-if="contentWarning" class="warning" data-testid="content-source-warning">{{ contentWarning }}</span>
    <span v-else>{{ contentSource === 'external' ? '外部课程' : '内置课程' }}</span>
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
