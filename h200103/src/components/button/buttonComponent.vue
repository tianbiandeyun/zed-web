<template>
    <section class="button-box">
        <button @click="go1" class="btn1">预约体验</button>
        <button @click="go2" class="btn2" v-if="getCardBookingInfo.length !== 0">我的体验</button>
    </section>
</template>

<script>

    import * as config from '../../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "buttonComponent",
        async created() {
            const that = this;

            /**
             * 获取openid
             * */
            await that.$store.dispatch('_getOpenid', {
                im: config.requestInterface.getOpenid,
                fps: {},
                url: config.CONST_FETCH_REQUEST_URI
            });

            console.log(that.getOpenidInfo.open_id)

            if (that.getOpenidInfo === '' || that.getOpenidInfo === undefined || that.getOpenidInfo === null) {
                alert('点击重试');
                window.location.href = 'https://hztc.dev.hztcapp.com/index.php?r=interface/anycall&k=h_200103&page=dist/index&ac=lett&base=0&retry=3'
            }

            /**
             * 获取预约的时间
             * */
            await that.$store.dispatch('_getCardBooking', {
                im: config.requestInterface.getCardBooking,
                fps: {
                    'open_id': that.getOpenidInfo.open_id
                },
                url: config.CONST_FETCH_REQUEST_URI
            });

            console.log(that.getCardBookingInfo)
        },
        methods: {
            go1() {
                const that = this;
                that.$router.push({name: 'calendar'});
            },
            go2() {
                const that = this;
                that.$router.push({name: 'myCalendar'});
            },
        },
        computed: {
            ...mapGetters([
                'getOpenidInfo',
                'getCardBookingInfo'
            ])
        }
    }
</script>

<style lang="less">
    .button-box {
        margin-bottom: 60px;
        .btn1 {
            margin-bottom: 10px !important;
        }
        .btn1, .btn2 {
            display: block;
            margin: 0 auto;
            width: 300px;
            height: 80px;
            background-color: #036998;
            color: #fff;
            font-size: 30px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
        }
    }
</style>