import Vue from "vue";
import App from "./App";

// 设置 vue 提示功能关闭
Vue.config.productionTip = false;

// 声明当前组件的类型
App.mpType = "app";

// 添加到vue原型上的工具(全局组件 / 请求 等)
import custom from "./utils/custom";

Vue.use(custom);

// 生成应用实例
const app = new Vue(App);

// 挂载整个应用
app.$mount();
