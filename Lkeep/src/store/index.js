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
      let { url } = { ...params };
      console.log(url);
      // return new Promise((resolve, reject) => {
      //   fly.get(url).then(res => {
      //     resolve(res.data);
      //   });
      // });
    }

    // fetch({ commit }, params) {
    //   const [im, fps, url, method] = [params.im, params.fps, params.url, params.method];
    //   const requestUrl = unit.produceRequestUrl(im, fps, url, method);
    //   return new Promise((resolve, reject) => {
    //     if (method === "get") {
    //       fly.get(requestUrl).then(res => {
    //         resolve(res.data);
    //       });
    //     } else {
    //       fly.post(requestUrl, fps).then(res => {
    //         resolve(res.data);
    //       });
    //     }
    //   });
    // }

    // _registUser({ commit }, params) {
    //   const [im, fps, url] = [params.im, params.fps, params.url];
    //   const requestUrl = unit.produceRequestUrl(im, fps, url);
    //   return new Promise((resolve, reject) => {
    //     fly.get(requestUrl).then(res => {
    //       commit("REGISTUSER", res);
    //       resolve(res);
    //     });
    //   });
    // }

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
