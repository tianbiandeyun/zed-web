<template>
    <section class="home-container">

        <header class="banner">
            <img src="../assets/images/banner@3x.png" alt="">
        </header>

        <!--日历盘-->
        <calender :date="date"></calender>

        <!--奖励列表-->
        <div class="continuous">
            <p>连续签到福利</p>

            <div class="continuous_box">

                <div class="continuous_box__item">
                    <div class="continuous_box__item___left">1</div>
                    <div class="continuous_box__item___center">2</div>
                    <div class="continuous_box__item___right">3</div>
                </div>

            </div>

        </div>

    </section>
</template>

<script>
    import calender from '../components/calender/calender'

    export default {
        name: 'Home',
        components: {calender},
        data() {
            return {
                date: new Date()
            }
        },
        mounted() {

        },
        methods: {}
    }
</script>

<style lang="less" scoped>

    .home-container {
        height: 100%;
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

            p {
                color: @default-font-color-title;
                font-size: @default-font-size-30;
            }

            .continuous_box {
                border: 1px solid black;
                background-color: #fff;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
                padding: 0 20px;

                .continuous_box__item {
                    display: grid;
                    grid-template-columns: 1fr 2fr 1fr;

                    .continuous_box__item___left {
                        background-color: #ed4014;
                    }

                    .continuous_box__item___center {
                        background-color: #2db7f5;
                    }

                    .continuous_box__item___right {
                        background-color: #f7931e;
                    }
                }
            }

        }
    }

</style>