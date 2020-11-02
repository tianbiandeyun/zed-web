import axios from '../../../unit/fetch'
import unit from '../../../unit/unit'

export default {
    state: {
        openidInfo: '',
        phoneCodeInfo: '',
        adduserInfo: '',
        cardConfigInfo: '',
        setCardRecordInfo: '',
        hasCardRecordInfo: '',
        weiXinPayInfo: '',
        setPaymentRecordInfo: '',
        hasPaymentRecordInfo: ''
    },
    actions: {
        /**
         * 获取 openid
         * */
        _getOpenId({commit}, params) {
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
         * 获取手机验证码
         * */
        _getPhoneCodeNum({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETPHONECODENUM', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 存储报名信息
         * */
        _setAdduserInfo({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETADDUSERINFO', res.back_value);
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
        },
        /**
         * 领取卡券之后，设置已领取记录
         * */
        _setCardRecord({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETCARDRECORD', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 判断是否领取卡券
         * */
        _hasCardRecord({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('HASCARDRECORD', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取微信支付配置
         * */
        _setOrderInformation({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETORDERINFORMATION', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 支付成功后，设置已支付记录
         * */
        _setPaymentRecord({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETPAYMENTRECORD', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 判断是否支付
         * */
        _hasPaymentRecord({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('HASPAYMENTRECORD', res.back_value);
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
            state.openidInfo = res
        },
        GETPHONECODENUM(state, res) {
            state.phoneCodeInfo = res
        },
        SETADDUSERINFO(state, res) {
            state.adduserInfo = res
        },
        GETCARDCONFIG(state, res) {
            state.cardConfigInfo = res
        },
        SETCARDRECORD(state, res) {
            state.setCardRecordInfo = res
        },
        HASCARDRECORD(state, res) {
            state.hasCardRecordInfo = res
        },
        SETORDERINFORMATION(state, res) {
            state.weiXinPayInfo = res
        },
        SETPAYMENTRECORD(state, res) {
            state.setPaymentRecordInfo = res
        },
        HASPAYMENTRECORD(state, res) {
            state.hasPaymentRecordInfo = res
        }
    }
};

