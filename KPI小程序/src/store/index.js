import Vue from "vue";
import Vuex from "vuex";
import requestList from "./modules/request";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    requestList
  },
  getters: {
    getVideoInfo: state => state.requestList.getVideoInfo,
    getAddressMulti: state => state.requestList.getAddressMulti, // 获取通讯录参数多选
    getAddress: state => state.requestList.getAddress, // 获取通讯录参数单选
    registUser: state => state.requestList.registUser
  }
});
