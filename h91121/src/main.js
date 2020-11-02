import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible'
import './assets/css/rest.css'
// import * as config from '../unit/config'

Vue.config.productionTip = false;

import animated from 'animate.css'
import './plugins/iview.js'

Vue.use(animated);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
