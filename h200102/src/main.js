import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import './assets/css/rest.css'

Vue.config.productionTip = false

import animated from 'animate.css' // npm install animate.css --save安装，在引入
import './plugins/iview.js'
Vue.use(animated)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
