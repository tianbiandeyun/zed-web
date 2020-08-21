<template>
    <section class="alert-container">

        <div class="alert-box">

            <div class="alert-box_title">
                <div class="alert-box_title__left">左</div>
                <div class="alert-box_title__center">中</div>
                <div class="alert-box_title__right">右</div>
            </div>

            <div class="alert-box_content">

            </div>

            <div class="alert-box_button">
                <button>点开放大看</button>
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

            .alert-box_title {
                background-color: @default-app-color-primary;
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: 60px;

                .alert-box_title__left {
                    text-align: right;
                }

                .alert-box_title__center {
                    text-align: center;
                }

                .alert-box_title__right {
                    text-align: left;
                }

            }

            .alert-box_content {
                border: 1px solid black;
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
        }
    }
</style>