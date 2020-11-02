<template>
    <section class="question">

        <!--页头-->
        <div class="question-header animated bounceIn">
            <span class="question-header-left">
                <img src="../assets/images/index/logo.png" alt="">
            </span>
            <span class="question-header-right">
            </span>
        </div>

        <!--测试介绍-->
        <div class="question-guild animated bounceIn">
            <p>每个人的人格里，都隐藏着黑暗面，只是有的人擅长控制，有些人容易释放。</p>
            <p>这个黑暗面心理学上称之为 " 黑暗三角 "，分别是马基雅维利主义、自恋和精神病态。</p>
            <p>黑暗三角并非一无是处，有时它散发着蜜糖般香气，黑暗却诱人。那些我们熟知的银幕英雄，如：钢铁侠、蝙蝠侠、詹姆斯邦德...都具有黑暗人格典型作风，他们冷酷大胆、善于伪装，却有迷之魅力</p>
            <p>有时黑暗特质能助力我们成功，比如权谋者更爱表现出领导力和决断力；自恋者常常很自信，爱挑战自己；精神病态则会有不拖泥带水、对事不对人的特质。而这些都是助人成功的潜在因子。</p>
            <p>那么你人格的黑暗面有多大？</p>
        </div>

        <!--题目列表-->
        <question-list @aSingleVal="listeraSingleVal" @bSingleVal="listerbSingleVal"
                       @cSingleVal="listercSingleVal"></question-list>

        <!--提交结果-->
        <!--<button class="question-submit animated bounceIn" :class="valSum ? '' : 'question-submit-yes'"-->
        <!--@click="submit" :disabled="valSum">-->
        <!--查看测试结果-->
        <!--</button>-->

        <button class="question-submit animated bounceIn" @click="submit">
            查看测试结果
        </button>

    </section>
</template>

<script>
    import questionList from '../components/question/questionList'
    import * as config from '../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "question",
        components: {
            questionList
        },
        data() {
            return {
                /**
                 * 选择的每组答案
                 * */
                a: '',
                b: '',
                c: ''
            }
        },
        created() {
            let that = this;
        },
        mounted() {
            /**
             * 安卓 屏蔽分享
             * */
            wx.ready(() => {
                wx.hideOptionMenu();
            });
        },
        methods: {
            /**
             * 选择的每组答案，通过题目列表（questionList）传递出来的
             * */
            listeraSingleVal(data) {
                let that = this;
                that.a = data;
            },
            listerbSingleVal(data) {
                let that = this;
                that.b = data;
            },
            listercSingleVal(data) {
                let that = this;
                that.c = data;
            },
            /**
             * 提交
             * */
            async submit() {
                let that = this;
                that.$showLoading();
                if (9 === that.a.size + that.b.size + that.c.size) {
                    let data = {};
                    data[that.a.type] = that.a.sum;
                    data[that.b.type] = that.b.sum;
                    data[that.c.type] = that.c.sum;
                    console.log(`各组答案`);
                    console.log(data);
                    /**
                     * 最终答案
                     * */
                    let result = that.getResult(data);
                    console.log(`设置最终结果：${result}`);

                    /**
                     * 设置最终结果
                     * */
                    await that.$store.dispatch('setFinalResult', {
                        im: config.requestInterface.setfinalresult,
                        fps: {
                            'open_id': that.openidInfo.open_id,
                            'answer': result
                        },
                        url: config.CONST_FETCH_REQUEST_URI
                    });

                    console.log(`设置最终结果状态：${that.setFinalResultInfo}`);

                    if (that.setFinalResultInfo) {
                        that.$hideLoading();
                        that.$router.replace({name: 'result'})
                        // that.$router.push({name: 'result'});
                    }
                } else {
                    that.$hideLoading();
                    alert('请完成所有题目的作答后再进行提交！')
                }

            },
            /**
             * 获取最终答案
             * */
            getResult(data) {
                let string = '';

                // 提取值，转为数组
                let result = Array.from(Object.values(data));

                // 获取数组最小值
                let min = Math.min(...result);

                // 获取数组最大值
                let max = Math.max(...result);

                if (max === min) {
                    return 'AB'
                } else {
                    for (let k in data) {
                        if (data[k] === max) {
                            string += k
                        }
                    }
                    return string
                }
            }
        },
        computed: {
            /**
             * 是否能提交
             * true 不能 / false 能
             * */
            // valSum() {
            //     let that = this;
            //     if (9 === that.a.size + that.b.size + that.c.size) {
            //         return false
            //     }
            //     return true
            // },
            /**
             * 获取的问题集合
             * */
            ...mapGetters([
                'openidInfo',
                'setFinalResultInfo'
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

    .question {
        #boxSizing;
        #relative;
        background: url("../../src/assets/images/question/question-background-img.png") no-repeat;
        background-size: 100% 100%;
        padding: 0px 40px;

        .question-header {
            #boxSizing;
            height: 90px;
            overflow: hidden;
            line-height: 90px;
            margin-bottom: 40px;

            .question-header-left {
                float: left;

                img {
                    width: 160px;
                }
            }

            .question-header-right {
                float: right;
            }
        }

        .question-guild {
            p {
                color: #fff;
                font-size: 28px;
                line-height: 1.4;
                margin-bottom: 40px;

                &:last-child {
                    margin-bottom: 80px;
                }
            }
        }

        .question-submit {
            -webkit-border-radius: 20px;
            -moz-border-radius: 20px;
            border-radius: 20px;
            background-color: transparent;
            display: block;
            margin: 0 auto;
            #boxSizing;
            padding: 10px;
            margin-bottom: 60px;
            width: 400px;
            height: 100px;
            font-weight: bold;
            font-size: 40px;
            border: 4px solid #cda349;
            color: #cda349;
        }
    }
</style>
