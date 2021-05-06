import Vue from "vue";
import App from "./App";
import store from "./store";
import * as config from "./utils/config";
import utils from "./utils/utils";
import tab from '@/custom-tab-bar/'

Vue.prototype.$store = store;
Vue.prototype.$Config = config;
Vue.prototype.$Utils = utils;
Vue.component('tab', tab)

Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue(App);
app.$mount();
