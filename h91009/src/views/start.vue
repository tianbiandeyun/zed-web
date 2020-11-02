<template>
    <section class="start">

        <!--月亮-->
        <div class="start-moon">
            <img src="../assets/images/moon.png" alt="">
        </div>

        <!--蜘蛛-->
        <div class="start-spider">
            <img src="../assets/images/spider.png" alt="">
        </div>

        <!--青创营logo-->
        <div class="start-logo">
            <img src="../assets/images/logo.png" alt="">
        </div>

        <!--万圣节logo-->
        <div class="start-halloween-logo">
            <img src="../assets/images/halloweenLogo.png" alt="">
        </div>

        <!--森林-->
        <div class="start-bottom">
            <img src="../assets/images/backgroundBottom.png" alt="">
            <div></div>
        </div>

        <!--头像展示保存合成-->
        <synthesis :userPhoto="userPhoto" :decoration="decoration"></synthesis>

        <!--选择头像框-->
        <!--<synthesisSelect-->
        <!--@selectIn="listerSelectIn"-->
        <!--:pOpenLockPublic="openLockPublic"-->
        <!--:pOpenShareTip="openShareTip"-->
        <!--:isShareRecord="isShareRecordInfo"-->
        <!--:followRecord="followRecordInfo">-->
        <!--</synthesisSelect>-->
        <synthesisSelect
                @selectIn="listerSelectIn"
                :pOpenLockPublic="openLockPublic"
                :pOpenShareTip="openShareTip">
        </synthesisSelect>

        <!--公众号显示-->
        <div v-if="isShowPublic" class="start-public animated zoomInUp">
            <img class="start-public-qrimg-close" @click="closeLockPublic" src="../assets/images/closePublic.png"
                 alt="">
            <img style="width: 100%;height: 100%" src="../assets/images/guanzh1.jpg" alt="">
        </div>

        <!--分享图层-->
        <div v-if="isShowShare" class="start-share animated bounceInDown" @click="closeShareTip">
            <div class="start-share-img">
                <img src="../assets/images/sharetip.png" alt="">
            </div>
        </div>

        <!--规则介绍-->
        <div class="start-rule" @click="openRule">
            <img src="../assets/images/rule.png" alt="">
            <p>规则介绍</p>
        </div>

        <!--规则-->
        <div v-if="isShowRule" class="start-rule-message" @click="closeRule">
            <div class="rule-main-message animated bounceIn">
                <div class="rule-main-message-font">
                    <p>规则说明：</p>
                    <p>1、参与游戏最初只能解锁初始主题边框，将H5分享至朋友圈即可解锁城堡&女巫装饰，关注公众号后可解锁最终装饰。</p>
                    <p>2、全部装饰解锁完毕后，可进行任意操作，增加或减少装饰装扮自己的头像。</p>
                    <p>3、本次活动参与人数较多，系统可能会出现不稳定现象，请您耐心等待。</p>
                    <p>4、本次游戏活动最终解释权归东方青创营所有。</p>
                </div>
            </div>
        </div>

        <wx-share
                v-if="isWxShare"
                :shareInfo="shareInfo"
                :wxConfig="wxConfig">
        </wx-share>

        <!--<wx-share>-->
        <!--</wx-share>-->

    </section>
</template>

<script>
    import synthesis from '../components/synthesisComponent/synthesis'
    import synthesisSelect from '../components/synthesisSelectComponent/synthesisSelect'
    import * as config from '../../unit/config'
    import {mapGetters} from 'vuex'
    // import share from '../components/shareClass/share'

    export default {
        name: 'start',
        components: {synthesis, synthesisSelect},
        // mixins: [share],
        data() {
            return {
                decoration: 1,
                isShowPublic: false, //是否显示公众号提醒
                isShowShare: false, //是否显示分享提醒
                isShowRule: false, //是否显示规则
                userPhoto: '', //用户头像

                // ----

                isWxShare: false,

                shareInfo: {
                    title: '我是标题',
                    desc: '不给头像就捣蛋！来这里领取你的万圣节专属头像！',
                    img: config.CONST_RESPEC_URI + '/h/' + config.CONST_APP_IC + '/dist/weixinshare.png'
                },

                wxConfig: ''

                // ------

            }
        },
        created: async function () {
            let that = this;
            that.$showLoading();

            // -------

            const _url = window.location.href;

            const shareLink = await that.$unit.makeONlinLInk(config.CONST_REQUEST_URI, config.CONST_SHARE_URI, config.CONST_APP_TOKEN, {});

            await that.$store.dispatch('_getWxConfig', {
                im: config.requestInterface.getJsconf,
                fps: {
                    'url': encodeURIComponent(_url)
                },
                url: config.CONST_FETCH_REQUEST_URI
            }).then(res => {
                that.wxConfig = res.back_value
            });

            that.$set(this.shareInfo, "link", shareLink);
            that.isWxShare = true;

            // console.log(`shareLink= ${shareLink}`);
            //
            // console.log(`shareInfo=`);
            // console.log(that.shareInfo);
            //
            // console.log(that.wxConfig);

            // ---------

            /**
             * 获取openid
             * */
            await that.$store.dispatch('_getOpenId', {
                im: config.requestInterface.getopenid,
                fps: {},
                url: config.CONST_FETCH_REQUEST_URI
            });
            console.log(`openid=${that.openidInfo.open_id}`);

            if (that.openidInfo.open_id) {
                console.log('存在')
            } else {
                console.log('不存在')
                window.location.replace("https://hztc.dev.hztcapp.com/index.php?r=interface/anycall&k=h_91009&page=dist/index&ac=hxdf&base=0")
            }

            /**
             * 获取用户信息
             * */
            await that.$store.dispatch('_getUserInfo', {
                im: config.requestInterface.getplayerinfo,
                fps: {
                    'open_id': that.openidInfo.open_id,
                },
                url: config.CONST_FETCH_REQUEST_URI
            });
            that.userPhoto = that.getplayerInfo.userphoto.replace(/132/, "0");

            // /**
            //  * 是否分享
            //  * */
            // await that.$store.dispatch('_getShareRecord', {
            //     im: config.requestInterface.isShareRecord,
            //     fps: {
            //         'open_id': that.openidInfo.open_id,
            //     },
            //     url: config.CONST_FETCH_REQUEST_URI
            // }).then(res => {
            //     if (res.back_value) {
            //         /**
            //          * 是否关注公众号
            //          * */
            //         return that.$store.dispatch('_getFollowRecord', {
            //             im: config.requestInterface.isFollowOfficialAccount,
            //             fps: {
            //                 'open_id': that.openidInfo.open_id,
            //             },
            //             url: config.CONST_FETCH_REQUEST_URI
            //         });
            //     } else {
            //         return
            //     }
            // }).then(res => {
            //     console.log(res);
            // })

        },
        methods: {
            /**
             * 解锁公众号扫码
             * */
            openLockPublic() {
                let that = this;
                that.isShowPublic = !that.isShowPublic;
            },
            /**
             * 关闭分享图层
             * */
            closeLockPublic() {
                let that = this;
                that.isShowPublic = !that.isShowPublic;
            },
            /**
             * 打开分享图层
             * */
            openShareTip() {
                let that = this;
                that.isShowShare = !that.isShowShare;
            },
            /**
             * 关闭分享图层
             * */
            closeShareTip() {
                let that = this;
                that.isShowShare = !that.isShowShare;
            },
            /**
             * 打开规则
             * */
            openRule() {
                let that = this;
                that.isShowRule = !that.isShowRule;
            },
            /**
             * 关闭规则
             * */
            closeRule() {
                let that = this;
                that.isShowRule = !that.isShowRule;
            },
            listerSelectIn(type) {
                let that = this;
                if (type === this.decoration) {
                    that.$hideLoading();
                    return
                }
                that.decoration = type;
            }
        },
        computed: {
            ...mapGetters([
                'openidInfo',
                'getplayerInfo',
                // 'isShareRecordInfo',
                // 'followRecordInfo'
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

    .start {
        height: 100%;
        background: url("../assets/images/backgroundImg.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        #boxSizing;

        /*月亮*/

        .start-moon {
            #boxSizing;
            height: 100%;
            font-size: 0;
            overflow: hidden;

            img {
                width: 100%;
            }
        }

        /*青创营logo*/

        .start-logo {
            width: 200px;
            position: absolute;
            top: 0px;
            left: 0px;
            font-size: 0;

            img {
                width: 100%;
            }
        }

        /*蜘蛛*/

        .start-spider {
            width: 180px;
            position: absolute;
            top: 0px;
            right: 0px;
            font-size: 0;

            img {
                width: 100%;
            }
        }

        /*万圣节logo*/

        .start-halloween-logo {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            font-size: 0;
            text-align: center;
            padding-top: 40px;

            img {
                width: 100%;
            }
        }

        /*森林*/

        .start-bottom {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            width: 100%;
            position: absolute;
            bottom: 0px;
            left: 0px;
            font-size: 0;

            div {
                height: 80px;
                background-color: #000;
            }

            img {
                width: 100%;
            }
        }

        /*解锁按钮*/

        .start-submit {
            position: absolute;
            bottom: 80px;
            left: 50%;
            margin-left: -140px;
            width: 280px;
            height: 80px;
            background: url("../assets/images/start.png") no-repeat;
            background-size: 100% 100%;
        }

        /*分享图层*/

        .start-share {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: 999;
            background: rgba(000, 000, 000, .8);

            .start-share-img {
                width: 100%;
                height: 100%;
                text-align: right;

                img {
                    width: 70%;
                }
            }
        }

        /*显示公众号*/

        .start-public {
            border: 1px solid black;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            background: rgba(255, 255, 255, .9);
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100%;
            height: 480px;

            .start-public-message {
                width: 50%;
                height: 400px;
                float: left;
                text-align: center;
                font-size: 26px;
                line-height: 1.2;
                padding-top: 20%;
            }

            .start-public-qrimg-close {
                position: absolute;
                right: 4px;
                top: 4px;
                width: 60px;
            }
        }

        /*规则介绍*/

        .start-rule {
            position: fixed;
            right: 10px;
            top: 10px;
            z-index: 99;
            text-align: center;

            img {
                width: 50px;
                margin-bottom: 10px;
            }

            p {
                font-weight: bold;
                font-size: 20px;
            }
        }

        /*规则介绍*/

        .start-rule-message {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 1000;
            background-color: rgba(0, 0, 0, .5);
            padding-top: 100px;

            .rule-main-message {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                width: 90%;
                padding: 20px 40px;
                -webkit-border-radius: 40px;
                -moz-border-radius: 40px;
                border-radius: 40px;
                background-color: rgba(0, 0, 0, .9);
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
