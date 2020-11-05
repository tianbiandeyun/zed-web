require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([15],{

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assess__ = __webpack_require__(134);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__assess__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_assess_vue__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_57f36fe0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_assess_vue__ = __webpack_require__(143);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(135)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-57f36fe0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_assess_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_57f36fe0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_assess_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/assess/assess.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] assess.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57f36fe0", Component.options)
  } else {
    hotAPI.reload("data-v-57f36fe0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 135:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_CK_task_list_CKtaskList__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_CK_button_CKbutton__ = __webpack_require__(22);
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





/* harmony default export */ __webpack_exports__["a"] = ({
  name: "assess-container",
  components: { CKbutton: __WEBPACK_IMPORTED_MODULE_4__components_CK_button_CKbutton__["a" /* default */], CKtaskList: __WEBPACK_IMPORTED_MODULE_3__components_CK_task_list_CKtaskList__["a" /* default */] },
  data: function data() {
    return {
      tabShow: false,
      active: 0,
      effective: [],
      wait_effective: [],
      end: [],
      all: []
    };
  },
  onShow: function onShow() {
    var that = this;
    that.$unit.showWaiting();
    that.refreshAssess();
  },

  methods: {
    /**
     * 选项卡
     * */
    operatChangTab: function operatChangTab(e) {
      var that = this;
      that.active = e.mp.detail.index;
    },

    /**
     * 查看考核详情
     * */
    goTaskDetail: function goTaskDetail(item) {
      var that = this;
      var task_id = item.id;
      wx.navigateTo({
        url: "/pages/task_details/main?task_id=" + task_id + "&userid=" + that.registUser.data.back_value.userid + "&corpid=" + that.registUser.data.back_value.corpid
      });
    },

    /**
     * 创建考核任务
     * */
    operatCreatedTask: function operatCreatedTask() {
      wx.navigateTo({
        url: "/pages/created_task/main"
      });
    },

    /**
     * 获得任务列表
     * */
    refreshAssess: function refreshAssess() {
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
                    content_type: 1,
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
     * 1 / 3 -> 反馈 feedback
     * 2 -> 待生效 wait_effective
     * 4 -> 已生效 effective
     * 5 -> 结束 end
     * */
    _initData: function _initData(res) {
      var that = this;
      that.effective = [];
      that.wait_effective = [];
      that.end = [];
      that.all = [];
      res.forEach(function (item, index, arr) {
        var task_status = item.attachinfo_of_task.task_icon_status;

        // 全部
        that.all.push(item);

        if (1 === task_status || 3 === task_status || 2 === task_status) {
          that.wait_effective.push(item);
        }
        if (4 === task_status) {
          that.effective.push(item);
        }
        if (5 === task_status) {
          that.end.push(item);
        }
      });
    }
  },
  onUnload: function onUnload() {
    var that = this;
    console.log(that.active);
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

              that.$unit.showWaiting();
              that.refreshAssess();
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

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.tabShow) ? _c('section', {
    staticClass: "assess-container"
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
      staticClass: "assess-tab-item",
      attrs: {
        "eventid": '0_' + index
      },
      on: {
        "click": function($event) {
          _vm.goTaskDetail(item)
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
      "title": "待生效",
      "mpcomid": '3'
    }
  }, [(_vm.wait_effective.length === 0) ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无数据")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.wait_effective), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "assess-tab-item",
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.goTaskDetail(item)
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
      "title": "已生效",
      "mpcomid": '5'
    }
  }, [(_vm.effective.length === 0) ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无数据")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.effective), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "assess-tab-item",
      attrs: {
        "eventid": '2_' + index
      },
      on: {
        "click": function($event) {
          _vm.goTaskDetail(item)
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
      "title": "已结束",
      "mpcomid": '7'
    }
  }, [(_vm.end.length === 0) ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无数据")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.end), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "assess-tab-item",
      attrs: {
        "eventid": '3_' + index
      },
      on: {
        "click": function($event) {
          _vm.goTaskDetail(item)
        }
      }
    }, [_c('CKtaskList', {
      attrs: {
        "data": item,
        "mpcomid": '6_' + index
      }
    })], 1)
  })], 2)], 1), _vm._v(" "), _c('CKbutton', {
    attrs: {
      "name": "创建考核目标",
      "eventid": '5',
      "mpcomid": '9'
    },
    on: {
      "operat": _vm.operatCreatedTask
    }
  })], 1) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-57f36fe0", esExports)
  }
}

/***/ })

},[133]);