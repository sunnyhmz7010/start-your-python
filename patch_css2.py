import re

with open('src/views/HomeView.vue', 'r', encoding='utf-8') as f:
    content = f.read()

style_start = content.find('<style scoped>')
if style_start != -1:
    css_content = content[style_start:]
    html_js_content = content[:style_start]

    # Global font and scrollbars
    custom_global = """
* {
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: #2b2b2b;
}
::-webkit-scrollbar-thumb {
  background: #43464a;
  border-radius: 0;
}
::-webkit-scrollbar-thumb:hover {
  background: #4b4e52;
}
::-webkit-scrollbar-corner {
  background: #2b2b2b;
}

.pycharm-container {
"""
    css_content = css_content.replace('*\n{\n  box-sizing: border-box;\n}\n\n.pycharm-container {', custom_global.strip())
    css_content = css_content.replace('* {\n  box-sizing: border-box;\n}\n\n.pycharm-container {', custom_global.strip())
    
    # Update pycharm-container font
    css_content = re.sub(r'font-family: [^;]+;', 'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;', css_content)
    
    # Fix tab border colors
    css_content = css_content.replace('border-bottom: 1px solid #1e1e1e', 'border-bottom: 1px solid #323232')
    css_content = css_content.replace('border-right: 1px solid #1e1e1e', 'border-right: 1px solid #323232')
    css_content = css_content.replace('border-top: 1px solid #1e1e1e', 'border-top: 1px solid #323232')
    css_content = css_content.replace('border-left: 1px solid #1e1e1e', 'border-left: 1px solid #323232')
    
    # Panel title bar (looks like a tool window header)
    css_content = css_content.replace('.panel-title-bar {\n  height: 26px;\n  background-color: #3c3f41;', '.panel-title-bar {\n  height: 28px;\n  background-color: #3C3F41;\n  border-bottom: 1px solid #323232;')

    # Status bar
    css_content = css_content.replace('.status-bar {\n  height: 24px;\n  background-color: #3c3f41;', '.status-bar {\n  height: 24px;\n  background-color: #3C3F41;\n  border-top: 1px solid #323232;')

    # Tree selection color
    css_content = css_content.replace('background-color: #2F65CA; color: #FFFFFF;', 'background-color: #2F65CA; color: white;')

    # Breadcrumbs
    css_content = css_content.replace('.breadcrumb {\n  height: 24px;\n  background-color: #2b2b2b;', '.breadcrumb {\n  height: 24px;\n  background-color: #2b2b2b;\n  border-bottom: 1px solid #323232;')

    with open('src/views/HomeView.vue', 'w', encoding='utf-8') as f:
        f.write(html_js_content + css_content)
        
    print("CSS Patched 2")
