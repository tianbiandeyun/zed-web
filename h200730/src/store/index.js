import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../utils/utils'
import axios from 'axios'

axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        openid_info: {
            back_value: {
                open_id: 'TEST_OPEN_ID_1'
            }
        },
        resume_info: '',
        wx_config: ''
    },
    mutations: {
        getOpenid(state, res) {
            state.openid_info = res;
        },
        getSelfResume(state, res) {
            state.resume_info = res;
        },
        getWxConfig(state, res) {
            state.wx_config = res;
        }
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

        // 获取个人简历
        getSelfResume({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    commit('getSelfResume', res.data);
                    resolve(res.data);
                });
            });
        },
        getWxConfig({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    commit('getWxConfig', res.data);
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
        resume_info: state => state.resume_info,
        wx_config: state => state.wx_config
    }
})
