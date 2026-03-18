<template>
  <aside class="lesson-tree">
    <div class="tree-root">learning_project</div>

    <div v-for="chapter in chapters" :key="chapter.id" class="chapter">
      <div class="chapter-title">{{ chapter.folderName }}</div>
      <button
        v-for="lesson in chapter.lessons"
        :key="lesson.id"
        class="lesson-item"
        :class="{ active: currentLessonId === lesson.id }"
        type="button"
        @click="$emit('selectLesson', lesson)"
      >
        <span class="lesson-name">{{ lesson.fileName ?? `${lesson.title}.py` }}</span>
        <span v-if="completedLessonIds.includes(lesson.id)" class="badge completed">done</span>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Chapter, Lesson } from '@/types/lesson'

defineProps<{
  chapters: Chapter[]
  currentLessonId: string | null
  completedLessonIds: string[]
}>()

defineEmits<{
  selectLesson: [lesson: Lesson]
}>()
</script>

<style scoped>
.lesson-tree {
  flex: 1;
  background: #252931;
  padding: 10px 8px 16px;
  overflow-y: auto;
}

.tree-root {
  padding: 6px 8px 12px;
  color: #d9e0ea;
  font-size: 13px;
}

.chapter + .chapter {
  margin-top: 10px;
}

.chapter-title {
  color: #8ea0b5;
  font-size: 12px;
  margin-bottom: 6px;
  padding: 0 8px;
}

.lesson-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 7px 8px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: #c1cad4;
  cursor: pointer;
  margin-bottom: 2px;
  text-align: left;
  font-size: 13px;
}

.lesson-item:hover,
.lesson-item.active {
  background: #303642;
  border-color: #3e4553;
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
</style>
