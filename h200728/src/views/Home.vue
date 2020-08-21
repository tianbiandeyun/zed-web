<template>
    <section class="home-container">

        <header class="banner">
            <img src="../assets/images/banner@3x.png" alt="">
        </header>

        <!--日历盘-->
        <div class="calender-box">

            <div class="calender">

                <div class="calender_header">
                    <p>已有青创币 9999 枚</p>
                    <p>幸运抽牌 ></p>
                </div>

                <div class="calender_main">
                    <div class="calender_main__item"
                         :class="{pro_month_active: item.getMonth()+1 !== date.getMonth()+1}"
                         v-for="(item,index) in visibeDays"
                         :key="index">
                        {{item.getDate()}}
                    </div>
                </div>

            </div>

        </div>


    </section>
</template>

<script>
    export default {
        name: 'Home',
        components: {},
        data() {
            return {
                date: new Date()
            }
        },
        mounted() {

        },
        methods: {},
        computed: {
            /**
             * 把当前月格式化42天
             * */
            visibeDays() {

                // 获取当前日期
                let {year, month} = this.$Utils.getYearMonthDay(this.date);

                // 获取当前月的第一天
                let currentFirstDay = this.$Utils.getDate(year, month, 1);

                // 当月第一天是周几
                let week = currentFirstDay.getDay();

                // 本日历盘开始的第一天
                let start = currentFirstDay - week * 60 * 60 * 1000 * 24;

                let arr = [];

                for (let i = 0; i < 42; i++) {
                    arr.push(new Date(start + i * 60 * 60 * 1000 * 24))
                }

                return arr;

            },
            nowMonth() {
                let {month} = this.$Utils.getYearMonthDay(this.date);
                return month + 1
            }
        }
    }
</script>

<style lang="less" scoped>

    .home-container {

        .banner {
            width: 100%;
            font-size: 0;

            img {
                width: 100%;
            }
        }

        .calender-box {
            border: 1px solid black;

            .calender {
                margin: 0 auto;
                width: 640px;
                border: 1px solid red;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
                overflow: hidden;

                .calender_header {
                    background-color: @default-app-color-primary;
                    padding: 20px;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    color: #fff;
                    font-size: @default-font-size-30;

                    p {
                        &:nth-of-type(2) {
                            text-align: right;
                        }
                    }

                }

                .calender_main {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    grid-template-rows: repeat(6, 80px);
                    justify-items: center;
                    align-items: center;
                    font-size: @default-font-size-30;
                    color: @default-font-color-content;

                    .calender_main__item {

                    }

                    /*不是本月则显示灰色*/
                    .pro_month_active {
                        color: @default-font-color-sub;
                    }

                }

            }
        }
    }

</style>