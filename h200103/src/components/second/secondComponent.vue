<template>
    <section class="secondComponent">
        <div>
            <img src="../../assets/images/2/top.png" alt="">
        </div>
        <div>
            <img src="../../assets/images/2/bottom.png" alt="">
        </div>
        <div class="second-text">
            <div class="text">
                <img src="../../assets/images/2/text.png" alt="">
            </div>
            <div class="button">
                <slot></slot>
            </div>
            <div class="name">
                <img src="../../assets/images/2/name.png" alt="">
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "secondComponent"
    }
</script>

<style lang="less">
    .secondComponent {
        height: 100%;
        font-size: 0;
        overflow: hidden;
        position: relative;
        div {
            img {
                width: 100%;
            }
        }
        .second-text {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            position: absolute;
            padding-top: 40px;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 800px;
            background: url("../../assets/images/2/textbg.png") no-repeat;
            background-size: 100% 100%;
            text-align: center;
            .text {
                img {
                    width: 70%;
                }
            }
            .button {
                position: absolute;
                bottom: 50px;
                left: 50%;
                margin-left: -150px;
            }
            .name {
                img {
                    width: 88%;
                }
            }
        }
    }
</style>