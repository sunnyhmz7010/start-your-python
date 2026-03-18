<template>
  <BottomToolWindows
    :active-tab="activeTab"
    :console-output="consoleOutput"
    @change-tab="$emit('changeTab', $event)"
  />
</template>

<script setup lang="ts">
import BottomToolWindows from './BottomToolWindows.vue'
import type { WorkspaceBottomTab } from './types'

defineProps<{
  activeTab: WorkspaceBottomTab
  consoleOutput: string
}>()

defineEmits<{
  changeTab: [tab: WorkspaceBottomTab]
}>()
</script>
