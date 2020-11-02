<template>
    <section class="synthesis">
        <div class="synthesis-box" ref="synthesiBox"
             :style="{backgroundImage: 'url(' + userPhoto + ')', backgroundSize:'100%,100%'}">
            <img class="synthesis-box-background" :src="synthesisImg[decoration]" alt="">
            <!--<img class="synthesis-box-userphoto" :src="userPhoto" alt="">-->
            <img class="synthesis-box-result" :src="showResult" alt="">
        </div>
    </section>
</template>

<script>
    import html2canvas from 'html2canvas';

    export default {
        name: "synthesis",
        props: {
            /**
             * 第几个背景图
             * */
            decoration: {
                type: Number,
                default: 1
            },
            /**
             * 头像
             * */
            userPhoto: {
                type: String
            }
        },
        data() {
            return {
                synthesisImg: {
                    1: require('../../assets/images/halloweenHeader1.png'),
                    2: require('../../assets/images/halloweenHeader2.png'),
                    3: require('../../assets/images/halloweenHeader3.png')
                }, // 背景图集合
                showResult: '' // 结果图可以保存的
            }
        },
        created() {
        },
        methods: {
            /**
             * 生成结果图
             * */
            getUserPhoto() {
                let that = this;
                html2canvas(that.$refs.synthesiBox, {
                    allowTaint: true, //允许污染
                    taintTest: true, //在渲染前测试图片(没整明白有啥用)
                    useCORS: true, //使用跨域(当allowTaint为true时这段代码没什么用)
                    width: that.$refs.synthesiBox.offsetWidth,
                    height: that.$refs.synthesiBox.offsetHeight
                }).then(res => {
                    that.showResult = res.toDataURL('image/jpeg', 1.0);
                    this.$hideLoading();
                });
            }
        },
        watch: {
            decoration(val) {
                console.log(val);
                this.showResult = '';
                setTimeout(() => {
                    this.getUserPhoto();
                }, 500)
            },
            async userPhoto() {
                let p = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true)
                    }, 1000)
                });
                await p.then(() => {
                    this.getUserPhoto();
                })
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

    .synthesis {
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        background-color: #fff;
        width: 360px;
        height: 360px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -230px;
        margin-left: -180px;
        z-index: 1;
        #boxSizing;
        padding: 10px;

        .synthesis-box {
            position: relative;
            width: 100%;
            height: 100%;
            font-size: 0;

            .synthesis-box-background {
                position: absolute;
                top: 0px;
                left: 0px;
                float: left;
                z-index: 1;
                width: 100%;
                height: 100%;
            }

            .synthesis-box-userphoto, .synthesis-box-result {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
            }

            .synthesis-box-result {
                z-index: 9;
            }
        }

    }
</style>