require("./common/manifest.js")
require("./common/vendor.js")
global.webpackJsonpMpvue([2],{

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);

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
    title: res || "加载中",
    mask: true
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
    2000920: "openid 错误",
    2011130201: "未报名参加此次活动",
    1100852: "参数错误"
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
  restData: restData
});

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_config__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__(52);






__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$store = __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$Config = __WEBPACK_IMPORTED_MODULE_3__utils_config__;
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$Utils = __WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* default */];

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = "app";

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(60);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(59)
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
    hotAPI.createRecord("data-v-6a3bfb1a", Component.options)
  } else {
    hotAPI.reload("data-v-6a3bfb1a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 59:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_flyio_dist_npm_wx__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_flyio_dist_npm_wx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_flyio_dist_npm_wx__);






var fly = new __WEBPACK_IMPORTED_MODULE_4_flyio_dist_npm_wx___default.a();

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* default */].Store({
  state: {
    openid: "",
    is_registration: "",
    user_info: ""
  },
  actions: {
    /**
     * 通用
     * */
    fetch: function fetch(_ref, params) {
      var commit = _ref.commit;
      var _ref2 = [params.im, params.fps, params.url, params.method],
          im = _ref2[0],
          fps = _ref2[1],
          url = _ref2[2],
          method = _ref2[3];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* default */].produceRequestUrl(im, fps, url, method);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        if (method === "get") {
          fly.get(requestUrl).then(function (res) {
            resolve(res.data);
          });
        } else {
          fly.post(requestUrl, fps).then(function (res) {
            resolve(res.data);
          });
        }
      });
    },


    /**
     * 获取 openid
     * */
    getOpenid: function getOpenid(_ref3, params) {
      var commit = _ref3.commit;
      var _ref4 = [params.im, params.fps, params.url],
          im = _ref4[0],
          fps = _ref4[1],
          url = _ref4[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          commit("setOpenid", res.data);
          resolve(res.data);
        });
      });
    },


    /**
     * 是否 报名
     * */
    isRegistration: function isRegistration(_ref5, params) {
      var commit = _ref5.commit;
      var _ref6 = [params.im, params.fps, params.url],
          im = _ref6[0],
          fps = _ref6[1],
          url = _ref6[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          commit("setRegistration", res.data);
          resolve(res.data);
        });
      });
    },


    /**
     * 获取用户填写的信息
     * */
    getUserInfo: function getUserInfo(_ref7, params) {
      var commit = _ref7.commit;
      var _ref8 = [params.im, params.fps, params.url],
          im = _ref8[0],
          fps = _ref8[1],
          url = _ref8[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          commit("getUserInfo", res.data);
          resolve(res.data);
        });
      });
    }
  },
  mutations: {
    setOpenid: function setOpenid(state, res) {
      state.openid = res;
    },
    setRegistration: function setRegistration(state, res) {
      state.is_registration = res;
    },
    getUserInfo: function getUserInfo(state, res) {
      state.user_info = res;
    }
  },
  getters: {
    openid: function openid(state) {
      return state.openid;
    },
    is_registration: function is_registration(state) {
      return state.is_registration;
    },
    user_info: function user_info(state) {
      return state.user_info;
    }
  }
}));

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUEST_URI", function() { return REQUEST_URI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INTER_FACE", function() { return INTER_FACE; });
/**
 * 项目编号
 * */
var CONST_APP_IC = "h201104";

/**
 * 版本号
 * */
var VERSION = "v3.0.0";

/**
 * 请求域名
 * */
// const CONST_REQUEST_URI = "https://testphp.hztc.dev.hztcapp.com/test_index.php"; // 开发
var CONST_REQUEST_URI = "https://hztc.dev.hztcapp.com/index.php"; // 正式

/**
 * 请求地址
 * */
var REQUEST_URI = CONST_REQUEST_URI + "?r=interface/api&ic=" + CONST_APP_IC;

/**
 * 接口列表
 * */
var INTER_FACE = {
  get_activity_id: "get_activity_id",
  get_member_info: "get_member_info",
  make_img_route: "make_img_route",
  update_user_info: "update_user_info",
  get_user_info: "get_user_info",
  get_user_sign_up_status: "get_user_sign_up_status",
  get_salon_activity_info: "get_salon_activity_info",
  get_salon_activity_list: "get_salon_activity_list",
  getplayerinfo: "getplayerinfo",
  set_update_user_info: "set_update_user_info",

  set_user_photo: "set_user_photo",
  get_registration_info: "get_registration_info",
  has_punch_the_clock: "has_punch_the_clock",
  set_enter_info: "set_enter_info",
  get_organizers_info: "get_organizers_info",
  set_registration: "set_registration",
  get_member_checkin_info: "get_member_checkin_info",
  has_registration: "has_registration",
  set_punch_the_clock: "set_punch_the_clock",
  get_activity_member_list: "get_activity_member_list",
  get_user_phone: "get_user_phone",
  xi_login: "xi_login"
};



/***/ })

},[57]);