<template>
  <div class="editor-tabs">
    <div class="tab active">
      {{ currentLesson ? (currentLesson.fileName ?? `${currentLesson.title}.py`) : 'main.py' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types/lesson'

defineProps<{
  currentLesson: Lesson | null
}>()
</script>

<style scoped>
.editor-tabs {
  height: 36px;
  display: flex;
  align-items: end;
  padding: 0 10px;
  background: #2b2f36;
  border-bottom: 1px solid #313540;
}

.tab {
  background: #1f2229;
  border: 1px solid #3a3f4a;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 8px 12px;
  font-size: 13px;
  color: #d7deea;
}
</style>
