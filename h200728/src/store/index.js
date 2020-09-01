import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../utils/utils'
import axios from 'axios'

axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        openid_info: '',
        i_want_reward: ''
    },
    mutations: {
        getOpenid(state, res) {
            state.openid_info = res;
        },
        getIWantReward(state, res) {
            state.i_want_reward = res;
        },
    },
    actions: {
        /**
         * 共享数据请求
         * 添加 commit
         * */

        // 获取openid
        getOpenid({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    commit('getOpenid', res.data);
                    resolve(res.data);
                });
            });
        },

        // 获取我想要的奖品列表
        getIWantReward({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    commit('getIWantReward', res.data);
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
        i_want_reward: state => state.i_want_reward,
    }
})
