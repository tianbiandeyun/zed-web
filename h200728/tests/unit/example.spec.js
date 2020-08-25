import {shallowMount} from '@vue/test-utils'
import calender from '@/components/calender/calender'

describe('calender.vue', () => {
    it('renders props.msg when passed', () => {
        const date = new Date();
        const wrapper = shallowMount(calender, {
            propsData: {date}
        });
        console.log(wrapper)
    })
});
