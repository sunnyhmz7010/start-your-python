import { describe, expect, it } from 'vitest'
import { localContentProvider } from '@/services/content/localContentProvider'

describe('course tree', () => {
  it('exposes multiple lessons in the first chapter', async () => {
    const chapters = await localContentProvider.getChapters()

    expect(chapters[0]?.lessons.length ?? 0).toBeGreaterThan(2)
  })
})
