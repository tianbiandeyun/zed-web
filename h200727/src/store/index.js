import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../utils/utils'
import axios from 'axios'

axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        getOpenid_info: '',
        hasUserInfo_geren: '',
        hasUserInfo_zuzhi: '',
        wx_config: ''
    },
    mutations: {
        get_openid(state, res) {
            state.getOpenid_info = res;
        },
        has_user_info_geren(state, res) {
            state.hasUserInfo_geren = res;
        },
        has_user_info_zuzhi(state, res) {
            state.hasUserInfo_zuzhi = res;
        },
        getWxConfig(state, res) {
            state.wx_config = res;
        }
    },
    actions: {
        fetch({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _getWxConfig({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    commit('getWxConfig', res.data);
                    resolve(res.data);
                });
            });
        },
        _getQuestionResult({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _setQuestionResult({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _setPv({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _setUv({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _getWeiXinConfig({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _hasUserInfo_zuzhi({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    commit('has_user_info_zuzhi', res.data);
                    resolve(res.data);
                });
            });
        },
        _hasUserInfo_geren({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    commit('has_user_info_geren', res.data);
                    resolve(res.data);
                });
            });
        },
        _setVideoClickCount({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _getVideoList({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _setUserInfo({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _getPhotoCode({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _setOrganization({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res.data);
                });
            });
        },
        _getOpenid({commit}, params) {
            const [im, fps = {}, url] = [params.im, params.fps, params.url];
            const requestUrl = utils.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.post(requestUrl).then(res => {
                    commit('get_openid', res.data);
                    resolve(res.data);
                });
            });
        }
    },
    getters: {
        getOpenid_info: state => state.getOpenid_info,
        hasUserInfo_geren: state => state.hasUserInfo_geren,
        hasUserInfo_zuzhi: state => state.hasUserInfo_zuzhi,
        wx_config: state => state.wx_config
    }
})
