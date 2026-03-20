<template>
  <BottomToolWindows
    :active-tab="activeTab"
    :console-output="consoleOutput"
    :terminal-output="terminalOutput"
    :can-submit-input="canSubmitInput"
    :is-python-missing="isPythonMissing"
    @change-tab="$emit('changeTab', $event)"
    @submit-input="$emit('submitInput', $event)"
    @stop-run="$emit('stopRun')"
    @recheck-python="$emit('recheckPython')"
    @open-install-lesson="$emit('openInstallLesson')"
  />
</template>

<script setup lang="ts">
import BottomToolWindows from './BottomToolWindows.vue'
import type { WorkspaceBottomTab } from './types'

defineProps<{
  activeTab: WorkspaceBottomTab
  consoleOutput: string
  terminalOutput: string
  canSubmitInput: boolean
  isPythonMissing: boolean
}>()

defineEmits<{
  changeTab: [tab: WorkspaceBottomTab]
  submitInput: [input: string]
  stopRun: []
  recheckPython: []
  openInstallLesson: []
}>()
</script>
