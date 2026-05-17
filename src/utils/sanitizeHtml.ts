const ALLOWED_TAGS = new Set([
  'a',
  'blockquote',
  'br',
  'code',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'img',
  'li',
  'ol',
  'p',
  'pre',
  'strong',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'ul'
])

const DROP_WITH_CONTENT = new Set([
  'button',
  'embed',
  'form',
  'iframe',
  'input',
  'math',
  'object',
  'script',
  'select',
  'style',
  'svg',
  'textarea'
])

const IMAGE_SRC_PATTERN = /^\/course-images\/[\w./-]+\.(?:avif|gif|jpe?g|png|svg|webp)$/i

function isSafeLink(value: string) {
  const trimmedValue = value.trim()

  if (trimmedValue.startsWith('#') || trimmedValue.startsWith('/')) {
    return true
  }

  try {
    const url = new URL(trimmedValue)
    return ['http:', 'https:', 'mailto:'].includes(url.protocol)
  } catch {
    return false
  }
}

function isSafeImageSource(value: string) {
  return IMAGE_SRC_PATTERN.test(value.trim())
}

function cloneSafeNode(node: Node, document: Document): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return document.createTextNode(node.textContent ?? '')
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null
  }

  const element = node as Element
  const tagName = element.tagName.toLowerCase()

  if (!ALLOWED_TAGS.has(tagName)) {
    if (DROP_WITH_CONTENT.has(tagName)) {
      return null
    }

    const fragment = document.createDocumentFragment()
    for (const child of Array.from(element.childNodes)) {
      const cleanChild = cloneSafeNode(child, document)
      if (cleanChild) {
        fragment.appendChild(cleanChild)
      }
    }

    return fragment
  }

  const cleanElement = document.createElement(tagName)

  for (const attribute of Array.from(element.attributes)) {
    const attributeName = attribute.name.toLowerCase()
    const attributeValue = attribute.value

    if (attributeName.startsWith('on') || attributeName === 'style') {
      continue
    }

    if (tagName === 'a' && attributeName === 'href' && isSafeLink(attributeValue)) {
      cleanElement.setAttribute('href', attributeValue)
      continue
    }

    if (tagName === 'a' && attributeName === 'title') {
      cleanElement.setAttribute('title', attributeValue)
      continue
    }

    if (tagName === 'img' && attributeName === 'src' && isSafeImageSource(attributeValue)) {
      cleanElement.setAttribute('src', attributeValue)
      continue
    }

    if (tagName === 'img' && ['alt', 'title'].includes(attributeName)) {
      cleanElement.setAttribute(attributeName, attributeValue)
      continue
    }

    if (tagName === 'code' && attributeName === 'class' && /^language-[\w-]+$/.test(attributeValue)) {
      cleanElement.setAttribute('class', attributeValue)
    }
  }

  if (tagName === 'a' && cleanElement.hasAttribute('href')) {
    cleanElement.setAttribute('rel', 'noopener noreferrer')
  }

  for (const child of Array.from(element.childNodes)) {
    const cleanChild = cloneSafeNode(child, document)
    if (cleanChild) {
      cleanElement.appendChild(cleanChild)
    }
  }

  if (tagName === 'img' && !cleanElement.hasAttribute('src')) {
    return null
  }

  return cleanElement
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function sanitizeHtml(html: string) {
  if (typeof DOMParser === 'undefined' || typeof Node === 'undefined') {
    return escapeHtml(html)
  }

  const document = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html')
  const cleanBody = document.createElement('body')

  for (const child of Array.from(document.body.childNodes)) {
    const cleanChild = cloneSafeNode(child, document)
    if (cleanChild) {
      cleanBody.appendChild(cleanChild)
    }
  }

  return cleanBody.innerHTML
}
