<template>
  <div class="markdown-content" v-html="html"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

const props = defineProps<{
  source: string
}>()

marked.setOptions({
  gfm: true,
  breaks: true
})

const html = computed(() => marked.parse(props.source) as string)
</script>

<style scoped>
.markdown-content {
  color: inherit;
  line-height: 1.7;
}

.markdown-content :deep(p),
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0 0 12px;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 20px;
}

.markdown-content :deep(code) {
  padding: 2px 6px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 0.95em;
}

.markdown-content :deep(img) {
  display: block;
  width: 100%;
  max-width: 680px;
  margin: 14px 0;
  border-radius: 14px;
  border: 1px solid rgba(149, 168, 193, 0.18);
  background: rgba(8, 14, 22, 0.55);
}

.markdown-content :deep(strong) {
  color: #eef5ff;
}

.markdown-content :deep(a) {
  color: #8ab4ff;
}
</style>
