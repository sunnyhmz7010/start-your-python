import { flushPromises, mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import MobileView from '@/views/MobileView.vue'

async function waitForReader() {
  await flushPromises()
  await flushPromises()
  await new Promise((resolve) => setTimeout(resolve, 40))
}

describe('MobileView reader', () => {
  beforeEach(() => {
    localStorage.clear()
    window.confirm = () => true
  })

  it('renders the mobile reader without desktop runtime tools', async () => {
    const wrapper = mount(MobileView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForReader()

    expect(wrapper.get('[data-testid="mobile-reader"]').text()).toContain('分钟')
    expect(wrapper.text()).toContain('纯课程阅读模式')
    expect(wrapper.text()).not.toContain('Run Current File')
    expect(wrapper.text()).not.toContain('Terminal')
    expect(wrapper.find('.step-content img').exists()).toBe(true)
  })

  it('tracks step navigation and completion in reader mode', async () => {
    const wrapper = mount(MobileView, {
      global: {
        plugins: [createPinia()]
      }
    })

    await waitForReader()
    const initialTitle = wrapper.get('.step-card h3').text()

    await wrapper.get('[data-testid="mobile-mark-step"]').trigger('click')
    await wrapper.get('.primary').trigger('click')
    await flushPromises()

    expect(wrapper.findAll('.step-chip.completed').length).toBeGreaterThan(0)
    expect(wrapper.get('.step-card h3').text()).not.toBe(initialTitle)
  })
})
