import re

with open('src/views/HomeView.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the start of <style scoped>
style_start = content.find('<style scoped>')
if style_start != -1:
    css_content = content[style_start:]
    html_js_content = content[:style_start]

    # Apply Darcula colors
    
    # Remove gradients
    css_content = re.sub(r'background:\s*linear-gradient[^;]+;', 'background-color: #3C3F41;', css_content)
    
    # Fix menu item hovers
    css_content = css_content.replace('background-color: rgba(255, 255, 255, 0.1);', 'background-color: #4C5052;')
    css_content = css_content.replace('background-color: rgba(255, 255, 255, 0.05);', 'background-color: #2D2F30;')
    
    # Run/Debug buttons
    css_content = re.sub(r'\.toolbar-btn\.run-btn\s*\{[^}]+\}', '.toolbar-btn.run-btn { color: #59A869; }\n.toolbar-btn.run-btn:hover { background-color: #4C5052; }', css_content)
    css_content = re.sub(r'\.toolbar-btn\.debug-btn\s*\{[^}]+\}', '.toolbar-btn.debug-btn { color: #3592C4; }\n.toolbar-btn.debug-btn:hover { background-color: #4C5052; }', css_content)
    css_content = re.sub(r'\.toolbar-btn\.stop-btn\s*\{[^}]+\}', '.toolbar-btn.stop-btn { color: #E55252; }\n.toolbar-btn.stop-btn:hover { background-color: #4C5052; }', css_content)
    
    # Fix editor tabs
    css_content = css_content.replace('.editor-tab.active {\n  background-color: #2b2b2b;\n  color: #a9b7c6;\n  border-bottom: 1px solid #1e1e1e;\n}', '.editor-tab.active {\n  background-color: #2b2b2b;\n  color: #A9B7C6;\n  border-top: 2px solid #4A88C7;\n  border-bottom: none;\n}')
    css_content = css_content.replace('.editor-tab {\n  height: 26px;', '.editor-tab {\n  height: 26px;\n  background-color: #3C3F41;\n  border-right: 1px solid #323232;\n  border-top: 2px solid transparent;')
    
    # Border colors
    css_content = css_content.replace('1px solid #1e1e1e', '1px solid #323232')
    
    # Active tree item
    css_content = css_content.replace('background-color: #214283;', 'background-color: #2F65CA; color: #FFFFFF;')
    
    # Left stripe
    css_content = css_content.replace('background-color: #555;', 'background-color: #4C5052; color: #FFFFFF;')
    
    with open('src/views/HomeView.vue', 'w', encoding='utf-8') as f:
        f.write(html_js_content + css_content)
        
    print("CSS Patched")
