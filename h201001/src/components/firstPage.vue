<template>
    <section class="first-page">

        <div class="first-page_title ani"
             swiper-animate-effect="animate__zoomIn"
             swiper-animate-duration="1s"
             swiper-animate-delay="0s">
            <span>中 秋 节</span> | <span>国 庆 节</span> | <span>建 党 99 周 年</span>
        </div>

        <div class="first-page_content">
            <p
                    class="ani"
                    swiper-animate-effect="animate__zoomIn"
                    swiper-animate-duration="1s"
                    swiper-animate-delay="0s">五星红旗迎风飘扬</p>
            <p
                    class="ani"
                    swiper-animate-effect="animate__zoomIn"
                    swiper-animate-duration="1s"
                    swiper-animate-delay="0s">胜利歌声多么响亮</p>
            <p
                    class="ani"
                    swiper-animate-effect="animate__zoomIn"
                    swiper-animate-duration="1s"
                    swiper-animate-delay="0s">歌唱我们亲爱的祖国</p>
            <p
                    class="ani"
                    swiper-animate-effect="animate__zoomIn"
                    swiper-animate-duration="1s"
                    swiper-animate-delay="0s">从今走向繁荣富强</p>
            <p
                    class="ani"
                    swiper-animate-effect="animate__zoomIn"
                    swiper-animate-duration="1s"
                    swiper-animate-delay="0s">... ...</p>
        </div>

        <img class="lantern ani"
             swiper-animate-effect="animate__zoomIn"
             swiper-animate-duration="1s"
             swiper-animate-delay="0s" src="../assets/images/1.png" alt="灯笼">

        <img class="cloud-right ani"
             swiper-animate-effect="animate__zoomIn"
             swiper-animate-duration="1s"
             swiper-animate-delay="0s" src="../assets/images/2.png" alt="云">

        <img class="cloud-left ani"
             swiper-animate-effect="animate__zoomIn"
             swiper-animate-duration="1s"
             swiper-animate-delay="0s" src="../assets/images/3.png" alt="云">

        <img class="country ani"
             swiper-animate-effect="animate__zoomIn"
             swiper-animate-duration="1s"
             swiper-animate-delay="0s" src="../assets/images/4.png" alt="天安门">

        <img src="../assets/images/arrow.png" class="array">

    </section>
</template>

<script>

    export default {
        name: "firstPage"
    }
</script>

<style lang="less" scoped>
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

        @-webkit-keyframes start {
            0%, 30% {
                opacity: 0;
                -webkit-transform: translate(0, 10px);
            }
            60% {
                opacity: 1;
                -webkit-transform: translate(0, 0);
            }
            100% {
                opacity: 0;
                -webkit-transform: translate(0, -8px);
            }
        }

        @-moz-keyframes start {
            0%, 30% {
                opacity: 0;
                -moz-transform: translate(0, 10px);
            }
            60% {
                opacity: 1;
                -moz-transform: translate(0, 0);
            }
            100% {
                opacity: 0;
                -moz-transform: translate(0, -8px);
            }
        }

        @keyframes start {
            0%, 30% {
                opacity: 0;
                transform: translate(0, 10px);
            }
            60% {
                opacity: 1;
                transform: translate(0, 0);
            }
            100% {
                opacity: 0;
                transform: translate(0, -8px);
            }
        }

        .array {
            position: absolute;
            width: 60px;
            height: 60px;
            bottom: 20px;
            left: 50%;
            margin-left: -30px;
            z-index: 999;
            -webkit-animation: start 1.5s infinite ease-in-out;
            -o-animation: start 1.5s infinite ease-in-out;
            animation: start 1.5s infinite ease-in-out;
        }
    }
</style>