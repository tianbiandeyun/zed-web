<template>
    <section class="home-container">
        <p class="animate__animated animate__pulse">Example</p>
    </section>
</template>

<script>
    import {swiperAnimateCache, swiperAnimate} from "../utils/swiper.animate1.0.3.min"

    export default {
        name: 'Home',
        components: {},
        mounted() {
        }
    }
</script>
<style lang="less" scoped>
    .home-container {
        p {
            font-size: 50px;
        }
    }
</style>
