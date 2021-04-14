import Vue from "vue";
import Vuex from "vuex";
import unit from "../utils/utils";
import Fly from "flyio/dist/npm/wx";

const fly = new Fly;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openid: "",
    message_count: ""
  },
  actions: {
    /**
     * 通用
     * */
    fetch({
      commit
    }, params) {
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
    getOpenid({
      commit
    }, params) {
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
     * 获取信息条数
     * */
    getMessageCount({
      commit
    }, params) {
      const [im, fps, url] = [params.im, params.fps, params.url];
      const requestUrl = unit.produceRequestUrl(im, fps, url);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          commit("setMessageCount", res.data);
          resolve(res.data);
        });
      });
    }
  },
  mutations: {
    setOpenid(state, res) {
      state.openid = res;
    },
    setMessageCount(state, res) {
      state.message_count = res;
    }
  },
  getters: {
    openid: state => state.openid,
    message_count: state => state.message_count
  }
});
