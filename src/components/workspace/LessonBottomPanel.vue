<template>
  <BottomToolWindows
    :active-tab="activeTab"
    :terminal-output="terminalOutput"
    :is-python-missing="isPythonMissing"
    :is-python-running="isPythonRunning"
    :problem-messages="problemMessages"
    :python-info="pythonInfo"
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
  terminalOutput: string
  isPythonMissing: boolean
  isPythonRunning: boolean
  problemMessages: string[]
  pythonInfo: string | null
}>()

defineEmits<{
  changeTab: [tab: WorkspaceBottomTab]
  submitInput: [input: string]
  stopRun: []
  recheckPython: []
  openInstallLesson: []
}>()
</script>
