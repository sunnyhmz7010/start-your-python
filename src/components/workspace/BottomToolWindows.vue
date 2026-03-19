<template>
  <section class="bottom-tools">
    <div class="tab-row">
      <button
        data-testid="tool-tab-problems"
        type="button"
        class="tool-tab"
        :class="{ active: activeTab === 'problems' }"
        @click="$emit('changeTab', 'problems')"
      >
        Problems
      </button>
      <button
        data-testid="tool-tab-terminal"
        type="button"
        class="tool-tab"
        :class="{ active: activeTab === 'terminal' }"
        @click="$emit('changeTab', 'terminal')"
      >
        Terminal
      </button>
      <button
        data-testid="tool-tab-run"
        type="button"
        class="tool-tab"
        :class="{ active: activeTab === 'run' }"
        @click="$emit('changeTab', 'run')"
      >
        Run
      </button>
    </div>

    <div class="tool-content">
      <div v-if="activeTab === 'problems'">No problems found</div>
      <pre v-else-if="activeTab === 'terminal'" class="terminal-copy">{{ terminalOutput }}</pre>
      <pre v-else>{{ consoleOutput || 'Run the current lesson to see teaching output.' }}</pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { WorkspaceBottomTab } from './types'

const props = defineProps<{
  activeTab: WorkspaceBottomTab
  consoleOutput: string
}>()

defineEmits<{
  changeTab: [tab: WorkspaceBottomTab]
}>()

const terminalOutput = computed(() => {
  return [
    '(.venv) PS C:\\Users\\Sunny\\start-your-python>',
    props.consoleOutput
      ? 'Lesson workspace ready. Click Run to enter teaching mode.'
      : 'Terminal ready. Select a lesson file or press Run to continue.',
    'Python 3.12.0'
  ].join('\n')
})
</script>

<style scoped>
.bottom-tools {
  height: clamp(170px, 24vh, 220px);
  min-height: 150px;
  border-top: 1px solid #313540;
  background: #22262e;
  display: flex;
  flex-direction: column;
}

.tab-row {
  height: 34px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 8px;
  border-bottom: 1px solid #313540;
}

.tool-tab {
  border: none;
  background: transparent;
  color: #aeb8c7;
  padding: 7px 10px;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
}

.tool-tab.active {
  background: #2f3541;
  color: #fff;
}

.tool-content {
  flex: 1;
  padding: 12px 14px;
  color: #cbd4df;
  overflow: auto;
  font-size: 13px;
}

pre {
  margin: 0;
  white-space: pre-wrap;
  font-family: 'JetBrains Mono', Consolas, monospace;
}

.terminal-copy {
  color: #b8d6b6;
}
</style>
