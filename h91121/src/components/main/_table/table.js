import * as config from '../../../../unit/config'
import {mapGetters} from 'vuex'

export default {
    data() {
        return {}
    },
    methods: {
        /**
         * 获取表格数据
         * '' 全部 1 待审核 2 待使用 3 已用 4 禁用
         * */
        getAllTableList(start, count, status, sort, crucial) {
            const that = this;
            that.$store.dispatch('_getCrawlerData', {
                im: config.requestInterface.getCrawlerData,
                fps: {
                    'start': start,
                    'count': count,
                    'status': status,
                    'sort': sort,
                    'key_word': crucial
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    that.tableList = res.back_value;
                }
            });
        },
        /**
         * 获取更多表格数据
         * '' 全部 1 待审核 2 待使用 3 已用 4 禁用
         * */
        getMoreTableData(start, count, status, sort, crucial) {
            const that = this;
            that.$store.dispatch('_getCrawlerData', {
                im: config.requestInterface.getCrawlerData,
                fps: {
                    'start': start,
                    'count': count,
                    'status': status,
                    'sort': sort,
                    'key_word': crucial
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    // 如果没有数据，则提示错误
                    if (res.back_value.length === 0) {
                        this.$Message['error']({
                            background: true,
                            content: '暂无更多数据'
                        });
                        that.spinShow = false;
                    } else {
                        // 连接数组，展示更多数据
                        that.tableList = [...that.tableList, ...res.back_value];
                        that.spinShow = false;
                    }
                }
            });
        }
    },
    computed: {
        ...
            mapGetters([
                'getCrawlerDataInfo',
                'getKeyWordCountInfo'
            ])
    }
}
;