const unit = {
    /**
     * 拼接参数生成 请求 地址
     * 参数 im 接口名，fps 参数，method 请求方式
     * */
    produceRequestUrl(im, fps, url, method = 'get') {
        let request_url = url;
        let first_qoute = "?";
        if (/\?/.test(request_url)) {
            first_qoute = "&";
        }
        let base_url = request_url + first_qoute + "im=" + im;
        if ('post' !== method) {
            for (var name in fps) {
                base_url += "&fps[" + name + "]=" + encodeURIComponent(fps[name]).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
            }
        }
        if ('get' === method) {
            base_url += "&iv=jsonp&callback=";
        }
        return base_url;
    },
    /**
     * 微信分享生成请求地址
     * */
    makeONlinLInk(requestUrl, shareUrl, appToken, shareParams) {
        return new Promise((resolve) => {
            let onlinelink = requestUrl + '?r=interface/anycall&k=' + appToken + '&page=dist/index&ac=lett&base=0';
            for (var pkey in shareParams) {
                onlinelink += "&";
                onlinelink += pkey;
                onlinelink += "=";
                onlinelink += this._toEncode(shareParams[pkey]);
            }
            resolve(shareUrl + "&to=" + this._toEncode(onlinelink));
        })
    },
    /**
     * 用来进行字符串的EnCode
     * */
    _toEncode(inputstr) {
        return encodeURIComponent(inputstr).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
    },
    /**
     * 判断是否微信登陆
     * */
    isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },

// / JS`正则表达式`获取地址栏url参数：
    getUrlParam(name) {
        // var str = 'https://hztc.dev.hztcapp.com/index.php?r=interface/anycall&k=h_200103&page=dist/index&ac=lett&base=0&retry=3&test_date=2020-01-24';
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); // 匹配目标参数
        // var r = str.substr(1).match(reg); // 匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; // 返回参数值
    },
};

export default unit
