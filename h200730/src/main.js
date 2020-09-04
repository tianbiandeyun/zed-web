import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import 'lib-flexible'
import './assets/css/rest.css'


import Utils from './utils/utils'

Vue.prototype.$Utils = Utils;

import * as Config from './utils/config'

Vue.prototype.$Config = Config;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
