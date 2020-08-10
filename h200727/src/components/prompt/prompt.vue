<template>
    <section class="prompt-container">
        <div class="prompt">
            <div class="prompt-title">标题</div>
            <div class="prompt-content">我一些内容我一些内容我一些内容我一些内容我一些内容我一些内容我一些内容</div>
            <div class="prompt-operat">
                <p class="fel">取消</p>
                <p class="com">确定</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "prompt"
    }
</script>

<style lang="less" scoped>
    .prompt-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(000, 000, 000, .8);
        display: grid;
        justify-items: center;
        align-items: center;
        z-index: 9999;
        color: @default-font-color-content;

        .prompt {
            width: 80%;
            background-color: #fff;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            display: grid;
            grid-template-rows: auto;
            text-align: center;
        }

        .prompt-title {
            border-bottom: 1px solid @default-font-color-sub;
            padding: 20px;
            font-size: @default-font-size-36;
        }

        .prompt-content {
            padding: 20px;
            font-size: @default-font-size-30;
            border-bottom: 1px solid @default-font-color-sub;
        }

        .prompt-operat {
            display: grid;
            grid-template-columns: 1fr 1fr;
            font-size: @default-font-size-30;

            .fel {
                padding: 20px 0;
                border-right: 1px solid @default-font-color-sub;
                color: @default-font-color-sub
            }

            .com {
                padding: 20px 0;
                color: @default-tip-color-success;
            }
        }
    }

</style>