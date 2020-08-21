/**
 * 分享使用方式：
 * 第一：安装 weixin-js-sdk
 * 第二：要有 makeShareLink 方法
 * 第三：在页面中使用 mixins 混入
 * */

import wx from 'weixin-js-sdk'
import {mapGetters} from 'vuex'

export default {
    name: "share",
    data() {
        return {
            share_info: {
                title: '我正在参加创新创业大讲堂，你也快来参与吧！',
                desc: '培养创新意识，提高创新能力！',
                img: this.$config.PROJECT_SHARE_REQUEST + '/h/' + this.$config.PROJECT_ID + '/dist/share.png'
            }
        }
    },
    async mounted() {

        // 分享地址
        let _share_url = await this.$utils.makeShareLink();
        this.$set(this.share_info, "link", _share_url);

        // 是否在微信环境
        let _is_weixin = this.$utils.isWeiXin();

        if (_is_weixin) {
            this._initWeiXinShare(this.share_info);
        } else {
            console.log('微信分享不可用，不在微信浏览器')
        }

    },
    methods: {
        async _initWeiXinShare(info) {

            const _shareUrl = window.location.href;

            // 获取微信分享配置
            let _wx_config = await this.$store.dispatch('_getWeiXinConfig', {
                im: this.$config.PROJECT_INTERFACE.get_jsconf,
                fps: {
                    url: encodeURIComponent(_shareUrl)
                },
                url: this.$config.REQUEST_URL
            });

            wx.config({
                debug: false,
                appId: _wx_config.back_value.appId, // 必填，公众号的唯一标识
                timestamp: _wx_config.back_value.timestamp, // 必填，生成签名的时间戳
                nonceStr: _wx_config.back_value.nonceStr, // 必填，生成签名的随机串
                signature: _wx_config.back_value.signature, // 必填，签名，见附录1
                jsApiList: JSON.parse(_wx_config.back_value.jsApiList_json), // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
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
                    success() {
                        console.log('分享成功')
                    },
                    cancel() {
                        console.log('取消分享')
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
                    success() {
                        console.log('分享成功')
                    },
                    cancel() {
                        console.log('取消分享')
                    }
                });
            });

        }
    },
    computed: {
        ...mapGetters([])
    }
}
