import axios from '../../../unit/fetch'
import unit from '../../../unit/unit'

export default {
    state: {
        openidInfo: '',
        getPlayerInfot:'',
        storageAnswerResultInfo: '',
        setFinalResultInfo: '',
        getFinalResultInfo: '',
        isPlayMusic: false
    },
    actions: {
        /**
         * 获取 openid
         * */
        getOpenId({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETOPENID', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取用户信息
         * */
        getPlayerInfo({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETPLAYERINFO', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 设置每道题目的提交
         * */
        storageAnswerResult({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('STORAGEANSWERRESULT', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 设置最终答案
         * */
        setFinalResult({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETFINALRESULT', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取最终结果
         * */
        getFinalResult({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETFINALRESULT', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 是否播放音乐
         * */
        setPlayMusic({commit}, params) {
            commit('SETPLAYMUSIC', params.is)
        }
    },
    mutations: {
        GETOPENID(state, res) {
            state.openidInfo = res
        },
        GETPLAYERINFO(state, res) {
            state.getPlayerInfot = res
        },
        STORAGEANSWERRESULT(state, res) {
            state.storageAnswerResultInfo = res
        },
        SETFINALRESULT(state, res) {
            state.setFinalResultInfo = res
        },
        GETFINALRESULT(state, res) {
            state.getFinalResultInfo = res
        },
        SETPLAYMUSIC(state, res) {
            state.isPlayMusic = res
        }
    }
};

