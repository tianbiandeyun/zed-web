<template>
    <section class="test-container">

        <div class="test-bg">
            <img src="../assets/images/test-bg.png" alt="">
        </div>

        <div class="test-btn">
            <button class="start-test">开始测试</button>
        </div>

        <div class="rules">规则</div>

    </section>
</template>

<script>
    export default {
        name: "test",
        mounted() {
            this.$utils.setDocumentTitle('职业倾向测评')
        }
    }
</script>

<style lang="less" scoped>

    .test-container {
        height: 100%;
        background-color: #002841;
        display: grid;
        justify-items: center;
        align-items: end;
        grid-template-rows: 5fr 1fr;

        .test-bg {
            width: 100%;
            text-align: center;

            img {
                width: 94%;
            }
        }

        .test-btn {
            width: 100%;
            padding-bottom: 30px;
            background-color: #fff;

            .start-test {
                width: 100%;
                height: 100px;
                background-color: #fff;
                text-align: center;
                line-height: 100px;
                font-size: @default-font-size-30;
                color: @default-font-color-content;
            }

        }

        .rules {
            background-color: #f4ca1e;
            width: 50px;
            font-size: @default-font-size-30;
            text-align: center;
            padding: 20px 0;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            position: fixed;
            top: 100px;
            right: 0;
            color: @default-font-color-content;
        }

    }

</style>