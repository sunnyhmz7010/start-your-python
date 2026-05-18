<template>
  <div class="editor-view" data-testid="editor-code-view">
    <div v-if="lesson" class="code-shell">
      <div class="code-header">
        <span>{{ lesson.fileName ?? `${lesson.title}.py` }}</span>
        <button
          data-testid="editor-run-button"
          type="button"
          class="run-button"
          :disabled="isPythonRunning"
          @click="$emit('runCode')"
        >
          {{ runButtonLabel }}
        </button>
      </div>
      <textarea
        data-testid="editor-input"
        class="code-input"
        :value="code"
        spellcheck="false"
        @input="$emit('updateCode', ($event.target as HTMLTextAreaElement).value)"
      ></textarea>
    </div>
    <div v-else class="empty">Select a lesson file to start.</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Lesson } from '@/types/lesson'
import type { PythonRuntimeStatus } from '@/types/runtime'

const props = defineProps<{
  lesson: Lesson | null
  code: string
  isPythonRunning: boolean
  pythonStatus: PythonRuntimeStatus
}>()

defineEmits<{
  updateCode: [code: string]
  runCode: []
}>()

const runButtonLabel = computed(() => {
  if (props.pythonStatus === 'checking') {
    return 'Checking Python...'
  }
  if (props.pythonStatus === 'starting') {
    return 'Starting...'
  }
  if (props.pythonStatus === 'running') {
    return 'Running...'
  }

  return 'Run Current File'
})
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.run-button {
  border: 1px solid #3f7f53;
  background: #2f5d3b;
  color: #edf7ef;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 12px;
}

.run-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.code-input {
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  padding: 16px 20px 40px;
  overflow: auto;
  white-space: pre-wrap;
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #d7deea;
  background: #1f2229;
}

.empty {
  padding: 24px;
  color: #8f98a5;
}
</style>
