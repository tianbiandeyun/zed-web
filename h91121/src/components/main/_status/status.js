import * as config from '../../../../unit/config'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {
            /**
             * 不同文章的状态类型
             * */
            articleStatusType: {
                waitViewType: 1, // 待审阅
                waitUsedType: 2, // 待使用
                usedType: 3, // 已用
                forbidType: 4, // 禁用
            }
        }
    },
    methods: {
        /**
         * 总执行一次性获取所有的数量
         * */
        async statusInit() {
            const that = this;
            // 如果-文章总数-不存在,则重新请求
            if (that.getDisplayCountInfo === '' || that.getDisplayCountInfo === undefined || that.getDisplayCountInfo === null) {
                that.getAllArticleNumber()
            }
            that.getWaitViewNumber();
            that.getWaitUsedNumber();
            that.getUsedNumber();
            that.getForbidNumber();
            that.spinShow = false;
        },
        /**
         * 获取文章-总-数量
         * */
        async getAllArticleNumber() {
            const that = this;
            await that.$store.dispatch('_getDisplayCount', {
                im: config.requestInterface.getDisplayCount,
                fps: {},
                url: config.CONST_FETCH_REQUEST_URI
            });
        },
        /**
         * 获取文章-待审核-数量
         * */
        async getWaitViewNumber() {
            const that = this;
            await that.$store.dispatch('_getStatusCount', {
                im: config.requestInterface.getStatusCount,
                fps: {
                    'status': that.articleStatusType.waitViewType
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    that.waitView = res.back_value
                }
            });
        },
        /**
         * 获取文章-待使用-数量
         * */
        async getWaitUsedNumber() {
            const that = this;
            await that.$store.dispatch('_getStatusCount', {
                im: config.requestInterface.getStatusCount,
                fps: {
                    'status': that.articleStatusType.waitUsedType
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    that.waitUsed = res.back_value
                }
            });
        },
        /**
         * 获取文章-已用-数量
         * */
        async getUsedNumber() {
            const that = this;
            await that.$store.dispatch('_getStatusCount', {
                im: config.requestInterface.getStatusCount,
                fps: {
                    'status': that.articleStatusType.usedType
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    that.used = res.back_value
                }
            });
        },
        /**
         * 获取文章-禁用-数量
         * */
        async getForbidNumber() {
            const that = this;
            await that.$store.dispatch('_getStatusCount', {
                im: config.requestInterface.getStatusCount,
                fps: {
                    'status': that.articleStatusType.forbidType
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    that.forbid = res.back_value
                }
            });
        }
    },
    computed: {
        ...mapGetters([
            'getDisplayCountInfo'
        ])
    }
};