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
}

