<template>
    <section class="office-item-container">
        <div class="office-item-title">
            <p class="office">我是一个职位</p>
            <p class="money">我是薪水</p>
        </div>
        <div class="office-item-details">
            <p class="details">
                <span>你好我是标签</span>
                <span>你好我是标签</span>
                <span>你好我是标签</span>
            </p>
            <slot>
                <p class="position">
                    我是位置
                </p>
            </slot>
        </div>
    </section>
</template>

<script>

    export default {
        name: "office_item"
    }
</script>

<style lang="less" scoped>
    .office-item-container {
        background-color: #fff;
        padding: 10px 40px;
        margin-bottom: 20px;

        .office-item-title {
            display: grid;
            grid-template-columns: 3fr 1fr;
            font-size: @default-font-size-34;
            color: @default-font-color-content;
            line-height: 2;

            .office {
            }

            .money {
                color: @default-app-color-primary;
                text-align: right;
            }
        }

        .office-item-details {
            font-size: @default-font-size-26;
            color: @default-font-color-sub;
            line-height: 2;

            .details {

                span {

                    &:after {
                        content: '';
                        height: 10px;
                        border-right: 2px solid @default-font-color-sub;
                        margin: 0 5px;
                    }
                }
            }
        }
    }
</style>