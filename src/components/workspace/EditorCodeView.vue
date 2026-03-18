<template>
  <div class="editor-view" data-testid="editor-code-view">
    <div v-if="lesson" class="code-shell">
      <div class="code-header">{{ lesson.title }}.py</div>
      <pre class="code-block"><code>{{ lesson.pseudoCode }}</code></pre>
    </div>
    <div v-else class="empty">Select a lesson file to start.</div>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types/lesson'

defineProps<{
  lesson: Lesson | null
}>()
</script>

<style scoped>
.editor-view {
  flex: 1;
  min-height: 0;
  background: #1f2229;
}

.code-shell {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.code-header {
  padding: 10px 16px;
  font-size: 12px;
  color: #8f98a5;
  border-bottom: 1px solid #2f3440;
}

.code-block {
  margin: 0;
  padding: 16px 20px 40px;
  overflow: auto;
  white-space: pre-wrap;
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d7deea;
}

.empty {
  padding: 24px;
  color: #8f98a5;
}
</style>
