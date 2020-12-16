import wx from 'weixin-js-sdk'

export default class wxShare {
    constructor(wxConfig, shareInfo, debug = false) {
        this.wxConfig = wxConfig;
        this.shareInfo = shareInfo;
        this.debug = debug;
    }

    init() {
        const that = this;

        wx.config({
            debug: that.debug,
            appId: that.wxConfig.appId, // 必填，公众号的唯一标识
            timestamp: that.wxConfig.timestamp, // 必填，生成签名的时间戳
            nonceStr: that.wxConfig.nonceStr, // 必填，生成签名的随机串
            signature: that.wxConfig.signature, // 必填，签名，见附录1
            jsApiList: [
                'updateAppMessageShareData',
                'updateTimelineShareData',
            ],
        });

        wx.ready(() => {
            /**
             * 分享给朋友
             * */
            wx.updateAppMessageShareData({
                title: that.shareInfo.title, // 分享标题
                desc: that.shareInfo.details, // 分享描述
                link: that.shareInfo.link, // 分享链接
                imgUrl: that.shareInfo.image, // 分享图标
                success() {
                    // window.alert('分享给朋友-设置成功')
                },
                fail() {
                    // window.alert('分享给朋友-设置失败')
                }
            });
            /**
             * 分享到朋友圈
             * */
            wx.updateTimelineShareData({
                title: that.shareInfo.title, // 分享标题
                link: that.shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: that.shareInfo.image, // 分享图标
                success() {
                    // window.alert('分享到朋友圈-设置成功')
                },
                fail() {
                    // window.alert('分享到朋友圈-设置失败')
                }
            });
        });

    }

}
