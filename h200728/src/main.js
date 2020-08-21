import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import 'lib-flexible'
import './assets/css/rest.css'

import Alert from './components/alert/alert'

Vue.prototype.$Alert = Alert;

import Utils from './utils/utils'

Vue.prototype.$Utils = Utils;


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
