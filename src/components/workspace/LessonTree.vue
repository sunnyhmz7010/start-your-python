<template>
  <aside class="lesson-tree">
    <div class="tree-header">
      <div>
        <p class="label">课程导航</p>
        <h2>Python 入门路径</h2>
      </div>
      <span class="lesson-count">{{ totalLessons }} 节</span>
    </div>

    <div v-for="chapter in chapters" :key="chapter.id" class="chapter">
      <div class="chapter-title">{{ chapter.title }}</div>
      <button
        v-for="lesson in chapter.lessons"
        :key="lesson.id"
        class="lesson-item"
        :class="{ active: currentLessonId === lesson.id }"
        type="button"
        @click="$emit('selectLesson', lesson)"
      >
        <span class="lesson-name">{{ lesson.title }}</span>
        <span v-if="completedLessonIds.includes(lesson.id)" class="badge completed">已完成</span>
        <span v-else class="badge pending">{{ lesson.estimatedTime }} 分钟</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Chapter, Lesson } from '@/types/lesson'

const props = defineProps<{
  chapters: Chapter[]
  currentLessonId: string | null
  completedLessonIds: string[]
}>()

defineEmits<{
  selectLesson: [lesson: Lesson]
}>()

const totalLessons = computed(() =>
  props.chapters.reduce((count, chapter) => count + chapter.lessons.length, 0)
)
</script>

<style scoped>
.lesson-tree {
  width: 300px;
  border-right: 1px solid #32363a;
  background: #252a31;
  padding: 18px 14px;
  overflow-y: auto;
}

.tree-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: start;
  margin-bottom: 18px;
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
  font-size: 18px;
  color: #f3f6fa;
}

.lesson-count {
  font-size: 12px;
  color: #9ba7b4;
}

.chapter + .chapter {
  margin-top: 16px;
}

.chapter-title {
  color: #dbe4ee;
  font-size: 13px;
  margin-bottom: 8px;
}

.lesson-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: #c1cad4;
  cursor: pointer;
  margin-bottom: 6px;
  text-align: left;
}

.lesson-item:hover,
.lesson-item.active {
  background: #313845;
  border-color: #465063;
}

.lesson-name {
  flex: 1;
}

.badge {
  flex-shrink: 0;
  font-size: 11px;
}

.badge.completed {
  color: #72d28c;
}

.badge.pending {
  color: #8ea0b5;
}
</style>
