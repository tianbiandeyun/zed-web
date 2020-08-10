<template>
    <section class="question-container">

        <div class="top">
            <img src="../assets/images/test-top.png" alt="">
        </div>
        <div class="right">
            <img src="../assets/images/test-right.png" alt="">
        </div>
        <div class="left">
            <img src="../assets/images/test-bottom.png" alt="">
        </div>

    </section>
</template>

<script>
    export default {
        name: "question",
        data() {
            return {}
        },
        mounted() {
            this.$utils.setDocumentTitle('职业倾向测评');
            console.log(this.$config.TEST_QUESTION_LIST)
        }
    }
</script>

<style lang="less" scoped>
    .question-container {
        height: 100%;
        position: relative;

        .top {
            border: 1px solid black;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-size: 0;

            img {
                width: 100%;
            }
        }

        .right {
            border: 1px solid black;
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 0;

            img {
                width: 100%;
            }
        }

        .left {
            border: 1px solid black;
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 0;

            img {
                width: 100%;
            }
        }
    }
</style>