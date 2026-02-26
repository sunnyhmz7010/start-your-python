import re

with open('src/views/HomeView.vue', 'r', encoding='utf-8') as f:
    content = f.read()

style_start = content.find('<style scoped>')
html_js_content = content[:style_start]

clean_css = """<style scoped>
* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: #2B2B2B;
}
::-webkit-scrollbar-thumb {
  background: #43464A;
  border-radius: 0;
}
::-webkit-scrollbar-thumb:hover {
  background: #4B4E52;
}
::-webkit-scrollbar-corner {
  background: #2B2B2B;
}

.pycharm-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #2b2b2b;
  color: #A9B7C6;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 12px;
  overflow: hidden;
}

.menu-bar {
  height: 28px;
  background-color: #3C3F41;
  display: flex;
  align-items: center;
  padding: 0 8px;
  user-select: none;
}

.menu-item {
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 13px;
  color: #BBB;
}

.menu-item:hover {
  background-color: #4C5052;
  color: #FFF;
}

.menu-item u {
  text-decoration: none;
}

.toolbar {
  height: 34px;
  background-color: #3C3F41;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-bottom: 1px solid #323232;
  gap: 4px;
}

.toolbar-group {
  display: flex;
  align-items: center;
  gap: 2px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  color: #AFB1B3;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

.toolbar-btn:hover {
  background-color: #4C5052;
}

.toolbar-btn.run-btn {
  padding: 0 8px;
  color: #59A869;
}
.toolbar-btn.run-btn span {
  color: #AFB1B3;
}
.toolbar-btn.run-btn:hover { background-color: #4C5052; }

.toolbar-btn.debug-btn { color: #3592C4; }
.toolbar-btn.stop-btn { color: #E55252; }

.toolbar-separator {
  width: 1px;
  height: 20px;
  background-color: #323232;
  margin: 0 6px;
}

.toolbar-right {
  margin-left: auto;
  padding-right: 8px;
}

.project-name {
  font-weight: 500;
  color: #AFB1B3;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.left-stripe {
  width: 36px;
  background-color: #3C3F41;
  border-right: 1px solid #323232;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
}

.stripe-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #AFB1B3;
  cursor: pointer;
  margin-bottom: 4px;
}

.stripe-btn:hover {
  background-color: #4C5052;
}

.stripe-btn.active {
  background-color: #4C5052;
  color: #FFFFFF;
}

.project-panel {
  width: 250px;
  background-color: #3C3F41;
  border-right: 1px solid #323232;
  display: flex;
  flex-direction: column;
}

.panel-title-bar {
  height: 28px;
  background-color: #3C3F41;
  border-bottom: 1px solid #323232;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 13px;
  color: #AFB1B3;
}

.panel-actions {
  display: flex;
  gap: 2px;
}

.panel-action-btn {
  background: transparent;
  border: none;
  color: #AFB1B3;
  cursor: pointer;
  border-radius: 3px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel-action-btn:hover {
  background-color: #4C5052;
}

.project-tree {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.tree-root {
  user-select: none;
}

.tree-item, .tree-node {
  display: flex;
  align-items: center;
  padding: 2px 4px 2px 8px;
  cursor: pointer;
  height: 24px;
}

.tree-item:hover, .tree-node:hover {
  background-color: #2D2F30;
}

.tree-item.selected {
  background-color: #2F65CA;
  color: white;
}

.tree-icon {
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  margin-right: 2px;
  color: #777;
}

.tree-folder-icon, .tree-file-icon {
  margin-right: 4px;
  flex-shrink: 0;
}

.tree-name {
  flex: 1;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-children {
  margin-left: 12px;
}

.status-icon {
  color: #59A869;
  font-size: 10px;
  margin-left: 4px;
}

.editor-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
  background-color: #2B2B2B;
}

.editor-tabs {
  height: 30px;
  background-color: #3C3F41;
  display: flex;
  align-items: flex-end;
  border-bottom: none;
  overflow: hidden;
}

.editor-tab {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 12px;
  background-color: #3C3F41;
  border-right: 1px solid #323232;
  border-top: 3px solid transparent;
  color: #AFB1B3;
  cursor: pointer;
  min-width: 120px;
  font-size: 13px;
}

.editor-tab:hover {
  background-color: #2D2F30;
}

.editor-tab.active {
  background-color: #2B2B2B;
  color: #A9B7C6;
  border-top: 3px solid #4A88C7;
  border-right: 1px solid #323232;
}

.tab-icon { margin-right: 6px; }
.tab-name { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.tab-close {
  background: transparent; border: none; color: #777; cursor: pointer;
  font-size: 14px; margin-left: 4px; width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center; border-radius: 3px;
}
.tab-close:hover { background-color: rgba(255, 255, 255, 0.1); color: #d4d4d4; }
.editor-tab.empty { cursor: default; }
.editor-tab.empty:hover { background-color: transparent; }

.tabs-actions { margin-left: auto; display: flex; align-items: center; padding: 0 4px; height: 100%; }
.tab-action-btn { background: transparent; border: none; color: #AFB1B3; cursor: pointer; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 3px; }
.tab-action-btn:hover { background-color: #4C5052; }

.breadcrumb {
  height: 24px; background-color: #2B2B2B; border-bottom: 1px solid #323232;
  display: flex; align-items: center; padding: 0 12px; color: #AFB1B3;
}
.breadcrumb-item { cursor: pointer; }
.breadcrumb-item:hover { text-decoration: underline; }
.breadcrumb-item.current { color: #A9B7C6; cursor: default; }
.breadcrumb-item.current:hover { text-decoration: none; }
.breadcrumb-separator { margin: 0 6px; color: #777; }

.editor-content { flex: 1; display: flex; overflow: hidden; background-color: #2B2B2B; }
.code-area { flex: 1; overflow: hidden; display: flex; flex-direction: column; }
.codemirror-editor { flex: 1; overflow: auto; font-family: 'JetBrains Mono', Consolas, Menlo, monospace; font-size: 14px; }

.welcome-screen { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; color: #AFB1B3; }
.welcome-content { max-width: 600px; width: 100%; }
.welcome-content h1 { font-weight: normal; margin-bottom: 30px; color: #A9B7C6; }
.welcome-section { margin-bottom: 24px; }
.welcome-section h3 { font-weight: normal; color: #A9B7C6; margin-bottom: 12px; border-bottom: 1px solid #323232; padding-bottom: 4px; }
.welcome-section ul { list-style: none; padding: 0; }
.welcome-section li { padding: 4px 0; }
kbd { background-color: #3C3F41; padding: 2px 6px; border-radius: 3px; font-family: monospace; border: 1px solid #323232; font-size: 11px; }

.steps-panel { min-width: 200px; max-width: 500px; background-color: #2B2B2B; border-left: 1px solid #323232; display: flex; flex-direction: column; position: relative; }
.steps-resize-handle { position: absolute; left: -2px; top: 0; bottom: 0; width: 4px; cursor: ew-resize; background-color: transparent; z-index: 10; }
.steps-resize-handle:hover { background-color: #4A88C7; }
.steps-content { flex: 1; overflow-y: auto; padding: 8px; }
.step-item { display: flex; align-items: center; padding: 6px 8px; margin-bottom: 2px; border-radius: 4px; cursor: pointer; }
.step-item:hover { background-color: #2D2F30; }
.step-item.active { background-color: #2F65CA; color: white; }
.step-item.completed { opacity: 0.7; }
.step-number { width: 20px; height: 20px; background-color: #3
