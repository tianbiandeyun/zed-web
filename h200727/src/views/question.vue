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

        <!--<label>-->
        <!--<input type="radio" name="1" id="2" class="a-radio">-->
        <!--<span class="b-radio"></span>-->
        <!--<span style="font-size:40px">很棒</span>-->
        <!--</label>-->

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

                    </div>
                    <div class="select-item">

                    </div>
                    <div class="select-item">

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
                        font-size: @default-font-size-30;
                        font-weight: bold;
                        color: @default-font-color-title;
                        padding-left: 20px;
                    }
                }
            }

            .test-select {
                display: grid;
                background-color: #19be6b;

                .select {
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr;

                    .select-item {
                        border: 1px solid black;
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

        /*.a-radio {*/
        /*display: none;*/
        /*}*/

        /*.b-radio {*/
        /*display: inline-block;*/
        /*border: 1px solid #000;*/
        /*width: 100px;*/
        /*height: 100px;*/
        /*border-radius: 50%;*/
        /*vertical-align: middle;*/
        /*margin-right: 5px;*/
        /*position: relative;*/

        /*&:before {*/
        /*content: '';*/
        /*font-size: 0;*/
        /*width: 60px;*/
        /*height: 60px;*/
        /*background: rgb(143, 188, 238);*/
        /*position: absolute;*/
        /*left: 50%;*/
        /*top: 50%;*/
        /*margin-left: -30px;*/
        /*margin-top: -30px;*/
        /*border-radius: 50%;*/
        /*display: none;*/
        /*}*/
        /*}*/

        /*.a-radio:checked ~ .b-radio:before {*/
        /*display: block;*/
        /*}*/
    }
</style>