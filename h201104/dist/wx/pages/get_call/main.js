require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([13],{

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__get_call__ = __webpack_require__(151);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__get_call__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_get_call_vue__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_6ab4ad76_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_get_call_vue__ = __webpack_require__(157);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(152)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6ab4ad76"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_get_call_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_6ab4ad76_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_get_call_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/get_call/get_call.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] get_call.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ab4ad76", Component.options)
  } else {
    hotAPI.reload("data-v-6ab4ad76", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 152:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_get_line__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_reply__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_input_group__ = __webpack_require__(36);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "get_call",
  components: {
    getLine: __WEBPACK_IMPORTED_MODULE_1__components_get_line__["a" /* default */],
    reply: __WEBPACK_IMPORTED_MODULE_2__components_reply__["a" /* default */],
    inputGroup: __WEBPACK_IMPORTED_MODULE_3__components_input_group__["a" /* default */]
  },
  data: function data() {
    return {
      u_key: '',
      id: '',
      list: '',
      is_dialog: false,
      checkbox: [],
      index: '' // 举报信息的index
    };
  },
  mounted: function mounted() {
    this.$Utils.showWaiting();
    this.u_key = this.$root.$mp.query.u_key;
    this.id = this.$root.$mp.query.id;

    // 获取对话详情
    this.refreshMessageDetails(this.id);
  },

  methods: {
    /**
     * 举报信息
     */
    confirm: function confirm() {
      var that = this;
      that.is_dialog = false;

      if (that.checkbox.length === 0) {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "请选择举报原因",
          success: function success(res) {}
        });
        return false;
      }

      var content = that.checkbox.join('|');

      // 因为要共用一个选择举报理由的选框，所以如果是 9999 的话，说明点击的是顶部的举报信息
      if (that.index === 9999) {

        var id = that.list.conversation.id;
        var operation_status = that.list.conversation.operation_status;

        if (operation_status === 2) {
          wx.showModal({
            title: '提示',
            content: '确定举报吗？',
            success: function success(res) {
              if (res.confirm) {
                that.$Utils.showWaiting();
                that.$store.dispatch("fetch", {
                  im: that.$Config.INTER_FACE.accuse_message,
                  fps: {
                    id: id,
                    u_key: that.u_key,
                    // 举报内容 - 新增
                    content: content
                  },
                  url: that.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    that.$Utils.closeWaiting();
                    that.$Utils.showErrorInfo(res, "accuse_message");
                  } else {
                    if (res.back_value) {
                      // 获取对话详情
                      that.refreshMessageDetails(that.id);
                    }
                  }
                });
              } else if (res.cancel) {
                that.checkbox = [];
                console.log('用户点击取消');
              }
            }
          });
        }
      } else {

        var _id2 = that.list.reply[that.index].id;
        var _operation_status = that.list.reply[that.index].operation_status;

        if (_operation_status === 2) {
          wx.showModal({
            title: '提示',
            content: '确定举报吗？',
            success: function success(res) {
              var _this = this;

              if (res.confirm) {
                that.$Utils.showWaiting();
                that.$store.dispatch("fetch", {
                  im: that.$Config.INTER_FACE.accuse_message,
                  fps: {
                    id: _id2,
                    u_key: that.u_key,
                    // 举报内容 - 新增
                    content: content
                  },
                  url: that.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    that.$Utils.closeWaiting();
                    that.$Utils.showErrorInfo(res, "accuse_message");
                  } else {
                    if (res.back_value) {
                      _this.checkbox = [];
                      // 获取对话详情
                      that.refreshMessageDetails(that.id);
                    }
                  }
                });
              } else if (res.cancel) {
                that.checkbox = [];
                console.log('用户点击取消');
              }
            }
          });
        }
      }
    },
    onChange: function onChange(event) {
      this.checkbox = event.mp.detail;
    },

    /**
     * 打开举报信息
     */
    delCall: function delCall(index) {

      this.index = index;
      var operation_status = this.list.reply[this.index].operation_status;
      // 如果已经举报则退出
      if (operation_status === 3) {
        return false;
      }
      this.is_dialog = true;
    },
    delCall2: function delCall2(res) {

      this.index = 9999;
      var operation_status = res.operation_status;
      // 如果已经举报则退出
      if (operation_status === 3) {
        return false;
      }
      this.is_dialog = true;
    },

    /**
     * 我说的
     */
    revoke: function revoke(res) {

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
                    // 获取对话详情
                    that.refreshMessageDetails(that.id);
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
    submit: function submit(p) {

      var that = this;

      var _id = that.$root.$mp.query.id;
      var _u_key = that.u_key;
      var _trigger_ukey = that.list.conversation.trigger_ukey;
      var _message = p.message;

      that.$Utils.showWaiting();
      that.$store.dispatch("fetch", {
        im: that.$Config.INTER_FACE.set_reply_to_message,
        fps: {
          'message_id': _id,
          'u_key': _u_key,
          'second_ukey': _trigger_ukey,
          'content': _message,
          'receive_message': ''
        },
        url: that.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          that.$Utils.closeWaiting();
          if (res.error_code === 201204121753) {

            wx.showModal({
              title: "提交",
              content: "对方已结束本次会话，无法回复",
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

          that.$Utils.showErrorInfo(res, "set_reply_to_message");
        } else {
          if (res.back_value) {
            that.refreshMessageDetails(that.id);
          }
        }
      });

      // wx.requestSubscribeMessage({
      //   tmplIds: ['gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8'],
      //   success: res => {
      //     if (res.gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8 === 'accept') {
      //       that.$Utils.showWaiting();
      //       that.$store.dispatch("fetch", {
      //         im: that.$Config.INTER_FACE.set_reply_to_message,
      //         fps: {
      //           'message_id': _id,
      //           'u_key': _u_key,
      //           'second_ukey': _trigger_ukey,
      //           'content': _message,
      //           'receive_message': 1
      //         },
      //         url: that.$Config.REQUEST_URI
      //       }).then(res => {
      //         if (res.result === "failure") {
      //           that.$Utils.closeWaiting();
      //           that.$Utils.showErrorInfo(res, "set_reply_to_message");
      //         } else {
      //           if (res.back_value) {
      //             that.refreshMessageDetails(that.id);
      //           }
      //         }
      //       });
      //     }
      //     if (res.gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8 === 'reject') {
      //       that.$Utils.showWaiting();
      //       that.$store.dispatch("fetch", {
      //         im: that.$Config.INTER_FACE.set_reply_to_message,
      //         fps: {
      //           'message_id': _id,
      //           'u_key': _u_key,
      //           'second_ukey': _trigger_ukey,
      //           'content': _message,
      //           'receive_message': 2
      //         },
      //         url: that.$Config.REQUEST_URI
      //       }).then(res => {
      //         if (res.result === "failure") {
      //           that.$Utils.closeWaiting();
      //           that.$Utils.showErrorInfo(res, "set_reply_to_message");
      //         } else {
      //           if (res.back_value) {
      //             that.refreshMessageDetails(that.id);
      //           }
      //         }
      //       });
      //     }
      //   }
      // })
    },
    refreshMessageDetails: function refreshMessageDetails() {
      var _this2 = this;

      for (var _len = arguments.length, res = Array(_len), _key = 0; _key < _len; _key++) {
        res[_key] = arguments[_key];
      }

      var _ref = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(res)),
          id = _ref[0];

      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_chat_record_info,
        fps: {
          message_id: id,
          u_key: this.u_key
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this2.$Utils.closeWaiting();
          _this2.$Utils.showErrorInfo(res, "get_chat_record_info");
        } else {
          _this2.list = res.back_value;
          _this2.$Utils.closeWaiting();
        }
      });
    }
  }
});

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "get-call-container"
  }, [(_vm.list != '') ? _c('div', {
    staticClass: "call"
  }, [_c('get-line', {
    attrs: {
      "item": _vm.list.conversation,
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "delCall": function($event) {
        _vm.delCall2(_vm.list.conversation)
      }
    }
  })], 1) : _vm._e(), _vm._v(" "), _vm._l((_vm.list.reply), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "call"
    }, [(_vm.u_key == item.trigger_ukey) ? _c('div', [_c('reply', {
      attrs: {
        "item": item,
        "eventid": '1_' + index,
        "mpcomid": '1_' + index
      },
      on: {
        "revoke": function($event) {
          _vm.revoke(item)
        }
      }
    })], 1) : _c('div', [_c('get-line', {
      attrs: {
        "item": item,
        "eventid": '2_' + index,
        "mpcomid": '2_' + index
      },
      on: {
        "delCall": function($event) {
          _vm.delCall(index)
        }
      }
    })], 1)])
  }), _vm._v(" "), _c('div', {
    staticClass: "call"
  }, [_c('input-group', {
    attrs: {
      "eventid": '3',
      "mpcomid": '3'
    },
    on: {
      "submit": _vm.submit
    }
  })], 1), _vm._v(" "), _c('v-dialog', {
    attrs: {
      "use-slot": "",
      "title": "请选择举报原因",
      "confirm-button-color": "#19be6b",
      "show": _vm.is_dialog,
      "show-cancel-button": "",
      "eventid": '5',
      "mpcomid": '9'
    },
    on: {
      "cancel": function($event) {
        _vm.is_dialog = false;
        _vm.checkbox = []
      },
      "confirm": _vm.confirm
    }
  }, [_c('div', {
    staticClass: "jubao"
  }, [_c('v-checkbox-group', {
    attrs: {
      "value": _vm.checkbox,
      "eventid": '4',
      "mpcomid": '8'
    },
    on: {
      "change": _vm.onChange
    }
  }, [_c('v-checkbox', {
    attrs: {
      "name": "发布不适内容对我造成骚扰",
      "mpcomid": '4'
    }
  }, [_vm._v("发布不适内容对我造成骚扰")]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }), _vm._v(" "), _c('v-checkbox', {
    attrs: {
      "name": "存在欺诈骗钱行为",
      "mpcomid": '5'
    }
  }, [_vm._v("存在欺诈骗钱行为")]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }), _vm._v(" "), _c('v-checkbox', {
    attrs: {
      "name": "存在侵权行文",
      "mpcomid": '6'
    }
  }, [_vm._v("存在侵权行文")]), _vm._v(" "), _c('div', {
    staticClass: "item"
  }), _vm._v(" "), _c('v-checkbox', {
    attrs: {
      "name": "存在煽动反动色情内容",
      "mpcomid": '7'
    }
  }, [_vm._v("存在煽动反动色情内容")])], 1)], 1)])], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6ab4ad76", esExports)
  }
}

/***/ })

},[150]);