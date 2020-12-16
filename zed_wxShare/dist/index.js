'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _weixinJsSdk = require('weixin-js-sdk');

var _weixinJsSdk2 = _interopRequireDefault(_weixinJsSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wxShare = function () {
    function wxShare(wxConfig, shareInfo) {
        var debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, wxShare);

        this.wxConfig = wxConfig;
        this.shareInfo = shareInfo;
        this.debug = debug;
    }

    _createClass(wxShare, [{
        key: 'init',
        value: function init() {
            var that = this;

            _weixinJsSdk2.default.config({
                debug: that.debug,
                appId: that.wxConfig.appId, // 必填，公众号的唯一标识
                timestamp: that.wxConfig.timestamp, // 必填，生成签名的时间戳
                nonceStr: that.wxConfig.nonceStr, // 必填，生成签名的随机串
                signature: that.wxConfig.signature, // 必填，签名，见附录1
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
            });

            _weixinJsSdk2.default.ready(function () {
                /**
                 * 分享给朋友
                 * */
                _weixinJsSdk2.default.updateAppMessageShareData({
                    title: that.shareInfo.title, // 分享标题
                    desc: that.shareInfo.details, // 分享描述
                    link: that.shareInfo.link, // 分享链接
                    imgUrl: that.shareInfo.image, // 分享图标
                    success: function success() {
                        // window.alert('分享给朋友-设置成功')
                    },
                    fail: function fail() {
                        // window.alert('分享给朋友-设置失败')
                    }
                });
                /**
                 * 分享到朋友圈
                 * */
                _weixinJsSdk2.default.updateTimelineShareData({
                    title: that.shareInfo.title, // 分享标题
                    link: that.shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: that.shareInfo.image, // 分享图标
                    success: function success() {
                        // window.alert('分享到朋友圈-设置成功')
                    },
                    fail: function fail() {
                        // window.alert('分享到朋友圈-设置失败')
                    }
                });
            });
        }
    }]);

    return wxShare;
}();

exports.default = wxShare;