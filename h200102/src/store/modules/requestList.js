import axios from '../../../unit/fetch'
import unit from '../../../unit/unit'

export default {
    state: {
        getOpenidInfo: '',
        setAcrdTypeInfo: '',
        getAcrdStockInfo: '',
        getCardConfigInfo: ''
    },
    actions: {
        /**
         * 获取 openid
         * */
        _getOpenid({commit}, params) {
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
         * 获取卡劵 ID
         * */
        _setAcrdType({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETACRDTYPE', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取卡劵库存
         * */
        _getAcrdStock({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETACRDSTOCK', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取卡劵配置
         * */
        _getCardConfig({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETCARDCONFIG', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    mutations: {
        GETOPENID(state, res) {
            state.getOpenidInfo = res
        },
        SETACRDTYPE(state, res) {
            state.setAcrdTypeInfo = res
        },
        GETACRDSTOCK(state, res) {
            state.getAcrdStockInfo = res
        },
        GETCARDCONFIG(state, res) {
            state.getCardConfigInfo = res
        }
    }
};

