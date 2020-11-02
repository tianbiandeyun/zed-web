<template>
    <section class="rule">
        <div class="rule-main">
            <div class="rule-main-message animated bounceIn">
                <img @click="close" class="rule-main-message-close" src="../../assets/images/index/index-close.png"
                     alt="">
                <div class="rule-main-message-font">
                    <p>规则说明：</p>
                    <p>1.本测评将从马基雅维利主义、自恋人格和精神病态三大心理维度，解析你内心的黑暗因子，帮助你更好地掌握你的潜在黑暗面。</p>
                    <p>2.本测评共有9道判断题，请根据你的真实想法进行选择。</p>
                    <p>3.完成全部问题的作答后，请点击【查看结果】获得你的测评结果。</p>
                    <p>4.长按结果页可将图片保存至手机相册。</p>
                    <p>5.本测评最终解释权归东方青创营所有。</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "startRuleMessage",
        props: {
            rule: {
                type: Function
            }
        },
        data() {
            return {}
        },
        methods: {
            /**
             * 关闭规则
             * */
            close() {
                let that = this;
                that.rule();
            }
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

    .rule {
        #boxSizing;
        #absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, .3);

        .rule-main {
            #boxSizing;
            width: 100%;
            height: 100%;
            padding-top: 100px;

            .rule-main-message {
                #boxSizing;
                width: 90%;
                padding: 20px 40px;
                -webkit-border-radius: 40px;
                -moz-border-radius: 40px;
                border-radius: 40px;
                background-color: rgba(0, 0, 0, .5);
                margin: 0 auto;

                .rule-main-message-close {
                    float: right;
                    width: 50px;
                }

                .rule-main-message-font {
                    p {
                        color: #fff;
                        font-size: 26px;
                        line-height: 1.4;
                        margin-bottom: 20px;

                        &:first-child {
                            margin-bottom: 40px;
                        }
                    }
                }
            }
        }
    }
</style>
