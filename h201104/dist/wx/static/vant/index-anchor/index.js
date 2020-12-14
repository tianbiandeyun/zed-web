import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        name: 'organize-bar',
        type: 'ancestor',
        current: 'organize-anchor',
    },
    props: {
        useSlot: Boolean,
        index: null
    },
    data: {
        active: false,
        wrapperStyle: '',
        anchorStyle: ''
    }
});
