<template>
    <section class="test-container">
        <div class="test-title">
            <div class="title">
                <span class="title-index">{{question.index}}</span>
                <span class="title-content">{{question.title}}</span>
            </div>
        </div>
        <div class="test-select">
            <div class="select">
                <div class="select-item" v-for="(item,index) in question.result">
                    <label>
                        <input type="radio" name="1" :value="item.score" class="select-item-radio">
                        <span class="select-item-label"></span>
                        <span class="select-item-val">{{item.val}}</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="test-submit">
            <div class="test-submit-count">
                2/15
            </div>
            <div class="test-submit-operat">
                <button class="prev">上一题</button>
                <button class="next">下一题</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "test-item",
        props: {
            question: {
                type: Object
            }
        }
    }
</script>

<style lang="less" scoped>
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

            .test-submit-count {
                text-align: center;
                font-size: @default-font-size-28;
                line-height: 2;
                margin-bottom: 20px;
            }

            .test-submit-operat {
                display: flex;
                justify-content: center;

                .prev {
                    border: 2px solid black;
                    width: 240px;
                    height: 80px;
                    font-size: @default-font-size-36;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                }

                .next {
                    border: 1px solid red;
                    background-color: red;
                    width: 240px;
                    height: 80px;
                    margin-left: 20px;
                    font-size: @default-font-size-36;
                    -webkit-border-radius: 10px;
                    -moz-border-radius: 10px;
                    border-radius: 10px;
                    color: #fff;
                }
            }
        }

    }
</style>