<template>
    <section class="home-container">

        <header class="banner">
            <img src="../assets/images/banner@3x.png" alt="">
        </header>

        <!--日历盘-->
        <calender :date="date"></calender>

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
    }

</style>