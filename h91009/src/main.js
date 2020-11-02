import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/rest.css'
import 'lib-flexible'

/**
 * 过渡动画第三方
 * */
import animated from 'animate.css'

Vue.use(animated);

/**
 * 全局组件 / 全局的工具 unit
 * */
import custom from '../custom/custom.js'
Vue.use(custom);

import wxShare from 'hztc-wxShare'
Vue.use(wxShare);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
