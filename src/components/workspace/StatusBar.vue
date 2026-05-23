<template>
  <footer class="status-bar">
    <span>{{ lesson ? (lesson.fileName ?? `${lesson.title}.py`) : '未选择文件' }}</span>
    <span v-if="contentWarning" class="warning" data-testid="content-source-warning">{{ contentWarning }}</span>
  </footer>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types/lesson'
defineProps<{
  lesson: Lesson | null
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
