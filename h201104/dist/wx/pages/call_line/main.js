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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_get_line__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_call_item__ = __webpack_require__(137);




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    getLine: __WEBPACK_IMPORTED_MODULE_5__components_get_line__["a" /* default */],
    callItem: __WEBPACK_IMPORTED_MODULE_6__components_call_item__["a" /* default */]
  },
  data: function data() {
    return {
      message_count: 0, // 信息条数
      active: 0, // tab 下标
      call_line_list: [], // 列表
      u_key: '' // 本人 key
    };
  },
  onShow: function onShow() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.$Utils.showWaiting();

              // 获取 u_key
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
                  if (res.error_code === 2012100231) {
                    throw new Error("未登录");
                  } else {
                    _this.$Utils.showErrorInfo(res, "get_member_info");
                  }
                } else {
                  if (res.back_value.name === "" || res.back_value.name === null) {
                    throw new Error("未登录");
                  } else {
                    _this.u_key = res.back_value.u_key;
                  }
                }
              });

            case 3:

              if (_this.active === 1) {
                // 如果点击的是我创建的对话，并且从我创建的对话详情回来的
                _this.refreshCallLine("trigger_ukey");
              } else {
                // 先获取一下 我收到的留言
                _this.refreshCallLine("accepter_ukey");
              }

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
     * tab 点击
     */
    clickTabs: function clickTabs(event) {
      this.$Utils.showWaiting();
      this.call_line_list = [];
      this.active = event.mp.detail.index;
      if (event.mp.detail.index === 0) {
        // 我收到的 accepter_ukey
        this.refreshCallLine("accepter_ukey");
      } else {
        // 我建立的 trigger_ukey
        this.refreshCallLine("trigger_ukey");
      }
    },

    /**
     * 删除系统信息
     */
    systemDel: function systemDel(res) {
      var id = res.id;
      var operation_status = res.operation_status;
      var that = this;
      if (operation_status === 5) {
        wx.showModal({
          title: '提示',
          content: '确定删除吗？',
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
                    that.refreshCallLine("accepter_ukey");
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
     * 阅读系统信息
     */
    systemContact: function systemContact(res) {
      var _this2 = this;

      var id = res.id;
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
        } else {}
      });
    },

    /**
     * 我收到的 删除留言
     */
    myGetDel: function myGetDel(res) {
      var id = res.id;
      var operation_status = res.operation_status;
      var that = this;
      if (operation_status === 5) {
        wx.showModal({
          title: '提示',
          content: '确定删除吗？',
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
                    that.refreshCallLine("accepter_ukey");
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
    myGet: function myGet(res) {
      var _this3 = this;

      if (res.trigger_ukey !== 'root') {
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
            _this3.$Utils.closeWaiting();
            _this3.$Utils.showErrorInfo(res, "read_message");
          } else {
            if (res.back_value) {
              wx.navigateTo({
                url: "/pages/get_call/main?id=" + id + "&u_key=" + _this3.u_key
              });
            }
            _this3.$Utils.closeWaiting();
          }
        });
      } else {
        console.log(res.name);
      }
    },

    /**
     * 我建立的 删除留言
     */
    myCreatedDel: function myCreatedDel(res) {
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
                    that.refreshCallLine("trigger_ukey");
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
          content: '确定删除吗？',
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
    myCreated: function myCreated(res) {
      var _this4 = this;

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
          _this4.$Utils.closeWaiting();
          _this4.$Utils.showErrorInfo(res, "read_message");
        } else {
          if (res.back_value) {
            wx.navigateTo({
              url: "/pages/send_call/main?id=" + id + "&u_key=" + _this4.u_key
            });
          }
          _this4.$Utils.closeWaiting();
        }
      });
    },

    /**
     * 获取留言信息
     */
    refreshCallLine: function refreshCallLine() {
      var _this5 = this;

      for (var _len = arguments.length, res = Array(_len), _key = 0; _key < _len; _key++) {
        res[_key] = arguments[_key];
      }

      return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var _ref, type;

        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(res)), type = _ref[0];
                _context2.next = 3;
                return _this5.$store.dispatch("fetch", {
                  im: _this5.$Config.INTER_FACE.get_chat_record_list,
                  fps: {
                    u_key: _this5.u_key,
                    type_str: type
                  },
                  url: _this5.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    _this5.$Utils.closeWaiting();
                    _this5.$Utils.showErrorInfo(res, "get_chat_record_list");
                  } else {
                    _this5.call_line_list = res.back_value;
                  }
                });

              case 3:
                _context2.next = 5;
                return _this5.$store.dispatch("fetch", {
                  im: _this5.$Config.INTER_FACE.get_unread_message,
                  fps: {
                    u_key: _this5.u_key
                  },
                  url: _this5.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    _this5.$Utils.closeWaiting();
                    _this5.$Utils.showErrorInfo(res, "get_unread_message");
                  } else {
                    _this5.message_count = res.back_value;
                  }
                });

              case 5:
                _this5.$Utils.closeWaiting();

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this5);
      }))();
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_4_vuex__["b" /* mapGetters */])(["openid"]))
});

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_call_item_vue__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_71cb5e99_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_call_item_vue__ = __webpack_require__(140);
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
var __vue_scopeId__ = "data-v-71cb5e99"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_call_item_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_71cb5e99_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_call_item_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/call_item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] call_item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71cb5e99", Component.options)
  } else {
    hotAPI.reload("data-v-71cb5e99", Component.options)
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
//
//
//
//
//
//
//
//
//
//
//
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
  name: "call_item",
  props: {
    item: {
      type: Object
    },
    type: {
      type: String,
      default: '我建立的会话'
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('onClick');
    },
    onDelete: function onDelete() {
      this.$emit("onDelete");
    },
    onContact: function onContact(e) {
      this.$emit("onContact");
    }
  },
  computed: {
    time: function time() {
      var time = this.item.creation_time;
      if (time) {
        return this.$Utils.format(time);
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
    staticClass: "call_item-container"
  }, [_c('div', {
    attrs: {
      "hover-class": "click_active",
      "eventid": '2'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.onClick($event)
      }
    }
  }, [_c('div', {
    staticClass: "call_item-header"
  }, [(_vm.type === '我收到的会话') ? _c('div', [_c('span', [_vm._v(_vm._s(_vm.item.name))]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.time))])]) : _vm._e(), _vm._v(" "), (_vm.type === '我建立的会话') ? _c('div', [_c('span', [_vm._v("我")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.time) + "，给\"" + _vm._s(_vm.item.name) + "\"留言")])]) : _vm._e(), _vm._v(" "), (_vm.type === 'system') ? _c('div', [_c('span', {
    staticStyle: {
      "color": "red"
    }
  }, [_vm._v("系统消息")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.time))])]) : _vm._e(), _vm._v(" "), _c('div', {
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.onDelete($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.status))])]), _vm._v(" "), (_vm.type === 'system') ? _c('button', {
    attrs: {
      "session-from": "laiyuan",
      "send-message-title": _vm.item.content,
      "open-type": "contact",
      "send-message-path": "pages/call_line/main",
      "send-message-img": "https://f.hztc.dev.hztcapp.com/cos_upload/wx/image_list/下载.png",
      "show-message-card": "true",
      "eventid": '1'
    },
    on: {
      "contact": _vm.onContact
    }
  }, [_vm._v(_vm._s(_vm.item.content))]) : _c('div', {
    staticClass: "call_item-message"
  }, [_vm._v(_vm._s(_vm.item.content))])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-71cb5e99", esExports)
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
      "eventid": '3',
      "mpcomid": '5'
    },
    on: {
      "change": _vm.clickTabs
    }
  }, [_c('v-tab', {
    attrs: {
      "title": "我收到的会话",
      "mpcomid": '2'
    }
  }, _vm._l((_vm.call_line_list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "call"
    }, [(item.trigger_ukey !== 'root') ? _c('div', [_c('call-item', {
      attrs: {
        "item": item,
        "type": "我收到的会话",
        "eventid": '0_' + index,
        "mpcomid": '0_' + index
      },
      on: {
        "onClick": function($event) {
          _vm.myGet(item)
        },
        "onDelete": function($event) {
          _vm.myGetDel(item)
        }
      }
    })], 1) : _c('div', {
      staticClass: "system_message"
    }, [_c('call-item', {
      attrs: {
        "item": item,
        "type": "system",
        "eventid": '1_' + index,
        "mpcomid": '1_' + index
      },
      on: {
        "onContact": function($event) {
          _vm.systemContact(item)
        },
        "onDelete": function($event) {
          _vm.systemDel(item)
        }
      }
    })], 1)])
  })), _vm._v(" "), _c('v-tab', {
    attrs: {
      "title": "我建立的会话",
      "mpcomid": '4'
    }
  }, _vm._l((_vm.call_line_list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "call"
    }, [_c('call-item', {
      attrs: {
        "item": item,
        "type": "我建立的会话",
        "eventid": '2_' + index,
        "mpcomid": '3_' + index
      },
      on: {
        "onClick": function($event) {
          _vm.myCreated(item)
        },
        "onDelete": function($event) {
          _vm.myCreatedDel(item)
        }
      }
    })], 1)
  }))], 1), _vm._v(" "), _c('tab', {
    attrs: {
      "selected": "1",
      "message-count": _vm.message_count,
      "mpcomid": '6'
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-bf8108fc", esExports)
  }
}

/***/ })

},[126]);