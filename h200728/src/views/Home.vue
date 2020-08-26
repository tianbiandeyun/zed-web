<template>
    <section class="home-container">

        <header class="banner">
            <img src="../assets/images/banner@3x.png" alt="">
        </header>

        <!--日历盘-->
        <calender :coin="coin" :exist-date="exist_date" @sign="sign"></calender>

        <!--奖励列表-->
        <div class="continuous">
            <p>连续签到福利</p>

            <div class="continuous_box">

                <div class="continuous_box__item" v-for="(item,index) in keep_sign_list" :key="index">
                    <div class="continuous_box__item___left">
                        <img src="../assets/images/t.png" alt="">
                    </div>
                    <div class="continuous_box__item___center">
                        <p v-if="typeof reward_type[item.bonustype].reward === 'number'">
                            连续签到{{reward_type[item.bonustype].day}}天，+{{reward_type[item.bonustype].reward}}青创币
                        </p>
                        <p v-else>连续签到{{reward_type[item.bonustype].day}}天，获得{{reward_type[item.bonustype].reward}}</p>
                        <p>有效期至{{item.date}}</p>
                    </div>
                    <div class="continuous_box__item___right">
                        <button @click="getReward(item.bonustype)"
                                :class="{disabled_button:keep_sign_status['disabled'].includes(item.status)}"
                                :disabled="keep_sign_status['disabled'].includes(item.status)">
                            {{keep_sign_status[item.status]}}
                        </button>
                    </div>
                </div>

            </div>

        </div>

    </section>
</template>

<script>
    import calender from '../components/calender/calender'
    import {mapGetters} from 'vuex'

    export default {
        name: 'Home',
        components: {calender},
        data() {
            return {
                exist_date: [], // 已签到的日期
                coin: 0, // 有几枚硬币
                keep_sign_count: '', //连续签到的天数
                keep_sign_list: '', // 连续签到列表
                keep_sign_status: { // 连续签到列表按钮文字
                    'disabled': [2, 3, 4],
                    1: '领取',
                    2: '已领取',
                    3: '过期',
                    4: '已抢光'
                },
                reward_type: { // 奖品类别
                    4: {
                        day: 3,
                        reward: 2
                    },
                    5: {
                        day: 5,
                        reward: 3
                    },
                    6: {
                        day: 7,
                        reward: '爱奇艺会员'
                    },
                    8: {
                        day: 0,
                        reward: 1
                    }
                }
            }
        },
        async mounted() {

            // 获取 openid
            await this.$store.dispatch('getOpenid', {
                im: this.$Config.PROJECT_INTERFACE.getopenid,
                url: this.$Config.REQUEST_URL
            });
            this.refresh();

        },
        methods: {
            /**
             * 签到
             * */
            async sign() {

                // 点击签到
                let sign_result = await this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.clock_in_by_day,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                });

                // 获取连续签到的天数
                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_clocked_keep_count,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.refresh();
                    this.$Alert.show({
                        title: '签到成功',
                        content: {
                            alertType: 'sign',
                            keepSignCount: res.back_value,
                            reward: this.reward_type[sign_result.back_value['bonustype']]
                        },
                        confirmText: '去抽奖'
                    })
                })

            },
            getReward(res) {
                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.set_prize_record,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        bonustype: res
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    console.log(res);
                })
            },
            /**
             * 获取展示信息
             * */
            refresh() {

                // 获取 已签到的日期
                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_clocked_list,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.exist_date = res.back_value;
                });

                // 获取 用户信息-有几枚硬币
                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.getplayerinfo,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.coin = parseInt(res.back_value.score);
                });

                // 获取 连续福利列表
                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_bouns_list_info,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.keep_sign_list = res.back_value;
                })
            }
        },
        computed: {
            ...mapGetters([
                'openid_info'
            ]),
        }
    }
</script>

<style lang="less" scoped>

    .home-container {
        height: 100%;
        overflow-y: scroll;
        background-color: @default-app-color-background;

        .banner {
            width: 100%;
            font-size: 0;
            margin-bottom: 20px;

            img {
                width: 100%;
            }
        }

        .continuous {
            padding: 0 40px;

            > p {
                color: @default-font-color-title;
                font-size: @default-font-size-30;
                margin-bottom: 20px;
            }

            .continuous_box {
                background-color: #fff;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
                padding: 20px 16px 0 16px;

                .continuous_box__item {
                    display: grid;
                    grid-template-columns: 1fr 5fr 2fr;
                    border-bottom: 1px solid @default-app-color-border;
                    padding-bottom: 20px;
                    margin-bottom: 20px;

                    .continuous_box__item___left {
                        display: grid;
                        align-items: center;
                        justify-items: center;

                        img {
                            width: 70px;
                        }
                    }

                    .continuous_box__item___center {
                        display: grid;
                        align-items: center;

                        p {
                            font-size: @default-font-size-26;
                            padding-left: 10px;
                            color: @default-font-color-content;
                        }
                    }

                    .continuous_box__item___right {
                        display: grid;
                        align-items: center;

                        button {
                            color: #FFF;
                            font-size: @default-font-size-26;
                            background-color: @default-app-color-primary;
                            padding: 16px 20px 16px 20px;
                            -webkit-border-radius: @default-element-border-radius;
                            -moz-border-radius: @default-element-border-radius;
                            border-radius: @default-element-border-radius;
                        }

                        .disabled_button {
                            background-color: @default-app-color-disabled;
                            color: @default-font-color-content;
                        }
                    }
                }
            }

        }
    }

</style>