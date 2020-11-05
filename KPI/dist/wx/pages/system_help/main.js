require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([8],{

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__system_help__ = __webpack_require__(243);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__system_help__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_system_help_vue__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_17c0d7f4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_system_help_vue__ = __webpack_require__(246);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(244)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-17c0d7f4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_system_help_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_17c0d7f4_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_system_help_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/system_help/system_help.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] system_help.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-17c0d7f4", Component.options)
  } else {
    hotAPI.reload("data-v-17c0d7f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 244:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(2);




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
  name: "system_help",
  components: { CKtitleNotice: __WEBPACK_IMPORTED_MODULE_4__components_CK_title_notice_CKtitleNotice__["a" /* default */] },
  data: function data() {
    return {
      type: 1,
      administrators_list: "",
      corpid: "",
      icon_type: "",
      video_info: ""
    };
  },
  onShow: function onShow() {
    var that = this;
    that.$unit.showWaiting();
    that.corpid = that.registUser.data.back_value.corpid;
    that.refreshRequestSystemHelp();
  },

  methods: {
    goViedoDetail: function goViedoDetail(index) {
      var that = this;
      wx.navigateTo({
        url: "/pages/video_detail/main?index=" + index
      });
    },
    showState: function showState(type, state) {
      var that = this;
      if (type === 22 && state === false) {
        if (that.type === 1 || that.type === 5) {
          wx.showModal({
            title: "您暂无此权限",
            content: "\u53EF\u4EE5\u8054\u7CFB\u7BA1\u7406\u5458\u5728\u5E94\u7528\u9996\u9875\u201C\u7CFB\u7EDF\u8BBE\u7F6E\u201D\u4E2D\u6DFB\u52A0\uFF0C\u6DFB\u52A0\u540E\u53EF\u4EE5\u5F00\u542F\u201C\u90E8\u95E8\u4E3B\u7BA1\u6743\u9650\u201D",
            showCancel: false,
            confirmText: "好的",
            success: function success() {}
          });
        }
      } else if (type === 33 && state === false) {
        if (that.type === 1 || that.type === 3) {
          wx.showModal({
            title: "您暂无此权限",
            content: "\u53EF\u4EE5\u8054\u7CFB\u7BA1\u7406\u5458\u5728\u5E94\u7528\u9996\u9875\u201C\u7CFB\u7EDF\u8BBE\u7F6E\u201D\u4E2D\u6DFB\u52A0\uFF0C\u6DFB\u52A0\u540E\u53EF\u4EE5\u5F00\u542F\u201C\u7EDF\u8BA1\u7BA1\u7406\u6743\u9650\u201D",
            showCancel: false,
            confirmText: "好的",
            success: function success() {}
          });
        }
      } else if (type === 44 && state === false) {
        if (that.type === 1 || that.type === 3 || that.type === 5 || that.type === 7) {
          wx.showModal({
            title: "您暂无此权限",
            content: "\u53EF\u4EE5\u8054\u7CFB\u7BA1\u7406\u5458\u5728\u5E94\u7528\u9996\u9875\u201C\u7CFB\u7EDF\u8BBE\u7F6E\u201D\u4E2D\u6DFB\u52A0\uFF0C\u6DFB\u52A0\u540E\u53EF\u4EE5\u5F00\u542F\u201C\u7CFB\u7EDF\u7BA1\u7406\u6743\u9650\u201D",
            showCancel: false,
            confirmText: "好的",
            success: function success() {}
          });
        }
      }
    },
    refreshRequestSystemHelp: function refreshRequestSystemHelp() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee() {
        var that;
        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                that = _this;
                _context.next = 3;
                return that.$store.dispatch("_getUserInfo", {
                  im: that.$constData.INTER_FACE.get_user_power,
                  fps: {
                    userid: that.registUser.data.back_value.userid
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_user_info");
                  } else {
                    var type = res.data.back_value;
                    that.linabc(type);
                  }
                });

              case 3:
                _context.next = 5;
                return that.$store.dispatch("_getAdministrators", {
                  im: that.$constData.INTER_FACE.get_administrators_list,
                  fps: {},
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_administrators_list");
                  } else {
                    that.administrators_list = res.data.back_value;
                  }
                });

              case 5:
                _context.next = 7;
                return that.$store.dispatch("_getVideoInfo", {
                  im: that.$constData.INTER_FACE.get_video_url,
                  fps: {
                    userid: that.registUser.data.back_value.userid
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_video_url");
                  } else {
                    that.video_info = res.data.back_value;
                  }
                });

              case 7:
                that.$unit.closeWaiting();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    linabc: function linabc(type) {
      var that = this;
      var score = [8, 4, 2, 1];
      var result = [];
      for (var index in score) {
        result[score[index]] = false;
        if (type - score[index] >= 0) {
          type = type - score[index];
          result[score[index]] = true;
        }
      }
      that.icon_type = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_array_from___default()(result);
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_5_vuex__["b" /* mapGetters */])(["registUser"])),
  onPullDownRefresh: function onPullDownRefresh() {
    var _this2 = this;

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee2() {
      var that;
      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              that = _this2;

              that.$unit.showWaiting();
              _context2.next = 4;
              return that.refreshRequestSystemHelp();

            case 4:
              wx.stopPullDownRefresh();

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  }
});

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "system-help-container"
  }, [_c('div', {
    staticClass: "system-help-title"
  }, [_vm._v("\n    我的权限（\n    "), _vm._l((_vm.administrators_list), function(item, index) {
    return _c('div', {
      key: index,
      staticStyle: {
        "display": "flex"
      }
    }, [_c('ww-open-data', {
      attrs: {
        "corpid": _vm.corpid,
        "openid": item,
        "type": "userName",
        "mpcomid": '0_' + index
      }
    }), _vm._v(" "), (index !== _vm.administrators_list.length - 1) ? _c('p', [_vm._v("、")]) : _vm._e()], 1)
  }), _vm._v("\n    有权调整）\n  ")], 2), _vm._v(" "), _c('div', {
    staticClass: "authority-list"
  }, [_c('div', {
    staticClass: "authority-list-item"
  }, [_c('p', {
    staticClass: "authority-list-item-left"
  }, [_vm._v("执行人/审查人权限")]), _vm._v(" "), _c('p', {
    staticClass: "authority-list-item-right"
  }, [(_vm.icon_type[1]) ? _c('icon', {
    staticClass: "icon-small",
    attrs: {
      "type": "success_no_circle",
      "size": "20"
    }
  }) : _vm._e()], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "authority-list-item",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        _vm.showState(33, _vm.icon_type[4])
      }
    }
  }, [_c('p', {
    staticClass: "authority-list-item-left"
  }, [_vm._v("统计管理权限")]), _vm._v(" "), _c('p', {
    staticClass: "authority-list-item-right"
  }, [(_vm.icon_type[4]) ? _c('icon', {
    staticClass: "icon-small",
    attrs: {
      "type": "success_no_circle",
      "size": "20"
    }
  }) : _c('icon', {
    staticClass: "icon-small",
    attrs: {
      "type": "info_circle",
      "size": "20",
      "color": "#ffc300"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "authority-list-item",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": function($event) {
        _vm.showState(44, _vm.icon_type[8])
      }
    }
  }, [_c('p', {
    staticClass: "authority-list-item-left"
  }, [_vm._v("系统管理权限")]), _vm._v(" "), _c('p', {
    staticClass: "authority-list-item-right"
  }, [(_vm.icon_type[8]) ? _c('icon', {
    staticClass: "icon-small",
    attrs: {
      "type": "success_no_circle",
      "size": "20"
    }
  }) : _c('icon', {
    staticClass: "icon-small",
    attrs: {
      "type": "info_circle",
      "size": "20",
      "color": "#ffc300"
    }
  })], 1)], 1)]), _vm._v(" "), _c('CKtitleNotice', {
    attrs: {
      "ord-message": "使用及帮助文档",
      "mpcomid": '1'
    }
  }), _vm._v(" "), _vm._l((_vm.video_info), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "authority-list"
    }, [_c('div', {
      staticClass: "authority-list-item",
      attrs: {
        "eventid": '2_' + index
      },
      on: {
        "click": function($event) {
          _vm.goViedoDetail(index)
        }
      }
    }, [_c('p', {
      staticClass: "authority-list-item-left"
    }, [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('p', {
      staticClass: "authority-list-item-right"
    }, [(item.type === 2) ? _c('span', {
      staticStyle: {
        "color": "red",
        "font-size": "13px"
      }
    }, [_vm._v("必看")]) : _vm._e(), _vm._v(" "), _c('img', {
      staticStyle: {
        "width": "20px",
        "height": "20px"
      },
      attrs: {
        "src": "../../../static/images/right.png",
        "alt": ""
      }
    })])], 1)])
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-17c0d7f4", esExports)
  }
}

/***/ })

},[242]);