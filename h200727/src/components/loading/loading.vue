<template>
    <section class="loading-container" v-if="show">
        <div class="loading">
            <div class="loading-animation">
                <span></span>
                <span></span>
            </div>
            <div class="loading-content">{{content}}</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "loading",
        props: {
            show: {
                type: Boolean,
                default: false
            },
            content: {
                type: String,
                default: '请稍后...'
            }
        }
    }
</script>

<style lang="less" scoped>
    .loading-container {
        background-color: rgba(000, 000, 000, .4);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        display: grid;
        width: 100%;
        height: 100%;
        justify-items: center;
        align-items: center;

        .loading {

            .loading-animation {
                height: 60px;
                text-align: center;

                span {
                    width: 6px;
                    height: 100%;
                    display: inline-block;
                    background: #fff;
                    /*infinite 标示循环执行*/
                    animation: mymove 1.2s infinite ease-in-out;
                    -webkit-animation: mymove 1.2s infinite ease-in-out;

                    &:nth-child(2) {
                        -webkit-animation-delay: -1.0s;
                        animation-delay: -1.0s;
                    }
                }
            }

            .loading-content {
                font-size: @default-font-size-28;
                line-height: 2;
                color: #fff;
            }
        }

    }

    @keyframes mymove {
        0% {
            transform: scaleY(0.4);
        }
        25% {
            transform: scaleY(1.0);
        }
        50% {
            transform: scaleY(0.4);
        }
        75% {
            transform: scaleY(0.4);
        }
        100% {
            transform: scaleY(0.4);
        }
    }

    @-webkit-keyframes mymove {
        0% {
            transform: scaleY(0.4);
        }
        25% {
            transform: scaleY(1.0);
        }
        50% {
            transform: scaleY(0.4);
        }
        75% {
            transform: scaleY(0.4);
        }
        100% {
            transform: scaleY(0.4);
        }
    }

</style>