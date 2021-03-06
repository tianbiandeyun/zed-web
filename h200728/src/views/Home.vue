<template>
    <section class="home-container">

        <header class="banner">
            <img src="../assets/images/banner@3x.png" alt="">

            <!--规则-->
            <div class="rule" @click="rule">规则</div>

            <!--已领取-->
            <div class="get_reward" @click="getRewardList">已领取福利</div>
        </header>

        <!--日历盘-->
        <calender :coin="coin" :exist-date="exist_date" @sign="sign" @pick="pick"></calender>

        <!--奖励列表-->
        <div class="continuous">
            <p>连续签到福利</p>

            <div class="continuous_box">

                <div class="continuous_box__item" v-for="(item,index) in keep_sign_list" :key="index">
                    <div class="continuous_box__item___left">
                        <img :src="item.img" alt="">
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
    import {Toast} from 'vant';
    import {mapGetters} from 'vuex'

    export default {
        name: 'Home',
        components: {calender, Toast},
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
                reward_type: this.$Config.REWARD_TYPE
            }
        },
        async mounted() {

            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            });

            this.$Utils.setDocumentTitle('签到领福利-测试222');

            // openid
            await this.$store.dispatch('getOpenid', {
                im: this.$Config.PROJECT_INTERFACE.getopenid,
                url: this.$Config.REQUEST_URL
            });

            // 数据请求
            await this.refresh();

            let wxs = new this.$WxShare(this.wx_config.back_value, {
                title: '范德萨发生范德萨发舒服',
                details: '99222999',
                link: await this.$Utils.makeShareLink(),
                image: 'www'
            }, true);
            wxs.init();

        },
        methods: {
            /**
             * 已获得的奖品
             * */
            getRewardList() {
                this.$router.push('/reward')
            },
            /**
             * 规则
             * */
            rule() {
                this.$router.push('/rule')
            },
            /**
             * 抽奖
             * */
            pick() {
                this.$router.push('/sign')
            },
            /**
             * 签到
             * */
            async sign() {
                const that = this;

                Toast.loading({
                    forbidClick: true,
                    duration: 0
                });

                // 点击签到
                let sign_result = await this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.clock_in_by_day,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                });

                if (sign_result.error_code === 2001101) {
                    Toast.clear();
                    this.$Alert.show({
                        titleShow: false,
                        content: {
                            alertType: 'noReward',
                            content: '无法重复签到'
                        },
                        confirmText: '关闭',
                        closeShow: false
                    });
                    return false;
                }

                // 获取连续签到的天数
                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_clocked_keep_count,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    Toast.clear();
                    this.refresh();
                    this.$Alert.show({
                        title: '签到成功',
                        content: {
                            alertType: 'sign',
                            keepSignCount: res.back_value,
                            reward: this.reward_type[sign_result.back_value['bonustype']]
                        },
                        confirmText: '去抽奖',
                        operatButton() {
                            that.$router.push('/sign')
                        }
                    })
                })

            },
            /**
             * 连续签到
             * */
            getReward(res) {
                const that = this;

                Toast.loading({
                    forbidClick: true,
                    duration: 0
                });

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.set_prize_record,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        bonustype: res,
                        date: '2020-09-30'
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {

                    if (res.error_code === 2008111345) {
                        Toast.clear();
                        Toast('天数不够，无法领取');
                        return false;
                    }
                    Toast.clear();
                    this.refresh();
                    this.$Alert.show({
                        title: '签到成功',
                        content: {
                            alertType: 'sign',
                            reward: this.reward_type[res.back_value['bonustype']]
                        },
                        confirmText: '去抽奖',
                        operatButton() {
                            that.$router.push('/sign')
                        }
                    })

                })
            },
            /**
             * 获取展示信息
             * */
            async refresh() {

                // 获取 已签到的日期
                await this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_clocked_list,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.exist_date = res.back_value;
                });

                // 获取 用户信息-有几枚硬币
                await this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.getplayerinfo,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.coin = parseInt(res.back_value.score);
                });

                // 获取 连续福利列表
                await this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_bouns_list_info,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.keep_sign_list = res.back_value;
                });

                // 获取 微信配置
                await this.$store.dispatch('getWxConfig', {
                    im: this.$Config.PROJECT_INTERFACE.get_jsconf,
                    fps: {
                        url: encodeURIComponent(window.location.href.split('#')[0])
                    },
                    url: this.$Config.REQUEST_URL
                });

                Toast.clear();

            }
        },
        computed: {
            ...mapGetters([
                'openid_info',
                'wx_config'
            ])
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
            position: relative;

            img {
                width: 100%;
            }

            .rule, .get_reward {
                position: absolute;
                top: 100px;
                font-size: @default-font-size-26;
                background-color: rgba(000, 000, 000, .2);
                color: #fff;
            }

            .rule {
                left: 0;
                padding: 10px 40px 10px 20px;
                border-top-right-radius: @default-element-border-radius;
                border-bottom-right-radius: @default-element-border-radius;
            }
            .get_reward {
                right: 0;
                padding: 10px 20px 10px 40px;
                border-top-left-radius: @default-element-border-radius;
                border-bottom-left-radius: @default-element-border-radius;
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