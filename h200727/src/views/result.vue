<template>
    <section class="result-container">
        <img :src="img_src" alt="">

        <loading :show="loading_isShow"></loading>
    </section>
</template>

<script>
    // import share from '../utils/share'
    import {mapGetters} from 'vuex'

    export default {
        name: "result",
        // mixins: [share],
        data() {
            return {
                loading_isShow: true,
                img_src: ''
            }
        },
        mounted() {
            const that = this;

            that.$utils.setDocumentTitle('答题结果');

            that.$store.dispatch('_getQuestionResult', {
                im: that.$config.PROJECT_INTERFACE.get_answer_record,
                fps: {
                    open_id: that.getOpenid_info.back_value.open_id,
                },
                url: that.$config.REQUEST_URL
            }).then(res => {

                let _result = +res.back_value;

                if (_result <= 6) {
                    that.img_src = require('../assets/images/1.png');
                    this.loading_isShow = false;
                    return false;
                }

                if (7 < _result && _result <= 20) {
                    that.img_src = require('../assets/images/2.png');
                    this.loading_isShow = false;
                    return false;
                }

                if (21 < _result && _result <= 27) {
                    that.img_src = require('../assets/images/3.png');
                    this.loading_isShow = false;
                    return false;
                }

            })

        },
        computed: {
            ...mapGetters([
                'getOpenid_info'
            ])
        }
    }
</script>

<style lang="less" scoped>
    .result-container {
        img {
            width: 100%;
        }
    }
</style>