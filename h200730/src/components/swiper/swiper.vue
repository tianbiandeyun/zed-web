<template>
    <section class="swiper-container">
        <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <SwipeItem>1</SwipeItem>
            <SwipeItem>2</SwipeItem>
            <SwipeItem>3</SwipeItem>
            <SwipeItem>4</SwipeItem>
        </Swipe>
    </section>
</template>

<script>
    import {Swipe, SwipeItem} from 'vant';

    export default {
        name: "swiper",
        components: {Swipe, SwipeItem},
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