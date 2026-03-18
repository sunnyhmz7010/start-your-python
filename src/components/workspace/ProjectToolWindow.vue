<template>
  <div class="project-window">
    <div class="stripe">
      <div class="stripe-icon active"></div>
      <div class="stripe-icon"></div>
      <div class="stripe-icon"></div>
    </div>

    <div class="project-panel">
      <div class="panel-header">Project</div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.project-window {
  display: flex;
  min-height: 0;
  background: #252931;
  border-right: 1px solid #313540;
}

.stripe {
  width: 34px;
  background: #20242b;
  border-right: 1px solid #313540;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-top: 14px;
}

.stripe-icon {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: #505764;
}

.stripe-icon.active {
  background: #6d99ff;
}

.project-panel {
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
}

.panel-header {
  height: 34px;
  padding: 8px 12px;
  font-size: 13px;
  color: #e6edf7;
  border-bottom: 1px solid #313540;
}
</style>
