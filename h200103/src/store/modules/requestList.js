import axios from '../../../unit/fetch'
import unit from '../../../unit/unit'

export default {
    state: {
        getOpenidInfo: '',
        getWxPayInfo: '',
        getScheduledDateInfo: '',
        setCardIdRecordInfo: '',
        setCardIdStatusInfo: '',
        getCardConfigInfo: '',
        setAcrdTypeInfo: '',
        hasReceiveCardChanceInfo: '',
        getCardBookingInfo: ''
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
         * 获取 支付配置
         * */
        _setWxPaymentInfo({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETWXPAYMENTINFO', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取可以预约的日期
         * */
        _getScheduledDate({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETSCHEULEDDATE', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 付款之后，设置预约时间
         * */
        _setCardIdRecord({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETCARDIDRECORD', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 领取完卡劵之后，设置卡劵领取记录
         * */
        _setCardIdStatus({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETCardIdStatusInfo', res.back_value);
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
                            commit('GETCardConfigInfo', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 设置卡劵id
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
                            commit('SETAcrdTypeInfo', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 判断领取卡劵机会
         * */
        _hasReceiveCardChance({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('HASReceiveCardChance', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取预约的时间
         * */
        _getCardBooking({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETCardBooking', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取wxConfig
         * */
        _getWxConfig({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETWXCONFIG', res.back_value);
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
        SETWXPAYMENTINFO(state, res) {
            state.getWxPayInfo = res
        },
        GETSCHEULEDDATE(state, res) {
            state.getScheduledDateInfo = res
        },
        SETCARDIDRECORD(state, res) {
            state.setCardIdRecordInfo = res
        },
        SETCardIdStatusInfo(state, res) {
            state.setCardIdStatusInfo = res
        },
        GETCardConfigInfo(state, res) {
            state.getCardConfigInfo = res
        },
        SETAcrdTypeInfo(state, res) {
            state.setAcrdTypeInfo = res
        },
        HASReceiveCardChance(state, res) {
            state.hasReceiveCardChanceInfo = res
        },
        GETCardBooking(state, res) {
            state.getCardBookingInfo = res
        },
        GETWXCONFIG(state, res) {
            state.getwxconfigInfo = res
        },
    }
};
