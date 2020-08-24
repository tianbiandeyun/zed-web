<template>
    <section class="sign-container">

        <div class="sign_count">
            <p class="count">剩余青创币可抽奖<span>999</span>次</p>
        </div>

        <div class="reward_box">

            <div class="sign_reward">
                <div class="sign_reward__item">
                    <div class="sign_reward__item_img"></div>
                    <div class="sign_reward__item_name">
                        玩着荣耀皮肤
                    </div>
                </div>
                <div class="sign_reward__item">
                    <div class="sign_reward__item_img"></div>
                    <div class="sign_reward__item_name">
                        玩着荣耀皮肤
                    </div>
                </div>
                <div class="sign_reward__item">
                    <div class="sign_reward__item_img"></div>
                    <div class="sign_reward__item_name">
                        玩着荣耀皮肤
                    </div>
                </div>
                <div class="sign_reward__item">
                    <div class="sign_reward__item_img"></div>
                    <div class="sign_reward__item_name">
                        玩着荣耀皮肤
                    </div>
                </div>
                <div class="sign_reward__item">
                    <div class="sign_reward__item_img"></div>
                    <div class="sign_reward__item_name">
                        玩着荣耀皮肤
                    </div>
                </div>
                <div class="sign_reward__item">
                    <div class="sign_reward__item_img"></div>
                    <div class="sign_reward__item_name">
                        玩着荣耀皮肤
                    </div>
                </div>
            </div>

        </div>

    </section>
</template>

<script>
    export default {
        name: "sign"
    }
</script>

<style lang="less" scoped>

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

            .sign_reward {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(2, 300px);
                grid-gap: 20px;

                .sign_reward__item {
                    border: 1px solid @default-app-color-border;
                    -webkit-border-radius: @default-element-border-radius;
                    -moz-border-radius: @default-element-border-radius;
                    border-radius: @default-element-border-radius;
                    display: grid;
                    grid-template-rows: 6fr 1fr;

                    .sign_reward__item_img {
                        border-top-left-radius: @default-element-border-radius;
                        border-top-right-radius: @default-element-border-radius;
                    }

                    .sign_reward__item_name {
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
        }
    }

</style>