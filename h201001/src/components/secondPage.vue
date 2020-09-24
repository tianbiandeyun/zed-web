<template>
    <section class="second-page">

        <div class="top">

            <div class="top_left">

                <img class="top_left-img1" src="../assets/images/5.png" alt="">

                <img class="top_left-img2" src="../assets/images/8.png" alt="">

                <img class="top_left-img3" src="../assets/images/9.png" alt="">

            </div>

            <div class="top_right">

                <img class="top_right-img1" src="../assets/images/6.png" alt="">

                <img class="top_right-img2" src="../assets/images/7.png" alt="">

            </div>

        </div>

        <div class="bottom">

            <div class="bottom_nickname">
                <span>昵称昵称昵称</span>和<span>（选择一个祝福伴侣）</span>
            </div>

            <div class="bottom_sulo">
                <div @click="chang('ce')">
                    <img src="../assets/images/ce.png" alt="">
                    <div class="chang_active" v-if="sulo === 'ce'">
                        <img src="../assets/images/click.png" alt="">
                    </div>
                </div>
                <div @click="chang('wg')">
                    <img src="../assets/images/wg.png" alt="">
                    <div class="chang_active" v-if="sulo === 'wg'">
                        <img src="../assets/images/click.png" alt="">
                    </div>
                </div>
                <div @click="chang('yl')">
                    <img src="../assets/images/yl.png" alt="">
                    <div class="chang_active" v-if="sulo === 'yl'">
                        <img src="../assets/images/click.png" alt="">
                    </div>
                </div>
                <div @click="chang('yt')">
                    <img src="../assets/images/yt.png" alt="">
                    <div class="chang_active" v-if="sulo === 'yt'">
                        <img src="../assets/images/click.png" alt="">
                    </div>
                </div>
            </div>

            <div class="bottom_tack">
                <Field v-model="address" placeholder="请输入祝福地点"/>
            </div>

            <div class="bottom_submit">
                <button @click="submit">一起祝福祖国</button>
            </div>

        </div>

    </section>
</template>

<script>
    import {Field} from 'vant';

    export default {
        name: "secondPage",
        components: {Field},
        data() {
            return {
                sulo: '',
                address: ''
            }
        },
        methods: {
            chang(res) {
                this.sulo = res;
            },
            submit() {
                if (this.sulo === '') {
                    this.$Toast('请选择祝福伴侣哦～');
                    return false;
                }
                if (this.address === '') {
                    this.$Toast('祝福地点不能为空哦～');
                    return false;
                }

                this.$router.push(`/result?sulo=${this.sulo}&address=${this.address}`);

            }
        }
    }
</script>

<style lang="less" scoped>
    .second-page {
        height: 100%;
        display: grid;
        grid-template-rows: repeat(2, 1fr);

        .top {
            background-image: url("../assets/images/10.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            @-webkit-keyframes start {
                0% {
                    -webkit-transform: translate(0, 10px);
                    -moz-transform: translate(0, 10px);
                    -ms-transform: translate(0, 10px);
                    -o-transform: translate(0, 10px);
                    transform: translate(0, 10px);
                }
                100% {
                    -webkit-transform: translate(0, -10px);
                    -moz-transform: translate(0, -10px);
                    -ms-transform: translate(0, -10px);
                    -o-transform: translate(0, -10px);
                    transform: translate(0, -10px);
                }
            }

            @-moz-keyframes start {
                0% {
                    -webkit-transform: translate(0, 10px);
                    -moz-transform: translate(0, 10px);
                    -ms-transform: translate(0, 10px);
                    -o-transform: translate(0, 10px);
                    transform: translate(0, 10px);
                }
                100% {
                    -webkit-transform: translate(0, -10px);
                    -moz-transform: translate(0, -10px);
                    -ms-transform: translate(0, -10px);
                    -o-transform: translate(0, -10px);
                    transform: translate(0, -10px);
                }
            }

            @keyframes start {
                0% {
                    -webkit-transform: translate(0, 10px);
                    -moz-transform: translate(0, 10px);
                    -ms-transform: translate(0, 10px);
                    -o-transform: translate(0, 10px);
                    transform: translate(0, 10px);
                }
                100% {
                    -webkit-transform: translate(0, -10px);
                    -moz-transform: translate(0, -10px);
                    -ms-transform: translate(0, -10px);
                    -o-transform: translate(0, -10px);
                    transform: translate(0, -10px);
                }
            }

            .top_left {
                position: relative;

                .top_left-img1 {
                    width: 280px;
                    position: absolute;
                    top: 100px;
                    left: 50%;
                    margin-left: -140px;
                    -webkit-animation: start .5s infinite alternate ease-in-out;
                    -o-animation: start .5s infinite alternate ease-in-out;
                    animation: start .5s infinite alternate ease-in-out;
                }

                .top_left-img2 {
                    width: 200px;
                    position: absolute;
                    bottom: 100px;
                    left: 20px;
                }

                .top_left-img3 {
                    width: 80px;
                    position: absolute;
                    bottom: 200px;
                    right: 20px;
                }

            }

            .top_right {
                position: relative;

                .top_right-img1 {
                    width: 260px;
                    position: absolute;
                    top: 120px;
                    left: 50%;
                    margin-left: -180px;
                    z-index: 1;
                    -webkit-animation: start .5s infinite alternate ease-in-out;
                    -o-animation: start .5s infinite alternate ease-in-out;
                    animation: start .5s infinite alternate ease-in-out;
                }

                .top_right-img2 {
                    width: 340px;
                    height: 100%;
                    position: absolute;
                    bottom: 6px;
                    right: 0;
                }
            }
        }

        .bottom {
            padding: 20px;
            background-color: @default-app-color-background;

            .bottom_nickname {
                font-size: 36px;
                color: @default-font-color-content;
                padding: 20px 0;

                span {

                    &:nth-of-type(2) {
                        color: @default-font-color-sub;
                    }
                }
            }

            .bottom_sulo {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-column-gap: 10px;
                margin-bottom: 20px;

                div {
                    font-size: 0;
                    position: relative;

                    img {
                        width: 100%;
                    }

                    .chang_active {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        background: rgba(0, 0, 0, .5);
                        display: grid;
                        justify-content: center;
                        align-content: center;

                        img {
                            width: 60px;
                        }
                    }
                }
            }

            .bottom_tack {
                margin-bottom: 20px;
            }

            .bottom_submit {
                text-align: center;
                padding: 10px 0;

                button {
                    font-size: 30px;
                    background-color: #ee4440;
                    padding: 20px 40px;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                    color: #fff;
                }
            }
        }
    }
</style>