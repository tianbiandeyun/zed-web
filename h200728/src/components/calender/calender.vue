<template>
    <section class="calender-container">

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

                    <div class="active" v-if="false"></div>
                </div>
                <div class="calender_main__nowMonth">{{nowMonth}}月</div>
            </div>

            <button class="calender_button">立即签到</button>

        </div>

    </section>
</template>

<script>
    export default {
        name: "calender",
        props: {
            date: {
                type: Date
            }
        },
        computed: {
            /**
             * 把当前月格式化42天
             * */
            visibeDays() {

                // 获取当前日期 年/月
                let {year, month} = this.$Utils.getYearMonthDay(this.date);

                // 获取当前月的第一天
                let currentFirstDay = this.$Utils.getDate(year, month, 1);

                // 获取当月第一天是周几
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

    .calender-container {
        padding: 0 40px;
        margin-bottom: 60px;

        .calender {
            background-color: #fff;
            -webkit-border-radius: @default-element-border-radius;
            -moz-border-radius: @default-element-border-radius;
            border-radius: @default-element-border-radius;
            position: relative;

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
                text-align: center;
                line-height: 80px;
                font-size: @default-font-size-30;
                font-weight: 600;
                color: @default-font-color-content;
                padding-bottom: 60px;
                position: relative;

                .calender_main__item {
                    z-index: 9;
                    position: relative;
                }

                .active {
                    width: 60px;
                    height: 60px;
                    background-color: @default-app-color-primary;
                    color: #fff;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top: -30px;
                    margin-left: -30px;
                    z-index: -1;
                    -webkit-border-radius: 50%;
                    -moz-border-radius: 50%;
                    border-radius: 50%;
                }

                .calender_main__nowMonth {
                    width: 400px;
                    height: 280px;
                    text-align: center;
                    line-height: 280px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left: -200px;
                    margin-top: -180px;
                    z-index: 0;
                    color: @default-app-color-background;
                    font-size: 240px;
                }

                /*不是本月则显示灰色*/
                .pro_month_active {
                    color: @default-font-color-sub;
                }

            }

            .calender_button {
                width: 300px;
                color: #FFF;
                font-size: @default-font-size-30;
                background-color: @default-app-color-primary;
                padding: 20px 0 20px 0;
                -webkit-border-radius: @default-element-border-radius;
                -moz-border-radius: @default-element-border-radius;
                border-radius: @default-element-border-radius;
                position: absolute;
                bottom: -30px;
                left: 50%;
                margin-left: -150px;
            }

        }
    }

</style>