<template>
  <aside class="steps-panel">
    <div class="steps-header">
      <div>
        <p class="label">学习步骤</p>
        <h2>{{ lesson?.title ?? '等待选择课程' }}</h2>
      </div>
      <span class="step-total">{{ lesson?.steps.length ?? 0 }} 步</span>
    </div>

    <div v-if="lesson" class="steps-list">
      <button
        v-for="(step, index) in lesson.steps"
        :key="step.id"
        type="button"
        class="step-item"
        :class="{ active: currentStepIndex === index }"
        @click="$emit('gotoStep', index)"
      >
        <span class="index">{{ index + 1 }}</span>
        <span class="step-copy">
          <strong>{{ step.title }}</strong>
          <small>{{ stepTypeLabel(step.type) }}</small>
        </span>
      </button>
    </div>

    <div v-else class="empty-copy">
      课程选中后，这里会显示完整的学习步骤。
    </div>

    <div class="actions">
      <button type="button" class="secondary" @click="$emit('previousStep')" :disabled="!lesson || currentStepIndex === 0">
        上一步
      </button>
      <button type="button" class="primary" @click="$emit('nextStep')" :disabled="!lesson">
        {{ isLastStep ? '标记完成' : '下一步' }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Lesson, LessonStep } from '@/types/lesson'

const props = defineProps<{
  lesson: Lesson | null
  currentStepIndex: number
}>()

defineEmits<{
  gotoStep: [index: number]
  nextStep: []
  previousStep: []
}>()

const isLastStep = computed(() => {
  if (!props.lesson) {
    return false
  }

  return props.currentStepIndex >= props.lesson.steps.length - 1
})

function stepTypeLabel(type: LessonStep['type']) {
  const labels: Record<LessonStep['type'], string> = {
    text: '阅读',
    code: '代码',
    image: '图片',
    video: '视频',
    quiz: '测验',
    interactive: '练习'
  }

  return labels[type]
}
</script>

<style scoped>
.steps-panel {
  width: clamp(260px, 24vw, 340px);
  min-width: 240px;
  border-left: 1px solid #32363a;
  background: #252931;
  padding: 16px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  overflow: hidden;
}

.steps-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.label {
  margin: 0 0 4px;
  font-size: 12px;
  color: #8ea0b5;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h2 {
  margin: 0;
  color: #eef3f8;
  font-size: 18px;
}

.step-total {
  color: #8ea0b5;
  font-size: 12px;
}

.steps-list {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
}

.step-item {
  display: flex;
  gap: 12px;
  width: 100%;
  padding: 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: #2a3038;
  color: #d4dde7;
  text-align: left;
  cursor: pointer;
}

.step-item.active {
  border-color: #4f8cff;
  background: #31394a;
}

.index {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: #20242b;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

small,
.empty-copy {
  color: #97a4b2;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 2px;
  padding-top: 8px;
  border-top: 1px solid #303540;
}

button {
  border-radius: 10px;
  padding: 10px 12px;
  border: none;
  cursor: pointer;
}

.secondary {
  background: #353d48;
  color: #dce5ef;
}

.primary {
  background: #4f8cff;
  color: #fff;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 1180px) {
  .steps-panel {
    width: 280px;
    min-width: 220px;
  }
}

@media (max-width: 980px) {
  .steps-panel {
    width: 100%;
    min-width: 0;
    max-height: 38vh;
    border-left: none;
    border-top: 1px solid #32363a;
  }
}
</style>
