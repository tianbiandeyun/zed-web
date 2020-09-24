<template>
    <section class="second-page">

        <div class="top">

            <div class="top_left">

                <img class="top_left-img1" src="../assets/images/5.png" alt="">

                <img class="top_left-img2" src="../assets/images/8.png" alt="">

                <img class="top_left-img3" src="../assets/images/9.png" alt="">

            </div>

            <div class="top_right">

                <img class="top_right-img1" src="../assets/images/6.png" alt="">

                <img class="top_right-img2" src="../assets/images/7.png" alt="">

            </div>

        </div>

        <div class="bottom">

        </div>

    </section>
</template>

<script>
    export default {
        name: "secondPage"
    }
</script>

<style lang="less" scoped>
    .second-page {
        height: 100%;
        display: grid;
        grid-template-rows: repeat(2, 1fr);

        .top {
            background-image: url("../assets/images/10.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            @-webkit-keyframes start {
                0% {
                    -webkit-transform: translate(0, 10px);
                    -moz-transform: translate(0, 10px);
                    -ms-transform: translate(0, 10px);
                    -o-transform: translate(0, 10px);
                    transform: translate(0, 10px);
                }
                100% {
                    -webkit-transform: translate(0, -10px);
                    -moz-transform: translate(0, -10px);
                    -ms-transform: translate(0, -10px);
                    -o-transform: translate(0, -10px);
                    transform: translate(0, -10px);
                }
            }

            @-moz-keyframes start {
                0% {
                    -webkit-transform: translate(0, 10px);
                    -moz-transform: translate(0, 10px);
                    -ms-transform: translate(0, 10px);
                    -o-transform: translate(0, 10px);
                    transform: translate(0, 10px);
                }
                100% {
                    -webkit-transform: translate(0, -10px);
                    -moz-transform: translate(0, -10px);
                    -ms-transform: translate(0, -10px);
                    -o-transform: translate(0, -10px);
                    transform: translate(0, -10px);
                }
            }

            @keyframes start {
                0% {
                    -webkit-transform: translate(0, 10px);
                    -moz-transform: translate(0, 10px);
                    -ms-transform: translate(0, 10px);
                    -o-transform: translate(0, 10px);
                    transform: translate(0, 10px);
                }
                100% {
                    -webkit-transform: translate(0, -10px);
                    -moz-transform: translate(0, -10px);
                    -ms-transform: translate(0, -10px);
                    -o-transform: translate(0, -10px);
                    transform: translate(0, -10px);
                }
            }

            .top_left {
                position: relative;

                .top_left-img1 {
                    width: 280px;
                    position: absolute;
                    top: 100px;
                    left: 50%;
                    margin-left: -140px;
                    -webkit-animation: start .5s infinite alternate ease-in-out;
                    -o-animation: start .5s infinite alternate ease-in-out;
                    animation: start .5s infinite alternate ease-in-out;
                }

                .top_left-img2 {
                    width: 200px;
                    position: absolute;
                    bottom: 100px;
                    left: 20px;
                }

                .top_left-img3 {
                    width: 80px;
                    position: absolute;
                    bottom: 200px;
                    right: 20px;
                }

            }

            .top_right {
                position: relative;

                .top_right-img1 {
                    width: 260px;
                    position: absolute;
                    top: 120px;
                    left: 50%;
                    margin-left: -180px;
                    z-index: 1;
                    -webkit-animation: start .5s infinite alternate ease-in-out;
                    -o-animation: start .5s infinite alternate ease-in-out;
                    animation: start .5s infinite alternate ease-in-out;
                }

                .top_right-img2 {
                    width: 340px;
                    height: 100%;
                    position: absolute;
                    bottom: 6px;
                    right: 0;
                }
            }
        }

        .bottom {

        }
    }
</style>