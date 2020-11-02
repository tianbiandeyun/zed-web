import Vue from 'vue'
import Vuex from 'vuex'
import unit from '../unit/untils'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        _getCrawler({commit}, params) {
            const [im, fps, url] = [params.im, params.fps, params.url];
            const requestUrl = unit.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res);
                });
            });
        },
        _getKeyword({commit}, params) {
            const [im, fps, url] = [params.im, params.fps, params.url];
            const requestUrl = unit.produceRequestUrl(im, fps, url);
            return new Promise((resolve, reject) => {
                axios.get(requestUrl).then(res => {
                    resolve(res);
                });
            });
        }
    }
})
