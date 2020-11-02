import axios from '../../../unit/fetch'
import unit from '../../../unit/unit'

export default {
    state: {
        getCrawlerDataInfo: '',
        getStatusCountInfo: '',
        getDisplayCountInfo: '',
        getContentInfo: '',
        setStatusInfo: '',
        isSignInInfo: '',
        setSignOutInfo: '',
        getUserInfoInfo: '',
        getKeyWordInfo: '',
        getKeyWordCountInfo: '',
        isHasAuditRightInfo: ''
    },
    actions: {
        /**
         * 获取 表格内容
         * */
        _getCrawlerData({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETCRAWLERDATA', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取 获取不同状态下文章数量
         * */
        _getStatusCount({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETSTATUSCOUNT', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取 获取文章总数
         * */
        _getDisplayCount({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETDISPLAYCOUNT', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取文章详情
         * */
        _getContent({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETCONTENT', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取文章详情
         * */
        _setStatus({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETSTATUS', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 判断是否登陆
         * */
        _isSignIn({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('ISSIGNIN', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 退出登陆
         * */
        _setSignOut({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('SETSIGNOUT', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取登陆人信息
         * */
        _getUserInfo({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            // console.log(`error_code：${res.error_code}---error_info：${res.error_info}`)
                            commit('GETtUSER', res);
                            resolve(res)
                        }
                        if ('success' === res.result) {
                            commit('GETtUSER', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取筛选关键字
         * */
        _getKeyWord({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETKEYWORD', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 获取关键字下文章数量
         * */
        _getKeyWordCount({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('GETKEYWORDCOUNT', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        },
        /**
         * 判断用户使用拥有权限
         * */
        _isHasAuditRight({commit}, params) {
            return new Promise((resolve, reject) => {
                let requestUrl = unit.produceRequestUrl(params.im, params.fps, params.url);
                axios.get(requestUrl)
                    .then(res => {
                        if ('failure' === res.result) {
                            alert(`error_code：${res.error_code}---error_info：${res.error_info}`)
                        }
                        if ('success' === res.result) {
                            commit('ISHASAUDITRIGHT', res.back_value);
                            resolve(res)
                        }
                    }).catch(err => {
                    reject(err)
                })
            })
        }
    },
    mutations: {
        GETCRAWLERDATA(state, res) {
            state.getCrawlerDataInfo = res
        },
        GETSTATUSCOUNT(state, res) {
            state.getStatusCountInfo = res
        },
        GETDISPLAYCOUNT(state, res) {
            state.getDisplayCountInfo = res
        },
        GETCONTENT(state, res) {
            state.getContentInfo = res
        },
        SETSTATUS(state, res) {
            state.setStatusInfo = res
        },
        ISSIGNIN(state, res) {
            state.isSignInInfo = res
        },
        SETSIGNOUT(state, res) {
            state.setSignOutInfo = res
        },
        GETtUSER(state, res) {
            state.getUserInfoInfo = res
        },
        GETKEYWORD(state, res) {
            state.getKeyWordInfo = res
        },
        GETKEYWORDCOUNT(state, res) {
            state.getKeyWordCountInfo = res
        },
        ISHASAUDITRIGHT(state, res) {
            state.isHasAuditRightInfo = res
        }
    }
};

