/**
 * 获取企业微信派发的临时登录凭证
 * code 用户登录凭证（有效期五分钟）。
 * 开发者需要在开发者服务器后台调用 api，使用 code 换取 userid 和 session_key 等信息
 * */
const getCode = () => {
  return new Promise((resolve, reject) => {
    wx.qy.login({
      success(res) {
        resolve(res.code);
      }
    });
  });
};
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
    2007081335: "存在未确认任务的相关人员",
    2002281143: "登录code错误",
    1100853: "参数错误",
    1100852: "传入接口参数错误",
    2000920: "userid 出错",
    2003021208: "解密失败名称为空",
    2003121714: "企业不存在",
    2003181345: "没有权限添加成员",
    2003181525: "考核项不存在",
    2003181539: "没有权限，请联系管理员",
    2003231510: "管理员已存在，无法重复添加",
    2003251616: "手动分配权重不足",
    2003261243: "不存在任务",
    2003261328: "用户类型不正确",
    2003261556: "不是本项目成员",
    2004031812: "本任务不存在此审查时间",
    2004031813: "本任务此审查点已结束",
    2004031814: "本任务未到此审查时间",
    2004131604: "审查时间小于工作日期最后一天",
    2005091139: "审查时间小于工作日期第一天",
    2004131821: "添加审查日期失败",
    2004131823: "添加工作时间失败",
    2004151218: "此用户不是要删除的权限",
    2004151219: "管理员还存在任务",
    2004151244: "不存在项目成员",
    2004161201: "用户不是项目成员_无法创建任务",
    2004161243: "项目处于归档状态",
    2004161244: "添加任务失败",
    2004171231: "员工创建任务_执行人必须是当前员工",
    2004221744: "还存在未审核完成的任务",
    2004241339: "消息不存在",
    2004261633: "已存在相同项目名称",
    2004261634: "已存在相同任务名称",
    2004261719: "更新员工任务状态失败",
    2004271016: "更新任务信息失败",
    2004271017: "更新绩效项目信息失败",
    2004281617: "已是此项目管理员",
    2005061836: "存在任务请先删除任务",
    2005042022: "当前项目用户分配积分已超出100",
    2005042039: "当前项目_用户已存在此任务",
    2005131402: "分数值错误",
    2005141944: "项目创建者不允许删除",
    2005191904: "该项目需要审查人撤回审查才可以修改",
    2005251759: "已同意任务不允许再次拒绝",
    2005261324: "已同意任务不允许再次点击同意",
    2005281941: "成员存在任务_请先删除任务",
    2002281142: "获取不到第三方应用tokrn",
    2006081428: "企业ID错误",
    1812271633: "用户创建失败",
    2006151222: "企业微信未授权",
    2006151307: "添加基础表失败"
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
  getCode,
  restData
};
