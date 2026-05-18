<template>
  <div v-if="step.options?.length" class="quiz-step" data-testid="quiz-step">
    <button
      v-for="option in step.options"
      :key="option.id"
      type="button"
      class="quiz-option"
      :class="{
        selected: selectedOptionId === option.id,
        correct: selectedOptionId === option.id && option.isCorrect,
        wrong: selectedOptionId === option.id && !option.isCorrect
      }"
      @click="handleSelectOption(option)"
    >
      <span class="option-id">{{ option.id }}</span>
      <span>{{ option.text }}</span>
    </button>

    <p v-if="selectedOption" class="quiz-feedback" :class="{ correct: selectedOption.isCorrect }">
      {{ selectedOption.isCorrect ? '回答正确' : '再想一想' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { LessonStep, QuizOption, QuizAnswerPayload } from '@/types/lesson'

const props = defineProps<{
  step: LessonStep
}>()

const emit = defineEmits<{
  answer: [payload: QuizAnswerPayload]
}>()

const selectedOptionId = ref<string | null>(null)
const selectedOption = computed(() =>
  props.step.options?.find((option) => option.id === selectedOptionId.value) ?? null
)

function handleSelectOption(option: QuizOption) {
  selectedOptionId.value = option.id
  emit('answer', {
    optionId: option.id,
    isCorrect: option.isCorrect
  })
}

watch(
  () => props.step.id,
  () => {
    selectedOptionId.value = null
  }
)
</script>

<style scoped>
.quiz-step {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.quiz-option {
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border: 1px solid #394150;
  border-radius: 8px;
  padding: 10px 12px;
  background: #202630;
  color: #dbe4f0;
  text-align: left;
  cursor: pointer;
}

.quiz-option.selected {
  border-color: #5f8fd6;
  background: #24344b;
}

.quiz-option.correct {
  border-color: #4f8f5f;
  background: #203427;
}

.quiz-option.wrong {
  border-color: #8f5b5b;
  background: #392629;
}

.option-id {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #111820;
  color: #9fb0c6;
  font-size: 12px;
  text-transform: uppercase;
}

.quiz-feedback {
  margin: 0;
  color: #ffb7bd;
  font-size: 13px;
}

.quiz-feedback.correct {
  color: #9de6ad;
}
</style>
