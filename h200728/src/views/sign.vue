<template>
    <section class="sign-container">

        <div class="sign_count">
            <p class="count">剩余青创币可抽奖<span>{{reward_count}}</span>次</p>
        </div>

        <transition name="fanzhuan">

            <div class="reward_box" v-if="is_reward">

                <!--我想要的-->
                <div class="want_reward" v-if="want">
                    <div class="want_reward__item" v-for="(item,index) in reward_list"
                         :key="index"
                         :date-reward-type="item.bonustype"
                         @click="wantReward(item)">
                        <div class="want_reward__item_img">
                            <img :src="item.bonus_img" alt="">
                        </div>
                        <div class="want_reward__item_name">
                            {{item.title}}
                        </div>
                    </div>
                </div>

                <!--抽奖-->
                <div class="change_reward" v-else>
                    <div class="change_reward__item" v-for="(item,index) in 6"
                         :key="index"
                         @click="changeReward">
                        <img :class="`change__itemActive${index}`" src="../assets/images/jiangpingfengmian.png" alt="">
                    </div>
                </div>

                <!--提示-->
                <div class="reward_tip">
                    <div><img src="../assets/images/left.png" alt=""></div>
                    <div>点击图标选择想要的奖品</div>
                    <div><img src="../assets/images/right.png" alt=""></div>
                </div>

            </div>

        </transition>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Toast} from 'vant';

    export default {
        name: "sign",
        components: {Toast},
        data() {
            return {
                want: true, // 考试显示，我想要的还是抽奖的
                reward_type: '', // 奖品类型 - 用于抽奖的时候告诉后端抽的是什么
                reward_list: [], // 奖品列表
                reward_count: 0, // 剩余抽奖次数
                is_reward: true
            }
        },
        mounted() {

            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            });

            this.$Utils.setDocumentTitle('试试手气');
            /**
             * 获取奖品列表
             * */
            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_luck_draw_list_info,
                fps: {
                    open_id: this.openid_info.back_value.open_id
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.reward_list = res.back_value;
            });

            this._getRewardCount();

            Toast.clear();

        },
        methods: {
            /**
             * 点击我想要的
             * */
            wantReward(item) {
                const that = this;

                Toast.loading({
                    forbidClick: true,
                    duration: 0
                });

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.set_pv_statistics,
                    fps: {
                        info_key: item.title
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    if (res.back_value) {

                        // 没有抽奖机会
                        if (+this.reward_count === 0) {
                            Toast.clear();
                            this.$Alert.show({
                                titleShow: false,
                                content: {
                                    alertType: 'noReward',
                                    content: '没有抽奖机会'
                                },
                                confirmText: '关闭',
                                closeShow: false
                            });
                            return false;
                        }

                        // 奖品没了
                        if (+item.count === 0) {
                            Toast.clear();
                            this.$Alert.show({
                                titleShow: false,
                                content: {
                                    alertType: 'noReward',
                                    content: '奖品已抢光，正在补货中'
                                },
                                confirmText: '查看其他奖励',
                                closeShow: false
                            });
                            return false;
                        }

                        Toast.clear();
                        // 展示我想要的奖品
                        this.$Alert.show({
                            titleShow: false,
                            content: {
                                alertType: 'want',
                                rewardImg: item.bonus_img,
                                title: item.title
                            },
                            confirmText: '试试手气',
                            operatButton() {
                                that.reward_type = item.bonustype;
                                that.want = false;
                            }
                        })

                    }
                });
            },
            /**
             * 翻牌选择奖品
             * */
            changeReward() {
                const that = this;

                Toast.loading({
                    forbidClick: true,
                    duration: 0
                });

                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.set_luck_draw,
                    fps: {
                        open_id: this.openid_info.back_value.open_id,
                        bonustype: this.reward_type
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    if (res.back_value.bonustype !== 1) {
                        this.is_reward = false;

                        // 中奖
                        for (let i = 0; i < this.reward_list.length; i++) {
                            if (this.reward_list[i].bonustype === res.back_value.bonustype) {
                                setTimeout(() => {
                                    Toast.clear();
                                    this.$Alert.show({
                                        title: `恭喜中奖${this.reward_list[i].bonustype}`,
                                        content: {
                                            alertType: 'reward',
                                            type: this.reward_list[i].bonustype,
                                            rewardImg: this.reward_list[i].bonus_img
                                        },
                                        confirmText: '前往领奖',
                                        closeShow: false,
                                        operatButton() {
                                            that.$router.replace(`/getReward?bonustype=${res.back_value.bonustype}&id=${+res.back_value.id}`)
                                        }
                                    });
                                }, 500);
                                break;
                            }
                        }


                    } else {
                        Toast.clear();
                        this.is_reward = false;

                        // 没中奖
                        this.$Alert.show({
                            title: '谢谢参与',
                            content: {
                                alertType: 'noReward',
                                content: '别灰心，再试一次吧'
                            },
                            confirmText: '再来一次',
                            closeShow: false,
                            operatButton() {
                                that._getRewardCount();
                                that.want = true;
                                that.is_reward = true;
                            }
                        })

                    }
                })
            },
            /**
             * 获取剩余抽奖次数
             * */
            _getRewardCount() {
                this.$store.dispatch('fetchData', {
                    im: this.$Config.PROJECT_INTERFACE.get_prize_record_count,
                    fps: {
                        open_id: this.openid_info.back_value.open_id
                    },
                    url: this.$Config.REQUEST_URL
                }).then(res => {
                    this.reward_count = res.back_value;
                })
            }
        },
        computed: {
            ...mapGetters([
                'openid_info'
            ])
        }
    }
</script>

<style lang="less" scoped>

    .fanzhuan-leave-to {
        transform: rotateY(180deg);
        opacity: 0;
    }

    .fanzhuan-enter-active, .fanzhuan-leave-active {
        transition: all .3s ease-in-out;
    }

    .sign-container {
        height: 100%;
        background-color: @default-app-color-primary;
        background-image: url("../assets/images/LuckyDraw@3x.png");
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 700px;

        .sign_count {
            height: 360px;
            display: grid;
            align-items: end;

            .count {
                height: 90px;
                background-image: url("../assets/images/tipbg.png");
                background-repeat: no-repeat;
                background-position: top center;
                background-size: 420px;
                text-align: center;
                line-height: 2.2;
                font-size: @default-font-size-30;
                color: @default-font-color-content;

                span {
                    color: @default-app-color-primary;
                }
            }
        }

        .reward_box {
            background-color: #fff;
            -webkit-border-radius: @default-element-border-radius;
            -moz-border-radius: @default-element-border-radius;
            border-radius: @default-element-border-radius;
            width: 700px;
            padding: 20px;
            margin: 0 auto;

            .want_reward {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-gap: 10px;

                .want_reward__item {
                    display: grid;
                    -webkit-border-radius: @default-element-border-radius;
                    -moz-border-radius: @default-element-border-radius;
                    border-radius: @default-element-border-radius;
                    overflow: hidden;

                    .want_reward__item_img {
                        font-size: 0;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .want_reward__item_name {
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        text-align: center;
                        font-size: @default-font-size-26;
                        padding: 5px;
                        background-color: @default-app-color-primary;
                        color: #fff;
                    }
                }
            }

            .change_reward {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: auto;
                grid-gap: 10px;

                .change_reward__item {
                    font-size: 0;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    .change__itemActive0 {
                        animation: change__item0-animation .6s;
                        animation-fill-mode: forwards;
                        animation-delay: .5s;
                    }

                    @-webkit-keyframes change__item0-animation {
                        0% {
                            transform: translateX(124px);
                            opacity: 0;
                        }
                        100% {
                            transform: translateX(0px);
                            opacity: 1;
                        }
                    }

                    @keyframes change__item0-animation {
                        0% {
                            transform: translateX(124px);
                            opacity: 0;
                        }
                        100% {
                            transform: translateX(0px);
                            opacity: 1;
                        }
                    }

                    .change__itemActive2 {
                        animation: change__item2-animation .6s;
                        animation-fill-mode: forwards;
                        animation-delay: .5s;
                    }

                    @-webkit-keyframes change__item2-animation {
                        0% {
                            transform: translateX(-124px);
                            opacity: 0;
                        }
                        100% {
                            transform: translateX(0px);
                            opacity: 1;
                        }
                    }

                    @keyframes change__item2-animation {
                        0% {
                            transform: translateX(-124px);
                            opacity: 0;
                        }
                        100% {
                            transform: translateX(0px);
                            opacity: 1;
                        }
                    }

                    .change__itemActive3 {
                        animation: change__item3-animation .8s;
                        animation-fill-mode: forwards;
                        animation-delay: .8s;
                    }

                    @-webkit-keyframes change__item3-animation {
                        0% {
                            transform: translate(124px, -110px);
                            opacity: 0;
                        }
                        100% {
                            transform: translate(0px, 0px);
                            opacity: 1;
                        }
                    }

                    @keyframes change__item3-animation {
                        0% {
                            transform: translate(124px, -110px);
                            opacity: 0;
                        }
                        100% {
                            transform: translate(0px, 0px);
                            opacity: 1;
                        }
                    }

                    .change__itemActive4 {
                        animation: change__item4-animation .8s;
                        animation-fill-mode: forwards;
                        animation-delay: .8s;
                    }

                    @-webkit-keyframes change__item4-animation {
                        0% {
                            transform: translateY(-110px);
                            opacity: 0;
                        }
                        100% {
                            transform: translateY(0px);
                            opacity: 1;
                        }
                    }

                    @keyframes change__item4-animation {
                        0% {
                            transform: translateY(-110px);
                            opacity: 0;
                        }
                        100% {
                            transform: translateY(0px);
                            opacity: 1;
                        }
                    }

                    .change__itemActive5 {
                        animation: change__item5-animation .8s;
                        animation-fill-mode: forwards;
                        animation-delay: .8s;
                    }

                    @-webkit-keyframes change__item5-animation {
                        0% {
                            transform: translate(-124px, -110px);
                            opacity: 0;
                        }
                        100% {
                            transform: translate(0px, 0px);
                            opacity: 1;
                        }
                    }

                    @keyframes change__item5-animation {
                        0% {
                            transform: translate(-124px, -110px);
                            opacity: 0;
                        }
                        100% {
                            transform: translate(0px, 0px);
                            opacity: 1;
                        }
                    }

                }

            }

            .reward_tip {
                display: grid;
                grid-template-columns: 1fr 2fr 1fr;

                div {

                    &:nth-of-type(1), &:nth-of-type(3) {
                        display: grid;
                        align-items: center;

                        img {
                            width: 100px;
                        }
                    }

                    &:nth-of-type(1) {
                        justify-items: right;
                    }

                    &:nth-of-type(3) {
                        justify-items: left;
                    }

                    &:nth-of-type(2) {
                        text-align: center;
                        line-height: 2;
                        font-size: @default-font-size-26;
                        color: @default-font-color-content;
                    }
                }
            }
        }
    }

</style>