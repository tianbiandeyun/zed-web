<template>
    <section class="question-container" v-if="page_show">

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
        <transition :name="animationend">
            <section class="test-container" :key="item.index">

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


        <loading :show="loading_isShow"></loading>

    </section>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "question",
        data() {
            return {
                page_show: false,
                loading_isShow: true,
                val: '',
                index: 0,
                test_result: [],
                animationend: ''
            }
        },
        mounted() {
            this.$utils.setDocumentTitle('职业倾向测评');

            // 获取 答题结果 如果有则跳转答题结果
            this.$store.dispatch('_getQuestionResult', {
                im: this.$config.PROJECT_INTERFACE.get_answer_record,
                fps: {
                    open_id: this.getOpenid_info.back_value.open_id,
                },
                url: this.$config.REQUEST_URL
            }).then(res => {
                if (res.back_value) {
                    this.loading_isShow = false;
                    this.$router.replace('/result')
                } else {
                    this.page_show = true;
                    this.loading_isShow = false;
                }
            })
        },
        methods: {
            prev() {

                this.animationend = 'toRight';

                this.index -= 1;

                if (this.test_result[this.index] !== undefined) {
                    this.val = this.test_result[this.index];
                }

            },
            next() {

                this.loading_isShow = true;
                this.animationend = 'toLeft';

                if (this.val === '') {
                    alert('请选择答案');
                    this.loading_isShow = false;
                    return false;
                }

                this.test_result.splice(this.index, 1, this.val);

                if (this.index < this.$config.TEST_QUESTION_LIST.length - 1) {
                    this.loading_isShow = false;
                    console.log(this.test_result);
                    this.index += 1;
                    this.val = '';
                } else {

                    // 去除 没有分数的题目
                    for (let i = 0; i < this.test_result.length; i++) {
                        if (typeof this.test_result[i] === 'string') {
                            this.test_result.splice(i, 1)
                        }
                    }

                    // 结果求和
                    let sum = this.test_result.reduce((total, num) => {
                        return total + num;
                    });

                    console.log(sum);

                    this.$store.dispatch('_setQuestionResult', {
                        im: this.$config.PROJECT_INTERFACE.set_answer_record,
                        fps: {
                            open_id: this.getOpenid_info.back_value.open_id,
                            answer: sum
                        },
                        url: this.$config.REQUEST_URL
                    }).then(res => {
                        if (res.back_value) {
                            setTimeout(() => {
                                this.loading_isShow = false;
                                this.$router.replace('/result')
                            }, 1000)
                        }
                    })

                }

            }
        },
        computed: {
            ...mapGetters([
                'getOpenid_info'
            ]),
            item() {
                return this.$config.TEST_QUESTION_LIST[this.index];
            }
        }
    }
</script>

<style lang="less" scoped>

    .toLeft-enter {
        opacity: 0;
        transform: translateX(100%);
    }

    .toLeft-leave-to {
        opacity: 0;
        transform: translateX(-100%);
    }

    .toRight-enter {
        opacity: 0;
        transform: translateX(-100%);
    }

    .toRight-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }

    .toLeft-enter-active, .toRight-enter-active {
        transition: all .6s ease-in-out;
    }

    .toLeft-leave-active, .toRight-leave-active {
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