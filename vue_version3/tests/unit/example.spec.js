import {
  shallowMount
} from '@vue/test-utils'
import test from '@/components/test.vue'

describe('test.vue', () => {
  it('renders props.msg when passed', () => {
    const name = 'new message'
    const wrapper = shallowMount(test, {
      propsData: {
        name
      }
    })
    expect(wrapper.text()).toMatch(name)
  })
})