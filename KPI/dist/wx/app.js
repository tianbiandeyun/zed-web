require("./common/manifest.js")
require("./common/vendor.js")
global.webpackJsonpMpvue([3],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  GETVIDEOINFO: function GETVIDEOINFO(state, res) {
    state.getVideoInfo = res;
  },
  GETADDRESSMULTI: function GETADDRESSMULTI(state, res) {
    state.getAddressMulti = res;
  },
  GETADDRESS: function GETADDRESS(state, res) {
    state.getAddress = res;
  },
  REGISTUSER: function REGISTUSER(state, res) {
    state.registUser = res;
  }
});

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PEOJECT_STATE", function() { return PEOJECT_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_URI", function() { return REQUEST_URI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INDEX_OPERAT_TYPE", function() { return INDEX_OPERAT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTER_FACE", function() { return INTER_FACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGE", function() { return PAGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISAGREE", function() { return DISAGREE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_REQUEST_URI", function() { return SET_REQUEST_URI; });
/**
 * 考核表状态
 * */
var PEOJECT_STATE = {
  "2": "../../static/images/waiting.png", // 黄色 待确认
  "3": "../../static/images/doing.png", // 蓝色 执行中
  "4": "../../static/images/success.png", // 绿色 成功
  "5": "../../static/images/over.png" // 黑色 结束
};

/**
 * 首页操作项状态
 * */
var INDEX_OPERAT_TYPE = {
  2: 22, // 统计管理
  3: 20, // 应用设置
  4: 21 // 创建考核
};

/**
 * 异议内容
 * */
var DISAGREE = ["达标描述，不清晰", "工作时长不合理", "分配分数不合理", "审查人不合理", "审查时点有问题"];

/**
 * 首页操作栏跳转列表
 * */
var PAGE = ["assess", "review", "analysis", "setup", "feedback", "system_help"];

/**
 * 项目编号
 * */
var CONST_APP_IC = "h200212";

/**
 * 版本号
 * */
var VERSION = "v2.5.2";

/**
 * 请求域名
 * */
var CONST_REQUEST_URI = "https://devphp.hztc.dev.hztcapp.com/test_index.php"; // 开发
// const CONST_REQUEST_URI = "https://hztc.dev.hztcapp.com/index.php"; // 正式

/**
 * 请求地址
 * */
var REQUEST_URI = CONST_REQUEST_URI + "?r=interface/api&ic=" + CONST_APP_IC;

/**
 * 设置请求链接
 * */
var SET_REQUEST_URI = function SET_REQUEST_URI() {
  var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  REQUEST_URI = REQUEST_URI + "&qy_id=" + res;
};

/**
 * 接口列表
 * */
var INTER_FACE = {
  get_system_setting_date: "get_system_setting_date", // 获取时间
  set_withdrawal_review: "set_withdrawal_review", // 撤回审查任务
  set_message_status: "set_message_status", // 设置消息
  get_video_url: "get_video_url", // 获取系统帮助视频
  get_administrators_list: "get_administrators_list", // 获取系统帮助管理员列表
  get_user_power: "get_user_power", // 获取系统帮助权限
  update_task: "update_task", // 修改任务
  set_feedback_content: "set_feedback_content", // 设置反馈
  get_statistical: "get_statistical", // 获取管理员
  del_statistical: "del_statistical", // 删除管理员
  add_statisticians: "add_statisticians", // 添加管理员
  get_notice_list: "get_notice_list", // 获取各种消息
  has_notice: "has_notice", // 获取首页6个操作栏是否有新消息
  get_task_month_list: "get_task_month_list", // 每个月的详情
  get_staff_portrait: "get_staff_portrait", // 员工统计详细信息
  get_personnel_list: "get_personnel_list", // 获取员工统计
  set_svaluation_and_score: "set_svaluation_and_score", // 审查任务
  get_waiting_for_review_list: "get_waiting_for_review_list", // 获取被审查人列表
  get_review_task_list: "get_review_task_list", // 获取我审查的时间点
  confirm_task: "confirm_task", // 对任务作出决定
  get_reason: "get_reason", // 获取拒绝原因
  get_holders: "get_holders", // 获取执行人 / 审查人
  get_review_result_list: "get_review_result_list", // 获取任务审核详情
  get_task_details: "get_task_details", // 获取任务详情
  get_task_list: "get_task_list", // 获得任务列表
  get_select_enterprise_contact: "get_select_enterprise_contact", // 获取通讯录参数
  append_holder: "append_holder", // 添加 执行人-审查人
  add_task: "add_task", // 新建任务
  set_user_info: "set_user_info", // 设置用户信息
  regist_user: "regist_user" // 注册用户
};



/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);


/**
 * 获取企业微信派发的临时登录凭证
 * code 用户登录凭证（有效期五分钟）。
 * 开发者需要在开发者服务器后台调用 api，使用 code 换取 userid 和 session_key 等信息
 * */
var getCode = function getCode() {
  return new __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    wx.qy.login({
      success: function success(res) {
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
var showErrorInfo = function showErrorInfo(errorInfo, errorFace) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return "";
  };

  var _getErrorCode = getErrorCode(errorInfo.error_code),
      error_code = _getErrorCode.error_code,
      error_message = _getErrorCode.error_message;

  wx.showModal({
    title: "" + errorFace,
    showCancel: false,
    content: "" + error_message,
    success: function success() {
      callback();
    }
  });
};
/**
 * 打开等待
 * res 提示信息
 * */
var showWaiting = function showWaiting(res) {
  wx.showLoading({
    title: res || "加载中"
  });
};
/**
 * 关闭等待
 * */
var closeWaiting = function closeWaiting() {
  wx.hideLoading();
};
/**
 * 拼接参数生成 请求 地址
 * im 接口名，
 * fps 参数，
 * url 请求地址
 * method 请求方式
 * */
var produceRequestUrl = function produceRequestUrl(im, fps, url) {
  var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "get";

  var requestUrl = url;
  var qoute = "?";
  if (/\?/.test(requestUrl)) {
    qoute = "&";
  }
  var baseUrl = requestUrl + qoute + "im=" + im;
  // 如果是 get 则走这个参数拼接
  if (method === "get") {
    for (var name in fps) {
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
var getYearMonthDay = function getYearMonthDay(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  return { year: year, month: month, day: day };
};
/**
 * 获取日期对象
 * */
var getDate = function getDate() {
  for (var _len = arguments.length, res = Array(_len), _key = 0; _key < _len; _key++) {
    res[_key] = arguments[_key];
  }

  var _ref = [].concat(res),
      year = _ref[0],
      month = _ref[1],
      day = _ref[2];

  return new Date(year, month, day);
};
/**
 * 获取日期之间相隔几天
 * */
var getDays = function getDays(strDateStart, strDateEnd) {
  var strSeparator = "-"; //日期分隔符
  var oDate1 = void 0;
  var oDate2 = void 0;
  var iDays = void 0;
  oDate1 = strDateStart.split(strSeparator);
  oDate2 = strDateEnd.split(strSeparator);
  var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
  var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
  iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
  return iDays;
};
/**
 * 错误号码
 * */
var getErrorCode = function getErrorCode(code) {
  var errorCode = {
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
  var error_code = code;
  var error_message = errorCode[code];
  return { error_code: error_code, error_message: error_message };
};
/**
 * 获取选择的日期中日期最大的一个
 * */
var getMaxDate = function getMaxDate(arr) {
  var compare = [];
  var v = {};
  for (var i = 0; i < arr.length; i++) {
    v[Date.parse(arr[i].replace(/\-/g, "/"))] = arr[i];
    compare.push(Date.parse(arr[i].replace(/\-/g, "/")));
  }
  var maxDate = compare.sort()[compare.length - 1];
  var a = {};
  a[v[maxDate]] = v[maxDate];
  return a;
};
/**
 * 重置数据
 * */
var restData = function restData(that) {
  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(that, that.$options.data());
};
/* harmony default export */ __webpack_exports__["a"] = ({
  showErrorInfo: showErrorInfo,
  showWaiting: showWaiting,
  closeWaiting: closeWaiting,
  produceRequestUrl: produceRequestUrl,
  getYearMonthDay: getYearMonthDay,
  getDate: getDate,
  getDays: getDays,
  getErrorCode: getErrorCode,
  getMaxDate: getMaxDate,
  getCode: getCode,
  restData: restData
});

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_custom__ = __webpack_require__(72);



// 设置 vue 提示功能关闭
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;

// 声明当前组件的类型
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = "app";

// 添加到vue原型上的工具(全局组件 / 请求 等)


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2__utils_custom__["a" /* default */]);

// 生成应用实例
var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);

// 挂载整个应用
app.$mount();

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(71);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(70)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56e2462d", Component.options)
  } else {
    hotAPI.reload("data-v-56e2462d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 70:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  created: function created() {
    wx.getSystemInfo({
      success: function success(res) {
        if (res.environment === undefined) {
          wx.showModal({
            title: "提示",
            content: "\u5FAE\u4FE1\u73AF\u5883 \u8BF7\u5207\u6362\u81F3 \u4F01\u4E1A\u5FAE\u4FE1",
            showCancel: false
          });
        } else {
          console.log("企业微信");

          var updateManager = wx.getUpdateManager();

          updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调，返回 true / false
            console.log(res);
            if (res.hasUpdate) {
              updateManager.onUpdateReady(function () {
                wx.showModal({
                  title: "更新提示",
                  content: "新版本已经准备好，是否重启应用？",
                  success: function success(res) {
                    if (res.confirm) {
                      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                      updateManager.applyUpdate();
                    }
                  }
                });
              });
              updateManager.onUpdateFailed(function () {
                // 新版本下载失败
                wx.showModal({
                  title: "发现新版本",
                  content: "请删除当前小程序，重新搜索打开..."
                });
              });
            }
          });
        }
      }
    });
  },

  methods: {},
  computed: {}
});

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_const__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_unit__ = __webpack_require__(58);




var install = function install(Vue) {
  // 数据集中管理的 vuex
  Vue.prototype.$store = __WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */];
  Vue.prototype.$constData = __WEBPACK_IMPORTED_MODULE_1__utils_const__;
  Vue.prototype.$unit = __WEBPACK_IMPORTED_MODULE_2__utils_unit__["a" /* default */];
};

/* harmony default export */ __webpack_exports__["a"] = (install);

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_request__ = __webpack_require__(74);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
  modules: {
    requestList: __WEBPACK_IMPORTED_MODULE_2__modules_request__["a" /* default */]
  },
  getters: {
    getVideoInfo: function getVideoInfo(state) {
      return state.requestList.getVideoInfo;
    },
    getAddressMulti: function getAddressMulti(state) {
      return state.requestList.getAddressMulti;
    }, // 获取通讯录参数多选
    getAddress: function getAddress(state) {
      return state.requestList.getAddress;
    }, // 获取通讯录参数单选
    registUser: function registUser(state) {
      return state.requestList.registUser;
    }
  }
}));

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_unit__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mutations__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flyio_dist_npm_wx__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_flyio_dist_npm_wx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_flyio_dist_npm_wx__);





var fly = new __WEBPACK_IMPORTED_MODULE_3_flyio_dist_npm_wx___default.a();

/* harmony default export */ __webpack_exports__["a"] = ({
  state: {
    registUser: "", // 注册用户
    setUserInfo: "", // 设置用户信息
    addTask: "", // 新建任务
    addTaskMember: "", // 添加 执行人-审查人
    getAddress: "", // 获取通讯录参数单选
    getAddressMulti: "", // 获取通讯录参数多选
    getTaskList: "", // 获得任务列表
    getTaskDetalis: "", // 获取任务详情
    getTaskReviewList: "", // 获取任务审核详情
    getTaskHolders: "", // 获取执行人 / 审查人
    getDisagree: "", // 获取拒绝原因
    setTask: "", // 对任务作出决定
    getReviewResultTime: "", // 获取我审查的时间点
    getReviewUserList: "", // 获取被审查人列表
    setReviewTask: "", // 审查任务
    getAnalysisList: "", // 获取统计管理人员统计
    getStaffChart: "", // 员工统计详细信息
    getEveryMonthDetails: "", // 每个月的详情
    getHasNotice: "", // 获取首页6个操作栏是否有新消息
    getNotice: "", // 获取各种消息
    addGLobalMember: "", // 添加管理员
    delGlobalMember: "", // 删除管理员
    getGlobalMember: "", // 获取管理员
    setFeedback: "", // 设置反馈
    modifyTask: "", // 修改任务
    getUserInfo: "", // 获取系统帮助权限
    getAdministrators: "", // 获取系统帮助管理员列表
    getVideoInfo: "", // 获取系统帮助视频
    setSystemNotice: "", // 设置消息
    withdrawReview: "" // 撤回审查任务
  },
  actions: {
    /**
     * 获取时间
     * */
    _getTime: function _getTime(_ref, params) {
      var commit = _ref.commit;
      var _ref2 = [params.im, params.fps, params.url],
          im = _ref2[0],
          fps = _ref2[1],
          url = _ref2[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 撤回审查任务
     * */
    _withdrawReview: function _withdrawReview(_ref3, params) {
      var commit = _ref3.commit;
      var _ref4 = [params.im, params.fps, params.url],
          im = _ref4[0],
          fps = _ref4[1],
          url = _ref4[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 设置消息
     * */
    _setSystemNotice: function _setSystemNotice(_ref5, params) {
      var commit = _ref5.commit;
      var _ref6 = [params.im, params.fps, params.url],
          im = _ref6[0],
          fps = _ref6[1],
          url = _ref6[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取系统帮助视频
     * */
    _getVideoInfo: function _getVideoInfo(_ref7, params) {
      var commit = _ref7.commit;
      var _ref8 = [params.im, params.fps, params.url],
          im = _ref8[0],
          fps = _ref8[1],
          url = _ref8[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          commit("GETVIDEOINFO", res);
          resolve(res);
        });
      });
    },

    /**
     * 获取系统帮助管理员列表
     * */
    _getAdministrators: function _getAdministrators(_ref9, params) {
      var commit = _ref9.commit;
      var _ref10 = [params.im, params.fps, params.url],
          im = _ref10[0],
          fps = _ref10[1],
          url = _ref10[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取系统帮助权限
     * */
    _getUserInfo: function _getUserInfo(_ref11, params) {
      var commit = _ref11.commit;
      var _ref12 = [params.im, params.fps, params.url],
          im = _ref12[0],
          fps = _ref12[1],
          url = _ref12[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 修改任务
     * */
    _modifyTask: function _modifyTask(_ref13, params) {
      var commit = _ref13.commit;
      var _ref14 = [params.im, params.fps, params.url],
          im = _ref14[0],
          fps = _ref14[1],
          url = _ref14[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 设置反馈
     * */
    _setFeedback: function _setFeedback(_ref15, params) {
      var commit = _ref15.commit;
      var _ref16 = [params.im, params.fps, params.url],
          im = _ref16[0],
          fps = _ref16[1],
          url = _ref16[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取管理员
     * */
    _getGlobalMember: function _getGlobalMember(_ref17, params) {
      var commit = _ref17.commit;
      var _ref18 = [params.im, params.fps, params.url],
          im = _ref18[0],
          fps = _ref18[1],
          url = _ref18[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 删除管理员
     * */
    _delGlobalMember: function _delGlobalMember(_ref19, params) {
      var commit = _ref19.commit;
      var _ref20 = [params.im, params.fps, params.url],
          im = _ref20[0],
          fps = _ref20[1],
          url = _ref20[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 添加管理员
     * */
    _addGLobalMember: function _addGLobalMember(_ref21, params) {
      var commit = _ref21.commit;
      var _ref22 = [params.im, params.fps, params.url],
          im = _ref22[0],
          fps = _ref22[1],
          url = _ref22[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取各种消息
     * */
    _getNotice: function _getNotice(_ref23, params) {
      var commit = _ref23.commit;
      var _ref24 = [params.im, params.fps, params.url],
          im = _ref24[0],
          fps = _ref24[1],
          url = _ref24[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取首页6个操作栏是否有新消息
     * */
    _getHasNotice: function _getHasNotice(_ref25, params) {
      var commit = _ref25.commit;
      var _ref26 = [params.im, params.fps, params.url],
          im = _ref26[0],
          fps = _ref26[1],
          url = _ref26[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 每个月的详情
     * */
    _getEveryMonthDetails: function _getEveryMonthDetails(_ref27, params) {
      var commit = _ref27.commit;
      var _ref28 = [params.im, params.fps, params.url],
          im = _ref28[0],
          fps = _ref28[1],
          url = _ref28[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 员工统计详细信息
     * */
    _getStaffChart: function _getStaffChart(_ref29, params) {
      var commit = _ref29.commit;
      var _ref30 = [params.im, params.fps, params.url],
          im = _ref30[0],
          fps = _ref30[1],
          url = _ref30[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取统计管理人员统计
     * */
    _getAnalysisList: function _getAnalysisList(_ref31, params) {
      var commit = _ref31.commit;
      var _ref32 = [params.im, params.fps, params.url],
          im = _ref32[0],
          fps = _ref32[1],
          url = _ref32[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 审查任务
     * */
    _setReviewTask: function _setReviewTask(_ref33, params) {
      var commit = _ref33.commit;
      var _ref34 = [params.im, params.fps, params.url],
          im = _ref34[0],
          fps = _ref34[1],
          url = _ref34[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取被审查人列表
     * */
    _getReviewUserList: function _getReviewUserList(_ref35, params) {
      var commit = _ref35.commit;
      var _ref36 = [params.im, params.fps, params.url],
          im = _ref36[0],
          fps = _ref36[1],
          url = _ref36[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取我审查的时间点
     * */
    _getReviewResultTime: function _getReviewResultTime(_ref37, params) {
      var commit = _ref37.commit;
      var _ref38 = [params.im, params.fps, params.url],
          im = _ref38[0],
          fps = _ref38[1],
          url = _ref38[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 对任务作出决定
     * */
    _setTask: function _setTask(_ref39, params) {
      var commit = _ref39.commit;
      var _ref40 = [params.im, params.fps, params.url],
          im = _ref40[0],
          fps = _ref40[1],
          url = _ref40[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取拒绝原因
     * */
    _getDisagree: function _getDisagree(_ref41, params) {
      var commit = _ref41.commit;
      var _ref42 = [params.im, params.fps, params.url],
          im = _ref42[0],
          fps = _ref42[1],
          url = _ref42[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取执行人 / 审查人
     * */
    _getTaskHolders: function _getTaskHolders(_ref43, params) {
      var commit = _ref43.commit;
      var _ref44 = [params.im, params.fps, params.url],
          im = _ref44[0],
          fps = _ref44[1],
          url = _ref44[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取任务审核详情
     * */
    _getTaskReviewList: function _getTaskReviewList(_ref45, params) {
      var commit = _ref45.commit;
      var _ref46 = [params.im, params.fps, params.url],
          im = _ref46[0],
          fps = _ref46[1],
          url = _ref46[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取任务详情
     * */
    _getTaskDetalis: function _getTaskDetalis(_ref47, params) {
      var commit = _ref47.commit;
      var _ref48 = [params.im, params.fps, params.url],
          im = _ref48[0],
          fps = _ref48[1],
          url = _ref48[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获得任务列表
     * */
    _getTaskList: function _getTaskList(_ref49, params) {
      var commit = _ref49.commit;
      var _ref50 = [params.im, params.fps, params.url],
          im = _ref50[0],
          fps = _ref50[1],
          url = _ref50[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 获取通讯录参数多选
     * */
    _getAddressMulti: function _getAddressMulti(_ref51, params) {
      var commit = _ref51.commit;
      var _ref52 = [params.im, params.fps, params.url],
          im = _ref52[0],
          fps = _ref52[1],
          url = _ref52[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          commit("GETADDRESSMULTI", res);
          resolve(res);
        });
      });
    },

    /**
     * 获取通讯录参数单选
     * */
    _getAddress: function _getAddress(_ref53, params) {
      var commit = _ref53.commit;
      var _ref54 = [params.im, params.fps, params.url],
          im = _ref54[0],
          fps = _ref54[1],
          url = _ref54[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          commit("GETADDRESS", res);
          resolve(res);
        });
      });
    },

    /**
     * 新建任务执行人-审查人
     * */
    _addTaskMember: function _addTaskMember(_ref55, params) {
      var commit = _ref55.commit;
      var _ref56 = [params.im, params.fps, params.url],
          im = _ref56[0],
          fps = _ref56[1],
          url = _ref56[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 新建任务
     * */
    _addTask: function _addTask(_ref57, params) {
      var commit = _ref57.commit;
      var _ref58 = [params.im, params.fps, params.url],
          im = _ref58[0],
          fps = _ref58[1],
          url = _ref58[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 设置用户信息
     * */
    _setUserInfo: function _setUserInfo(_ref59, params) {
      var commit = _ref59.commit;
      var _ref60 = [params.im, params.fps, params.url],
          im = _ref60[0],
          fps = _ref60[1],
          url = _ref60[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          resolve(res);
        });
      });
    },

    /**
     * 注册用户
     * */
    _registUser: function _registUser(_ref61, params) {
      var commit = _ref61.commit;
      var _ref62 = [params.im, params.fps, params.url],
          im = _ref62[0],
          fps = _ref62[1],
          url = _ref62[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_1__utils_unit__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          commit("REGISTUSER", res);
          resolve(res);
        });
      });
    }
  },
  mutations: __WEBPACK_IMPORTED_MODULE_2__mutations__["a" /* default */]
});

/***/ })

},[68]);