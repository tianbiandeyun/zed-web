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

        <!--测试题-->
        <test-item :question="list[test_index]"></test-item>

    </section>
</template>

<script>
    import TestItem from '../components/test_item/test-item'

    export default {
        name: "question",
        components: {TestItem},
        data() {
            return {
                list: this.$config.TEST_QUESTION_LIST,
                test_index: 0
            }
        },
        mounted() {
            this.$utils.setDocumentTitle('职业倾向测评');
        }
    }
</script>

<style lang="less" scoped>
    .question-container {
        height: 100%;
        position: relative;

        .top {
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
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 0;
            width: 70px;

            img {
                width: 100%;
            }
        }

        .left {
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 0;
            width: 300px;

            img {
                width: 100%;
            }
        }

    }
</style>