<template>
    <section class="swiper-container">
        <div class="banner">
            <img :src="img" alt="">
        </div>

        <div class="banner-message">
            <p>今日热招</p>
            <p>个人信息越完善，得到的岗位机会越多</p>
        </div>
    </section>
</template>

<script>

    export default {
        name: "swiper",
        props: {
            img: {
                type: String
            }
        }
    }
</script>

<style lang="less" scoped>
    .swiper-container {
        padding: 20px 40px;
        background-color: #fff;
        margin-bottom: 20px;

        .banner {
            margin-bottom: 20px;
            font-size: 0;

            img {
                width: 100%;
            }
        }

        .banner-message {

            p {
                &:nth-of-type(1) {
                    color: @default-app-color-primary;
                    font-size: @default-font-size-34;
                }

                &:nth-of-type(2) {
                    font-size: @default-font-size-26;
                    color: @default-font-color-sub;
                    line-height: 1.4;
                }
            }
        }

    }
</style>