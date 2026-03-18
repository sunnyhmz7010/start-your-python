<template>
  <section class="recent-card">
    <div>
      <p class="eyebrow">继续学习</p>
      <h2>{{ lesson.title }}</h2>
      <p class="description">{{ lesson.description }}</p>
    </div>
    <button class="resume-button" type="button" @click="$emit('resume')">
      回到第 {{ currentStep + 1 }} 步
    </button>
  </section>
</template>

<script setup lang="ts">
import type { Lesson } from '@/types/lesson'

defineProps<{
  lesson: Lesson
  currentStep: number
}>()

defineEmits<{
  resume: []
}>()
</script>

<style scoped>
.recent-card {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border: 1px solid #32363a;
  border-radius: 12px;
  background: linear-gradient(135deg, #2f3640 0%, #262b33 100%);
  margin-bottom: 16px;
}

.eyebrow {
  color: #8bb4ff;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

h2 {
  margin: 0 0 6px;
  font-size: 20px;
  color: #f3f6fa;
}

.description {
  margin: 0;
  color: #b6bec8;
  line-height: 1.5;
}

.resume-button {
  align-self: center;
  border: none;
  border-radius: 999px;
  padding: 10px 16px;
  background: #4f8cff;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}
</style>
