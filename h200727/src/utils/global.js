/**
 * 全局 参数
 * 全局 组件
 * */

import loading from '../components/loading/loading'

import * as config from '../utils/config'
import utils from '../utils/utils'
import wxShare from 'zed_wxshare_vue'

const install = Vue => {

    Vue.prototype.$config = config;
    Vue.prototype.$utils = utils;
    Vue.prototype.$WxShare = wxShare;

    Vue.component('loading', loading);
};

export default install;