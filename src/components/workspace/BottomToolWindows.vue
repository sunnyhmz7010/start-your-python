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
        <span v-if="problemMessages.length" class="problem-count">{{ problemMessages.length }}</span>
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
      <div v-if="activeTab === 'problems'" class="problems-panel">
        <div v-if="problemMessages.length" class="problem-list">
          <div v-for="message in problemMessages" :key="message" class="problem-item">
            <span class="problem-severity">Warning</span>
            <span>{{ message }}</span>
          </div>
        </div>
        <div v-else>No problems found</div>
      </div>
      <div v-else-if="activeTab === 'terminal'" class="terminal-panel">
        <div v-if="pythonInfo" class="runtime-info" data-testid="python-runtime-info">
          {{ pythonInfo }}
        </div>
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
  problemMessages: string[]
  pythonInfo: string | null
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

.problem-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  margin-left: 6px;
  border-radius: 999px;
  background: #8a5d20;
  color: #ffe9b3;
  font-size: 10px;
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

.runtime-info {
  display: inline-flex;
  align-self: flex-start;
  border: 1px solid #344153;
  border-radius: 6px;
  padding: 5px 8px;
  background: #1b222c;
  color: #9fb3cc;
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 12px;
}

.problems-panel {
  color: #cbd4df;
}

.problem-list {
  display: grid;
  gap: 8px;
}

.problem-item {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 9px 10px;
  border: 1px solid #4c3f27;
  border-radius: 6px;
  background: #2a261f;
}

.problem-severity {
  flex-shrink: 0;
  color: #ffd37a;
  font-size: 12px;
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
