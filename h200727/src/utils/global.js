/**
 * 全局 参数
 * 全局 组件
 * */

import loading from '../components/loading/loading'

import * as config from '../utils/config'
import utils from '../utils/utils'
import weui from 'weui.js'


const install = Vue => {

    Vue.prototype.$config = config;
    Vue.prototype.$utils = utils;
    Vue.prototype.$weui = weui;

    Vue.component('loading', loading);
};

export default install;