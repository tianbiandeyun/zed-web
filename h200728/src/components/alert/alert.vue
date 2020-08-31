<template>

    <transition name="fade">

        <section class="alert-container" v-if="alert_show">

            <div class="alert-box">

                <!--标题-->
                <div class="alert-box_title" v-if="titleShow">
                    <div class="alert-box_title__left">
                        <img src="../../assets/images/title-left.png" alt="">
                    </div>
                    <div class="alert-box_title__center">{{title}}</div>
                    <div class="alert-box_title__right">
                        <img src="../../assets/images/title-right.png" alt="">
                    </div>
                </div>

                <!--内容-->
                <div class="alert-box_content">

                    <!--签到 / 连续签到弹框-->
                    <div v-if="content.alertType === 'sign'">
                        <div class="alert-box_content__sign">
                            <img src="../../assets/images/tt.png" alt="">
                            <p>
                                <!--如果有连续签到的天数则显示，签到几天-->
                                <span v-if="content.keepSignCount">您已连续签到{{content.keepSignCount}}天，</span>
                                <!--如果奖励不是金币则显示，奖励名称-->
                                <span v-if="typeof content.reward.reward === 'string'">获{{content.reward.reward}}</span>
                                <!--如果奖励是金币则显示几个金币-->
                                <span v-if="typeof content.reward.reward === 'number'">获{{content.reward.reward}}得青创币</span>
                            </p>
                        </div>
                    </div>

                    <!--想要的奖品展示-->
                    <div v-if="content.alertType === 'want'">
                        <div class="alert-box_content__want">
                            <div class="want-title">{{content.title}}</div>
                            <div class="want-img">
                                <img :src="content.rewardImg" alt="">
                            </div>
                            <div class="want-tip">消耗青创币1枚</div>
                        </div>
                    </div>

                    <!--中奖-->
                    <div v-if="content.alertType === 'reward'">
                        <div class="alert-box_content__reward">
                            {{content.type}}
                        </div>
                    </div>

                    <!--没有中奖 / 重复签到 / 各种提示框-->
                    <div v-if="content.alertType === 'noReward'">
                        <div class="alert-box_content__noReward">
                            <div class="no-reward_img" v-if="noRewardImg">
                                <img src="../../assets/images/meijiang.png" alt="">
                            </div>
                            <p class="no-reward_content">{{content.content}}</p>
                        </div>
                    </div>

                </div>

                <!--按钮-->
                <div class="alert-box_button" @click="_operatButton">
                    <button>{{confirmText}}</button>
                </div>

                <!--关闭-->
                <div class="alert-box_close" v-if="closeShow" @click="_close">
                    <img src="../../assets/images/close.png" alt="">
                </div>

            </div>

        </section>

    </transition>
</template>

<script>
    export default {
        name: "alert",
        props: {
            /**
             * 标题是否显示
             * */
            titleShow: {
                type: Boolean,
                default: true
            },
            /**
             * 关闭是否显示
             * */
            closeShow: {
                type: Boolean,
                default: true
            },
            /**
             * 各种提示按钮的图片是否显示
             * */
            noRewardImg: {
                type: Boolean,
                default: true
            },
            /**
             * 标题文字
             * */
            title: {
                type: String,
                default: '标题'
            },
            /**
             * 内容文字
             * */
            content: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            /**
             * 标题操作按钮文字
             * */
            confirmText: {
                type: String,
                default: '按钮'
            },
            /**
             * 操作按钮
             * */
            operatButton: {
                type: Function,
                default: () => {
                    console.log('操作按钮')
                }
            },
            /**
             * 关闭按钮
             * */
            operatClose: {
                type: Function,
                default: () => {
                    console.log('关闭操作')
                }
            },
        },
        data() {
            return {
                alert_show: false
            }
        },
        methods: {
            /**
             * 显示
             * */
            show() {
                if (this.alert_show === false) {
                    this.alert_show = true;
                }
            },
            /**
             * 关闭
             * */
            _close() {
                if (this.alert_show) {
                    this.alert_show = false;
                    this.operatClose();
                }
            },
            /**
             * 按钮操作
             * */
            _operatButton() {
                this._close();
                this.operatButton();
            }
        }
    }
</script>

<style lang="less" scoped>

    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: scale(1.5);
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s ease-in-out;
    }

    .alert-container {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .6);
        display: grid;
        justify-content: center;
        align-content: center;
        z-index: 9999;

        .alert-box {
            width: 640px;
            background-color: #fff;
            -webkit-border-radius: @default-element-border-radius;
            -moz-border-radius: @default-element-border-radius;
            border-radius: @default-element-border-radius;
            position: relative;

            .alert-box_title {
                border-top-left-radius: @default-element-border-radius;
                border-top-right-radius: @default-element-border-radius;
                background-color: @default-app-color-primary;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: 120px;

                .alert-box_title__left, .alert-box_title__center, .alert-box_title__right {
                    display: grid;
                    align-items: center;
                }

                .alert-box_title__left {
                    justify-items: right;

                    img {
                        width: 80px;
                    }
                }

                .alert-box_title__center {
                    justify-items: center;
                    font-size: @default-font-size-34;
                    color: #fff;

                }

                .alert-box_title__right {
                    justify-items: left;

                    img {
                        width: 80px;
                    }
                }

            }

            .alert-box_content {
                /*border: 1px solid black;*/
                text-align: center;
                padding: 20px 0;

                .alert-box_content__sign {

                    img {
                        width: 300px;
                    }

                    p {
                        font-size: @default-font-size-30;
                        color: @default-font-color-content;
                        line-height: 2;
                    }
                }

                .alert-box_content__want {

                    .want-title {
                        margin-bottom: 20px;
                    }

                    .want-title, .want-tip {
                        font-size: @default-font-size-30;
                        color: @default-font-color-content;
                    }

                    .want-img {
                        margin-bottom: 20px;

                        img {
                            width: 560px;
                            height: 660px;
                        }
                    }

                }

                .alert-box_content__reward {

                }

                .alert-box_content__noReward {

                    .no-reward_img {
                        margin-bottom: 20px;

                        img {
                            width: 200px;
                        }
                    }

                    .no-reward_content {
                        font-size: @default-font-size-30;
                        color: @default-font-color-content;
                    }
                }
            }

            .alert-box_button {
                text-align: center;
                padding: 20px 0 40px 0;

                button {
                    color: #FFF;
                    font-size: @default-font-size-30;
                    background-color: @default-app-color-primary;
                    padding: 20px 40px;
                    -webkit-border-radius: @default-element-border-radius;
                    -moz-border-radius: @default-element-border-radius;
                    border-radius: @default-element-border-radius;
                }
            }

            .alert-box_close {
                width: 60px;
                position: absolute;
                bottom: -100px;
                left: 50%;
                margin-left: -30px;

                img {
                    width: 100%;
                }
            }
        }
    }
</style>