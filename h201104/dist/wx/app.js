require("./common/manifest.js")
require("./common/vendor.js")
global.webpackJsonpMpvue([1],{

/***/ 100:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    selected: {
      type: Number,
      default: 0
    },
    messageCount: {
      type: Number
    }
  },
  data: function data() {
    return {
      color: "#707070",
      selectedColor: "#19be6b",
      list: [{
        pagePath: "/pages/index/main",
        iconPath: "../../static/images/shouye_n.png",
        selectedIconPath: "../../static/images/shouye_y.png",
        text: "首页"
      }, {
        pagePath: "/pages/call_line/main",
        iconPath: "../../static/images/xinxi_n.png",
        selectedIconPath: "../../static/images/xinxi_y.png",
        text: "信息"
      }, {
        pagePath: "/pages/my_center/main",
        iconPath: "../../static/images/wode_n.png",
        selectedIconPath: "../../static/images/wode_y.png",
        text: "我的"
      }]
    };
  },
  mounted: function mounted() {},

  methods: {
    switchTab: function switchTab(e) {
      var data = e.mp.currentTarget.dataset;
      var url = data.path;
      wx.switchTab({
        url: url
      });
    }
  },
  computed: {
    _index: function _index() {
      return +this.selected;
    }
  }
});

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [_c('cover-view', {
    staticClass: "tab-bar",
    attrs: {
      "mpcomid": '5'
    }
  }, [_c('cover-view', {
    staticClass: "tab-bar-border",
    attrs: {
      "mpcomid": '0'
    }
  }), _vm._v(" "), _vm._l((_vm.list), function(item, index) {
    return _c('cover-view', {
      key: index,
      staticClass: "tab-bar-item",
      attrs: {
        "data-path": item.pagePath,
        "data-index": index,
        "eventid": '0_' + index,
        "mpcomid": '4_' + index
      },
      on: {
        "click": _vm.switchTab
      }
    }, [_c('cover-image', {
      attrs: {
        "src": _vm._index === index ? item.selectedIconPath : item.iconPath,
        "mpcomid": '1_' + index
      }
    }), _vm._v(" "), _c('cover-view', {
      style: ({
        color: _vm._index === index ? _vm.selectedColor : _vm.color
      }),
      attrs: {
        "mpcomid": '2_' + index
      }
    }, [_vm._v(_vm._s(item.text))]), _vm._v(" "), (index === 1 && _vm.messageCount != 0) ? _c('cover-view', {
      staticClass: "message",
      attrs: {
        "mpcomid": '3_' + index
      }
    }, [_vm._v(_vm._s(_vm.messageCount))]) : _vm._e()], 1)
  })], 2)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-036428c0", esExports)
  }
}

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);


/**
 * 展示错误
 * error_code 错误号
 * errorFace 接口名字
 * errorInfo 错误信息
 * */
var showErrorInfo = function showErrorInfo(errorInfo, errorFace) {
  var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {
    return "";
  };

  var _errorInfo = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, errorInfo),
      error_code = _errorInfo.error_code,
      error_info = _errorInfo.error_info;

  wx.showModal({
    title: "" + errorFace,
    showCancel: false,
    content: "" + error_info,
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
  return {
    year: year,
    month: month,
    day: day
  };
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
 * 格式化时间几秒前几天前几个月前
 * */
var format = function format(time) {
  var publishTime = Date.parse(time.replace(/-/gi, "/")) / 1000,
      d_seconds = void 0,
      d_minutes = void 0,
      d_hours = void 0,
      d_days = void 0,
      timeNow = parseInt(new Date().getTime() / 1000),
      d = void 0,
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
  format: format,
  getDays: getDays,
  getMaxDate: getMaxDate,
  restData: restData
});

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_config__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_utils__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__custom_tab_bar___ = __webpack_require__(99);







__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$store = __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$Config = __WEBPACK_IMPORTED_MODULE_3__utils_config__;
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.prototype.$Utils = __WEBPACK_IMPORTED_MODULE_4__utils_utils__["a" /* default */];
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('tab', __WEBPACK_IMPORTED_MODULE_5__custom_tab_bar___["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */].mpType = "app";

var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__App__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(63);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(62)
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

/***/ 62:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_flyio_dist_npm_wx__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_flyio_dist_npm_wx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_flyio_dist_npm_wx__);






var fly = new __WEBPACK_IMPORTED_MODULE_4_flyio_dist_npm_wx___default.a();

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* default */].Store({
  state: {
    openid: "",
    message_count: ""
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
     * 获取信息条数
     * */
    getMessageCount: function getMessageCount(_ref5, params) {
      var commit = _ref5.commit;
      var _ref6 = [params.im, params.fps, params.url],
          im = _ref6[0],
          fps = _ref6[1],
          url = _ref6[2];

      var requestUrl = __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* default */].produceRequestUrl(im, fps, url);
      return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
        fly.get(requestUrl).then(function (res) {
          commit("setMessageCount", res.data);
          resolve(res.data);
        });
      });
    }
  },
  mutations: {
    setOpenid: function setOpenid(state, res) {
      state.openid = res;
    },
    setMessageCount: function setMessageCount(state, res) {
      state.message_count = res;
    }
  },
  getters: {
    openid: function openid(state) {
      return state.openid;
    },
    message_count: function message_count(state) {
      return state.message_count;
    }
  }
}));

/***/ }),

/***/ 98:
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
var VERSION = "v3.0.3";

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
  get_occupation_list: 'get_occupation_list',
  get_unread_message: 'get_unread_message',
  read_message: 'read_message',
  set_initiate_a_session: 'set_initiate_a_session',
  accuse_message: 'accuse_message',
  revoke_message: 'revoke_message',
  conceal_message: 'conceal_message',
  set_reply_to_message: 'set_reply_to_message',
  get_chat_record_info: 'get_chat_record_info',
  get_chat_record_list: "get_chat_record_list",
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



/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_036428c0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(102);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(100)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-036428c0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_036428c0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/custom-tab-bar/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-036428c0", Component.options)
  } else {
    hotAPI.reload("data-v-036428c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[60]);