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
     * 判断数据类型
     * */
    typeOf(obj) {
        const toString = Object.prototype.toString;
        const map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        return map[toString.call(obj)];
    },
    /**
     * 动态创建 script
     * */
    createScript(url) {
        let script = document.createElement('script');
        script.type = 'text/javaScript';
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
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
    count() {
        let _hmt = _hmt || [];
        let hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?9a45aa740ec1b1979d7525f753dfbca8";
        let s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }
};

export default unit
