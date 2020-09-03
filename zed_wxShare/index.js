import wx from 'weixin-js-sdk'

export default class wxShare {
    constructor(wxConfig, shareInfo) {
        this.wxConfig = wxConfig;
        this.shareInfo = shareInfo;
    }

    async init() {
        const that = this;

        wx.config({
            debug: false,
            appId: that.wxConfig.appId, // 必填，公众号的唯一标识
            timestamp: that.wxConfig.timestamp, // 必填，生成签名的时间戳
            nonceStr: that.wxConfig.nonceStr, // 必填，生成签名的随机串
            signature: that.wxConfig.signature, // 必填，签名，见附录1
            jsApiList: JSON.parse(that.wxConfig.jsApiList_json), // 必填，需要使用的 JS 接口列表，所有JS接口列表见附录2
        });

        wx.ready(function () {
            /**
             * 分享给朋友
             * */
            wx.onMenuShareAppMessage({
                title: that.shareInfo.title, // 分享标题
                desc: that.shareInfo.details, // 分享描述
                link: that.shareInfo.link, // 分享链接
                imgUrl: that.shareInfo.image, // 分享图标
                success() {
                    console.log('分享成功')
                }
            });
            /**
             * 分享到朋友圈
             * */
            wx.onMenuShareTimeline({
                title: that.shareInfo.title, // 分享标题
                desc: that.shareInfo.details, // 分享描述
                link: that.shareInfo.link, // 分享链接
                imgUrl: that.shareInfo.image, // 分享图标
                success() {
                    console.log('分享成功')
                }
            });
        });

    }


}
