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

        <div class="test-container">
            <div class="test-title">
                <div class="title">
                    <span class="title-index">01</span>
                    <span class="title-content">如果有三种职业摆在你的面前？</span>
                </div>
            </div>
            <div class="test-select">
                <div class="select">
                    <div class="select-item">
                        <label>
                            <input type="radio" name="1" class="select-item-radio">
                            <span class="select-item-label"></span>
                            <span class="select-item-val">很棒</span>
                        </label>
                    </div>
                    <div class="select-item">
                        <label>
                            <input type="radio" name="1" class="select-item-radio">
                            <span class="select-item-label"></span>
                            <span class="select-item-val">很棒</span>
                        </label>
                    </div>
                    <div class="select-item">
                        <label>
                            <input type="radio" name="1" class="select-item-radio">
                            <span class="select-item-label"></span>
                            <span class="select-item-val">很棒</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="test-submit"></div>
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

        .test-container {
            height: 100%;
            display: grid;
            grid-template-rows: 1fr 2fr 1fr;

            .test-title {
                display: grid;
                align-items: end;

                .title {

                    .title-index {
                        float: left;
                        display: inline-block;
                        width: 110px;
                        height: 90px;
                        background-color: #e70012;
                        color: #fff;
                        line-height: 90px;
                        text-align: right;
                        font-size: @default-font-size-36;
                        font-weight: bold;
                        padding-right: 10px;
                    }
                    .title-content {
                        display: table-cell;
                        vertical-align: middle;
                        height: 90px;
                        font-size: @default-font-size-36;
                        font-weight: bold;
                        color: @default-font-color-title;
                        padding-left: 20px;
                    }
                }
            }

            .test-select {
                display: grid;

                .select {
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr;
                    align-items: center;
                    padding-left: 120px;

                    .select-item {
                        border-bottom: 1px solid @default-font-color-sub;
                        padding-bottom: 20px;

                        .select-item-radio {
                            display: none;
                        }

                        .select-item-label {
                            display: inline-block;
                            border: 1px solid @default-font-color-content;
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                            vertical-align: middle;
                            margin-right: 20px;
                            position: relative;

                            &:before {
                                content: '';
                                font-size: 0;
                                width: 20px;
                                height: 20px;
                                background-color: #000;
                                position: absolute;
                                left: 50%;
                                top: 50%;
                                margin-left: -10px;
                                margin-top: -10px;
                                border-radius: 50%;
                                display: none;
                            }
                        }

                        .select-item-radio:checked ~ .select-item-label:before {
                            display: block;
                        }

                        .select-item-val {
                            font-size: @default-font-size-36;
                            position: relative;
                            top: 4px;
                            color: @default-font-color-content;
                        }
                    }
                }
            }

            .test-submit {
                display: grid;
                background-color: #808695;
            }

        }

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