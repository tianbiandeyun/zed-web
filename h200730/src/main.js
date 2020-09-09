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

import {Toast} from 'vant'

Vue.prototype.$Toast = Toast;

import Alert from './components/alert/alert'

Vue.prototype.$Alert = Alert;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
