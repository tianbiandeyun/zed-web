import Vue from 'vue'
import tipComponent from './tipComponent'

const merge = ($data, option) => {
    for (let prop in option) {
        if ($data.hasOwnProperty(prop)) {
            $data[prop] = option[[prop]]
        }
    }
};

let tipConstructor = Vue.extend(tipComponent)

const prompt = (option = {}) => {
    let initComponent = new tipConstructor().$mount();

    if (typeof option !== 'object') {
        initComponent.content = option;
    } else {
        merge(initComponent.$data, option)
    }
    return new Promise((resolve, reject) => {
        initComponent.success = () => {
            initComponent.show = false;
            resolve()
        };
        document.querySelector(option.container || 'body').appendChild(initComponent.$el);
    })
};

// const prompt = (option) => {
//     let initComponent = new promptConstructor().$mount();
//     initComponent.content = option
//     document.querySelector(option.container || 'body').appendChild(initComponent.$el);
// }

export default prompt
