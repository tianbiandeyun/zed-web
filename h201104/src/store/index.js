import Vue from "vue";
import Vuex from "vuex";
import unit from "../utils/utils";
import Fly from "flyio/dist/npm/wx";

const fly = new Fly;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openid: "",
    is_registration: ""
  },
  actions: {
    /**
     * 通用
     * */
    fetch({ commit }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res.data);
        });
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
    }
  },
  mutations: {
    setOpenid(state, res) {
      state.openid = res;
    },
    setRegistration(state, res) {
      state.is_registration = res;
    }
  },
  getters: {
    openid: state => state.openid,
    is_registration: state => state.is_registration
  }
});
