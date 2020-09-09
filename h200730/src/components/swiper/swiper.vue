<template>
    <section class="swiper-container">
        <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <SwipeItem v-for="(item,index) in swiperList" :key="index">
                {{item.page_name}}
            </SwipeItem>
        </Swipe>
    </section>
</template>

<script>
    import {Swipe, SwipeItem} from 'vant';

    export default {
        name: "swiper",
        components: {Swipe, SwipeItem},
        props: {
            swiperList: {
                type: Array,
                default: () => {
                    return []
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .swiper-container {
        padding: 20px 40px;
        background-color: #fff;
        margin-bottom: 20px;

        .my-swipe {
            .van-swipe-item {
                height: 300px;
                text-align: center;
                line-height: 300px;
                color: #fff;
                background-color: #39a9ed;
            }
        }
    }
</style>