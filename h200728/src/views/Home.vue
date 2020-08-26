<template>
    <section class="home-container">

        <header class="banner">
            <img src="../assets/images/banner@3x.png" alt="">
        </header>

        <!--日历盘-->
        <calender :exist-date="exist_date" @sign="sign"></calender>

        <!--奖励列表-->
        <div class="continuous">
            <p>连续签到福利</p>

            <div class="continuous_box">

                <div class="continuous_box__item">
                    <div class="continuous_box__item___left">
                        <img src="../assets/images/t.png" alt="">
                    </div>
                    <div class="continuous_box__item___center">
                        <p>连续签到222天，+2青创币</p>
                        <p>有效期至2020-03-1111</p>
                    </div>
                    <div class="continuous_box__item___right">
                        <button @click="getReward">不能领取</button>
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
                exist_date: []
            }
        },
        async mounted() {

            await this.$store.dispatch('getOpenid', {
                im: this.$Config.PROJECT_INTERFACE.getopenid,
                url: this.$Config.REQUEST_URL
            }).then(res => {
                return this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_clocked_list,
                    fps: {
                        open_id: res.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                })
            }).then(res => {
                this.exist_date = res.back_value;
            })

        },
        methods: {
            /**
             * 签到
             * */
            sign() {
                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.clock_in_by_day,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    if (res.back_value) {
                        return this.$store.dispatch('fetchData', {
                            im: this.$Config.PROJECT_INTERFACE.clock_in_by_day,
                            fps: {
                                open_id: this.openid_info.back_value.open_id
                            },
                            url: this.$Config.REQUEST_URL
                        })
                    }
                }).then(res => {
                    console.log(res)
                })
            },
            getReward() {
                this.$Alert.show({
                    title: '签到成功',
                    confirmText: '去抽奖'
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
                    }
                }
            }

        }
    }

</style>