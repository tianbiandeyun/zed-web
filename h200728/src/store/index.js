import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../utils/utils'
import axios from 'axios'

axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        openid_info: ''
    },
    mutations: {
        getOpenid(state, res) {
            state.openid_info = res;
        },
    },
    actions: {
        getRequest({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.post(requestUrl).then(res => {
                    commit('getOpenid', res.data);
                    resolve(res.data);
                });
            });
        }
    },
    getters: {
        openid_info: state => state.openid_info,
    }
})
