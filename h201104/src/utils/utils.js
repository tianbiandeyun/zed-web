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
    title: res || "加载中"
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
 * 获取年 / 月 /日
 * */
const getYearMonthDay = date => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return { year, month, day };
};
/**
 * 获取日期对象
 * */
const getDate = (...res) => {
  let [year, month, day] = [...res];
  return new Date(year, month, day);
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
  getYearMonthDay,
  getDate,
  getDays,
  getErrorCode,
  getMaxDate,
  restData
};