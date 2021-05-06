require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([7],{

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__task_details__ = __webpack_require__(248);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__task_details__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_task_details_vue__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_3c4888d0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_task_details_vue__ = __webpack_require__(251);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(249)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3c4888d0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_task_details_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_3c4888d0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_task_details_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/task_details/task_details.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] task_details.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c4888d0", Component.options)
  } else {
    hotAPI.reload("data-v-3c4888d0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 249:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_CK_details_CKdetailsHeader__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_CK_details_CKdetailsContent__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_CK_details_CKdetailsDisagree__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_CK_details_CKdetailsDate__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_CK_details_CKdetailsUserList__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_CK_details_CKdetailsOperatButton__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_CK_details_CKdetailsReviewResult__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vuex__ = __webpack_require__(2);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "task-detail-container",
  components: {
    CKtitleNotice: __WEBPACK_IMPORTED_MODULE_10__components_CK_title_notice_CKtitleNotice__["a" /* default */],
    CKdetailsHeader: __WEBPACK_IMPORTED_MODULE_3__components_CK_details_CKdetailsHeader__["a" /* default */],
    CKdetailsContent: __WEBPACK_IMPORTED_MODULE_4__components_CK_details_CKdetailsContent__["a" /* default */],
    CKdetailsDisagree: __WEBPACK_IMPORTED_MODULE_5__components_CK_details_CKdetailsDisagree__["a" /* default */],
    CKdetailsDate: __WEBPACK_IMPORTED_MODULE_6__components_CK_details_CKdetailsDate__["a" /* default */],
    CKdetailsUserList: __WEBPACK_IMPORTED_MODULE_7__components_CK_details_CKdetailsUserList__["a" /* default */],
    CKdetailsOperatButton: __WEBPACK_IMPORTED_MODULE_8__components_CK_details_CKdetailsOperatButton__["a" /* default */],
    CKdetailsReviewResult: __WEBPACK_IMPORTED_MODULE_9__components_CK_details_CKdetailsReviewResult__["a" /* default */]
  },
  data: function data() {
    return {
      page_show: false,
      disagree_show: false, // 拒绝理由弹窗
      corpid: "", // 企业 id
      userid: "", // 上个页面传递过来的 userid
      button_status: "", // 用户操作过什么按钮 1 没有操作过 2 点击过接受 3 点击过拒绝
      user_type: "3", // 用户类型 1 创建人 2 审查人 3 执行人
      task_details: "", // 任务详情
      doing_list: "", // 执行人
      review_list: "", // 审查人
      disagree: [], // 展示拒绝理由
      user_disagree: "", // 填写的拒绝理由
      review_result_list: [], // 审查结果
      review_status: {} // 审查状态
    };
  },

  mixins: [],
  onShow: function onShow() {
    var that = this;
    that.refreshTaskDetails();
  },

  methods: {
    /**
     * 创建考核任务
     * */
    operatCreatedTask: function operatCreatedTask() {
      var that = this;
      wx.navigateTo({
        url: "/pages/created_task/main?task_id=" + that.task_details.id
      });
    },

    /**
     * 提交拒绝任务原因
     * */
    setDisagree: function setDisagree() {
      var that = this;
      if (that.user_disagree === "") {
        wx.showToast({
          title: "请填写拒绝任务原因",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }
      that._setTaskStatus(3, that.user_type, that.user_disagree);
    },

    /**
     * 接受任务
     * */
    operatAccept: function operatAccept() {
      var that = this;
      wx.showModal({
        title: "\u786E\u8BA4KPI\u8003\u6838\u5185\u5BB9",
        content: "\u786E\u8BA4KPI\u8003\u6838\u5185\u5BB9\u610F\u5473\u7740\u60A8\u63A5\u53D7\u5982\u4E0A\u5BA1\u67E5\u6807\u51C6\uFF0C\u5E76\u63A5\u53D7\u8BE5\u4EFB\u52A1\u7684\u5DE5\u4F5C\u6743\u91CD",
        cancelText: "\u4ECD\u9700\u8003\u8651",
        confirmText: "\u63A5\u53D7",
        confirmColor: "#19be6b",
        success: function success(res) {
          if (res.confirm) {
            that._setTaskStatus(2, that.user_type);
          }
        }
      });
    },

    /**
     * 拒绝任务
     * */
    operatDisagree: function operatDisagree() {
      var that = this;
      that.disagree_show = true;
    },

    /**
     * 设置任务状态
     * */
    _setTaskStatus: function _setTaskStatus(status, user_type) {
      var reason = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      var that = this;
      that.$store.dispatch("_setTask", {
        im: that.$constData.INTER_FACE.confirm_task,
        fps: {
          userid: that.userid,
          task_id: that.$root.$mp.query.task_id,
          holder_type: user_type,
          status: status,
          reason: reason
        },
        url: that.$constData.REQUEST_URI
      }).then(function (res) {
        if (res.data.result === "failure") {
          that.$unit.showErrorInfo(res.data, "confirm_task");
        } else {
          if (res.data.back_value) {
            that.disagree_show = false;
            that.refreshTaskDetails();
          }
        }
      });
    },

    /**
     * 获得任务列表
     * */
    refreshTaskDetails: function refreshTaskDetails() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var that;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this;

                that.$unit.showWaiting();

                // 如果单独从 任务详情进入 ，判断请求链接是否存在 corpid，如果存在则不添加，如果不存在则添加
                if (that._getUrlParam("qy_id", that.$constData.REQUEST_URI)) {} else {
                  that.$constData.SET_REQUEST_URI(that.$root.$mp.query.corpid);
                }

                that.corpid = that.$root.$mp.query.corpid;
                that.userid = that.$root.$mp.query.userid;

                that.$store.dispatch("_getTaskDetalis", {
                  im: that.$constData.INTER_FACE.get_task_details,
                  fps: {
                    userid: that.userid,
                    task_id: that.$root.$mp.query.task_id
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_task_details");
                  } else {
                    that.task_details = res.data.back_value;
                  }
                });

                // 执行人
                _context2.next = 8;
                return that.$store.dispatch("_getTaskHolders", {
                  im: that.$constData.INTER_FACE.get_holders,
                  fps: {
                    task_id: that.$root.$mp.query.task_id,
                    holder_type: 3
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_holders");
                  } else {
                    that.doing_list = res.data.back_value;
                    // ---

                    that.doing_list.forEach(function (item, index, arr) {

                      if (item.userid === that.userid) {
                        console.log(parseInt(item.status));
                        that.button_status = parseInt(item.status);
                      }
                    });

                    // ---
                  }
                });

              case 8:
                _context2.next = 10;
                return that.$store.dispatch("_getTaskHolders", {
                  im: that.$constData.INTER_FACE.get_holders,
                  fps: {
                    task_id: that.$root.$mp.query.task_id,
                    holder_type: 2
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_holders");
                  } else {
                    that.review_list = res.data.back_value;
                  }
                });

              case 10:
                _context2.next = 12;
                return that.$store.dispatch("_getTaskReviewList", {
                  im: that.$constData.INTER_FACE.get_review_result_list,
                  fps: {
                    userid: that.userid,
                    task_id: that.$root.$mp.query.task_id
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function () {
                  var _ref = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee(res) {
                    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (res.data.result === "failure") {
                              that.$unit.showErrorInfo(res.data, "get_review_result_list");
                            } else {
                              that.review_result_list = res.data.back_value;
                              that._init_review_status();
                            }

                          case 1:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }());

              case 12:
                _context2.next = 14;
                return that.$store.dispatch("_getDisagree", {
                  im: that.$constData.INTER_FACE.get_reason,
                  fps: {
                    userid: that.userid,
                    task_id: that.$root.$mp.query.task_id
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_reason");
                  } else {
                    that.disagree = [];
                    that.disagree = res.data.back_value;
                  }
                });

              case 14:

                that.page_show = true;
                that.$unit.closeWaiting();

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }))();
    },

    /**
     * 初始化审查结果列表是否显示扣分显示
     * */
    _init_review_status: function _init_review_status() {
      var that = this;
      that.review_result_list.forEach(function (item, index, arr) {
        if (item.review_result_list.length === 0) {
          // 未审核
          that.review_status[index] = 111;
        } else {

          for (var i = 0; i < item.review_result_list.length; i++) {
            var score = Math.round(item.review_result_list[i].score * 100);
            if (score === 100) {
              // 未扣分
              that.review_status[index] = 222;
            } else {
              // 扣分
              that.review_status[index] = 333;
              break;
            }
          }
        }
      });
    },
    _getUrlParam: function _getUrlParam(name, url) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
      var r = url.substr(1).match(reg); // 匹配目标参数
      if (r != null) return decodeURI(r[2]);
      return null; // 返回参数值
    }
  },
  onUnload: function onUnload() {
    var that = this;
    that.$unit.restData(that);
  },

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_11_vuex__["b" /* mapGetters */])([
    // "registUser"
  ]))
});

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.page_show) ? _c('section', {
    staticClass: "task-detail-container"
  }, [_c('CKdetailsHeader', {
    attrs: {
      "data": _vm.task_details,
      "corpid": _vm.corpid,
      "login-userid": _vm.userid,
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "modifyTask": _vm.operatCreatedTask
    }
  }), _vm._v(" "), _c('CKdetailsContent', {
    attrs: {
      "data": _vm.task_details,
      "mpcomid": '1'
    }
  }), _vm._v(" "), (_vm.disagree.length !== 0) ? _c('CKdetailsDisagree', {
    attrs: {
      "data": _vm.disagree,
      "corpid": _vm.corpid,
      "mpcomid": '2'
    }
  }) : _vm._e(), _vm._v(" "), _c('CKdetailsDate', {
    attrs: {
      "data": _vm.task_details,
      "mpcomid": '3'
    }
  }), _vm._v(" "), _c('CKdetailsUserList', {
    attrs: {
      "data": _vm.doing_list,
      "title": "执行人列表",
      "mpcomid": '4'
    }
  }), _vm._v(" "), _c('CKdetailsUserList', {
    attrs: {
      "data": _vm.review_list,
      "title": "审查人列表",
      "mpcomid": '5'
    }
  }), _vm._v(" "), _c('CKdetailsReviewResult', {
    attrs: {
      "data": _vm.review_result_list,
      "status": _vm.review_status,
      "corpid": _vm.corpid,
      "mpcomid": '6'
    }
  }), _vm._v(" "), _c('CKdetailsOperatButton', {
    attrs: {
      "data": _vm.task_details,
      "login-userid": _vm.userid,
      "button-status": _vm.button_status,
      "cancelText": "我有异议",
      "confirmText": "接受考核",
      "eventid": '1',
      "mpcomid": '7'
    },
    on: {
      "cancel": _vm.operatDisagree,
      "confirm": _vm.operatAccept
    }
  }), _vm._v(" "), _c('v-popup', {
    attrs: {
      "show": _vm.disagree_show,
      "round": "",
      "mpcomid": '8'
    }
  }, [_c('section', {
    staticClass: "disagree"
  }, [_c('div', {
    staticClass: "disagree-title"
  }, [_vm._v("请填写拒绝原因")]), _vm._v(" "), _c('div', {
    staticClass: "disagree-content"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_disagree),
      expression: "user_disagree"
    }],
    staticClass: "textarea",
    attrs: {
      "hold-keyboard": "",
      "adjust-position": "",
      "fixed": "",
      "show-confirm-bar": "",
      "placeholder": "请填写拒绝原因",
      "eventid": '2'
    },
    domProps: {
      "value": (_vm.user_disagree)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user_disagree = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "disagree-button"
  }, [_c('p', {
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": function () {
        _vm.disagree_show = false;
        _vm.user_disagree = ''
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('p', {
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.setDisagree
    }
  }, [_vm._v("提交")])], 1)])], 1)], 1) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3c4888d0", esExports)
  }
}

/***/ })

},[247]);