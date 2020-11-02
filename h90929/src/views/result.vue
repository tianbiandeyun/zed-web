<template>
    <div class="result">

        <p class="result-tip-font">长按保存图片</p>

        <!--合成图片需要-->
        <canvas id="myCanvas" style="position: fixed;left: 200%;top: -200%;"></canvas>

        <!--展示图-->
        <img :src="x" alt="" style="width: 100%;">

        <!--提示框-->
        <div class="result-tip" @click="aginText">
            <img src="../assets/images/result/agin.png" alt="">
        </div>

    </div>
</template>

<script>
    import questionResource from '../assets/questionResource/questionResource'
    import * as config from '../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "result",
        data() {
            return {
                x: '',
                isTip: true
            }
        },
        async created() {
            let that = this;
            that.$showLoading();

            /**
             * 解决刷新之后没有 openid 的问题
             * */
            if (that.openidInfo.open_id === undefined || that.openidInfo.open_id === '') {
                await that.$store.dispatch('getOpenId', {
                    im: config.requestInterface.getopenid,
                    fps: {},
                    url: config.CONST_FETCH_REQUEST_URI
                });
            }

            console.log(`解决刷新之后没有 openid 的问题=${that.openidInfo.open_id}`);

            /**
             * 背景图
             * */
            let bgImg = '';

            /**
             * 获取用户信息
             * */
            await that.$store.dispatch('getPlayerInfo', {
                im: config.requestInterface.getplayerinfo,
                fps: {
                    'open_id': that.openidInfo.open_id
                },
                url: config.CONST_FETCH_REQUEST_URI
            });

            /**
             * 请求最终答案
             * */
            await that.$store.dispatch('getFinalResult', {
                im: config.requestInterface.getfinalresult,
                fps: {
                    'open_id': that.openidInfo.open_id
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                bgImg = questionResource.resultImages[res.back_value];
            });

            that.$nextTick(() => {

                /**
                 * 二维码
                 * */
                let qrImg = require('../assets/images/h90929.jpg');
                let arr = [bgImg, qrImg];

                console.log(arr);

                let canvas = document.getElementById("myCanvas");
                let context = canvas.getContext("2d");
                /**
                 * 图片大小
                 * */
                let imgWidth = 750;
                let imgHeight = 1333;
                /**
                 * 设置canvas的大小
                 * */
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                /**
                 * 合成图片
                 * */
                that.synthesis(arr, canvas, context, imgWidth, imgHeight, that.getPlayerInfot.nickname).then(res => {
                    that.x = res;
                    that.$hideLoading();
                })

            })

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
             * 背景图，二维码，宽，高
             * */

            synthesis(arr, canvas, context, imgWidth, imgHeight, nickname) {
                return new Promise((resolve, reject) => {
                    // 背景图和二维码
                    let bgImg = new Image();
                    let qrImg = new Image();

                    bgImg.src = arr[0];
                    bgImg.onload = function () {
                        context.drawImage(bgImg, 0, 0, imgWidth, imgHeight);
                    };

                    context.font = "44px cel-font";
                    context.textAlign = "center";
                    context.fillStyle = "#cda349";
                    context.fillText(nickname, 750 / 2, imgHeight / 14);

                    // 二维码
                    setTimeout(function () {
                        qrImg.src = arr[1];
                    }, 500);
                    qrImg.onload = function () {
                        context.drawImage(qrImg, imgWidth / 1.3, imgHeight / 1.14, 120, 120);
                        resolve(canvas.toDataURL('image/png'));
                    };
                })
            },
            aginText() {
                let that = this;
                that.$router.replace({name: 'start'})
            }
        },
        computed: {
            /**
             * 获取的问题集合
             * */
            ...mapGetters([
                'openidInfo',
                'getPlayerInfot',
                'getFinalResultInfo'
            ])
        }
    }
</script>

<style lang="less">
    .result {
        height: 100%;

        .result-tip-font {
            box-sizing: border-box;
            text-align: center;
            font-size: 30px;
            padding: 20px 0px;
            background-color: #fff;
            color: #888888;
        }

        #capture {
            width: 500px;
            height: 900px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .s {
            width: 100%;
            height: 100%;
        }

        .result-tip {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100px;
            height: 100px;
            position: fixed;
            top: 50%;
            left: 20px;
            z-index: 9;
            text-align: center;
            line-height: 100px;
            overflow: hidden;

            img {
                width: 100%;
            }
        }
    }
</style>
