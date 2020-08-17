<template>
    <section class="test-container">

        <div class="test-bg">
            <img src="../assets/images/test-bg.png" alt="">
        </div>

        <div class="test-btn">
            <button class="start-test" @click="goTest">开始测试</button>
        </div>

        <div class="rules" @click="goRules">规则</div>

    </section>
</template>

<script>
    export default {
        name: "test",
        mounted() {
            this.$utils.setDocumentTitle('职业倾向测评')
        },
        methods: {
            goTest() {
                this.$router.push('/question')
            },
            goRules() {
                this.$router.push('/rules')
            }
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
            padding-top: 20px;

            img {
                width: 680px;
            }
        }

        .test-btn {
            width: 100%;
            background-color: #fff;

            .start-test {
                width: 100%;
                height: 100px;
                background-color: red;
                text-align: center;
                line-height: 100px;
                font-size: @default-font-size-30;
                color: #fff;
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