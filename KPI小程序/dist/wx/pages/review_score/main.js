require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([11],{

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__review_score__ = __webpack_require__(223);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__review_score__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_review_score_vue__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_2f3d9ca0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_review_score_vue__ = __webpack_require__(226);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(224)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2f3d9ca0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_review_score_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_2f3d9ca0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_review_score_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/review_score/review_score.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] review_score.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f3d9ca0", Component.options)
  } else {
    hotAPI.reload("data-v-2f3d9ca0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 224:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 225:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuex__ = __webpack_require__(2);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "review-score-container",
  components: {
    CKtitleNotice: __WEBPACK_IMPORTED_MODULE_5__components_CK_title_notice_CKtitleNotice__["a" /* default */],
    CKdetailsHeader: __WEBPACK_IMPORTED_MODULE_3__components_CK_details_CKdetailsHeader__["a" /* default */],
    CKdetailsContent: __WEBPACK_IMPORTED_MODULE_4__components_CK_details_CKdetailsContent__["a" /* default */]
  },
  data: function data() {
    return {
      corpid: "",
      value: 100, // 滑动值
      review_stage: "", // 审查阶段显示
      task_details: "", // 任务详情
      review_score_user: "", // 被审查人列表
      index_score: "", // 等待打分的执行人下标
      set_score_show: false, // 打分窗口
      content: "" // 评审内容
    };
  },
  mounted: function mounted() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
      var that, review_date, task_end_date, task_work_day_count;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              that = _this;

              that.corpid = that.registUser.data.back_value.corpid;
              _context.next = 4;
              return that.refreshReviewScore();

            case 4:
              review_date = that.$root.$mp.query.review_date; // 审查日时间

              task_end_date = that.task_details.end_date; // 结束时间

              task_work_day_count = that.$root.$mp.query.work_day_count; // 当前阶段的工作天数

              _context.next = 9;
              return that._init_stage(task_end_date, review_date, task_work_day_count);

            case 9:
              that.review_stage = _context.sent;

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  methods: {
    /**
     * 提交审查内容
     * */
    operatSetScore: function operatSetScore() {
      var that = this;

      if (that.content === "" || that.content === undefined || that.content === null) {
        wx.showToast({
          title: "请填写审查内容",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }

      that.$store.dispatch("_setReviewTask", {
        im: that.$constData.INTER_FACE.set_svaluation_and_score,
        fps: {
          userid: that.registUser.data.back_value.userid,
          task_id: that.$root.$mp.query.task_id,
          review_date: that.review_score_user[that.index_score].review_date,
          excutor_userid: that.review_score_user[that.index_score].executor_userid,
          score: that.value / 100,
          comment: that.content
        },
        url: that.$constData.REQUEST_URI
      }).then(function (res) {
        if (res.data.result === "failure") {
          that.$unit.showErrorInfo(res.data, "set_svaluation_and_score");
        } else {
          that.set_score_show = false;
          if (res.data.back_value) {
            that.content = "";
            that.value = 100;
            that.refreshReviewScore();
          }
        }
      });
    },

    /**
     * 审核任务
     * */
    operatOpenSetScore: function operatOpenSetScore(res, index) {
      var that = this;

      // 6 黄色 点击评分 7 蓝色 未到期 8 绿色 已完成
      if (res.status === 7) {
        wx.showToast({
          title: "无法打分",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }

      // 如果评价过则显示评价内容
      that.content = that.review_score_user[index].comment;
      that.value = that.review_score_user[index].score * 100 === 0 ? 100 : that.review_score_user[index].score * 100;

      // 数组下标
      that.index_score = index;
      // 显示弹框
      that.set_score_show = true;
    },

    /**
     * 获取滑动调节分数
     * */
    operatGetSlider: function operatGetSlider(res) {
      var that = this;
      that.value = res.mp.detail.value;
    },

    /**
     * 获得任务列表
     * */
    refreshReviewScore: function refreshReviewScore() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var that;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this2;

                that.$unit.showWaiting();

                _context2.next = 4;
                return that.$store.dispatch("_getTaskDetalis", {
                  im: that.$constData.INTER_FACE.get_task_details,
                  fps: {
                    userid: that.registUser.data.back_value.userid,
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

              case 4:
                _context2.next = 6;
                return that.$store.dispatch("_getReviewUserList", {
                  im: that.$constData.INTER_FACE.get_waiting_for_review_list,
                  fps: {
                    userid: that.registUser.data.back_value.userid,
                    task_id: that.$root.$mp.query.task_id,
                    review_date: that.$root.$mp.query.review_date
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_waiting_for_review_list");
                  } else {
                    that.review_score_user = res.data.back_value;
                  }
                });

              case 6:

                that.$unit.closeWaiting();

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },

    /**
     * 格式每个阶段日期显示
     * */
    _init_stage: function _init_stage(end, review_date, task_work_day_count) {
      var that = this;

      var ss_by_task_end_date = Date.parse(end.replace(/\-/g, "/")); // 获取任务结束时间毫秒
      var ss_by_review_date = Date.parse(review_date.replace(/\-/g, "/")); // 获取审查时间毫秒

      // 审查日当天的日期对象

      var _that$$unit$getYearMo = that.$unit.getYearMonthDay(new Date(review_date)),
          year = _that$$unit$getYearMo.year,
          month = _that$$unit$getYearMo.month,
          day = _that$$unit$getYearMo.day;

      var review_date_hm = that.$unit.getDate(year, month, day);

      // 审查日往前推x天，就是这个任务第几个阶段开始的日期
      var task_start_date = parseInt(task_work_day_count) - 1;

      // 审查日往前推x天的毫秒，总数
      var hm = task_start_date * 60 * 60 * 1000 * 24;

      // 如果审查时间大于任务结束时间
      if (ss_by_review_date > ss_by_task_end_date) {
        hm += ss_by_review_date - ss_by_task_end_date;
      }

      var y = new Date(review_date_hm - hm).getFullYear();
      var m = parseInt(new Date(review_date_hm - hm).getMonth() + 1) < 10 ? "0" + parseInt(new Date(review_date_hm - hm).getMonth() + 1) : parseInt(new Date(review_date_hm - hm).getMonth() + 1);
      var d = new Date(review_date_hm - hm).getDate() < 10 ? "0" + new Date(review_date_hm - hm).getDate() : new Date(review_date_hm - hm).getDate();
      return {
        start: y + "-" + m + "-" + d,
        end: "" + review_date,
        day: "" + task_work_day_count
      };
    }
  },
  onUnload: function onUnload() {
    var that = this;
    that.$unit.restData(that);
  },

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_6_vuex__["b" /* mapGetters */])(["registUser"])),
  onPullDownRefresh: function onPullDownRefresh() {
    var _this3 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
      var that;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              that = _this3;

              wx.stopPullDownRefresh();

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  }
});

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "review-score-container"
  }, [_c('CKdetailsHeader', {
    attrs: {
      "data": _vm.task_details,
      "corpid": _vm.registUser.data.back_value.corpid,
      "login-userid": _vm.registUser.data.back_value.userid,
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('CKdetailsContent', {
    attrs: {
      "data": _vm.task_details,
      "mpcomid": '1'
    }
  }), _vm._v(" "), _c('CKtitleNotice', {
    attrs: {
      "ord-message": "评审阶段",
      "mpcomid": '2'
    }
  }), _vm._v(" "), _c('section', {
    staticClass: "review-score-stage"
  }, [_vm._v(_vm._s(_vm.review_stage.start) + " ~ " + _vm._s(_vm.review_stage.end) + "，共工作" + _vm._s(_vm.review_stage.day) + "天")]), _vm._v(" "), _c('CKtitleNotice', {
    attrs: {
      "ord-message": "等待打分的执行人",
      "mpcomid": '3'
    }
  }), _vm._v(" "), _c('section', {
    staticClass: "review-score-user"
  }, _vm._l((_vm.review_score_user), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "review-score-user-item",
      attrs: {
        "eventid": '0_' + index
      },
      on: {
        "click": function($event) {
          _vm.operatOpenSetScore(item, index)
        }
      }
    }, [_c('div', {
      staticClass: "photo"
    }, [_c('img', {
      attrs: {
        "src": item.avatar,
        "alt": ""
      }
    })]), _vm._v(" "), (_vm.corpid && item.executor_userid) ? _c('div', {
      staticClass: "name"
    }, [_c('ww-open-data', {
      attrs: {
        "corpid": _vm.corpid,
        "openid": item.executor_userid,
        "type": "userName",
        "mpcomid": '4_' + index
      }
    })], 1) : _vm._e(), _vm._v(" "), (item.status === 8) ? _c('div', {
      staticClass: "score"
    }, [_vm._v(_vm._s(item.score * 100) + "分，[点击修改]")]) : _vm._e(), _vm._v(" "), (item.status === 7) ? _c('div', {
      staticClass: "score"
    }, [_vm._v("[无法打分]")]) : _vm._e(), _vm._v(" "), (item.status === 6) ? _c('div', {
      staticClass: "score"
    }, [_vm._v("[点击打分]")]) : _vm._e(), _vm._v(" "), (item.status === 6) ? _c('icon', {
      attrs: {
        "type": "info",
        "color": "#ffc300",
        "size": "26"
      }
    }) : _vm._e(), _vm._v(" "), (item.status === 7) ? _c('icon', {
      attrs: {
        "type": "waiting",
        "size": "26"
      }
    }) : _vm._e(), _vm._v(" "), (item.status === 8) ? _c('icon', {
      attrs: {
        "type": "success",
        "size": "26"
      }
    }) : _vm._e()], 1)
  })), _vm._v(" "), _c('v-popup', {
    attrs: {
      "show": _vm.set_score_show,
      "round": "",
      "mpcomid": '5'
    }
  }, [_c('section', {
    staticClass: "review_score_set_score"
  }, [_c('div', {
    staticClass: "review_score_set_score_tile"
  }, [_vm._v("\n        考察日期" + _vm._s(_vm.review_stage.start) + " 到 " + _vm._s(_vm.review_stage.end) + "\n        "), _c('p', [_vm._v("共计" + _vm._s(_vm.review_stage.day) + "天")])], 1), _vm._v(" "), _c('div', {
    staticClass: "review_score_set_score_slider"
  }, [_c('p', [_vm._v("完成度" + _vm._s(_vm.value) + "%")]), _vm._v(" "), _c('div', [_c('slider', {
    attrs: {
      "step": "5",
      "value": _vm.value,
      "eventid": '1'
    },
    on: {
      "change": _vm.operatGetSlider
    }
  })]), _vm._v(" "), _c('p', [_vm._v("拖动滑条调整完成度")])], 1), _vm._v(" "), _c('div', {
    staticClass: "review_score_set_score_content"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.content),
      expression: "content"
    }],
    attrs: {
      "placeholder": "备注信息",
      "fixed": "",
      "adjust-position": "",
      "eventid": '2'
    },
    domProps: {
      "value": (_vm.content)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.content = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "review_score_set_score_button"
  }, [_c('p', {
    attrs: {
      "eventid": '3'
    },
    on: {
      "click": function () {
        _vm.set_score_show = false;
        _vm.content = '';
        _vm.value = 100
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('p', {
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.operatSetScore
    }
  }, [_vm._v("提交分数")])], 1)])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2f3d9ca0", esExports)
  }
}

/***/ })

},[222]);