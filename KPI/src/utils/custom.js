import store from "../store";
import * as constData from "../utils/const";
import unit from "../utils/unit";

const install = Vue => {
  // 数据集中管理的 vuex
  Vue.prototype.$store = store;
  Vue.prototype.$constData = constData;
  Vue.prototype.$unit = unit;
};

export default install;
