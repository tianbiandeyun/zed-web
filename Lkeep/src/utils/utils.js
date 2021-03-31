/**
 * 展示错误
 * errorCode 错误号
 * requestFace 接口名字
 * errorMessage 错误信息
 * */
const showErrorInfo = (errorInfo, errorFace, callback = () => "") => {
  let { error_code, error_message } = getErrorCode(errorInfo.error_code);
  wx.showModal({
    title: `${errorFace}`,
    showCancel: false,
    content: `${error_message}`,
    success() {
      callback();
    }
  });
};
/**
 * 打开等待
 * res 提示信息
 * */
const showWaiting = res => {
  wx.showLoading({
    title: res || "加载中",
    mask: true
  });
};
/**
 * 关闭等待
 * */
const closeWaiting = () => {
  wx.hideLoading();
};
/**
 * 拼接参数生成 请求 地址
 * im 接口名，
 * fps 参数，
 * url 请求地址
 * method 请求方式
 * */
const produceRequestUrl = (im, fps, url, method = "get") => {
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
};
/**
 * 获取日期之间相隔几天
 * */
const getDays = (strDateStart, strDateEnd) => {
  let strSeparator = "-"; //日期分隔符
  let oDate1;
  let oDate2;
  let iDays;
  oDate1 = strDateStart.split(strSeparator);
  oDate2 = strDateEnd.split(strSeparator);
  let strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
  let strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
  iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24);//把相差的毫秒数转换为天数
  return iDays;
};
/**
 * 获取选择的日期中日期最大的一个
 * */
const getMaxDate = (arr) => {
  let compare = [];
  let v = {};
  for (let i = 0; i < arr.length; i++) {
    v[Date.parse(arr[i].replace(/\-/g, "/"))] = arr[i];
    compare.push(Date.parse(arr[i].replace(/\-/g, "/")));
  }
  let maxDate = compare.sort()[compare.length - 1];
  let a = {};
  a[v[maxDate]] = v[maxDate];
  return a;
};
/**
 * 格式化日期
 * */
const format = (fmt) => {
  const date = new Date();
  const o = {
    "Y+": date.getFullYear(),
    "M+": date.getMonth() + 1,     // 月
    "D+": date.getDate(),          // 日
    "h+": date.getHours(),         // 时
    "m+": date.getMinutes(),       // 分
    "s+": date.getSeconds(),       // 秒
    "W": date.getDay()             // 周
  };
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, () => {
        if (k === "W") {                                    // 星期几
          const week = ["日", "一", "二", "三", "四", "五", "六"];
          return week[o[k]];
        } else if (k === "Y+" || RegExp.$1.length == 1) {    // 年份 or 小于10不加0
          return o[k];
        } else {
          return ("00" + o[k]).substr(("" + o[k]).length);  // 小于10补位0
        }
      });
    }
  }
  return fmt;
};
/**
 * 错误号码
 * */
const getErrorCode = code => {
  const errorCode = {
    2000920: "openid 错误",
    2011130201: "未报名参加此次活动",
    1100852: "参数错误"
  };
  let error_code = code;
  let error_message = errorCode[code];
  return { error_code, error_message };
};
/**
 * 重置数据
 * */
const restData = (that) => {
  Object.assign(that, that.$options.data());
};
export default {
  showErrorInfo,
  showWaiting,
  closeWaiting,
  produceRequestUrl,
  getDays,
  getErrorCode,
  getMaxDate,
  restData
};
