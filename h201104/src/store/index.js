import Vue from "vue";
import Vuex from "vuex";
import unit from "../utils/utils";
import Fly from "flyio/dist/npm/wx";

const fly = new Fly;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openid: "",
    is_registration: "",
    // user_info: ""
  },
  actions: {
    /**
     * 通用
     * */
    fetch({ commit }, params) {
      const [im, fps, url, method] = [params.im, params.fps, params.url, params.method];
      const requestUrl = unit.produceRequestUrl(im, fps, url, method);
      return new Promise((resolve, reject) => {
        if (method === "get") {
          fly.get(requestUrl).then(res => {
            resolve(res.data);
          });
        } else {
          fly.post(requestUrl, fps).then(res => {
            resolve(res.data);
          });
        }
      });
    },

    /**
     * 获取 openid
     * */
    getOpenid({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          commit("setOpenid", res.data);
          resolve(res.data);
        });
      });
    },

    /**
     * 是否 报名
     * */
    isRegistration({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          commit("setRegistration", res.data);
          resolve(res.data);
        });
      });
    },

    /**
     * 获取用户填写的信息
     * */
    // getUserInfo({ commit }, params) {
    //   const [im, fps, url] = [params.im, params.fps, params.url];
    //   const requestUrl = unit.produceRequestUrl(im, fps, url);
    //   return new Promise((resolve, reject) => {
    //     fly.get(requestUrl).then(res => {
    //       commit("getUserInfo", res.data);
    //       resolve(res.data);
    //     });
    //   });
    // }
  },
  mutations: {
    setOpenid(state, res) {
      state.openid = res;
    },
    setRegistration(state, res) {
      state.is_registration = res;
    },
    // getUserInfo(state, res) {
    //   state.user_info = res;
    // }
  },
  getters: {
    openid: state => state.openid,
    is_registration: state => state.is_registration,
    // user_info: state => state.user_info
  }
});
