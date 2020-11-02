<template>
    <section class="myCalendar">

        <div class="myCalendar-conent">
            <h1>我的预约</h1>
            <div v-for="(item,index) in getCardBookingInfo" :key="index">
                <span>预约时间：{{item.reserve_date}}</span>
                <button @click="getAcrd(item.reserve_date,item.id)">
                    {{item.status == 1 ? '领取卡劵' : '已领取'}}
                </button>
            </div>
            <h1>体验地址</h1>
            <p>北京市海淀区海淀东三街2号 <br>
                新东方南楼1层大厅</p>
        </div>

        <div @click="getWeiZhi" style="text-align: center;margin-bottom: 100px;padding-bottom: 100px;">
            <img style="width: 500px;text-align: center;border: 1px solid black;border-radius: 10px;"
                 src="../assets/images/myCalendar/map.jpeg" alt="">
        </div>

        <c-calendar-tip v-if="isTip" :closetTip="_closetTip" :msg="msg"></c-calendar-tip>

    </section>
</template>

<script>
    import * as config from "../../unit/config";
    import {mapGetters} from "vuex";
    import share from '../components/shareClass/share'
    import cCalendarTip from '../components/calendarTip/calendarTipComponent'

    export default {
        name: "myCalendar",
        components: {cCalendarTip},
        mixins: [share],
        data() {
            return {
                isTip: false,
                msg: {
                    'type': 2,
                    'title': '卡劵使用方法',
                    'conent': `打开微信，右下角“我”->卡包->莱特飞行者，出示卡券。`
                }
            }
        },
        async mounted() {
            const that = this;

            /**
             * 获取openid
             * */
            await that.$store.dispatch('_getOpenid', {
                im: config.requestInterface.getOpenid,
                fps: {},
                url: config.CONST_FETCH_REQUEST_URI
            });

            console.log(that.getOpenidInfo.open_id)

            /**
             * 获取预约的时间
             * */
            await that.$store.dispatch('_getCardBooking', {
                im: config.requestInterface.getCardBooking,
                fps: {
                    'open_id': that.getOpenidInfo.open_id
                },
                url: config.CONST_FETCH_REQUEST_URI
            });

            console.log(that.getCardBookingInfo)
        },
        methods: {
            // 打开预约须知
            _openTip() {
                const that = this;
                that.isTip = true
            },
            // 关闭预约须知
            _closetTip() {
                const that = this;
                that.isTip = false
            },
            /**
             * 地理位置
             * */
            async getWeiZhi() {
                window.location.href = 'https://f.hztc.dev.hztcapp.com/h/h200103/dist/tolocation.html'
            },
            /**
             * 获取卡劵
             * */
            async getAcrd(date, id) {
                const that = this;

                /**
                 * 判断领取卡劵机会
                 * */
                await that.$store.dispatch('_hasReceiveCardChance', {
                    im: config.requestInterface.hasReceiveCardChance,
                    fps: {
                        'open_id': that.getOpenidInfo.open_id,
                        'id': id
                    },
                    url: config.CONST_FETCH_REQUEST_URI
                }).then(res => {
                    if (res.back_value) {
                        // 有机会
                        console.log('有机会');

                        // 获取卡劵 ID
                        that.getAcrdType(date, that.getOpenidInfo.open_id).then(res => {
                            console.log(res);
                            // 获取卡劵 配置
                            return that.getCardConfigById(that.getOpenidInfo.open_id, res, id)
                        }).then(res => {
                            console.log(res);
                            // 领取卡券
                            return that.getAddCard(res.back_value)
                        }).then(res => {
                            console.log(res);
                            window.location.reload();
                        })
                    } else {
                        // 没机会
                        that._openTip()
                    }
                })
            },
            /**
             * 获取卡劵 ID
             * */
            getAcrdType(date, openid) {
                const that = this;
                return new Promise(resolve => {
                    that.$store
                        .dispatch("_setAcrdType", {
                            im: config.requestInterface.setAcrdType,
                            fps: {
                                'open_id': openid,
                                'date': date
                            },
                            url: config.CONST_FETCH_REQUEST_URI
                        })
                        .then(res => {
                            resolve(res.back_value);
                        });
                });
            },
            /**
             * 获取卡劵 配置
             * */
            getCardConfigById(openid, cardid, id) {
                const that = this;
                return new Promise(resolve => {
                    that.$store
                        .dispatch("_getCardConfig", {
                            im: config.requestInterface.getCardConfig,
                            fps: {
                                'open_id': openid,
                                'card_id': cardid,
                                'id': id
                            },
                            url: config.CONST_FETCH_REQUEST_URI
                        })
                        .then(res => {
                            resolve(res);
                        });
                });
            }
        },
        computed: {
            ...mapGetters([
                'getOpenidInfo',
                'getCardBookingInfo',
                'getwxconfigInfo',
                'setAcrdTypeInfo',
                'hasReceiveCardChanceInfo'
            ])
        }
    }
</script>

<style lang="less">
    .myCalendar {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        height: 100%;
        background: url("../assets/images/myCalendar/bg.png") no-repeat;
        background-size: 100%;
        padding-top: 200px;
        .myCalendar-conent {
            width: 80%;
            padding: 80px 20px 80px 20px;
            margin: 0 auto;
            background-color: #fff;
            font-size: 30px;
            font-weight: bold;
            text-align: center;
            -moz-box-shadow: 0px 5px 20px #E0E0E0;
            -webkit-box-shadow: 0px 5px 20px #E0E0E0;
            box-shadow: 0px 5px 20px #E0E0E0;
            margin-bottom: 40px;

            h1 {
                border: 1px solid #5cb8c5;
                font-size: 30px;
                font-weight: bold;
                width: 80%;
                line-height: 3;
                margin: 0 auto;
                margin-bottom: 30px;
            }

            div, p {
                line-height: 1.2;
                margin-bottom: 30px;
            }

            div {
                span {
                    margin-right: 20px;
                }
                button {
                    font-size: 20px;
                    background-color: #5cb8c5;
                    color: #fff;
                    padding: 10px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }
            }
        }
    }
</style>