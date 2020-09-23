<template>
    <section class="home-container">

        <swiper :options="swiperOptions">

            <swiper-slide>
                <div class="first-page">

                    <div class="first-page_title">
                        <span>中 秋 节</span> | <span>国 庆 节</span> | <span>建 党 99 周 年</span>
                    </div>

                    <div class="first-page_content">
                        <p
                                class="ani"
                                swiper-animate-effect="animate__fadeInUpBig"
                                swiper-animate-duration="1s"
                                swiper-animate-delay="0s">五星红旗迎风飘扬</p>
                        <p
                                class="ani"
                                swiper-animate-effect="animate__fadeInUpBig"
                                swiper-animate-duration="1s"
                                swiper-animate-delay="1s">胜利歌声多么响亮</p>
                        <p
                                class="ani"
                                swiper-animate-effect="animate__fadeInUpBig"
                                swiper-animate-duration="1s"
                                swiper-animate-delay="2s">歌唱我们亲爱的祖国</p>
                        <p
                                class="ani"
                                swiper-animate-effect="animate__fadeInUpBig"
                                swiper-animate-duration="1s"
                                swiper-animate-delay="3s">从今走向繁荣富强</p>
                        <p
                                class="ani"
                                swiper-animate-effect="animate__fadeInUpBig"
                                swiper-animate-duration="1s"
                                swiper-animate-delay="4s">... ...</p>
                    </div>

                    <img class="lantern" src="../assets/images/1.png" alt="灯笼">

                    <img class="cloud-right" src="../assets/images/2.png" alt="云">

                    <img class="cloud-left" src="../assets/images/3.png" alt="云">

                    <img class="country" src="../assets/images/4.png" alt="天安门">

                </div>
            </swiper-slide>

            <swiper-slide>
                2
            </swiper-slide>

        </swiper>

    </section>
</template>

<script>
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import {swiperAnimateCache, swiperAnimate} from "../utils/swiper.animate1.0.3.min"

    export default {
        name: 'Home',
        components: {Swiper, SwiperSlide},
        data() {
            return {
                swiperOptions: {
                    direction: 'vertical',
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    on: {
                        init() {
                            swiperAnimateCache(this); //隐藏动画元素
                            swiperAnimate(this); //初始化完成开始动画
                        },
                        slideChangeTransitionEnd() {
                            swiperAnimate(this); //初始化完成开始动画
                        },
                        transitionEnd() {
                            swiperAnimate(this); //初始化完成开始动画
                        },
                    }
                }
            }
        },
        mounted() {
        }
    }
</script>
<style lang="less" scoped>
    .home-container {
        height: 100%;

        .swiper-container {
            height: 100%;
            --swiper-theme-color: #ff6600;
            --swiper-pagination-color: #000; /* 两种都可以 */

            .swiper-slide {
                height: 100%;

                .first-page {
                    height: 100%;
                    background-color: #ee4440;
                    overflow: hidden;
                    position: relative;

                    .first-page_title {
                        font-size: 20px;
                        color: #ffe478;
                        line-height: 4;
                        text-align: center;
                    }

                    .first-page_content {
                        width: 100%;
                        position: absolute;
                        top: 300px;

                        p {
                            font-size: 40px;
                            color: #ffe478;
                            text-align: center;
                            line-height: 3.2;
                        }
                    }

                    .lantern {
                        width: 90px;
                        position: absolute;
                        top: -122px;
                        left: 80px;
                    }

                    .cloud-right {
                        width: 200px;
                        position: absolute;
                        top: 200px;
                        right: 0;
                    }

                    .cloud-left {
                        width: 200px;
                        position: absolute;
                        bottom: 300px;
                        left: 0;
                    }

                    .country {
                        width: 500px;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        margin-left: -250px;
                    }
                }
            }
        }

    }
</style>
