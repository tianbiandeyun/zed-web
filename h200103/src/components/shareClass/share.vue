<template>
    <section>
    </section>
</template>
<script>
    import wx from 'weixin-js-sdk'
    import * as config from '../../../unit/config'
    import {mapGetters} from 'vuex'

    export default {
        name: "share",
        async mounted() {
            let that = this;
            /**
             * 获取 分享地址
             * */
            await that.$unit.makeONlinLInk(config.CONST_REQUEST_URI, config.CONST_SHARE_URI, config.CONST_APP_TOKEN, {}).then(res => {
                let shareInfo = {
                    title: '走，到楼下开飞机',
                    desc: '新东方南楼一层，飞行体验季暖心上线',
                    link: res,
                    img: config.CONST_RESPEC_URI + '/h/' + config.CONST_APP_IC + '/dist/share.jpeg'
                };
                console.log(shareInfo);
                /**
                 * 如果是在微信则启用分享
                 * */
                if (that.$unit.isWeiXin()) {
                    that.weiXinShare(shareInfo);
                } else {
                    console.log('不在微信环境');
                }
            });
        },
        methods: {
            async weiXinShare(info) {
                let that = this;
                let _url = window.location.href;

                /**
                 * 获取wxConfig
                 * */
                await that.$store.dispatch('_getWxConfig', {
                    im: config.requestInterface.getJsconf,
                    fps: {
                        'url': encodeURIComponent(_url)
                    },
                    url: config.CONST_FETCH_REQUEST_URI
                });

                wx.config({
                    debug: false,
                    appId: that.getwxconfigInfo.appId, // 必填，公众号的唯一标识
                    timestamp: that.getwxconfigInfo.timestamp, // 必填，生成签名的时间戳
                    nonceStr: that.getwxconfigInfo.nonceStr, // 必填，生成签名的随机串
                    signature: that.getwxconfigInfo.signature, // 必填，签名，见附录1
                    jsApiList: JSON.parse(that.getwxconfigInfo.jsApiList_json), // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
                });

                wx.ready(function () {
                    /**
                     * 分享给朋友
                     * */
                    wx.onMenuShareAppMessage({
                        title: info.title, // 分享标题
                        desc: info.desc, // 分享描述
                        link: info.link, // 分享链接
                        imgUrl: info.img, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            console.log('分享成功')
                        },
                        cancel: function () {
                            alert('取消分享')
                            window.location.reload();
                        }
                    });
                    /**
                     * 分享到朋友圈
                     * */
                    wx.onMenuShareTimeline({
                        title: info.title, // 分享标题
                        desc: info.desc, // 分享描述
                        link: info.link, // 分享链接
                        imgUrl: info.img, // 分享图标
                        success: function () {
                            console.log('分享成功')
                        },
                        cancel: function () {
                            alert('取消分享')
                            window.location.reload();
                        }
                    });
                });
            },
            /**
             * 领取卡券
             * */
            getAddCard(params) {
                return new Promise(resolve => {
                    wx.addCard({
                        cardList: [
                            {
                                cardId: params.cardId,
                                cardExt:
                                    '{"openid":"' +
                                    params.openid +
                                    '",' +
                                    '"nonce_str":"' +
                                    params.nonce_str +
                                    '",' +
                                    '"timestamp":"' +
                                    params.timestamp +
                                    '",' +
                                    '"signature":"' +
                                    params.signature +
                                    '"}'
                            }
                        ],
                        success() {
                            resolve(true);
                        }
                    });
                });
            }
        },
        computed: {
            ...mapGetters([
                'getOpenidInfo',
                'getwxconfigInfo'
            ])
        }
    }
</script>