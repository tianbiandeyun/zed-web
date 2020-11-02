<template>
    <section class="calendar">
        <div class="calendar-title">
            <p>
                <!--<img src="../assets/images/calendar/l.png" alt="" @click="pro">-->
            </p>
            <p>2020年{{iss}}月</p>
            <p>
                <!--<img src="../assets/images/calendar/r.png" alt="" @click="next">-->
            </p>
        </div>
        <!--日历盘-->
        <c-calendar @select="listerSelect" :iss="iss"></c-calendar>
        <h1 class="calendar-statu">已选日期：{{selectDate}}</h1>
        <div class="calendar-price">
            <span>限时体验价{{x}}元</span><s>原价598</s>
        </div>
        <div class="calendar-ckbox">
            <input id="ch" type="checkbox" v-model="checked" name="xdf" value="我是新东方员工，再打5折">
            <label for="ch">我是新东方员工，再打5折</label>
        </div>
        <button class="calendar-submit" @click="wxPay">提交订单</button>
        <button class="calendar-tip" @click="openTip">预约须知</button>
        <!--预约规则-->
        <tip v-if="isTip" :closetTip="closetTip" :msg="msg"></tip>
    </section>
</template>

<script>
    import cCalendar from '../components/calendar/calendarComponent'
    import tip from '../components/calendarTip/calendarTipComponent'
    import * as config from '../../unit/config'
    import {mapGetters} from 'vuex'
    import share from '../components/shareClass/share'

    export default {
        name: "calendar",
        components: {cCalendar, tip},
        mixins: [share],
        data() {
            return {
                selectDate: '未选择',
                isTip: false,
                checked: false,
                priceInfo: 'A',
                msg: {
                    'type': 1,
                    'title': '可用时段：',
                    'conent': `周一至周日10: 00 - 21: 00,最晚入舱时间20: 40`
                },
                /**
                 * 控制显示某个月份
                 * */
                iss: ''
            }
        },
        async created() {
            const that = this;

            that.iss = new Date().getMonth() + 1;

            /**
             * 获取openid
             * */
            await that.$store.dispatch('_getOpenid', {
                im: config.requestInterface.getOpenid,
                fps: {},
                url: config.CONST_FETCH_REQUEST_URI
            });
            console.log(that.getOpenidInfo.open_id);

            /**
             * 如果传递测试参数
             * */
            if (that.$unit.getUrlParam('test_date') !== undefined || that.$unit.getUrlParam('test_date') !== '' || that.$unit.getUrlParam('test_date') !== null) {
                let xA = that.$unit.getUrlParam('test_date').split('-');

                if (xA.includes('08')) {
                    that.iss = 8;
                }
            }

        },
        methods: {
            pro() {
                const that = this;
                if (that.iss !== 6) {
                    that.iss = that.iss -= 1;
                }
            },
            next() {
                const that = this;
                if (that.iss !== 7) {
                    that.iss = that.iss += 1;
                }
            },
            // 打开预约须知
            openTip() {
                const that = this;
                that.isTip = true
            },
            // 关闭预约须知
            closetTip() {
                const that = this;
                that.isTip = false
            },
            listerSelect(prams) {
                const that = this;
                that.selectDate = prams.date;
                console.log(prams.date);
            },
            wxPay() {
                const that = this;
                if (that.selectDate === '未选择') {
                    alert('请选择日期')
                } else {
                    that.weiXinPay();
                }
            },
            /**
             * 监听微信支付
             * */
            async weiXinPay() {
                const that = this;
                /**
                 * 获取微信支付配置信息
                 * */
                await that.$store.dispatch('_setWxPaymentInfo', {
                    im: config.requestInterface.setWxPaymentInfo,
                    fps: {
                        'open_id': that.getOpenidInfo.open_id,
                        'reserve_date': that.selectDate,
                        'price_type': that.priceInfo
                    },
                    url: config.CONST_FETCH_REQUEST_URI
                });

                console.log(that.getWxPayInfo);

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
                const that = this;
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    JSON.parse(that.getWxPayInfo),
                    res => {
                        // 支付成功
                        if (res.err_msg === "get_brand_wcpay_request:ok") {
                            that.$router.replace({name: 'myCalendar'});
                        }
                        // 取消支付
                        if (res.err_msg === "get_brand_wcpay_request:cancel") {
                        }
                    }
                );
            }
        },
        computed: {
            x() {
                const that = this;
                if (that.checked) {
                    that.priceInfo = 'B'
                } else {
                    that.priceInfo = 'A'
                }
                return that.checked ? '134' : '268'
            },
            ...mapGetters([
                'getOpenidInfo',
                'getWxPayInfo'
            ])
        }
    }
</script>

<style lang="less">
    .calendar {
        height: 100%;
        background: url("../assets/images/calendar/calendarbg.png") no-repeat;
        background-size: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 60px 60px 0px 60px;
        .calendar-title {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
            p {
                line-height: 2;
                font-size: 34px;
                font-weight: bold;
                color: #ffffff;
                img {
                    width: 30px;
                }
            }
        }
        .calendar-statu {
            font-size: 40px;
            font-weight: bold;
            margin-bottom: 40px;
        }
        .calendar-price {
            background-color: #effafc;
            font-size: 40px;
            font-weight: bold;
            line-height: 2.5;
            text-align: center;
            margin-bottom: 40px;

            span {
                color: red;
                margin-right: 50px;
            }

            s {
                font-size: 30px;
                color: #4f4f4f;
            }
        }
        .calendar-ckbox {
            input {
                width: 30px;
                height: 30px;
                display: inline-block;
                margin-right: 10px;
            }
            span {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                position: relative;
                top: 6px;
                font-size: 26px;
            }
            margin-bottom: 80px;

        }
        .calendar-submit {
            background-color: #5cb8c5;
            color: #ffffff;
            width: 400px;
            height: 80px;
            font-size: 30px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            position: relative;
            left: 50%;
            margin-left: -200px;
            margin-bottom: 100px;
        }
        .calendar-tip {
            background-color: #5cb8c5;
            position: fixed;
            top: 160px;
            left: 0px;
            width: 40px;
            height: 160px;
            line-height: 1.2;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            color: #fff;
        }
    }
</style>