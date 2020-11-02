import Vue from 'vue'
import defaultLoading from './defaultLoading.vue'

let defaultLoadingConstructor = Vue.extend(defaultLoading);
let initComponent;
export const showLoading = (option = {}) => {
    initComponent = new defaultLoadingConstructor().$mount();
    document.querySelector(option.container || 'body').appendChild(initComponent.$el)
}
export const hideLoading = () => {
    initComponent.$el.parentNode.removeChild(initComponent.$el)
}
