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
      <div v-else-if="activeTab === 'terminal'" class="terminal-panel">
        <pre class="terminal-copy">{{ terminalOutput }}</pre>

        <div v-if="isPythonMissing" class="runtime-actions">
          <button data-testid="go-to-install-python" type="button" class="inline-button" @click="$emit('openInstallLesson')">
            去学习安装 Python
          </button>
          <button data-testid="recheck-python" type="button" class="inline-button" @click="$emit('recheckPython')">
            重新检测 Python
          </button>
        </div>

        <form v-if="canSubmitInput" class="terminal-input-row" @submit.prevent="submitInput">
          <span class="prompt">&gt;</span>
          <input
            v-model="inputValue"
            data-testid="terminal-input"
            class="terminal-input"
            type="text"
            autocomplete="off"
            placeholder="输入后按 Enter 发送给 Python"
          />
          <button data-testid="stop-run" type="button" class="inline-button danger" @click="$emit('stopRun')">
            Stop
          </button>
        </form>
      </div>
      <pre v-else>{{ consoleOutput || terminalOutput || 'Run the current lesson to see output.' }}</pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { WorkspaceBottomTab } from './types'

const props = defineProps<{
  activeTab: WorkspaceBottomTab
  consoleOutput: string
  terminalOutput: string
  canSubmitInput: boolean
  isPythonMissing: boolean
}>()

const emit = defineEmits<{
  changeTab: [tab: WorkspaceBottomTab]
  submitInput: [input: string]
  stopRun: []
  recheckPython: []
  openInstallLesson: []
}>()

const inputValue = ref('')

const terminalOutput = computed(() => {
  if (props.terminalOutput) {
    return props.terminalOutput
  }

  return 'Terminal ready. Select a lesson file or press Run to continue.'
})

function submitInput() {
  const value = inputValue.value

  emit('submitInput', value)
  inputValue.value = ''
}
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
  flex: 1;
}

.terminal-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  height: 100%;
}

.runtime-actions,
.terminal-input-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.inline-button {
  border: 1px solid #3c4450;
  background: #303744;
  color: #e6edf7;
  border-radius: 6px;
  padding: 7px 10px;
  cursor: pointer;
}

.inline-button.danger {
  background: #4a2428;
  border-color: #603137;
}

.prompt {
  color: #90d48b;
}

.terminal-input {
  flex: 1;
  border: 1px solid #394150;
  border-radius: 6px;
  background: #181c22;
  color: #e6edf7;
  padding: 8px 10px;
}
</style>
