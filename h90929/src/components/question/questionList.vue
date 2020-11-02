<template>
    <section class="questionList animated bounceIn">
        <ul class="questionList-list">
            <li class="questionList-list-item" v-for="(item,index) in questionResource.questionList" :key="index">
                <h2 class="questionList-list-item-title">
                    {{index+1}}.{{item.key}}
                </h2>
                <span class="questionList-list-item-val">
                    <span :class="valueIndex[index] === it.valid ? 'active' : ''" v-for="(it,ind) in item.val"
                          :key="ind"
                          @click="changeValue(index, it.valid,it.valnum, item.type)">
                        <img v-show="valueIndex[index] !== it.valid" src="../../assets/images/question/question-n.png"
                             alt="">
                        <img v-show="valueIndex[index] === it.valid" src="../../assets/images/question/question-y.png"
                             alt="">
                        {{it.val}}
                    </span>
                </span>
            </li>
        </ul>
    </section>
</template>

<script>
    import questionResource from '../../assets/questionResource/questionResource'
    import * as config from '../../../src/../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "questionList",
        data() {
            return {
                /**
                 * 题目
                 * */
                questionResource,
                /**
                 * 控制答案选择之后高亮
                 * */
                valueIndex: {},
                /**
                 * a / b / c 各组答案汇总
                 * */
                a: {},
                b: {},
                c: {},
                /**
                 * 随机串
                 * */
                randnum: Math.random(1)
            }
        },
        methods: {
            /**
             * 选择答案
             * */
            async changeValue(index, valid, valnum, type) {
                let that = this;

                /**
                 * 控制答案选择之后高亮
                 * */
                that.$set(that.valueIndex, index, valid);

                /**
                 * 设置每道题目的提交
                 * */
                await that.$store.dispatch('storageAnswerResult', {
                    im: config.requestInterface.storageanswerresult,
                    fps: {
                        'open_id': that.openidInfo.open_id,
                        'key': that.randnum,
                        'title_number': parseInt(index + 1),
                        'answer': valnum
                    },
                    url: config.CONST_FETCH_REQUEST_URI
                });

                console.log(`设置每道题目调教的状态：${that.storageAnswerResultInfo}`);

                if (that.storageAnswerResultInfo) {

                    /**
                     * 把每组答案传给上级，因为提交按钮不在此组件中
                     * 需要根据答题的个数，来控制提交按钮是否可以点击
                     * */
                    if (type === 'A') {
                        if (that.getQuestionSum(that.a, index, valnum)) {
                            let sum = that.getValSum(that.a);
                            that.$emit('aSingleVal', {
                                type: 'A',
                                sum: sum,
                                size: Array.from(Object.values(that.a)).length
                            });
                        }
                    }
                    if (type === 'B') {
                        if (that.getQuestionSum(that.b, index, valnum)) {
                            let sum = that.getValSum(that.b);
                            that.$emit('bSingleVal', {
                                type: 'B',
                                sum: sum,
                                size: Array.from(Object.values(that.b)).length
                            });
                        }
                    }
                    if (type === 'C') {
                        if (that.getQuestionSum(that.c, index, valnum)) {
                            let sum = that.getValSum(that.c);
                            that.$emit('cSingleVal', {
                                type: 'C',
                                sum: sum,
                                size: Array.from(Object.values(that.c)).length
                            });
                        }
                    }

                } else {
                    alert('设置每道题目的提交，出错')
                }

            },
            /**
             * 获取任意一组答案的和
             * */
            getValSum(i) {
                let valSum = 0;
                Array.from(Object.values(i)).forEach((item, index, arr) => {
                    valSum += parseInt(item)
                });
                return valSum;
            },
            /**
             * 获取每组是否打完3个题
             * */
            getQuestionSum(object, index, valnum) {
                object[index] = valnum;
                if (Array.from(Object.values(object)).length === 3) {
                    return true;
                }
            },
        },
        computed: {
            /**
             * 获取的问题集合
             * */
            ...mapGetters([
                'openidInfo',
                'storageAnswerResultInfo'
            ])
        }
    }
</script>

<style lang="less">

    #boxSizing {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    #relative {
        position: relative;
    }

    #absolute {
        position: absolute;
    }

    .active {
        color: #cda349 !important;
    }

    .questionList {
        #boxSizing;
        margin-bottom: 60px;

        > * {
            #boxSizing;
        }

        .questionList-list {

            .questionList-list-item {
                color: #fff;

                .questionList-list-item-title {
                    font-size: 32px;
                    padding: 10px 0px;
                }

                .questionList-list-item-val {
                    display: block;
                    overflow: hidden;
                    padding: 40px 0px;
                    text-align: center;

                    span {
                        display: inline-block;
                        width: 50%;
                        height: 50px;
                        line-height: 50px;
                        font-size: 30px;
                        font-weight: bold;

                        img {
                            width: 30px;
                            #relative;
                            top: -4px;
                        }
                    }
                }
            }
        }
    }
</style>
