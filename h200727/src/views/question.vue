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
        <transition name="test">
            <section class="test-container" v-if="test_show" :key="item.index">

                <div class="test-title">
                    <div class="title">
                        <span class="title-index">{{item.index + 1}}</span>
                        <span class="title-content">{{item.title}}</span>
                    </div>
                </div>

                <!--选择答案-->
                <div class="test-select">
                    <div class="select">
                        <div class="select-item" v-for="(i,index) in item.result">
                            <label>
                                <input type="radio"
                                       v-model="val"
                                       :value="i.score"
                                       class="select-item-radio">
                                <span class="select-item-label"></span>
                                <span class="select-item-val">{{i.val}}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!--按钮-->
                <div class="test-submit">
                    <div class="test-submit-count">
                        {{item.index + 1}}/{{item.count}}
                    </div>
                    <div class="test-submit-operat">
                        <button class="prev"
                                v-if="item.index > 0 && item.index !== 14"
                                @click="prev">
                            上一题
                        </button>
                        <button class="next" @click="next">
                            {{item.index !== 14 ? '下一题' : '查看结果'}}
                        </button>
                    </div>
                </div>

            </section>
        </transition>

    </section>
</template>

<script>

    export default {
        name: "question",
        data() {
            return {
                test_show: false,
                val: '',
                index: 0,
                test_result: [],
            }
        },
        mounted() {
            this.$utils.setDocumentTitle('职业倾向测评');
            this.test_show = true;
        },
        methods: {
            prev() {
                this.index -= 1;

                if (this.test_result[this.index] !== undefined) {
                    this.val = this.test_result[this.index];
                }

            },
            next() {

                if (this.val === '') {
                    alert('请选择答案');
                    return false;
                }

                this.test_show = false;

                this.test_result.splice(this.index, 1, this.val)


                if (this.index < this.$config.TEST_QUESTION_LIST.length - 1) {
                    console.log(this.test_result)
                    this.index += 1;
                    this.val = '';
                }else{
                    this.val = '';
                    console.log(this.test_result)

                    // 1  0—2分
                    // 2  3—16分
                    // 3  17—23分

                 let a = this.test_result.reduce((total,num) => {
                        return total + num;
                    })

                    console.log(a);

                }

                this.test_show = true;
            }
        },
        computed: {
            item() {
                return this.$config.TEST_QUESTION_LIST[this.index];
            }
        }
    }
</script>

<style lang="less" scoped>

    .test-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .test-leave-to {
        opacity: 0;
        transform: translateX(-100%);
    }

    .test-enter-active {
        transition: all .6s ease-in-out;
    }

    .test-leave-active {
        transition: all .3s ease-out;
    }

    .question-container {
        position: relative;
        height: 100%;

        .top {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            font-size: 0;
            z-index: -1;

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
            z-index: -1;

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
            z-index: -1;

            img {
                width: 100%;
            }
        }

        .test-container {
            height: 100%;
            display: grid;
            grid-template-rows: 1fr 2fr 1.4fr;

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
                        padding-right: 20px;
                    }
                }
            }

            .test-select {
                display: grid;

                .select {
                    display: grid;
                    grid-template-rows: 1fr 1fr 1fr;
                    align-items: center;
                    padding: 0 100px 0 120px;

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
                    font-size: @default-font-size-36;
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

    }
</style>