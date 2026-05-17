import { describe, expect, it } from 'vitest'
import { sanitizeHtml } from '@/utils/sanitizeHtml'

describe('sanitizeHtml', () => {
  it('keeps common markdown output', () => {
    const html = sanitizeHtml('<p><strong>重点</strong> <code class="language-python">print(1)</code></p>')

    expect(html).toContain('<strong>重点</strong>')
    expect(html).toContain('<code class="language-python">print(1)</code>')
  })

  it('removes scripts, event handlers, styles, and unsafe links', () => {
    const html = sanitizeHtml('<p onclick="alert(1)" style="color:red">文本</p><script>alert(1)</script><a href="javascript:alert(1)">坏链接</a>')

    expect(html).toContain('<p>文本</p>')
    expect(html).toContain('<a>坏链接</a>')
    expect(html).not.toContain('onclick')
    expect(html).not.toContain('style=')
    expect(html).not.toContain('script')
    expect(html).not.toContain('javascript:')
  })

  it('allows course images and drops external image sources', () => {
    const html = sanitizeHtml('<img src="/course-images/python-install-checklist.svg" alt="安装"><img src="https://example.com/bad.png" alt="bad">')

    expect(html).toContain('<img src="/course-images/python-install-checklist.svg" alt="安装">')
    expect(html).not.toContain('https://example.com/bad.png')
  })
})
