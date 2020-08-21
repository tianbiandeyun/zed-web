<template>
    <section class="alert-container">

        <div class="alert-box">

            <!--title-->
            <div class="alert-box_title">
                <div class="alert-box_title__left">
                    <img src="../../assets/images/title-left.png" alt="">
                </div>
                <div class="alert-box_title__center">签到成功</div>
                <div class="alert-box_title__right">
                    <img src="../../assets/images/title-right.png" alt="">
                </div>
            </div>

            <!--内容-->
            <div class="alert-box_content">
                我是内容
            </div>

            <!--按钮-->
            <div class="alert-box_button">
                <button>点开放大看</button>
            </div>

            <!--关闭-->
            <div class="alert-box_close">
                <img src="../../assets/images/close.png" alt="">
            </div>

        </div>

    </section>
</template>

<script>
    export default {
        name: "alert"
    }
</script>

<style lang="less" scoped>
    .alert-container {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .6);
        display: grid;
        justify-content: center;
        align-content: center;

        .alert-box {
            background-color: #fff;
            -webkit-border-radius: @default-element-border-radius;
            -moz-border-radius: @default-element-border-radius;
            border-radius: @default-element-border-radius;
            position: relative;

            .alert-box_title {
                background-color: @default-app-color-primary;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: 120px;

                .alert-box_title__left, .alert-box_title__center, .alert-box_title__right {
                    display: grid;
                    align-items: center;
                }

                .alert-box_title__left {
                    justify-items: right;

                    img {
                        width: 80px;
                    }
                }

                .alert-box_title__center {
                    justify-items: center;
                    font-size: @default-font-size-30;
                    color: #fff;

                }

                .alert-box_title__right {
                    justify-items: left;

                    img {
                        width: 80px;
                    }
                }

            }

            .alert-box_content {
                border: 1px solid black;
                text-align: center;
            }

            .alert-box_button {
                width: 600px;
                text-align: center;
                padding: 20px 0 40px 0;

                button {
                    color: #FFF;
                    font-size: @default-font-size-30;
                    background-color: @default-app-color-primary;
                    padding: 20px 40px;
                    -webkit-border-radius: @default-element-border-radius;
                    -moz-border-radius: @default-element-border-radius;
                    border-radius: @default-element-border-radius;
                }
            }

            .alert-box_close {
                width: 80px;
                position: absolute;
                bottom: -140px;
                left: 50%;
                margin-left: -40px;

                img {
                    width: 100%;
                }
            }
        }
    }
</style>