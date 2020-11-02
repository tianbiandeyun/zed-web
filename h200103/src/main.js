import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible'
import './assets/css/rest.css'

Vue.config.productionTip = false
import animated from 'animate.css'

Vue.use(animated)

import custom from '../custom/custom.js'

Vue.use(custom);

import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/css/swiper.min.css'

Vue.use(VueAwesomeSwiper)

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
