/**
 * 工具类，日后逐渐完善
 * @class zedUtils
 * @constructor 无
 */
class zedUtils {
    constructor() {}
    /**
     * 判断数据类型
     * @method isDataType
     * @for zedUtils
     * @param {} data 要判断的数据，任何数据
     * @returns 数据类型
     */
    isDataType(data) {
        if (!data) {
            this.popupError('请传入一个要判断的数据类型')
        }
        let _data_type = Object.prototype.toString.call(data);
        let _type_list = {
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Object]': 'object',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Boolean]': 'boolean',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Date]': 'date',
            '[object Error]': 'error',
            '[object Symbol]': 'symbol'
        }
        return _type_list[_data_type];
    }
    /**
     * 弹出错误
     * @method popupError
     * @for zedUtils
     * @param {String} message 错误细节说明内容
     */
    popupError(message) {
        if (!message) {
            throw new Error('请传入错误细节说明内容')
        }
        throw new Error(message)
    }
    /**
     * 生成请求链接
     * @method getRequestUrl
     * @for zedUtils
     * @param {String} im 接口名称
     * @param {Object} fps 参数对象
     * @param {String} url 请求域名
     * @param {String} method 请求类型，默认是GET
     * @returns 返回拼接好的请求地址
     */
    getRequestUrl(im, fps, url, method = 'GET') {
        if (this.isDataType(im) !== 'string') {
            this.popupError('请传入接口名称 / 参数类型错误')
        }
        if (this.isDataType(fps) !== 'object') {
            this.popupError('请传入请求参数 / 参数类型错误')
        }
        if (this.isDataType(url) !== 'string') {
            this.popupError('请传入域名 / 参数类型错误')
        }
        if (this.isDataType(method) !== 'string') {
            this.popupError('请传入请求类型 / 参数类型错误')
        }
        let qoute = '?';
        if (/\?/.test(url)) {
            qoute = "&";
        }
        let base_url = url + qoute + "im=" + im;
        if (method === "GET") {
            for (let name in fps) {
                base_url += "&fps[" + name + "]=" + encodeURIComponent(fps[name]).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
            }
        }
        return base_url;
    }
    /**
     * 格式化年月日时分秒
     * @method formatDate
     * @for zedUtils
     * @param {Date} oldDate 日期对象
     * @param {String} fmt 日期格式 yyyy年MM月dd日 / hh时mm分ss秒
     * @returns yyyy年MM月dd日 / hh分mm秒
     */
    formatDate(oldDate, fmt) {
        let date = this.isDataType(oldDate) === 'string' ? new Date(oldDate) : oldDate;
        if (this.isDataType(fmt) !== 'string') {
            this.popupError('请传入日期格式 / 参数类型错误')
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }

        function padLeftZero(str) {
            return ('00' + str).substr(str.length)
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
            }
        }
        return fmt
    }
    /**
     * 格式化时间几秒前几天前几个月前
     * @method getBeforeDate
     * @for zedUtils
     * @param {String} time 传入日期字符串,包含时分秒
     * @returns 距离当前时间的小时/天数
     */
    getBeforeDate(time) {
        if (this.isDataType(time) !== 'string') {
            time = this.formatDate(time, 'yyyy-MM-dd hh:mm:ss')
        }
        let publishTime = Date.parse(time.replace(/-/gi, "/")) / 1000,
            d_seconds,
            d_minutes,
            d_hours,
            d_days,
            timeNow = parseInt(new Date().getTime() / 1000),
            d,
            date = new Date(publishTime * 1000),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        //小于10的在前面补0
        if (M < 10) {
            M = "0" + M;
        }
        if (D < 10) {
            D = "0" + D;
        }
        if (H < 10) {
            H = "0" + H;
        }
        if (m < 10) {
            m = "0" + m;
        }
        if (s < 10) {
            s = "0" + s;
        }
        d = timeNow - publishTime;
        d_days = parseInt(d / 86400);
        d_hours = parseInt(d / 3600);
        d_minutes = parseInt(d / 60);
        d_seconds = parseInt(d);
        if (d_days > 0 && d_days < 3) {
            return d_days + "天前";
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + "小时前";
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + "分钟前";
        } else if (d_seconds < 60) {
            if (d_seconds <= 0) {
                return "刚刚发表";
            } else {
                return d_seconds + "秒前";
            }
        } else if (d_days >= 3 && d_days < 30) {
            return M + "-" + D + " | " + H + ":" + m;
        } else if (d_days >= 30) {
            return Y + "-" + M + "-" + D + " | " + H + ":" + m;
        }
    }
    /**
     * 获取两个日期之间相隔几天
     * @method getBetweenDay
     * @for zedUtils
     * @param {String} start 开始日期
     * @param {String} end 结束日期
     * @returns 相隔几天
     */
    getBetweenDay(start, end) {
        let between = '';
        if (this.isDataType(start) === 'date' && this.isDataType(end) === 'date') {
            between = start - end;
        } else {
            between = new Date(start) - new Date(end);
        }
        let betweenDay = parseInt(Math.abs(between) / 1000 / 60 / 60 / 24);
        return betweenDay;
    }
    /**
     * 获取一组日期中日期最大的一个
     * @method getMaxDate
     * @for zedUtils
     * @param {Array} arr 一组日期
     * @returns 其中日期最大的一个
     */
    getMaxDate(arr) {
        let compare = [];
        let v = {};
        arr.forEach(item => {
            v[Date.parse(item.replace(/\-/g, "/"))] = item;
            compare.push(Date.parse(item.replace(/\-/g, "/")));
        });
        let maxDate = compare.sort()[compare.length - 1];
        return v[maxDate]
    }
    /**
     * 检测是否是移动设备
     * @method isRedirect
     * @for zedUtils
     * @returns 设备类型
     */
    isRedirect() {
        let userAgent = navigator.userAgent.toLowerCase();
        let device = /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/;
        if (device.test(userAgent)) {
            return 'Mobile'
        } else {
            return 'PC'
        }
    }
    /**
     * 判断是否是微信环境
     * @method isWx
     * @for zedUtils
     * @returns true/false
     */
    isWx() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }
    /**
     * 获取地址栏参数
     * @method getUrlParam
     * @for zedUtils
     * @param {String} url 网络地址
     * @returns 返回网络地址参数
     */
    getUrlParam(url) {
        let reg = new RegExp("(^|&)" + url + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        let r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; // 返回参数值
    }
}

export default zedUtils;