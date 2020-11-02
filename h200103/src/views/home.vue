<template>
    <section class="home">
        <c-swiper></c-swiper>
    </section>
</template>

<script>
    import cSwiper from "../components/swiper/swiperComponent";
    import share from '../components/shareClass/share'

    export default {
        name: "home",
        components: {cSwiper},
        mixins: [share]
    };
</script>
<style lang="less">
    .home {
        height: 100%;
    }
</style>
