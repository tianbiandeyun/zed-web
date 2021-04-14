require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([3],{

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__call_line__ = __webpack_require__(127);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__call_line__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_call_line_vue__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_bf8108fc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_call_line_vue__ = __webpack_require__(141);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(128)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bf8108fc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_call_line_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_bf8108fc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_call_line_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/call_line/call_line.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] call_line.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bf8108fc", Component.options)
  } else {
    hotAPI.reload("data-v-bf8108fc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 128:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_get_line__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_create_lline__ = __webpack_require__(137);

//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "call_line",
  components: {
    getLine: __WEBPACK_IMPORTED_MODULE_1__components_get_line__["a" /* default */],
    createdLine: __WEBPACK_IMPORTED_MODULE_2__components_create_lline__["a" /* default */]
  },
  data: function data() {
    return {
      active: 0,
      call_line_list: [],
      u_key: ''
    };
  },
  mounted: function mounted() {
    this.$Utils.showWaiting();

    // 本页面用到的所有 u_key 在此修改
    this.u_key = this.$root.$mp.query.u_key;

    // 先获取一下 我收到的留言
    this.refreshCallLine("accepter_ukey", this.u_key);
  },

  methods: {
    /**
     * 我建立的 删除留言
     */
    delCreatedLine: function delCreatedLine(res) {
      var id = res.id;
      var operation_status = res.operation_status;
      var that = this;

      if (operation_status === 4) {

        wx.showModal({
          title: '提示',
          content: '确定撤回吗？',
          success: function success(res) {
            if (res.confirm) {
              that.$Utils.showWaiting();
              that.$store.dispatch("fetch", {
                im: that.$Config.INTER_FACE.revoke_message,
                fps: {
                  id: id,
                  u_key: that.u_key
                },
                url: that.$Config.REQUEST_URI
              }).then(function (res) {
                if (res.result === "failure") {
                  that.$Utils.closeWaiting();
                  if (res.error_code === 2012240131) {

                    wx.showModal({
                      title: "提交",
                      content: "消息对方已阅读无法撤回",
                      showCancel: false,
                      confirmText: "好的",
                      success: function success() {
                        wx.navigateBack({
                          delta: 1
                        });
                      }
                    });
                    return false;
                  }
                  that.$Utils.showErrorInfo(res, "revoke_message");
                } else {
                  console.log(res);
                  if (res.back_value) {
                    // 我建立的 trigger_ukey
                    that.refreshCallLine("trigger_ukey", that.u_key);
                  }
                }
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }

      if (operation_status === 5) {

        wx.showModal({
          title: '提示',
          content: '确定移除吗？',
          success: function success(res) {
            if (res.confirm) {
              that.$Utils.showWaiting();
              that.$store.dispatch("fetch", {
                im: that.$Config.INTER_FACE.conceal_message,
                fps: {
                  id: id,
                  u_key: that.u_key
                },
                url: that.$Config.REQUEST_URI
              }).then(function (res) {
                if (res.result === "failure") {
                  that.$Utils.closeWaiting();
                  that.$Utils.showErrorInfo(res, "conceal_message");
                } else {
                  if (res.back_value) {
                    // 我建立的 trigger_ukey
                    that.refreshCallLine("trigger_ukey", that.u_key);
                  }
                }
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }
    },

    /**
     * 我建立的 留言详情
     */
    sendCall: function sendCall(res) {
      var _this = this;

      var id = res.id;

      this.$Utils.showWaiting();
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.read_message,
        fps: {
          id: id,
          u_key: this.u_key
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this.$Utils.closeWaiting();
          _this.$Utils.showErrorInfo(res, "read_message");
        } else {
          if (res.back_value) {
            wx.navigateTo({
              url: "/pages/send_call/main?id=" + id + "&u_key=" + _this.u_key
            });
          }
          _this.$Utils.closeWaiting();
        }
      });
    },

    /**
     * 我收到的 删除留言
     */
    delGetLine: function delGetLine(res) {
      var id = res.id;
      var operation_status = res.operation_status;
      var that = this;

      if (operation_status === 5) {

        wx.showModal({
          title: '提示',
          content: '确定移除吗？',
          success: function success(res) {
            if (res.confirm) {
              that.$Utils.showWaiting();
              that.$store.dispatch("fetch", {
                im: that.$Config.INTER_FACE.conceal_message,
                fps: {
                  id: id,
                  u_key: that.u_key
                },
                url: that.$Config.REQUEST_URI
              }).then(function (res) {
                if (res.result === "failure") {
                  that.$Utils.closeWaiting();
                  that.$Utils.showErrorInfo(res, "conceal_message");
                } else {
                  if (res.back_value) {
                    // 我收到的 accepter_ukey
                    that.refreshCallLine("accepter_ukey", that.u_key);
                  }
                }
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      }
    },

    /**
     * 我收到的 留言详情
     */
    getCall: function getCall(res) {
      var _this2 = this;

      var id = res.id;

      this.$Utils.showWaiting();
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.read_message,
        fps: {
          id: id,
          u_key: this.u_key
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this2.$Utils.closeWaiting();
          _this2.$Utils.showErrorInfo(res, "read_message");
        } else {
          if (res.back_value) {
            wx.navigateTo({
              url: "/pages/get_call/main?id=" + id + "&u_key=" + _this2.u_key
            });
          }
          _this2.$Utils.closeWaiting();
        }
      });
    },

    /**
     * tab 点击
     */
    clickTabs: function clickTabs(event) {
      this.$Utils.showWaiting();
      this.call_line_list = [];
      if (event.mp.detail.index === 0) {
        // 我收到的 accepter_ukey
        this.refreshCallLine("accepter_ukey", this.u_key);
      } else {
        // 我建立的 trigger_ukey
        this.refreshCallLine("trigger_ukey", this.u_key);
      }
    },

    /**
     * 获取留言信息
     */
    refreshCallLine: function refreshCallLine() {
      var _this3 = this;

      for (var _len = arguments.length, res = Array(_len), _key = 0; _key < _len; _key++) {
        res[_key] = arguments[_key];
      }

      var _ref = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(res)),
          type = _ref[0],
          key = _ref[1];

      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_chat_record_list,
        fps: {
          u_key: key,
          type_str: type
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this3.$Utils.closeWaiting();
          _this3.$Utils.showErrorInfo(res, "get_chat_record_list");
        } else {
          _this3.call_line_list = res.back_value;
          _this3.$Utils.closeWaiting();
        }
      });
    }
  }
});

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_create_lline_vue__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_0ec57eb0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_create_lline_vue__ = __webpack_require__(140);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(138)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0ec57eb0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_create_lline_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_0ec57eb0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_create_lline_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/create_lline.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] create_lline.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ec57eb0", Component.options)
  } else {
    hotAPI.reload("data-v-0ec57eb0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 138:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 139:
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

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "create_lline",
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    sendCall: function sendCall() {
      this.$emit('sendCall', {
        result: true
      });
    },
    delCall: function delCall() {
      this.$emit("delCall", {
        result: true
      });
    }
  },
  computed: {
    time: function time() {
      var time = this.item.creation_time;

      if (time) {

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
      }
    },
    status: function status() {
      var _status = {
        1: '',
        2: '举报信息',
        3: '已经举报',
        4: '撤回',
        5: '删除'
      };
      return _status[this.item.operation_status];
    }
  }
});

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "create_line-container"
  }, [_c('div', {
    staticClass: "created-line-header",
    attrs: {
      "hover-class": "b",
      "eventid": '1'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.sendCall($event)
      }
    }
  }, [_c('p', [_vm._v("我")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.time) + "，给\"" + _vm._s(_vm.item.name) + "\"留言")]), _vm._v(" "), _c('p', {
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.delCall($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.status))])], 1), _vm._v(" "), _c('div', {
    staticClass: "created-line-message",
    attrs: {
      "hover-class": "b",
      "eventid": '2'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.sendCall($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.item.content))])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0ec57eb0", esExports)
  }
}

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "call_line-container"
  }, [_c('v-tabs', {
    attrs: {
      "active": _vm.active,
      "color": "#19be6b",
      "animated": "",
      "swipeable": "",
      "eventid": '2',
      "mpcomid": '4'
    },
    on: {
      "change": _vm.clickTabs
    }
  }, [_c('v-tab', {
    attrs: {
      "title": "我收到的会话",
      "mpcomid": '1'
    }
  }, _vm._l((_vm.call_line_list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "call"
    }, [_c('get-line', {
      attrs: {
        "item": item,
        "eventid": '0_' + index,
        "mpcomid": '0_' + index
      },
      on: {
        "getCall": function($event) {
          _vm.getCall(item)
        },
        "delCall": function($event) {
          _vm.delGetLine(item)
        }
      }
    })], 1)
  })), _vm._v(" "), _c('v-tab', {
    attrs: {
      "title": "我建立的会话",
      "mpcomid": '3'
    }
  }, _vm._l((_vm.call_line_list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "call"
    }, [_c('created-line', {
      attrs: {
        "item": item,
        "eventid": '1_' + index,
        "mpcomid": '2_' + index
      },
      on: {
        "sendCall": function($event) {
          _vm.sendCall(item)
        },
        "delCall": function($event) {
          _vm.delCreatedLine(item)
        }
      }
    })], 1)
  }))], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-bf8108fc", esExports)
  }
}

/***/ })

},[126]);