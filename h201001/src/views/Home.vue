<template>
    <section class="home-container">

        <swiper :options="swiperOptions">

            <swiper-slide>
                <first-page></first-page>
            </swiper-slide>

            <swiper-slide>
                <second-page></second-page>
            </swiper-slide>

        </swiper>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import {swiperAnimateCache, swiperAnimate} from "../utils/swiper.animate1.0.3.min"
    import firstPage from '../components/firstPage'
    import secondPage from '../components/secondPage'

    export default {
        name: 'Home',
        components: {Swiper, SwiperSlide, firstPage, secondPage},
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
                        }
                    }
                }
            }
        },
        async mounted() {
            this.$Toast.loading({
                message: '请稍后...',
                forbidClick: true,
                duration: 0
            });

            await this.$store.dispatch('getOpenid', {
                im: this.$Config.PROJECT_INTERFACE.getopenid,
                url: this.$Config.REQUEST_URL
            });

            this.$store.dispatch('getUserInfo', {
                im: this.$Config.PROJECT_INTERFACE.getplayerinfo,
                fps: {
                    open_id: this.openid_info.back_value.open_id,
                },
                url: this.$Config.REQUEST_URL
            });

            this.$Toast.clear();
        },
        computed: {
            ...mapGetters([
                'openid_info'
            ])
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
            }
        }

    }
</style>
