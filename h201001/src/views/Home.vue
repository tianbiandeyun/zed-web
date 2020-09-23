<template>
    <section class="home-container">

        <swiper :options="swiperOptions" ref="mySwiper">
            <swiper-slide>

                <p
                        class="ani"
                        swiper-animate-effect="animate__fadeInUp"
                        swiper-animate-duration=".5s"
                        swiper-animate-delay="0s">
                    内容
                </p>

                <p
                        class="ani"
                        swiper-animate-effect="animate__bounce"
                        swiper-animate-duration="1s"
                        swiper-animate-delay=".5s">
                    内容
                </p>

            </swiper-slide>

            <swiper-slide>
                2
            </swiper-slide>

            <swiper-slide>
                3
            </swiper-slide>

        </swiper>

    </section>
</template>

<script>
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
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
                        // 页面过度到下一个 / 页面过度到下一个
                        slideChangeTransitionStart() {
                            console.log('页面过度到下一个')
                        },
                        slideChangeTransitionEnd() {
                            console.log('页面过度到下一个')
                            swiperAnimate(this); //初始化完成开始动画
                        },
                        // 页面滑动开始 / 滑动结束
                        transitionStart() {
                            console.log('页面滑动开始')
                        },
                        transitionEnd() {
                            console.log('滑动结束')
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

</style>
