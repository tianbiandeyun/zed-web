import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
// 引入 element
import './plugins/element.js'

// 引入 全局css
import '../src/assets/global.css'

// 引入 fontclass
import '../src/assets/fontclass/iconfont.css'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')