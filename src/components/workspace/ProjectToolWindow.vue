<template>
  <div class="project-window">
    <div class="stripe">
      <div class="stripe-tab active" title="Project">
        <span class="stripe-glyph project"></span>
      </div>
      <div class="stripe-tab" title="Structure">
        <span class="stripe-glyph structure"></span>
      </div>
      <div class="stripe-tab" title="Services">
        <span class="stripe-glyph services"></span>
      </div>
    </div>

    <div class="project-panel">
      <div class="panel-header">
        <span class="panel-title">Project</span>
        <span class="panel-actions">...</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.project-window {
  display: flex;
  min-height: 0;
  background: #252931;
  border-right: 1px solid #303540;
}

.stripe {
  width: 34px;
  background: #23262d;
  border-right: 1px solid #2f3440;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
}

.stripe-tab {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stripe-tab.active {
  background: #2d5aa7;
}

.stripe-glyph {
  position: relative;
  display: block;
  width: 14px;
  height: 14px;
}

.stripe-glyph::before,
.stripe-glyph::after {
  content: '';
  position: absolute;
  background: #95a0b1;
}

.stripe-tab.active .stripe-glyph::before,
.stripe-tab.active .stripe-glyph::after {
  background: #dbe7ff;
}

.stripe-glyph.project::before {
  inset: 2px 1px 1px 1px;
  border-radius: 3px;
}

.stripe-glyph.project::after {
  width: 5px;
  height: 3px;
  left: 2px;
  top: 0;
  border-radius: 2px 2px 0 0;
}

.stripe-glyph.structure::before {
  width: 4px;
  height: 4px;
  left: 0;
  top: 0;
  border-radius: 2px;
  box-shadow: 8px 0 0 #95a0b1, 4px 8px 0 #95a0b1;
}

.stripe-tab.active .stripe-glyph.structure::before {
  box-shadow: 8px 0 0 #dbe7ff, 4px 8px 0 #dbe7ff;
}

.stripe-glyph.structure::after {
  width: 10px;
  height: 1px;
  left: 2px;
  top: 6px;
}

.stripe-glyph.services::before {
  inset: 1px;
  border-radius: 999px;
}

.stripe-glyph.services::after {
  inset: 4px;
  background: #23262d;
  border-radius: 999px;
}

.project-panel {
  width: 280px;
  min-width: 280px;
  display: flex;
  flex-direction: column;
}

.panel-header {
  height: 34px;
  padding: 0 12px;
  font-size: 12px;
  color: #dce3ec;
  border-bottom: 1px solid #2f3440;
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: 0.01em;
}

.panel-title {
  font-weight: 600;
}

.panel-actions {
  color: #7f8998;
  font-size: 12px;
}
</style>
