import Vue from "vue";
import Vuex from "vuex";
import utils from "../utils/utils";
import Fly from "flyio/dist/npm/wx";

const fly = new Fly;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openidInfo: ""
  },
  actions: {
    /**
     * 通用
     * */
    fetch({
      commit
    }, params) {
      const {
        im,
        fps,
        url,
        method
      } = {
        ...params
      };
      const requestUrl = utils.produceRequestUrl(im, fps, url, method);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          resolve(res.data);
        });
      });
    },
    /**
     * 获取openid
     * */
    getOpenid({
      commit
    }, params) {
      const {
        im,
        fps,
        url,
        method
      } = {
        ...params
      };
      const requestUrl = utils.produceRequestUrl(im, fps, url, method);
      return new Promise((resolve, reject) => {
        fly.get(requestUrl).then(res => {
          commit("GETOPENID", res);
          resolve(res);
        });
      });
    }

  },
  mutations: {
    GETOPENID(state, res) {
      state.openidInfo = res;
    }
  },
  getters: {
    openidInfo: state => state.openidInfo.data
  }
});
