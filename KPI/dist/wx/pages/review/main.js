require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([13],{

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__review__ = __webpack_require__(228);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__review__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_review_vue__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_daa624e0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_review_vue__ = __webpack_require__(231);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(229)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-daa624e0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_review_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_daa624e0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_review_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/review/review.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] review.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-daa624e0", Component.options)
  } else {
    hotAPI.reload("data-v-daa624e0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 229:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_CK_task_list_CKtaskList__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(2);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "review-container",
  components: { CKtaskList: __WEBPACK_IMPORTED_MODULE_3__components_CK_task_list_CKtaskList__["a" /* default */] },
  data: function data() {
    return {
      tabShow: false,
      active: 0,
      all: [],
      finish: [],
      wait_review: [],
      wait_end: []
    };
  },
  onShow: function onShow() {
    var that = this;
    that.$unit.showWaiting();
    that.refreshReview();
  },

  methods: {
    /**
     * 创建考核任务
     * */
    goTaskDetail: function goTaskDetail(task_id) {
      var that = this;
      wx.navigateTo({
        url: "/pages/review_detail/main?task_id=" + task_id + "&userid=" + that.registUser.data.back_value.userid + "&corpid=" + that.registUser.data.back_value.corpid
      });
    },

    /**
     * 获得任务列表
     * */
    refreshReview: function refreshReview() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var that;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this;
                _context2.next = 3;
                return that.$store.dispatch("_getTaskList", {
                  im: that.$constData.INTER_FACE.get_task_list,
                  fps: {
                    userid: that.registUser.data.back_value.userid,
                    content_type: 2,
                    list_type: ""
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function () {
                  var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee(res) {
                    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(res.data.result === "failure")) {
                              _context.next = 4;
                              break;
                            }

                            that.$unit.showErrorInfo(res.data, "get_task_list");
                            _context.next = 7;
                            break;

                          case 4:
                            _context.next = 6;
                            return that._initData(res.data.back_value);

                          case 6:
                            that.tabShow = true;

                          case 7:
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
    },

    /**
     * 格式化数据
     * 黄 - 1
     * 蓝 - 2
     * 绿 - 4
     *
     * 1 = 什么都没点击过 ；2 = 点击过确认；3 = 点击过拒绝
     * */
    _initData: function _initData(res) {
      var that = this;

      that.all = []; // 全部
      that.finish = []; // 完成
      that.wait_review = []; // 待审查
      that.wait_end = []; // 待确认

      for (var i = 0; i < res.length; i++) {

        var task_status = res[i].attachinfo_of_task.task_icon_status; // 任务状态
        var button_status = res[i].attachinfo_of_task.task_user_status; // 按钮状态

        // 全部
        that.all.push(res[i]);

        if (button_status === 2) {

          // 点击过 确认 && 黄色 -> 待审核
          // 点击过 确认 && 蓝色 -> 待审核
          if (task_status === 1 || task_status === 2) {
            that.wait_review.push(res[i]);
          }

          // 点击过 确认 && 绿色 -> 已完成
          if (task_status === 4) {
            that.finish.push(res[i]);
          }
        } else {
          // 未操作过 || 点击过拒绝 -> 待确认
          that.wait_end.push(res[i]);
        }
      }
    }
  },
  onUnload: function onUnload() {
    var that = this;
    console.log(that.active);
    that.$unit.restData(that);
  },

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["b" /* mapGetters */])(["registUser"])),
  onPullDownRefresh: function onPullDownRefresh() {
    var _this2 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
      var that;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              that = _this2;

              that.$unit.showWaiting();
              that.refreshReview();
              wx.stopPullDownRefresh();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }))();
  }
});

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.tabShow) ? _c('section', {
    staticClass: "review-container"
  }, [_c('v-tabs', {
    attrs: {
      "active": _vm.active,
      "color": "green",
      "animated": "true",
      "sticky": "true",
      "swipeable": "true",
      "eventid": '4',
      "mpcomid": '8'
    },
    on: {
      "change": _vm.operatChangTab
    }
  }, [_c('v-tab', {
    attrs: {
      "title": "全部",
      "mpcomid": '1'
    }
  }, [(_vm.all.length === 0) ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无数据")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.all), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "review-tab-item",
      attrs: {
        "eventid": '0_' + index
      },
      on: {
        "click": function($event) {
          _vm.goTaskDetail(item.id)
        }
      }
    }, [_c('CKtaskList', {
      attrs: {
        "data": item,
        "mpcomid": '0_' + index
      }
    })], 1)
  })], 2), _vm._v(" "), _c('v-tab', {
    attrs: {
      "title": "待审查",
      "mpcomid": '3'
    }
  }, [(_vm.wait_review.length === 0) ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无数据")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.wait_review), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "review-tab-item",
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.goTaskDetail(item.id)
        }
      }
    }, [_c('CKtaskList', {
      attrs: {
        "data": item,
        "mpcomid": '2_' + index
      }
    })], 1)
  })], 2), _vm._v(" "), _c('v-tab', {
    attrs: {
      "title": "待确认",
      "mpcomid": '5'
    }
  }, [(_vm.wait_end.length === 0) ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无数据")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.wait_end), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "review-tab-item",
      attrs: {
        "eventid": '2_' + index
      },
      on: {
        "click": function($event) {
          _vm.goTaskDetail(item.id)
        }
      }
    }, [_c('CKtaskList', {
      attrs: {
        "data": item,
        "mpcomid": '4_' + index
      }
    })], 1)
  })], 2), _vm._v(" "), _c('v-tab', {
    attrs: {
      "title": "已完成",
      "mpcomid": '7'
    }
  }, [(_vm.finish.length === 0) ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无数据")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.finish), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "review-tab-item",
      attrs: {
        "eventid": '3_' + index
      },
      on: {
        "click": function($event) {
          _vm.goTaskDetail(item.id)
        }
      }
    }, [_c('CKtaskList', {
      attrs: {
        "data": item,
        "mpcomid": '6_' + index
      }
    })], 1)
  })], 2)], 1)], 1) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-daa624e0", esExports)
  }
}

/***/ })

},[227]);