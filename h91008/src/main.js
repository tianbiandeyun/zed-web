import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './assets/css/rest.css'
import 'lib-flexible'
import unit from "../../h91008/unit/unit";
import * as config from "../../h91008/unit/config";

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
let p = new Promise((resolve, reject) => {
    let wxjssdk = 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js';
    unit.createScript(wxjssdk);
    resolve(true);
});
p.then(res => {
    if (res) {
        let wxconfig = config.CONST_REQUEST_URI + '?v=3&r=interface/jsconf&debug=1&sign=test';
        unit.createScript(wxconfig);
    }
});

/**
 * 判断是否支付
 * */
router.beforeEach((to, from, next) => {
    if (to.path === '/start') {
        // 获取 openid
        store.dispatch('_getOpenId', {
            im: config.requestInterface.getopenid,
            fps: {},
            url: config.CONST_FETCH_REQUEST_URI
        }).then(res => {
            console.log(`openid from Main：${res.back_value.open_id}`);
            return store.dispatch('_hasPaymentRecord', {
                im: config.requestInterface.hasPaymentRecord,
                fps: {
                    'open_id': res.back_value.open_id
                },
                url: config.CONST_FETCH_REQUEST_URI
            })
        }).then(res => {
            if (res.back_value) {
                next({name: 'result'})
            } else {
                next()
            }
        })
    }
    next()
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
