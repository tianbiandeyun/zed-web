<template>
    <section class="sign-container">

        <div class="sign_count">
            <p class="count">剩余青创币可抽奖<span>999</span>次</p>
        </div>

        <div class="reward_box">

            <!--我想要的-->
            <div class="reward" v-if="want">
                <div class="reward__item" v-for="(item,index) in reward_list" :key="index" @click="wantReward(item)">
                    <div class="reward__item_img">奖品类型：{{item.bonustype}}</div>
                    <div class="reward__item_name">
                        {{item.title}}
                    </div>
                </div>
            </div>

            <!--抽奖-->
            <div class="change" v-else>
                <div class="change__item" v-for="(item,index) in 6" :key="index" @click="changeReward(index)">
                    <transition name="changeReward">
                        <img v-show="!change.includes(index)" src="../assets/images/jiangpingfengmian.png" alt="">
                    </transition>
                    <div v-show="change.includes(index)" class="changeReward__item_img">{{item}}</div>
                    <div v-show="change.includes(index)" class="changeReward__item_name">
                        玩着荣耀皮肤
                    </div>
                </div>
            </div>

            <!--提示-->
            <div class="reward_tip">
                <div><img src="../assets/images/left.png" alt=""></div>
                <div>点击图标选择想要的奖品</div>
                <div><img src="../assets/images/right.png" alt=""></div>
            </div>

        </div>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "sign",
        data() {
            return {
                want: true,
                change: [], // 翻开的牌面
                reward_list: []
            }
        },
        mounted() {

            this.$store.dispatch('fetchData', {
                im: this.$Config.PROJECT_INTERFACE.get_luck_draw_list_info,
                fps: {
                    open_id: this.openid_info.back_value.open_id
                },
                url: this.$Config.REQUEST_URL
            }).then(res => {
                this.reward_list = res.back_value;
            });

        },
        methods: {
            /**
             * 点击我想要的
             * */
            wantReward(item) {
                console.log(`剩余数量：${item.count}`);
                console.log(`奖品类型：${item.bonustype}`);
            },
            /**
             * 翻牌选择奖品
             * */
            changeReward(index) {
                this.change = [...this.change, index]
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

    .changeReward-leave-to {
        transform: rotateY(180deg);
        opacity: 0;
    }

    .changeReward-enter-active, .changeReward-leave-active {
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

            .change {

                .change__item {
                    overflow: hidden;

                    img {
                        width: 100%;
                    }
                }
            }

            .reward, .change {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(2, 300px);
                grid-gap: 20px;
                margin-bottom: 20px;

                .reward__item, .change__item {
                    -webkit-border-radius: @default-element-border-radius;
                    -moz-border-radius: @default-element-border-radius;
                    border-radius: @default-element-border-radius;
                    display: grid;
                    grid-template-rows: 6fr 1fr;

                    .reward__item_img, .changeReward__item_img {
                        border-top-left-radius: @default-element-border-radius;
                        border-top-right-radius: @default-element-border-radius;
                        text-align: center;
                        line-height: 4;
                    }

                    .reward__item_name, .changeReward__item_name {
                        background-color: @default-app-color-primary;
                        color: #fff;
                        border-bottom-left-radius: @default-element-border-radius;
                        border-bottom-right-radius: @default-element-border-radius;
                        font-size: @default-font-size-26;
                        text-align: center;
                        line-height: 1.4;
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