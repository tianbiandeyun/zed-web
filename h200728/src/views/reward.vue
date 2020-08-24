<template>
    <section class="reward-container">

        <div class="reward_item">
            <div class="reward_item___left">
                <img src="../assets/images/t.png" alt="">
            </div>
            <div class="reward_item___center">
                <p>连续签到222天，+2青创币</p>
                <p>有效期至2020-03-1111</p>
            </div>
            <div class="reward_item___right">
                <button>不能领取</button>
            </div>
        </div>

    </section>
</template>

<script>
    export default {
        name: "reward"
    }
</script>

<style lang="less" scoped>

    .reward-container {
        height: 100%;
        background-color: @default-app-color-background;
        padding: 20px 10px;

        .reward_item {
            display: grid;
            grid-template-columns: 1fr 5fr 2fr;
            background-color: #fff;
            padding: 20px 10px;
            -webkit-border-radius: @default-element-border-radius;
            -moz-border-radius: @default-element-border-radius;
            border-radius: @default-element-border-radius;

            .reward_item___left {
                display: grid;
                align-items: center;
                justify-items: center;

                img {
                    width: 70px;
                }
            }

            .reward_item___center {
                display: grid;
                align-items: center;

                p {
                    font-size: @default-font-size-26;
                    padding-left: 10px;
                    color: @default-font-color-content;
                }
            }

            .reward_item___right {
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

</style>