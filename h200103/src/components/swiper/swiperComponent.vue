<template>
    <section class="swiperComponent">
        <c-frist>
            <c-button></c-button>
        </c-frist>
    </section>
</template>

<script>
    import cFrist from '../frist/fristComponent'
<<<<<<< HEAD
    // import cSecond from '../second/secondComponent'
    // import cThree from '../three/threeComponent'
=======
>>>>>>> master
    import cButton from '../button/buttonComponent'

    export default {
        name: "swiperComponent",
        components: {cFrist, cButton},
        data() {
            return {
                swiperOption: {
                    speed: 800,
                    notNextTick: true,
                    loop: false,//循环
                    effect: "slide", // 设置轮播
                    direction: "vertical",//滑动方向
                }
            };
        }
    };
</script>
<style lang="less">
    .swiperComponent,
    .scroll,
    .scrollBox,
    .scroll-item {
        height: 100%;
    }

    .swiperComponent {
        background-color: #25a4bb;
    }
</style>
