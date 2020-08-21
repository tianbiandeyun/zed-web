<template>

    <transition name="fade">

        <section class="alert-container" v-if="alert_show">

            <div class="alert-box">

                <!--title-->
                <div class="alert-box_title" v-if="titleShow">
                    <div class="alert-box_title__left">
                        <img src="../../assets/images/title-left.png" alt="">
                    </div>
                    <div class="alert-box_title__center">{{title}}</div>
                    <div class="alert-box_title__right">
                        <img src="../../assets/images/title-right.png" alt="">
                    </div>
                </div>

                <!--内容-->
                <div class="alert-box_content">
                    我是内容
                </div>

                <!--按钮-->
                <div class="alert-box_button" @click="_operat">
                    <button>{{confirmText}}</button>
                </div>

                <!--关闭-->
                <div class="alert-box_close" @click="_close">
                    <img src="../../assets/images/close.png" alt="">
                </div>

            </div>

        </section>

    </transition>
</template>

<script>
    export default {
        name: "alert",
        props: {
            titleShow: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: '标题'
            },
            confirmText: {
                type: String,
                default: '按钮'
            },
            operatFun: {
                type: Function,
                default: () => {
                    console.log('操作按钮')
                }
            }
        },
        data() {
            return {
                alert_show: false
            }
        },
        methods: {
            show() {
                if (this.alert_show === false) {
                    this.alert_show = true;
                }
            },
            _close() {
                if (this.alert_show) {
                    this.alert_show = false;
                }
            },
            _operat() {
                this.operatFun();
            }
        }
    }
</script>

<style lang="less" scoped>

    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: scale(1.5);
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s ease-in-out;
    }

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
                border-top-left-radius: @default-element-border-radius;
                border-top-right-radius: @default-element-border-radius;
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
                padding: 20px 0;
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
                width: 60px;
                position: absolute;
                bottom: -120px;
                left: 50%;
                margin-left: -30px;

                img {
                    width: 100%;
                }
            }
        }
    }
</style>