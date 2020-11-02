<template>
    <section class="start">

        <!--页头-->
        <div class="start-header animated bounceIn">
            <span @click="rule" class="start-header-left">测试规则</span>
            <span class="start-header-right">
            </span>
        </div>

        <!--中间部分-->
        <div class="start-main animated bounceIn">
            <div class="start-main-img-box">
                <img src="../assets/images/index/index-font1.png" alt="">
                <img src="../assets/images/index/index-font2.png" alt="">
                <img @click="start" :class="af ? 'animated bounceIn' : ''" src="../assets/images/index/index-btn.png"
                     alt="">
            </div>
        </div>

        <!--页脚logo-->
        <div class="start-footer animated bounceIn">
            <img src="../assets/images/index/logo.png" alt="">
        </div>

        <!--规则-->
        <start-rule-message v-if="ruleMessage" :rule="rule"></start-rule-message>

    </section>
</template>

<script>

    import startRuleMessage from '../components/start/startRuleMessage'
    import * as config from '../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: 'start',
        components: {
            startRuleMessage
        },
        data() {
            return {
                /**
                 * 控制规则是否显示
                 * */
                ruleMessage: false,
                af: false
            }
        },
        async created() {
            let that = this;
            that.$showLoading();
            /**
             * 获取 openid
             * */
            await that.$store.dispatch('getOpenId', {
                im: config.requestInterface.getopenid,
                fps: {},
                url: config.CONST_FETCH_REQUEST_URI
            });

            console.log(`首页open_id：${that.openidInfo.open_id}`);

            that.$hideLoading();
        },
        mounted() {
            /**
             * 安卓 屏蔽分享
             * */
            wx.ready(() => {
                wx.hideOptionMenu();
            });
        },
        methods: {
            /**
             * 打开规则
             * */
            rule() {
                let that = this;
                that.ruleMessage = !that.ruleMessage;
            },
            /**
             * 开始测试
             * */
            start() {
                let that = this;
                that.af = !that.af;
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        that.$router.replace({name: 'question'});
                        resolve()
                    }, 500)
                });

            }
        },
        computed: {
            /**
             * 获取的问题集合
             * */
            ...mapGetters([
                'openidInfo',
                'isPlayMusic'
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

    #relative {
        position: relative;
    }

    #absolute {
        position: absolute;
    }

    .start {
        #boxSizing;
        #relative;
        height: 100%;
        background: url("../../src/assets/images/index/index-background-img.png") no-repeat;
        background-size: 100% 100%;

        .start-header {
            #boxSizing;
            height: 90px;
            overflow: hidden;
            line-height: 90px;
            padding: 0px 40px;

            .start-header-left {
                float: left;
                text-decoration: underline;
                font-weight: bold;
                font-size: 26px;
            }

            .start-header-right {
                float: right;
            }
        }

        .start-main {
            #boxSizing;
            #absolute;
            top: 39%;
            left: 0px;
            width: 100%;
            overflow: hidden;
            padding: 0px 20px;

            .start-main-img-box {

                #boxSizing;
                float: right;
                width: 50%;

                img {
                    width: 100%;
                    display: block;
                    margin-bottom: 20px;
                }
            }
        }

        .start-footer {
            #boxSizing;
            #absolute;
            bottom: 40px;
            left: 0px;
            width: 100%;
            text-align: center;

            img {
                width: 200px;
            }
        }
    }
</style>
