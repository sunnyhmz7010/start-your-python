<template>
  <aside class="lesson-tree">
    <button
      type="button"
      class="tree-root"
      @click="rootExpanded = !rootExpanded"
    >
      <span class="caret open">{{ rootExpanded ? '▾' : '▸' }}</span>
      <span class="folder-icon root-folder"></span>
      <span class="root-name">start-your-python</span>
    </button>

    <div
      v-for="chapter in chapters"
      :key="chapter.id"
      class="tree-group"
      v-show="rootExpanded"
    >
      <button
        type="button"
        class="folder-row"
        @click="toggleChapter(chapter.id)"
      >
        <span class="caret">{{ expandedChapterIds.includes(chapter.id) ? '▾' : '▸' }}</span>
        <span class="folder-icon chapter-folder"></span>
        <span class="folder-name">{{ chapter.folderName }}</span>
      </button>

      <div v-if="expandedChapterIds.includes(chapter.id)" class="lesson-list">
        <button
          v-for="lesson in chapter.lessons"
          :key="lesson.id"
          class="lesson-item"
          :class="{ active: currentLessonId === lesson.id }"
          type="button"
          @click="$emit('selectLesson', lesson)"
        >
          <span class="lesson-guide"></span>
          <span class="file-icon python-file"></span>
          <span class="lesson-name">{{ lesson.fileName ?? `${lesson.title}.py` }}</span>
          <span v-if="completedLessonIds.includes(lesson.id)" class="badge completed">done</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Chapter, Lesson } from '@/types/lesson'

const props = defineProps<{
  chapters: Chapter[]
  currentLessonId: string | null
  completedLessonIds: string[]
}>()

defineEmits<{
  selectLesson: [lesson: Lesson]
}>()

const expandedChapterIds = ref<string[]>([])
const rootExpanded = ref(true)

watch(
  () => props.chapters,
  (chapters) => {
    expandedChapterIds.value = chapters.map((chapter) => chapter.id)
  },
  { immediate: true }
)

function toggleChapter(chapterId: string) {
  expandedChapterIds.value = expandedChapterIds.value.includes(chapterId)
    ? expandedChapterIds.value.filter((id) => id !== chapterId)
    : [...expandedChapterIds.value, chapterId]
}
</script>

<style scoped>
.lesson-tree {
  flex: 1;
  background: #252931;
  padding: 6px 0 14px;
  overflow-y: auto;
  font-size: 12px;
}

.tree-root,
.folder-row,
.lesson-item {
  width: 100%;
  min-height: 24px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #c6cfdb;
}

.tree-root {
  padding: 0 12px 6px;
  font-weight: 500;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.tree-group {
  display: flex;
  flex-direction: column;
}

.folder-row,
.lesson-item {
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  padding: 0 12px;
}

.folder-row:hover,
.lesson-item:hover {
  background: #2a2f39;
}

.lesson-item.active {
  background: #304f83;
  color: #f4f7fb;
}

.caret {
  width: 12px;
  color: #7f8896;
  flex-shrink: 0;
  text-align: center;
  font-size: 11px;
}

.caret.open {
  color: #7f8794;
}

.folder-icon,
.file-icon {
  position: relative;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.folder-icon::before,
.folder-icon::after,
.file-icon::before,
.file-icon::after {
  content: '';
  position: absolute;
}

.root-folder::before,
.chapter-folder::before {
  inset: 3px 1px 1px 1px;
  background: #c89f43;
  border-radius: 2px;
}

.root-folder::after,
.chapter-folder::after {
  width: 7px;
  height: 4px;
  top: 1px;
  left: 1px;
  background: #dbb35b;
  border-radius: 2px 2px 0 0;
}

.python-file::before {
  inset: 1px 2px;
  background: #d8dde7;
  border-radius: 2px;
}

.python-file::after {
  width: 6px;
  height: 6px;
  right: 2px;
  top: 1px;
  background: linear-gradient(135deg, #bfc7d4 50%, transparent 51%);
}

.root-name,
.folder-name,
.lesson-name {
  min-width: 0;
  flex: 1;
}

.lesson-list {
  display: flex;
  flex-direction: column;
}

.lesson-guide {
  width: 18px;
  flex-shrink: 0;
}

.badge {
  flex-shrink: 0;
  font-size: 10px;
  color: #7fd18d;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.badge.completed {
  color: #88d993;
}

.lesson-item.active .badge.completed {
  color: #e9f7ec;
}
</style>
