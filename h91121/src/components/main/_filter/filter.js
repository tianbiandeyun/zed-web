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
        async getCrucialNumber(type) {
            const that = this;
            await that.$store.dispatch('_getKeyWordCount', {
                im: config.requestInterface.getKeyWordCount,
                fps: {
                    status: type
                },
                url: config.CONST_FETCH_REQUEST_URI
            });
        }
    },
    computed: {
        ...mapGetters([
            'getDisplayCountInfo',
            'getKeyWordCountInfo'
        ])
    }
};