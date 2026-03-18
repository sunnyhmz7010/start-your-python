<template>
  <section class="bottom-panel">
    <div class="tab-row">
      <button
        v-for="option in options"
        :key="option.id"
        type="button"
        class="tab"
        :class="{ active: activeTab === option.id }"
        @click="activeTab = option.id"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="content">
      <div v-if="activeTab === 'tips'">
        <h3>学习提示</h3>
        <p>{{ tipText }}</p>
      </div>
      <div v-else-if="activeTab === 'summary'">
        <h3>课程摘要</h3>
        <p>{{ summaryText }}</p>
      </div>
      <div v-else>
        <h3>学习反馈</h3>
        <pre>{{ consoleText }}</pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Lesson, LessonStep } from '@/types/lesson'
import type { WorkspaceBottomTab } from './types'

const props = defineProps<{
  lesson: Lesson | null
  step: LessonStep | null
  consoleOutput: string
}>()

const activeTab = ref<WorkspaceBottomTab>('tips')

const options: Array<{ id: WorkspaceBottomTab; label: string }> = [
  { id: 'tips', label: '学习提示' },
  { id: 'summary', label: '课程摘要' },
  { id: 'console', label: '学习反馈' }
]

const tipText = computed(() => props.step?.hint ?? '先从左侧选择课程，再按右侧步骤慢慢推进。')
const summaryText = computed(() => props.lesson?.description ?? '当前还没有选中课程。')
const consoleText = computed(() => props.consoleOutput || '准备就绪，开始学习。')
</script>

<style scoped>
.bottom-panel {
  border-top: 1px solid #32363a;
  background: #20252c;
  min-height: 180px;
  display: flex;
  flex-direction: column;
}

.tab-row {
  display: flex;
  gap: 8px;
  padding: 12px 16px 0;
}

.tab {
  border: none;
  background: #2d3440;
  color: #b6c2cf;
  padding: 8px 12px;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
}

.tab.active {
  background: #36404d;
  color: #fff;
}

.content {
  padding: 18px 16px;
  color: #d7dee7;
}

h3 {
  margin: 0 0 8px;
}

p,
pre {
  margin: 0;
  color: #b9c5d2;
  line-height: 1.6;
  white-space: pre-wrap;
}
</style>
