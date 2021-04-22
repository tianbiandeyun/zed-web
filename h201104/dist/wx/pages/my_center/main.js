require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([11],{

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__my_center__ = __webpack_require__(164);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__my_center__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_my_center_vue__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_32e6eee8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_my_center_vue__ = __webpack_require__(167);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(165)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-32e6eee8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_my_center_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_32e6eee8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_my_center_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/my_center/my_center.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] my_center.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32e6eee8", Component.options)
  } else {
    hotAPI.reload("data-v-32e6eee8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 165:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_login__ = __webpack_require__(13);



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
  name: "user_center",
  mixins: [__WEBPACK_IMPORTED_MODULE_4__utils_login__["a" /* default */]],
  data: function data() {
    return {
      message_count: 0, // 信息条数
      u_key: '', // 本人 key
      user_info: "", // 获取个人信息
      is_phone: 1, // 电话是否公开 
      is_mail: 1 // 邮箱是否公开
    };
  },
  onShow: function onShow() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              _this.$Utils.showWaiting();

              // 获取 u_key 个人信息 
              _context.next = 3;
              return _this.$store.dispatch("fetch", {
                im: _this.$Config.INTER_FACE.get_member_info,
                fps: {
                  open_id: _this.openid.back_value.open_id,
                  u_key: ""
                },
                url: _this.$Config.REQUEST_URI
              }).then(function (res) {
                if (res.result === "failure") {
                  _this.$Utils.closeWaiting();
                  _this.$Utils.showErrorInfo(res, "get_member_info");
                } else {
                  if (res.back_value.inner_data === null || res.back_value.inner_data === '') {
                    wx.showModal({
                      title: "inner_data",
                      showCancel: false,
                      content: "res.back_value.inner_data \u662F null \u6216\u8005 \u7A7A",
                      success: function success() {}
                    });
                    return false;
                  }
                  _this.is_phone = res.back_value.inner_data.phone_restrict;
                  _this.is_mail = res.back_value.inner_data.mail_restrict;
                  _this.user_info = res.back_value;
                  _this.u_key = res.back_value.u_key;
                }
              });

            case 3:

              _this.refreshUserCenter(_this.u_key);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  methods: {
    /**
     * 编辑信息
     */
    edit: function edit(res) {
      if (res === 1) {
        wx.navigateTo({
          url: "/pages/user_center_jichu/main"
        });
      } else {
        wx.navigateTo({
          url: "/pages/user_center_jieshao/main"
        });
      }
    },
    refreshUserCenter: function refreshUserCenter(u_key) {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.$store.dispatch("fetch", {
                  im: _this2.$Config.INTER_FACE.get_unread_message,
                  fps: {
                    u_key: u_key
                  },
                  url: _this2.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    _this2.$Utils.closeWaiting();
                    _this2.$Utils.showErrorInfo(res, "get_unread_message");
                  } else {
                    _this2.message_count = res.back_value;
                  }
                });

              case 2:
                _this2.$Utils.closeWaiting();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapGetters */])(["openid"])),
  onUnload: function onUnload() {
    this.$Utils.restData(this);
  },
  onPullDownRefresh: function onPullDownRefresh() {
    var _this3 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this3.$Utils.showWaiting();
              _context3.next = 3;
              return _this3.refreshUserCenter(_this3.u_key);

            case 3:
              wx.stopPullDownRefresh();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  }
});

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "user-center-container"
  }, [_c('div', {
    staticClass: "basis box"
  }, [_c('div', {
    staticClass: "basis-name"
  }, [_c('span', [_vm._v(_vm._s(_vm.user_info.name === null || _vm.user_info.name === "" ? "无" : _vm.user_info.name))]), _vm._v(" "), (_vm.user_info.sex == 1) ? _c('img', {
    attrs: {
      "src": "../../../static/images/nan.png",
      "alt": ""
    }
  }) : _c('img', {
    attrs: {
      "src": "../../../static/images/nv.png",
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "basis-company"
  }, [_c('span', [_vm._v(_vm._s(_vm.user_info.company === null || _vm.user_info.company === "" ? "暂无企业" : _vm.user_info.company))]), _vm._v(" "), (_vm.openid.back_value.open_id === _vm.user_info.open_id) ? _c('span', {
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        _vm.edit(1)
      }
    }
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/bianji.png",
      "alt": ""
    }
  }), _vm._v("\n        编辑\n      ")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "basis-other"
  }, [_c('span', [_vm._v("职务：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.user_info.job_description === null || _vm.user_info.job_description === "" ? "无" : _vm.user_info.job_description))])]), _vm._v(" "), _c('div', {
    staticClass: "basis-other"
  }, [_c('span', [_vm._v("电话：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.user_info.phone === null || _vm.user_info.phone === "" ? "暂无电话" : _vm.user_info.phone) + " "), (_vm.openid.back_value.open_id === _vm.user_info.open_id) ? _c('span', [_vm._v(_vm._s(_vm.is_phone == 1 ? "（公开）" : "（仅自己可见）"))]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "basis-other"
  }, [_c('span', [_vm._v("邮箱：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.user_info.mail === null || _vm.user_info.mail === "" ? "暂无邮箱" : _vm.user_info.mail) + " "), (_vm.openid.back_value.open_id === _vm.user_info.open_id) ? _c('span', [_vm._v(_vm._s(_vm.is_mail == 1 ? "（公开）" : "（仅自己可见）"))]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "introduce box"
  }, [_c('div', {
    staticClass: "introduce-edit"
  }, [_c('span', [_vm._v("个人介绍：")]), _vm._v(" "), (_vm.openid.back_value.open_id === _vm.user_info.open_id) ? _c('span', {
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": function($event) {
        _vm.edit(2)
      }
    }
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/bianji.png",
      "alt": ""
    }
  }), _vm._v("\n        编辑\n      ")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "introduce-other"
  }, [_c('span', [_vm._v("所在行业：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.user_info.industry_involved === null || _vm.user_info.industry_involved === "" ? "暂无所在行业" : _vm.user_info.industry_involved))])]), _vm._v(" "), _c('div', {
    staticClass: "introduce-other"
  }, [_c('span', [_vm._v("关注行业：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.user_info.interest === null || _vm.user_info.interest === "" ? "暂无关注行业" : _vm.user_info.interest))])]), _vm._v(" "), _c('div', {
    staticClass: "introduce-text"
  }, [_c('span', [_vm._v("自我介绍：")]), _vm._v(" "), _c('span', [_vm._v("\n        " + _vm._s(_vm.user_info.brief_introduction === null || _vm.user_info.brief_introduction === "" ? "暂无自我介绍" : _vm.user_info.brief_introduction) + "\n      ")])])]), _vm._v(" "), _c('div', {
    staticClass: "photo box"
  }, [_c('h1', [_vm._v("形象照片")]), _vm._v(" "), _c('div', [(!_vm.user_info.head_portrait) ? _c('p', [_vm._v("暂无可以通过编辑添加")]) : _c('img', {
    attrs: {
      "src": _vm.user_info.head_portrait,
      "alt": ""
    }
  })], 1)], 1), _vm._v(" "), _c('tab', {
    attrs: {
      "selected": "2",
      "message-count": _vm.message_count,
      "mpcomid": '0'
    }
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-32e6eee8", esExports)
  }
}

/***/ })

},[163]);