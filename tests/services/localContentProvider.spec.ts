import { describe, expect, it } from 'vitest'
import { localContentProvider } from '@/services/content/localContentProvider'

describe('localContentProvider', () => {
  it('returns populated chapters and lessons', async () => {
    const chapters = await localContentProvider.getChapters()

    expect(chapters.length).toBeGreaterThan(0)
    expect(chapters[0]?.lessons.length ?? 0).toBeGreaterThan(0)
  })
})
