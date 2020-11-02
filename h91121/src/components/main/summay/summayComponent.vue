<template>
    <section class="summayComponent">

        <!--概要信息文章总数-->
        <div class="summay-item">
            <img src="../../../assets/images/summay/article.png" alt="文章总数">
            <span>文章总数</span>
            <span>{{getDisplayCountInfo}}</span>
        </div>

        <!--概要信息待用文章总数-->
        <div class="summay-item">
            <img src="../../../assets/images/summay/article.png" alt="文章总数">
            <span>待用文章总数</span>
            <span>{{review2}}</span>
        </div>

    </section>
</template>

<script>
    import * as config from '../../../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "summayComponent",
        data() {
            return {
                review2: ''
            }
        },
        async created() {
            const that = this;
            /**
             * 获取文章总数
             * */
            await that.$store.dispatch('_getDisplayCount', {
                im: config.requestInterface.getDisplayCount,
                fps: {},
                url: config.CONST_FETCH_REQUEST_URI
            });

            // 审阅未使用文章
            that.$store.dispatch('_getStatusCount', {
                im: config.requestInterface.getStatusCount,
                fps: {
                    'status': 2
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                if (res.result === 'success') {
                    that.review2 = res.back_value
                }
            });

        },
        computed: {
            ...mapGetters([
                'getDisplayCountInfo'
            ])
        }
    }
</script>

<style lang="less">
    #boxSizing {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .summayComponent {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-around;

        .summay-item {
            text-align: center;
            font-size: 30px;
            background-color: #dcdee2;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            #boxSizing;
            padding: 10px;
            cursor: pointer;

            img {
                width: 100px;
                height: 100px;
                margin-bottom: 20px;
            }

            span {
                display: block;
                line-height: 1;
                color: #515a6e;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 5px;
            }
        }
    }
</style>