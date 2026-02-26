with open('src/views/HomeView.vue', 'r', encoding='utf-8') as f:
    content = f.read()

style_start = content.find('<style scoped>')
html_js_content = content[:style_start]

with open('new_styles.css', 'r', encoding='utf-8') as f:
    new_css = f.read()

with open('src/views/HomeView.vue', 'w', encoding='utf-8') as f:
    f.write(html_js_content + new_css)

print("Styles replaced successfully.")
