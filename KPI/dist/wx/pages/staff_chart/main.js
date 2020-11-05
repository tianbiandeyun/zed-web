require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([9],{

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__staff_chart__ = __webpack_require__(238);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__staff_chart__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_staff_chart_vue__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_2b7c6c60_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_staff_chart_vue__ = __webpack_require__(241);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(239)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2b7c6c60"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_staff_chart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_2b7c6c60_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_staff_chart_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/staff_chart/staff_chart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] staff_chart.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2b7c6c60", Component.options)
  } else {
    hotAPI.reload("data-v-2b7c6c60", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 239:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_CK_task_list_CKtaskList__ = __webpack_require__(38);
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





/* harmony default export */ __webpack_exports__["a"] = ({
  name: "staff-chart-container",
  components: { CKtitleNotice: __WEBPACK_IMPORTED_MODULE_3__components_CK_title_notice_CKtitleNotice__["a" /* default */], CKtaskList: __WEBPACK_IMPORTED_MODULE_4__components_CK_task_list_CKtaskList__["a" /* default */] },
  data: function data() {
    return {
      isIcon: false,
      corpid: "",
      staff_chart_details: ""
    };
  },
  onShow: function onShow() {
    var that = this;
    that.$unit.showWaiting();
    that.corpid = that.registUser.data.back_value.corpid;
    that.refreshStaffChart();
  },

  methods: {
    goMonthAssessDetails: function goMonthAssessDetails(res) {
      var that = this;
      wx.navigateTo({
        url: "/pages/month_assess_details/main?executor_userid=" + that.$root.$mp.query.executor_userid + "&month=" + res.date
      });
    },

    /**
     * 获得任务列表
     * */
    refreshStaffChart: function refreshStaffChart() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var that;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this;
                _context2.next = 3;
                return that.$store.dispatch("_getStaffChart", {
                  im: that.$constData.INTER_FACE.get_staff_portrait,
                  fps: {
                    userid: that.registUser.data.back_value.userid,
                    executor_userid: that.$root.$mp.query.executor_userid
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function () {
                  var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee(res) {
                    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (res.data.result === "failure") {
                              that.$unit.showErrorInfo(res.data, "get_staff_portrait");
                            } else {
                              that.staff_chart_details = res.data.back_value;
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

              case 3:
                that.$unit.closeWaiting();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }))();
    }
  },
  onUnload: function onUnload() {
    var that = this;
    that.$unit.restData(that);
  },

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_5_vuex__["b" /* mapGetters */])(["registUser"])),
  onPullDownRefresh: function onPullDownRefresh() {
    var _this2 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
      var that;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              that = _this2;

              wx.stopPullDownRefresh();

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }))();
  }
});

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "staff-chart-container"
  }, [(_vm.corpid && _vm.staff_chart_details.userid) ? _c('div', {
    staticClass: "staff-chart-notice"
  }, [_c('ww-open-data', {
    attrs: {
      "corpid": _vm.corpid,
      "openid": _vm.staff_chart_details.userid,
      "type": "userName",
      "mpcomid": '0'
    }
  }), _vm._v("\n    的员工画像\n  ")], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "staff-chart-details"
  }, [_c('div', {
    staticClass: "staff-chart-details-photo"
  }, [_c('img', {
    attrs: {
      "src": _vm.staff_chart_details.avatar,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "staff-chart-details-content"
  }, [_c('h1', [_vm._v("综合评分：" + _vm._s(_vm.staff_chart_details.score) + "分")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.staff_chart_details.task_count) + "个考核项，" + _vm._s(_vm.staff_chart_details.examine_count) + "次评审")])], 1)]), _vm._v(" "), _c('CKtitleNotice', {
    attrs: {
      "ord-message": "考核项列表",
      "mpcomid": '1'
    }
  }), _vm._v(" "), _vm._l((_vm.staff_chart_details.month_list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "staff-chart-list",
      attrs: {
        "eventid": '0_' + index
      },
      on: {
        "click": function($event) {
          _vm.goMonthAssessDetails(item)
        }
      }
    }, [_c('CKtaskList', {
      attrs: {
        "data": item,
        "is-icon": _vm.isIcon,
        "page": "staff_chart",
        "mpcomid": '2_' + index
      }
    })], 1)
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2b7c6c60", esExports)
  }
}

/***/ })

},[237]);