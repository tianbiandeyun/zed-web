<template>
    <section class="start">
        <div class="start-top">
            <span>限时报名立享9.9抵199元优惠</span>
            <span @click="startSubmit" :class="startSubmitAnimate ? 'animated bounceIn' : ''">
                <img src="../assets/images/applyCard.png" alt="">
            </span>
        </div>
        <div class="start-backgroundImg"></div>
        <div class="start-submit">
            <button :class="startSubmitAnimate ? 'animated bounceIn' : ''" @click="startSubmit">立即报名</button>
        </div>
    </section>
</template>

<script>
    import * as config from '../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "start",
        data() {
            return {
                startSubmitAnimate: false
            }
        },
        methods: {
            /**
             * 跳转第二页
             * */
            startSubmit() {
                let that = this;
                that.startSubmitAnimate = !that.startSubmitAnimate;
                setTimeout(() => {
                    that.$router.replace({name: 'form'});
                }, 500)
            }
        }
    }
</script>

<style lang="less">
    .start {

        .start-top {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;
            height: 80px;
            background-color: #fff;
            position: fixed;
            top: 0px;
            left: 0px;

            span {
                display: block;
                line-height: 80px;
                height: 80px;

                &:nth-of-type(1) {
                    width: 74%;
                    float: left;
                    text-align: center;
                    font-size: 40px;
                    font-weight: bold;
                    color: #ff5f68;
                }

                &:nth-of-type(2) {
                    width: calc(100% - 74%);
                    float: right;
                    vertical-align: middle;
                    img {
                        width: 100%;
                    }
                }
            }
        }

        .start-backgroundImg {
            height: 8330px;
            background: url("../assets/images/start1.png") no-repeat;
            background-size: 100% 100%;
            margin-top: 80px;
        }

        .start-submit {

            height: 200px;
            background-color: #ffe5a5;

            button {
                margin: 0 auto;
                display: block;
                border: 1px solid #ff5f68;
                color: #fff;
                padding: 20px 0px;
                width: 50%;
                font-size: 30px;
                text-align: center;
                -webkit-border-radius: 10px;
                -moz-border-radius: 10px;
                border-radius: 10px;
                -moz-box-shadow: 5px 5px 10px #cc3744;
                -webkit-box-shad5w: 5px 0px 10px #cc3744;
                box-shadow: 5px 5px 10px #cc3744;
                background-image: linear-gradient(to right, #ff5f68, #ffd69f);
                font-weight: bold;
            }
        }
    }
</style>
