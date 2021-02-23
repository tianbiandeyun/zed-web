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
        setOpenid(state, res) {
            state.openid_info = res;
        }
    },
    actions: {
        /**
         * 获取 openid
         * 数据共享
         * */
        getOpenid({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.post(requestUrl).then(res => {
                    commit('setOpenid', res.data);
                    resolve(res.data);
                });
            });
        },
        /**
         * 通用请求：fetchDate
         * 数据不共享，单独局部使用
         * */
        fetchData({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        }
    },
    getters: {
        openid_info: state => state.openid_info,
    }
})
