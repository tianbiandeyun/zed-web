<template>
    <section class="threeComponent">
        <div class="three-feiji">
            <div class="title">
                <img src="../../assets/images/3/title.png" alt="">
            </div>
            <div class="rule">
                <img src="../../assets/images/3/rule.png" alt="">
            </div>
            <div class="map">
                <img src="../../assets/images/3/map.png" alt="">
            </div>
            <div class="three-btn">
                <slot></slot>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "threeComponent"
    }
</script>

<style lang="less">
    .threeComponent {
        height: 100%;
        background: url("../../assets/images/3/bg.png") no-repeat;
        background-size: 100% 100%;
        .three-feiji {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            background: url("../../assets/images/3/logo.png") no-repeat;
            background-size: 100% 100%;
            position: relative;

            .title {
                text-align: right;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 100px 100px 0px 0px;

                img {
                    width: 60%;
                }
            }
            .rule {
                position: absolute;
                left: 140px;
                bottom: 440px;

                img {
                    width: 440px;
                }
            }
            .map {
                position: absolute;
                right: 0px;
                bottom: 300px;
                width: 100%;
                text-align: right;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                padding: 60px 60px 0px 0px;

                img {
                    width: 40%;

                }
            }
            .three-btn {
                position: absolute;
                bottom: 80px;
                left: 50%;
                margin-left: -150px;
            }
        }
    }
</style>