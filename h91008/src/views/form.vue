<template>
    <section class="form">

        <!--背景图-->
        <div class="form-backgroundImg"></div>

        <!--form-->
        <fromComponent ref="form" @fromVerification="listerFromVerification"></fromComponent>

        <h1 class="form-tip">限时报名立享9.9抵199元优惠</h1>

        <div class="form-submit">
            <button :class="goResultAnimate ? 'animated bounceIn' : ''" @click="goResult">立即报名</button>
        </div>

    </section>
</template>

<script>
    import fromComponent from '../components/from/fromComponent'
    import * as config from '../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: 'form_',
        components: {fromComponent},
        data() {
            return {
                /**
                 * 控制立即报名动画
                 * */
                goResultAnimate: false,
            }
        },
        async created() {
            let that = this;

            /**
             * 解决刷新之后没有 openid 的问题
             * */
            if (that.openidInfo.open_id === undefined || that.openidInfo.open_id === '') {
                await that.$store.dispatch('getOpenId', {
                    im: config.requestInterface.getopenid,
                    fps: {},
                    url: config.CONST_FETCH_REQUEST_URI
                });
            }

            console.log(`解决刷新之后没有 openid 的问题=${that.openidInfo.open_id}`);

            /**
             * 获取微信支付配置信息
             * */
            await that.$store.dispatch('_setOrderInformation', {
                im: config.requestInterface.setOrderInformation,
                fps: {
                    'open_id': that.openidInfo.open_id
                },
                url: config.CONST_FETCH_REQUEST_URI
            });

            console.log(that.weiXinPayInfo);

            /**
             * 由于前一个页面是滑动到底部
             * 所以第二页，要从头开始 17344421920
             * */
            window.scrollTo(0, 0);
        },
        methods: {
            /**
             * 立即报名
             * */
            goResult() {
                let that = this;
                that.goResultAnimate = !that.goResultAnimate;
                /**
                 * 重置按钮动画
                 * */
                setTimeout(() => {
                    that.goResultAnimate = !that.goResultAnimate;
                }, 500);
                /**
                 * from表单的，验证是否填写完成
                 * */
                that.$refs.form.verification();
            },
            /**
             * 信息填写完成，可以提交
             * */
            async listerFromVerification(res) {
                let that = this;
                if (res) {
                    await that.$store.dispatch('_setAdduserInfo', {
                        im: config.requestInterface.adduserinfo,
                        fps: {
                            'open_id': that.openidInfo.open_id,
                            'username': res.name,
                            'sex': res.sex,
                            'company_name': res.company,
                            'industry': res.industry,
                            'grade': res.financing,
                            'position': res.character,
                            'phone': res.phone,
                            'phonecode': res.phoneCode,
                            'demand': res.questionVal
                        },
                        url: config.CONST_FETCH_REQUEST_URI
                    }).then(res => {
                        if (res) {
                            console.log('提交成功');
                            that.weiXinPay();
                        }
                    })
                }
            },
            /**
             * 监听微信支付
             * */
            weiXinPay() {
                let that = this;
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', that.jsApiCall, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', that.jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', that.jsApiCall);
                    }
                } else {
                    that.jsApiCall();
                }
            },
            /**
             * 调起微信支付
             * */
            jsApiCall() {
                let that = this;
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    JSON.parse(that.weiXinPayInfo),
                    res => {
                        // 支付成功
                        if (res.err_msg === "get_brand_wcpay_request:ok") {
                            /**
                             * 设置支付成功记录
                             * */
                            that.$store.dispatch('_setPaymentRecord', {
                                im: config.requestInterface.setPaymentRecord,
                                fps: {
                                    'open_id': that.openidInfo.open_id,
                                    'nonce_str': JSON.parse(that.weiXinPayInfo).nonceStr
                                },
                                url: config.CONST_FETCH_REQUEST_URI
                            }).then(res => {
                                console.log('设置支付成功记录');
                                console.log(res);
                                if (res.back_value) {
                                    that.$router.replace({name: 'result'});
                                }
                            });
                        }
                        // 取消支付
                        if (res.err_msg === "get_brand_wcpay_request:cancel") {
                            that.$router.replace({name: 'start'});
                        }
                    }
                );
            }
        },
        computed: {
            ...mapGetters([
                'openidInfo',
                'weiXinPayInfo'
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

    #linearGradient(@from,@to) {
        background: -webkit-linear-gradient(@from, @to);
        background: -o-linear-gradient(@from, @to);
        background: -moz-linear-gradient(@from, @to);
        background: linear-gradient(@from, @to);
    }

    .form {
        #boxSizing;
        #linearGradient(#ff5f68, #ffd69f);
        position: relative;

        .form-backgroundImg {
            width: 100%;
            height: 544px;
            background: url("../assets/images/fromBg.png") no-repeat;
            background-size: 100% 100%;
        }

        .form-tip {
            color: #ff5f68;
            font-size: 50px;
            text-align: center;
            font-weight: bold;
            margin-bottom: 60px;
        }

        .form-submit {
            height: 200px;
            background-color: #ffca9a;

            button {
                margin: 0 auto;
                display: block;
                border: 1px solid #ff5f68;
                color: #fff;
                padding: 20px 0px;
                width: 50%;
                font-size: 30px;
                text-align: center;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                -moz-box-shadow: 5px 5px 10px #cc3744;
                -webkit-box-shad5w: 5px 0px 10px #cc3744;
                box-shadow: 5px 5px 10px #cc3744;
                background-image: linear-gradient(to right, #ff5f68, #ffd69f);
                font-weight: bold;
            }
        }
    }
</style>
