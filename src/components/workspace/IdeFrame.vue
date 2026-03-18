<template>
  <div class="ide-frame">
    <header class="titlebar">
      <div class="window-actions">
        <span class="dot close"></span>
        <span class="dot minimize"></span>
        <span class="dot maximize"></span>
      </div>
      <div class="project-title">Start Your Python</div>
      <div class="toolbar-actions">
        <button
          data-testid="run-button"
          class="run-button"
          type="button"
          :disabled="!currentLesson"
          @click="$emit('run')"
        >
          Run
        </button>
      </div>
    </header>

    <div class="toolbar">
      <span class="tool-label">Project</span>
      <span class="tool-path">{{ currentLesson ? `${currentLesson.title}.py` : 'lesson.py' }}</span>
    </div>

    <div class="frame-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types/lesson'

defineProps<{
  currentLesson: Lesson | null
}>()

defineEmits<{
  run: []
}>()
</script>

<style scoped>
.ide-frame {
  min-height: 100vh;
  background: #1f2229;
  color: #cfd6df;
}

.titlebar,
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #2d313a;
  background: #2b2f36;
}

.titlebar {
  height: 40px;
  padding: 0 14px;
}

.toolbar {
  height: 36px;
  padding: 0 12px;
  justify-content: flex-start;
  gap: 18px;
  background: #252931;
}

.window-actions {
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
}

.close { background: #ff5f57; }
.minimize { background: #ffbd2e; }
.maximize { background: #28c840; }

.project-title,
.tool-label,
.tool-path {
  font-size: 13px;
}

.toolbar-actions {
  margin-left: auto;
}

.run-button {
  border: 1px solid #3d7eff;
  border-radius: 6px;
  background: #356cff;
  color: #fff;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 13px;
}

.run-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.frame-body {
  min-height: calc(100vh - 76px);
}
</style>
