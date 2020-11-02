import Vue from 'vue'
import App from './App.vue'
import router from './router' // 路由
import store from './store/store'
import './assets/css/rest.css' // rest css
import 'lib-flexible'; // 手机适配器
import unit from '../unit/unit'
import * as config from '../unit/config'

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

/**
 * 加载 jsskd 和 wx.config 配置
 * */
let wxjssdk = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';
unit.createScript(wxjssdk);
let wxconfig = config.CONST_REQUEST_URI + '?v=3&r=interface/jsconf&debug=1&sign=test';
unit.createScript(wxconfig);
unit.count();

/**
 * ios 屏蔽分享，真机正常使用。但是不知道为什么在浏览器显示 WeixinJSBridge.call 不被支持
 * */
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 通过下面这个API隐藏右上角按钮
    WeixinJSBridge.call('hideOptionMenu');
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

