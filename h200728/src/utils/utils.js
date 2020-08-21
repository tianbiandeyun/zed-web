import * as config from './config'

export default {
    /**
     * 拼接参数生成 请求 地址
     * 参数 im 接口名，fps 参数，method 请求方式
     * */
    produceRequestUrl(im, fps, url, method = "get") {
        let requestUrl = url;
        let qoute = "?";
        if (/\?/.test(requestUrl)) {
            qoute = "&";
        }
        let baseUrl = requestUrl + qoute + "im=" + im;
        // 如果是 get 则走这个参数拼接
        if (method === "get") {
            for (let name in fps) {
                baseUrl += "&fps[" + name + "]=" + encodeURIComponent(fps[name]).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
            }
            baseUrl += "&iv=jsonp&callback=";
        }
        // 如果是 post 则直接返回
        return baseUrl;
    },
    /**
     * 设置页面标题
     * */
    setDocumentTitle(t) {
        document.title = t
    },
    /**
     * 微信分享生成请求地址
     * requestUrl 开发 / 上线地址
     * shareUrl 分享地址
     * appToken 分享ID
     * shareParams 如果分享出去需要的参数
     * */
    makeShareLink(shareParams = {}) {
        return new Promise((resolve) => {
            let onlinelink = `${config.PROJECT_REQUEST}?r=interface/anycall&k=${config.SHARE_ID}&page=dist/index&ac=hxdf&base=0`;
            for (let pkey in shareParams) {
                onlinelink += "&";
                onlinelink += pkey;
                onlinelink += "=";
                onlinelink += this._toEncode(shareParams[pkey]);
            }
            resolve(`${config.REQUEST_SHARE_URL}&to=${this._toEncode(onlinelink)}`);
        })
    },
    /**
     * 用来进行字符串的EnCode
     * */
    _toEncode(inputstr) {
        return encodeURIComponent(inputstr).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
    },
    /**
     * 判断是否微信
     * */
    isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 获取地址栏参数
     * */
    getUrlParam(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        let r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; // 返回参数值
    }
}