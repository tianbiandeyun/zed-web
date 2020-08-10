<template>
    <section class="question-container">

    </section>
</template>

<script>
    export default {
        name: "question",
        data() {
            return {
                test_list: [
                    {
                        index: 1,
                        title: '圆形、三角形、S形3种图形，你更喜欢哪一种？',
                        result: [
                            {
                                val: '圆形',
                                score: 2
                            },
                            {
                                val: '三角形',
                                score: 1
                            },
                            {
                                val: 'S形',
                                score: 0
                            }
                        ]
                    },
                    {
                        index: 2,
                        title: '以下几种文学题材作品你更喜欢哪一种？',
                        result: [
                            {
                                val: '诗歌',
                                score: 0
                            },
                            {
                                val: '小说',
                                score: 1
                            },
                            {
                                val: '哲理散文',
                                score: 2
                            }
                        ]
                    },
                    {
                        index: 3,
                        title: '你对学习演奏一种乐器是否感兴趣？',
                        result: [
                            {
                                val: '没有',
                                score: 2
                            },
                            {
                                val: '非常希望有机会能学习',
                                score: 0
                            },
                            {
                                val: '说不上',
                                score: 1
                            }
                        ]
                    },
                    {
                        index: 4,
                        title: '以下哪种性格更符合你本人实际性格？',
                        result: [
                            {
                                val: '比较安静',
                                score: 2
                            },
                            {
                                val: '比较爱动',
                                score: 0
                            },
                            {
                                val: '介于两者之间',
                                score: 1
                            }
                        ]
                    },
                    {
                        index: 5,
                        title: '在做事的条理性方面，你对自己的评价是？',
                        result: [
                            {
                                val: '很差，乱透了',
                                score: 0
                            },
                            {
                                val: '我做事总是井井有条',
                                score: 2
                            },
                            {
                                val: '不算很好',
                                score: 1
                            }
                        ]
                    },
                    {
                        index: 6,
                        title: '过往是否接触或主动了解过创业相关的信息？',
                        result: [
                            {
                                val: '从来没有',
                                score: 0
                            },
                            {
                                val: '接触/了解过但是不熟悉',
                                score: 0
                            },
                            {
                                val: '经常接触',
                                score: 0
                            }
                        ]
                    },
                    {
                        index: 7,
                        title: '是否认为自己在服饰穿搭方面有天赋？',
                        result: [
                            {
                                val: '是',
                                score: 0
                            },
                            {
                                val: '不是',
                                score: 2
                            },
                            {
                                val: '说不上',
                                score: 1
                            }
                        ]
                    },
                    {
                        index: 8,
                        title: '如果创业，以下哪个选项你会优先考虑？',
                        result: [
                            {
                                val: '考虑有成功案例的领域',
                                score: 0
                            },
                            {
                                val: '探索新领域',
                                score: 0
                            },
                            {
                                val: '单刀直入当前热门领域',
                                score: 0
                            }
                        ]
                    },
                    {
                        index: 9,
                        title: '你通常选择以下哪种方式度过周末？',
                        result: [
                            {
                                val: '看书',
                                score: 2
                            },
                            {
                                val: '逛街购物',
                                score: 1
                            },
                            {
                                val: '动手做些小饰品',
                                score: 0
                            }
                        ]
                    },
                    {
                        index: 10,
                        title: '外出旅行，你更喜欢去哪些地方？',
                        result: [
                            {
                                val: '风景优美的人间仙境',
                                score: 1
                            },
                            {
                                val: '充满文化气息的名胜古迹',
                                score: 2
                            },
                            {
                                val: '不为人知的山野小景',
                                score: 0
                            }
                        ]
                    },
                    {
                        index: 11,
                        title: '朋友在一起讨论问题，通常情况下，你的见解？',
                        result: [
                            {
                                val: '总能令人耳目一新',
                                score: 0
                            },
                            {
                                val: '与他人大致相同',
                                score: 2
                            },
                            {
                                val: '偶尔也有一番见地',
                                score: 1
                            }
                        ]
                    },
                    {
                        index: 12,
                        title: '如果某件事吸引了你，你会？',
                        result: [
                            {
                                val: '通常都是被事物的表象或者有趣的地方所吸引',
                                score: 0
                            },
                            {
                                val: '如果被吸引，我就一定要对它探个究竟',
                                score: 2
                            },
                            {
                                val: '如果可能的话，我也会参与其中',
                                score: 1
                            }
                        ]
                    },
                    {
                        index: 13,
                        title: '在以下那种情况下会决定创业？',
                        result: [
                            {
                                val: '等有了一定工作经验后',
                                score: 0
                            },
                            {
                                val: '等有了经济实力后',
                                score: 0
                            },
                            {
                                val: '一边学习一边思考，成熟后就创业',
                                score: 0
                            }
                        ]
                    },
                    {
                        index: 14,
                        title: '下面的场景你更喜欢哪个？',
                        result: [
                            {
                                val: '静谧深邃的森林',
                                score: 2
                            },
                            {
                                val: '蓝天白云下的草场',
                                score: 0
                            },
                            {
                                val: '怪石林立的高山峭壁',
                                score: 1
                            }
                        ]
                    },
                    {
                        index: 15,
                        title: '如果有三种职业摆在你的面前，人事经理、记者和自由画家，你会选择哪一种？',
                        result: [
                            {
                                val: '善于处理人际关系的人事经理',
                                score: 2
                            },
                            {
                                val: '能言善辩、可能接触社会各色人等的记者',
                                score: 1
                            },
                            {
                                val: '能言善辩、可能接触社会各色人等的记者',
                                score: 0
                            }
                        ]
                    }
                ]
            }
        },
        mounted() {
            this.$utils.setDocumentTitle('职业倾向测评')
        }
    }
</script>

<style lang="less" scoped>

</style>