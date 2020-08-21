<template>
    <section class="home-container">

        <header class="banner">
            <img src="../assets/images/banner@3x.png" alt="">
        </header>

        <p>{{nowMonth}}</p>

        <div v-for="(item,index) in visibeDays" :key="index">
            {{item.getDate()}}
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

            img {
                width: 100%;
            }
        }
    }

</style>