import Vue from "vue";
import Vuex from "vuex";
import unit from "../utils/utils";
import Fly from "flyio/dist/npm/wx";

const fly = new Fly;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    openid: ""
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
    }

  },
  mutations: {
    setOpenid(state, res) {
      state.openid = res;
    }
  },
  getters: {
    openid: state => state.openid
  }
});
