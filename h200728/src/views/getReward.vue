<template>
    <section class="get_reward-container">

        <!--轮播-->
        <div class="get_reward_swiper">
            <Swipe class="swiper" :autoplay="3000" indicator-color="white">
                <SwipeItem>1</SwipeItem>
                <SwipeItem>2</SwipeItem>
                <SwipeItem>3</SwipeItem>
                <SwipeItem>4</SwipeItem>
            </Swipe>
        </div>



    </section>
</template>

<script>
    import {Swipe, SwipeItem} from 'vant';

    export default {
        name: "get_reward",
        components: {Swipe, SwipeItem}
    }
</script>

<style lang="less" scoped>

    .get_reward-container {

        .get_reward_swiper {

            .swiper {

                .van-swipe-item {
                    color: #fff;
                    font-size: 20px;
                    line-height: 340px;
                    text-align: center;
                    background-color: #39a9ed;
                }
            }
        }
    }


</style>