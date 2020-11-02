import * as config from '../../../../unit/config'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {}
    },
    methods: {
        /**
         * 获取关键字的文章数
         * */
        getArticleDetails() {
            const that = this;
            that.$store.dispatch('_getContent', {
                im: config.requestInterface.getContent,
                fps: {
                    'id': that.id
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    that.spinShow = false;
                }
            });
        },
        /**
         * 下一篇
         * */
        goNextArticleDetails() {
            const that = this;
            that.$store.dispatch('_getContent', {
                im: config.requestInterface.getContent,
                fps: {
                    'id': that.tableList[that.index += 1].id
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    that.spinShow = false;
                }
            });
        },
        /**
         * 上一篇
         * */
        goPropArticleDetails() {
            const that = this;
            that.$store.dispatch('_getContent', {
                im: config.requestInterface.getContent,
                fps: {
                    'id': that.tableList[that.index -= 1].id
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    that.spinShow = false;
                }
            });
        },
        /**
         * 设置文章状态 3 设置已用 2 设置审阅 4 设置禁止
         * */
        setArticleStatus(id, s, r) {
            const that = this;
            /**
             * 获取文章详情
             * */
            that.$store.dispatch('_setStatus', {
                im: config.requestInterface.setStatus,
                fps: {
                    'id': id,
                    'status': s,
                    'reason': r
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    // that.$emit('close') // 关闭文章详情
                    /**
                     * 设置完状态之后，获取最新的文章状态，然后显示
                     * */
                    return that.$store.dispatch('_getContent', {
                        im: config.requestInterface.getContent,
                        fps: {
                            'id': that.id
                        },
                        url: config.CONST_FETCH_REQUEST_URI
                    })
                }
            }).then(res => {
                if (res.result === 'success') {
                    if (s === 4) {
                        that.isForbidMsg = false;
                    }
                }
            });
        },
        /**
         * 判断是否用户是否具有审核权限
         * */
        _isJurisdiction() {
            const that = this;
            that.$store.dispatch('_isHasAuditRight', {
                im: config.requestInterface.hasAuditRight,
                fps: {},
                url: config.CONST_FETCH_REQUEST_URI
            });
        }
    },
    computed: {
        ...mapGetters([
            'getContentInfo'
        ])
    }
};