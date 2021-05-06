require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([2],{

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(172);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_acdec794_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(180);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(173)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-acdec794"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_acdec794_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/index/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-acdec794", Component.options)
  } else {
    hotAPI.reload("data-v-acdec794", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 173:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_CK_index_operat_CKindexOperat__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_CK_notice_list_CKnoticeList__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_mixins__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vuex__ = __webpack_require__(2);



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
//
//
//







/* harmony default export */ __webpack_exports__["a"] = ({
  components: { CKindexOperat: __WEBPACK_IMPORTED_MODULE_3__components_CK_index_operat_CKindexOperat__["a" /* default */], CKtitleNotice: __WEBPACK_IMPORTED_MODULE_4__components_CK_title_notice_CKtitleNotice__["a" /* default */], CKnoticeList: __WEBPACK_IMPORTED_MODULE_5__components_CK_notice_list_CKnoticeList__["a" /* default */] },
  data: function data() {
    return {
      is_popup: false,
      has_notice: "",
      notice_list: "",
      corpid: ""
    };
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_6__utils_mixins__["a" /* default */]],
  onShow: function onShow() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
      var that, avatar;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              that = _this;

              that.$unit.showWaiting();

              // 注册用户，获取 企业ID 和 userid
              _context.next = 4;
              return that._regist_user();

            case 4:

              // 服务器返回的头像 corpid
              avatar = that.registUser.data.back_value.avatar;


              if (avatar) {
                // 头像存在
                that.refreshIndex();
              } else {
                that.$unit.closeWaiting();
                that._getUserAvatar();
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  methods: {
    /**
     * 设置用户信息
     * */
    _setUserInfo: function _setUserInfo(avatar) {
      var that = this;
      that.$store.dispatch("_setUserInfo", {
        im: that.$constData.INTER_FACE.set_user_info,
        fps: {
          userid: that.registUser.data.back_value.userid,
          avatar: avatar
        },
        url: that.$constData.REQUEST_URI
      }).then(function (res) {
        if (res.data.back_value) {
          console.log(res.data);
        }
        if (res.data.result === "failure") {
          that.$unit.showErrorInfo(res.data, "set_user_info");
        }
      });
    },

    /**
     * 获取头像
     * */
    _getUserAvatar: function _getUserAvatar() {
      var that = this;
      wx.qy.getAvatar({
        success: function success(res) {
          that.is_popup = false;
          that._setUserInfo(res.avatar);
        },
        fail: function fail(res) {
          console.log(res);
          that.is_popup = true;
        }
      });
    },

    /**
     * 前往消息详情
     * */
    goNotice: function goNotice(notice_id) {
      var that = this;
      that.$store.dispatch("_setSystemNotice", {
        im: that.$constData.INTER_FACE.set_message_status,
        fps: {
          userid: that.registUser.data.back_value.userid,
          msg_id: notice_id
        },
        url: that.$constData.REQUEST_URI
      }).then(function (res) {
        if (res.data.result === "failure") {
          that.$unit.showErrorInfo(res.data, "set_message_status");
        } else {
          if (res.data.back_value) {
            wx.navigateTo({
              url: "/pages/all_notice/main"
            });
          }
        }
      });
    },

    /**
     * 前往操作页面
     * */
    goPage: function goPage(res) {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var that, page;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this2;
                page = that.$constData.PAGE[res];

                wx.navigateTo({
                  url: "/pages/" + page + "/main"
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },

    /**
     * 拒绝之后再次获取头像
     * */
    operatAgeing: function operatAgeing() {
      var that = this;
      that._getUserAvatar();
    },
    refreshIndex: function refreshIndex() {
      var _this3 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
        var that;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = _this3;

                // 获取通讯录参数 单选 / 多选

                _context3.next = 3;
                return that.$store.dispatch("_getAddress", {
                  im: that.$constData.INTER_FACE.get_select_enterprise_contact,
                  fps: { type: "" },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_select_enterprise_contact");
                  }
                  if (res.data.back_value) {
                    return that.$store.dispatch("_getAddressMulti", {
                      im: that.$constData.INTER_FACE.get_select_enterprise_contact,
                      fps: { type: "multi" },
                      url: that.$constData.REQUEST_URI
                    });
                  }
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_select_enterprise_contact");
                  }
                });

              case 3:
                _context3.next = 5;
                return that.$store.dispatch("_getHasNotice", {
                  im: that.$constData.INTER_FACE.has_notice,
                  fps: {
                    userid: that.registUser.data.back_value.userid
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "has_notice");
                  } else {
                    console.log(res.data.back_value);
                    that.has_notice = res.data.back_value;
                  }
                });

              case 5:
                _context3.next = 7;
                return that.$store.dispatch("_getNotice", {
                  im: that.$constData.INTER_FACE.get_notice_list,
                  fps: {
                    userid: that.registUser.data.back_value.userid,
                    mag_type: "",
                    start: 0,
                    len: 200
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_notice_list");
                  } else {
                    that.notice_list = res.data.back_value;
                  }
                });

              case 7:

                that.$unit.closeWaiting();

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_7_vuex__["b" /* mapGetters */])(["registUser"])),
  onPullDownRefresh: function onPullDownRefresh() {
    var _this4 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee4() {
      var that;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              that = _this4;

              that.$unit.showWaiting();
              that.refreshIndex();
              wx.stopPullDownRefresh();

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  }
});

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKindexOperat_vue__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_741ef5cc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKindexOperat_vue__ = __webpack_require__(178);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(176)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-741ef5cc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKindexOperat_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_741ef5cc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKindexOperat_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_index_operat/CKindexOperat.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKindexOperat.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-741ef5cc", Component.options)
  } else {
    hotAPI.reload("data-v-741ef5cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 176:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 177:
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
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: "operat.vue",
  props: {
    hasNotice: {
      type: Object
    }
  },
  methods: {
    operat: function operat(index) {
      var that = this;
      that.$emit("operat", index);
    }
  }
});

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "operat-container"
  }, [_c('div', {
    staticClass: "operat-item"
  }, [_c('div', {
    staticClass: "left",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        _vm.operat(0)
      }
    }
  }, [(_vm.hasNotice.user_task) ? _c('img', {
    staticClass: "tip",
    attrs: {
      "src": "../../../static/images/redTip.png",
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), _c('img', {
    staticClass: "show-img",
    attrs: {
      "src": "../../../static/images/assess.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("我的考核")])], 1), _vm._v(" "), _c('div', {
    staticClass: "right",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": function($event) {
        _vm.operat(1)
      }
    }
  }, [(_vm.hasNotice.review_task) ? _c('img', {
    staticClass: "tip",
    attrs: {
      "src": "../../../static/images/redTip.png",
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), _c('img', {
    staticClass: "show-img",
    attrs: {
      "src": "../../../static/images/review.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("我的审查")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "operat-item"
  }, [_c('div', {
    staticClass: "left",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": function($event) {
        _vm.operat(2)
      }
    }
  }, [(_vm.hasNotice['create']) ? _c('img', {
    staticClass: "tip",
    attrs: {
      "src": "../../../static/images/redTip.png",
      "alt": ""
    }
  }) : _vm._e(), _vm._v(" "), _c('img', {
    staticClass: "show-img",
    attrs: {
      "src": "../../../static/images/created.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("统计管理")])], 1), _vm._v(" "), _c('div', {
    staticClass: "right",
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": function($event) {
        _vm.operat(3)
      }
    }
  }, [_c('img', {
    staticClass: "show-img",
    attrs: {
      "src": "../../../static/images/analysis.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("应用设置")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "operat-item"
  }, [_c('div', {
    staticClass: "left",
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": function($event) {
        _vm.operat(4)
      }
    }
  }, [_c('img', {
    staticClass: "show-img",
    attrs: {
      "src": "../../../static/images/setup.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("建议反馈")])], 1), _vm._v(" "), _c('div', {
    staticClass: "right",
    attrs: {
      "eventid": '5'
    },
    on: {
      "click": function($event) {
        _vm.operat(5)
      }
    }
  }, [_c('img', {
    staticClass: "show-img",
    attrs: {
      "src": "../../../static/images/feedback.png",
      "alt": ""
    }
  }), _vm._v(" "), _c('p', [_vm._v("系统帮助")])], 1)])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-741ef5cc", esExports)
  }
}

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);


/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    /**
     * 注册用户，获取 企业ID 和 userid
     * */
    _regist_user: function _regist_user() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var that, code;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this;
                _context2.next = 3;
                return that.$unit.getCode();

              case 3:
                code = _context2.sent;
                _context2.next = 6;
                return that.$store.dispatch("_registUser", {
                  im: that.$constData.INTER_FACE.regist_user,
                  fps: { code: code },
                  url: that.$constData.REQUEST_URI
                }).then(function () {
                  var _ref = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee(res) {
                    return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (res.data.result === "failure") {
                              that.$unit.closeWaiting();
                              that.$unit.showErrorInfo(res.data, "regist_user");
                            } else {
                              // qy_id 如果存在，则无需添加
                              if (that.getUrlParam("qy_id", that.$constData.REQUEST_URI)) {} else {
                                that.$constData.SET_REQUEST_URI(res.data.back_value.corpid);
                              }
                            }

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }))();
    },
    getUrlParam: function getUrlParam(name, url) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
      var r = url.substr(1).match(reg); // 匹配目标参数
      if (r != null) return decodeURI(r[2]);
      return null; // 返回参数值
    }
  }
});

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "index-container"
  }, [_c('div', {
    staticClass: "index-background"
  }), _vm._v(" "), _c('CKindexOperat', {
    attrs: {
      "has-notice": _vm.has_notice,
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "operat": _vm.goPage
    }
  }), _vm._v(" "), _c('CKtitleNotice', {
    attrs: {
      "ord-message": "系统通知",
      "mpcomid": '1'
    }
  }), _vm._v(" "), _vm._l((_vm.notice_list), function(item, index) {
    return _c('div', {
      key: index
    }, [_c('div', {
      staticClass: "notice-list-item-container"
    }, [_c('div', {
      staticClass: "notice-list-item",
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.goNotice(item.id)
        }
      }
    }, [(item.status === 1) ? _c('img', {
      staticClass: "notice-list-item-hd",
      attrs: {
        "src": "../../../static/images/redTip.png",
        "alt": ""
      }
    }) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "notice-list-item-text"
    }, [_c('CKnoticeList', {
      attrs: {
        "item": item.title,
        "mpcomid": '2_' + index
      }
    })], 1), _vm._v(" "), _c('img', {
      staticClass: "notice-list-item-rg",
      attrs: {
        "src": "../../../static/images/right.png",
        "alt": ""
      }
    })])])])
  }), _vm._v(" "), _c('v-popup', {
    attrs: {
      "show": _vm.is_popup,
      "mpcomid": '3'
    }
  }, [_c('div', {
    staticClass: "get-avatar"
  }, [_c('div', {
    staticClass: "get-avatar-title"
  }, [_c('p', [_vm._v("程序需要使用您的头像")]), _vm._v(" "), _c('p', [_vm._v("用于展示请授权后使用")])], 1), _vm._v(" "), _c('button', {
    staticClass: "get-avatar-button",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.operatAgeing
    }
  }, [_vm._v("再次授权")])], 1)])], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-acdec794", esExports)
  }
}

/***/ })

},[171]);