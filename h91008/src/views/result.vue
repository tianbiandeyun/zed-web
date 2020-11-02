<template>
    <section class="result">
        <!--卡券-->
        <div class="result-apply">
            <img v-if="isHasCardRecording" src="../assets/images/get.png" alt="" @click="getApply">
            <img v-else src="../assets/images/getY.png" alt="">
        </div>
        <div class="result-content">
            <img src="../assets/images/rule.png" alt="">
        </div>
        <div class="result-backgroundImg"></div>
    </section>
</template>

<script>
    import * as config from '../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "start",
        data() {
            return {
                /**
                 * 是否领取过卡券
                 * */
                isHasCardRecording: ''
            }
        },
        async created() {
            let that = this;

            /**
             * 解决刷新之后没有 openid 的问题
             * */
            if (that.openidInfo.open_id === undefined || that.openidInfo.open_id === '') {
                await that.$store.dispatch('_getOpenId', {
                    im: config.requestInterface.getopenid,
                    fps: {},
                    url: config.CONST_FETCH_REQUEST_URI
                });
            }

            console.log(`解决刷新之后没有 openid 的问题=${that.openidInfo.open_id}`);

            that.$nextTick(() => {
                /**
                 * 判断是否领取卡券
                 * 用来显示卡券是否可以领取
                 * */
                that.isHasRecording().then(res => {
                    if (res.back_value) {
                        // 领取过
                        that.isHasCardRecording = false;
                    } else {
                        // 没领取过
                        that.isHasCardRecording = true;
                    }
                });
            });
            /**
             * 由于前一个页面是滑动到底部
             * 所以第三页，要从头开始
             * */
            window.scrollTo(0, 0);
        },
        methods: {
            /**
             * 领取卡劵
             * */
            getApply() {
                let that = this;
                /**
                 * 再次判断是否领取过卡券
                 * */
                that.isHasRecording().then(res => {
                    if (res.back_value) {
                        // 领取过
                        that.isHasCardRecording = false;
                    } else {
                        // 没领取过
                        that.isHasCardRecording = true;

                        /**
                         * 获取卡劵配置
                         * 领取可券之前要想获取卡券的参数
                         * */
                        that.$store.dispatch('_getCardConfig', {
                            im: config.requestInterface.getcardconfig,
                            fps: {
                                'open_id': that.openidInfo.open_id
                            },
                            url: config.CONST_FETCH_REQUEST_URI
                        }).then(res => {
                            return that.getAddCard(res);
                        }).then(res => {
                            if (res) {
                                that.isHasCardRecording = false;
                                /**
                                 * 领取完卡券之后，需要设置卡券的领取记录
                                 * */
                                return that.setRecording();
                            }
                        }).then(res => {
                            that.isHasCardRecording = false;
                        })

                    }
                });

            },
            /**
             * 领取卡券
             * */
            getAddCard(params) {
                let that = this;
                return new Promise((resolve, reject) => {
                    wx.addCard({
                        cardList: [{
                            cardId: params.back_value.cardId,
                            cardExt: '{"openid":"' + params.back_value.openid + '",' +
                                '"nonce_str":"' + params.back_value.nonce_str + '",' +
                                '"timestamp":"' + params.back_value.timestamp + '",' +
                                '"signature":"' + params.back_value.signature + '"}'
                        }],
                        success(res) {
                            resolve(true)
                        }
                    });
                })
            },
            /**
             * 领取卡券之后，设置已领取记录
             * */
            setRecording() {
                let that = this;
                return that.$store.dispatch('_setCardRecord', {
                    im: config.requestInterface.setCardRecord,
                    fps: {
                        'open_id': that.openidInfo.open_id
                    },
                    url: config.CONST_FETCH_REQUEST_URI
                })
            },
            /**
             * 判断是否领取卡券
             * */
            isHasRecording() {
                let that = this;
                return that.$store.dispatch('_hasCardRecord', {
                    im: config.requestInterface.hasCardRecord,
                    fps: {
                        'open_id': that.openidInfo.open_id
                    },
                    url: config.CONST_FETCH_REQUEST_URI
                })
            }
        },
        computed: {
            ...mapGetters([
                'openidInfo'
            ])
        }
    }
</script>

<style lang="less">
    .result {

        .result-apply {
            background-color: #ff5f68;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;
            text-align: center;
            padding: 40px 0px;

            img {
                width: 60%;
            }
        }

        .result-content {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;

            img {
                width: 100%;
            }
        }

        .result-backgroundImg {
            height: 8330px;
            background: url("../assets/images/start1.png") no-repeat;
            background-size: 100% 100%;
        }
    }
</style>

