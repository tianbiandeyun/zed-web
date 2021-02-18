require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([1],{

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscribe__ = __webpack_require__(140);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__subscribe__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_subscribe_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_30ff2f28_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_subscribe_vue__ = __webpack_require__(151);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(141)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-30ff2f28"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_subscribe_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_30ff2f28_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_subscribe_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/subscribe/subscribe.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] subscribe.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30ff2f28", Component.options)
  } else {
    hotAPI.reload("data-v-30ff2f28", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 141:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_listItem__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_login__ = __webpack_require__(17);



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
  name: "subscribe",
  components: { listItem: __WEBPACK_IMPORTED_MODULE_3__components_listItem__["a" /* default */] },
  mixins: [__WEBPACK_IMPORTED_MODULE_4__utils_login__["a" /* default */]],
  data: function data() {
    return {
      popup_show: false,
      list: [],
      openid_info: "",
      user_info: [], // 打开签到之后展示的 name status photo id
      activity_id: "" // 活动 id
    };
  },
  onShow: function onShow() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              wx.hideHomeButton();

              _this.$Utils.showWaiting("正在加载");

              _context.next = 4;
              return _this.getOpenid();

            case 4:
              _this.openid_info = _context.sent;
              _context.next = 7;
              return _this.refreshList();

            case 7:

              _this.$Utils.closeWaiting();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  methods: {
    /**
     * 确认签到
     * */
    isMe: function isMe() {
      var _this2 = this;

      var u_key = this.user_info[3];
      var photo = this.user_info[4];

      this.$Utils.showWaiting("签到中");

      // 保存用户头像
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.set_user_photo,
        fps: {
          open_id: this.openid_info.back_value.open_id,
          wx_photo: photo
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this2.$Utils.showErrorInfo(res, "set_user_photo");
        } else {
          if (res.back_value) {

            // 签到成功
            _this2.$store.dispatch("fetch", {
              im: _this2.$Config.INTER_FACE.set_punch_the_clock,
              fps: {
                open_id: _this2.openid_info.back_value.open_id,
                activity_id: _this2.activity_id,
                u_key: u_key
              },
              url: _this2.$Config.REQUEST_URI
            }).then(function () {
              var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2(res) {
                return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:

                        _this2.$Utils.closeWaiting();

                        if (res.result === "failure") {

                          if (res.error_code === 2012140710 || res.error_code === "2012140710") {
                            wx.showModal({
                              title: "提示",
                              showCancel: false,
                              content: "请选择本人，进行签到",
                              success: function success(res) {}
                            });
                          } else {
                            _this2.$Utils.showErrorInfo(res, "set_punch_the_clock");
                          }
                        } else {
                          _this2.popup_show = false;
                          _this2.user_info = [];
                          // 跳转页面
                          wx.navigateTo({
                            url: "/pages/subscribe_details/main?activity_id=" + _this2.activity_id
                          });
                        }

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this2);
              }));

              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }());
          }
        }
      });
    },

    /**
     * 打开签到
     * */
    signIn: function signIn(res) {

      this.user_info = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.user_info), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(res));

      this.popup_show = true;
    },
    closePopup: function closePopup() {
      this.popup_show = false;
      this.user_info = [];
    },

    /**
     * 请求数据
     * */
    refreshList: function refreshList() {
      var _this3 = this;

      // 获取 活动 ID
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_activity_id,
        fps: { open_id: this.openid_info.back_value.open_id },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {

        if (res.result === "failure") {
          _this3.$Utils.closeWaiting();
          _this3.$Utils.showErrorInfo(res, "get_activity_id");
        } else {
          _this3.activity_id = res.back_value;

          // 判断是否 签到过
          return _this3.$store.dispatch("fetch", {
            im: _this3.$Config.INTER_FACE.has_punch_the_clock,
            fps: {
              open_id: _this3.openid_info.back_value.open_id,
              activity_id: res.back_value
            },
            url: _this3.$Config.REQUEST_URI
          });
        }
      }).then(function (res) {

        if (res.result === "failure") {
          _this3.$Utils.closeWaiting();
          _this3.$Utils.showErrorInfo(res, "has_punch_the_clock");
        } else {

          if (res.back_value) {
            // 报过名 -> 签到成功
            wx.redirectTo({
              url: "/pages/subscribe_details/main?activity_id=" + _this3.activity_id
            });
          } else {
            // 无报名

            // 获取 签到 列表
            _this3.$store.dispatch("fetch", {
              im: _this3.$Config.INTER_FACE.get_activity_member_list,
              fps: {
                open_id: _this3.openid_info.back_value.open_id,
                activity_id: _this3.activity_id
              },
              url: _this3.$Config.REQUEST_URI
            }).then(function (res) {
              if (res.result === "failure") {
                _this3.$Utils.closeWaiting();
                _this3.$Utils.showErrorInfo(res, "get_activity_member_list");
              } else {
                var result = res.back_value;

                for (var i = 0; i < result.length; i++) {
                  if (result[i].display != 2) {
                    result.splice(i, 1);
                  }
                }

                _this3.list = result;
              }
            });
          }
        }
      });
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    var _this4 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this4.$Utils.showWaiting();
              _context3.next = 3;
              return _this4.refreshList();

            case 3:
              _this4.$Utils.closeWaiting();
              wx.stopPullDownRefresh();

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this4);
    }))();
  }
});

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_listItem_vue__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_ae71b0c8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_listItem_vue__ = __webpack_require__(150);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(148)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ae71b0c8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_listItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_ae71b0c8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_listItem_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/listItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] listItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ae71b0c8", Component.options)
  } else {
    hotAPI.reload("data-v-ae71b0c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 148:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);

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
  name: "listItem",
  data: function data() {
    return {
      photo: "",
      disabled: false
    };
  },

  props: {
    item: {
      type: Object
    }
  },
  mounted: function mounted() {
    if (this.item.status != 1) {
      this.disabled = true;
    }
  },

  methods: {
    info: function info(e) {
      if (e.mp.detail.errMsg !== "getUserInfo:fail auth deny") {
        for (var _len = arguments.length, res = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          res[_key - 1] = arguments[_key];
        }

        this.$emit("signIn", [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(res), [JSON.parse(e.mp.detail.rawData).avatarUrl]));
      } else {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "请授权头像信息，否则无法签到",
          success: function success(res) {}
        });
      }
    }
  }
});

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "listItem-container"
  }, [_c('div', {
    staticClass: "list-item"
  }, [_c('div', {
    staticClass: "list-item-left"
  }, [_c('img', {
    attrs: {
      "src": _vm.item.head_portrait,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "list-item-right"
  }, [_c('div', {
    staticClass: "list-item-right-top"
  }, [_c('div', [_vm._v(_vm._s(_vm.item.name))]), _vm._v(" "), _c('div', [_c('button', {
    class: _vm.item.status == 1 ? '' : 'active_p',
    attrs: {
      "open-type": "getUserInfo",
      "disabled": _vm.disabled,
      "eventid": '0'
    },
    on: {
      "getuserinfo": function($event) {
        _vm.info($event, _vm.item.name, _vm.item.status, _vm.item.head_portrait, _vm.item.u_key)
      }
    }
  }, [_vm._v("\n            " + _vm._s(_vm.item.status == 1 ?
    "签到" : "已签到") + "\n          ")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "list-item-right-bottom"
  }, [_vm._v("\n        " + _vm._s(_vm.item.company) + " | " + _vm._s(_vm.item.job_description) + "\n      ")])])])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-ae71b0c8", esExports)
  }
}

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "list-container"
  }, [_c('div', {
    staticClass: "list-tip"
  }, [_vm._v("嘉宾列表（请点击签到）：")]), _vm._v(" "), _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index
    }, [_c('listItem', {
      attrs: {
        "item": item,
        "eventid": '0_' + index,
        "mpcomid": '0_' + index
      },
      on: {
        "signIn": _vm.signIn
      }
    })], 1)
  }), _vm._v(" "), _c('v-popup', {
    attrs: {
      "show": _vm.popup_show,
      "closeable": "",
      "round": "",
      "eventid": '2',
      "mpcomid": '1'
    },
    on: {
      "close": _vm.closePopup
    }
  }, [_c('div', {
    staticClass: "popup-container"
  }, [_c('div', {
    staticClass: "popup-photo"
  }, [_c('img', {
    attrs: {
      "src": _vm.user_info[2],
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "popup-name"
  }, [_vm._v(_vm._s(_vm.user_info[0]))]), _vm._v(" "), _c('div', {
    staticClass: "popup-signin"
  }, [_c('button', {
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.isMe
    }
  }, [_vm._v("确认是我")])], 1)])])], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-30ff2f28", esExports)
  }
}

/***/ })

},[139]);