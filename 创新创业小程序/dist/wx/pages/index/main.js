require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([12],{

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(159);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_675665fc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(162);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(160)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-675665fc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_675665fc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/index/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-675665fc", Component.options)
  } else {
    hotAPI.reload("data-v-675665fc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 160:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_login__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_getUserInfo__ = __webpack_require__(22);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "index",
  mixins: [__WEBPACK_IMPORTED_MODULE_2__utils_login__["a" /* default */]],
  components: {
    getUserInfo: __WEBPACK_IMPORTED_MODULE_3__components_getUserInfo__["a" /* default */]
  },
  data: function data() {
    return {
      professional_list: [], // 职业列表
      changge_professional: [], // 选择的职业
      is_popup: false, // 是否打开选择职业
      message_count: 0, // 信息条数
      is_login: false, // 是否展示登陆按钮
      is_scope: false, // 是否打开请授权头像
      openid_info: "", // openid 信息
      nick_name: "", // 昵称
      user_photo: "", // 头像
      u_key: "", // 本人 key
      list: [] // 活动列表
    };
  },
  onShow: function onShow() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.$Utils.showWaiting();
              _context.next = 3;
              return _this.getOpenid();

            case 3:
              _this.openid_info = _context.sent;

              _this.refreshIndex();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },
  onHide: function onHide() {
    console.log('index');
    this.is_scope = false;
  },

  methods: {
    /**
     * 提交关注行业
     */
    submit: function submit() {
      var _this2 = this;

      var size = this.changge_professional.length;
      if (size === 0) {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "请选择一个行业",
          success: function success(res) {}
        });
        return false;
      }
      if (size > 3) {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "最多选择三个行业",
          success: function success(res) {}
        });
        return false;
      }
      var interest = this.changge_professional.join('|');
      this.$Utils.showWaiting();
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.update_user_info,
        fps: {
          open_id: this.openid_info.back_value.open_id,
          interest: interest
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this2.$Utils.closeWaiting();
          _this2.$Utils.showErrorInfo(res, "update_user_info");
        } else {
          if (res.back_value) {
            _this2.is_popup = false;
          }
          _this2.$Utils.closeWaiting();
        }
      });
    },

    /**
     * 选择professional
     */
    onChange: function onChange(event) {
      this.changge_professional = event.mp.detail;
    },

    /**
     * 打开请授权头像
     */
    openLogin: function openLogin() {
      this.is_scope = true;
    },

    /**
     * 前往单个活动详情
     * */
    goActivity: function goActivity(res) {
      if (res.status != 3) {
        wx.navigateTo({
          url: "/pages/activity_details/main?activity_id=" + res.id + "&m_key=" + this.u_key
        });
      } else {
        wx.navigateTo({
          url: "/pages/activity_end_details/main?activity_id=" + res.id + "&m_key=" + this.u_key
        });
      }
    },

    /**
     * 授权用户信息并保存
     * */
    setUserInfo: function setUserInfo(res) {
      var _this3 = this;

      this.$Utils.showWaiting();
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.set_update_user_info,
        fps: {
          open_id: this.openid_info.back_value.open_id,
          encrypted_data: encodeURI(res.encryptedData),
          iv: res.iv
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this3.$Utils.closeWaiting();
          _this3.$Utils.showErrorInfo(res, "set_update_user_info");
        } else {
          _this3.is_scope = false;
          _this3.refreshIndex();
        }
      });
    },

    /**
     * 首页信息获取
     * */
    refreshIndex: function refreshIndex() {
      var _this4 = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var personnel;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                personnel = '';

                if (_this4.$root.$mp.query.personnel) {
                  personnel = _this4.$root.$mp.query.personnel;
                }
                // 获取用户信息
                _context2.next = 4;
                return _this4.$store.dispatch("fetch", {
                  im: _this4.$Config.INTER_FACE.get_member_info,
                  fps: {
                    open_id: _this4.openid_info.back_value.open_id,
                    personnel: personnel,
                    u_key: ""
                  },
                  url: _this4.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    _this4.$Utils.closeWaiting();
                    // this.$Utils.showErrorInfo(res, "get_member_info");
                    console.log(res.error_code);
                    console.log(res.error_info);
                  } else {
                    _this4.nick_name = res.back_value.name;
                    _this4.user_photo = res.back_value.wx_photo;
                    _this4.u_key = res.back_value.u_key;
                    _this4.is_login = true;
                    // 如果关注行业没有选择，则显示选择行业
                    if (res.back_value.interest === null || res.back_value.interest === undefined || res.back_value.interest === '') {
                      // 职业选项
                      _this4.$store.dispatch("fetch", {
                        im: _this4.$Config.INTER_FACE.get_occupation_list,
                        fps: {},
                        url: _this4.$Config.REQUEST_URI
                      }).then(function (res) {
                        if (res.result === "failure") {
                          _this4.$Utils.closeWaiting();
                          _this4.$Utils.showErrorInfo(res, "get_occupation_list");
                        } else {
                          _this4.professional_list = res.back_value;
                          _this4.is_popup = true;
                        }
                      });
                    } else {
                      _this4.is_popup = false;
                    }
                  }
                });

              case 4:
                _context2.next = 6;
                return _this4.$store.dispatch("fetch", {
                  im: _this4.$Config.INTER_FACE.get_salon_activity_list,
                  fps: {
                    open_id: _this4.openid_info.back_value.open_id
                  },
                  url: _this4.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    _this4.$Utils.closeWaiting();
                    _this4.$Utils.showErrorInfo(res, "get_salon_activity_list");
                  } else {
                    var result = res.back_value;
                    result.forEach(function (item, index, arr) {
                      item.meeting_time = item.meeting_time.split("日")[0] + "\u65E5";
                    });
                    _this4.list = result;
                  }
                });

              case 6:
                _context2.next = 8;
                return _this4.$store.dispatch("fetch", {
                  im: _this4.$Config.INTER_FACE.get_unread_message,
                  fps: {
                    u_key: _this4.u_key
                  },
                  url: _this4.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    _this4.$Utils.closeWaiting();
                    _this4.$Utils.showErrorInfo(res, "get_unread_message");
                  } else {
                    _this4.message_count = res.back_value;
                  }
                });

              case 8:
                _this4.$Utils.closeWaiting();

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this4);
      }))();
    }
  },
  computed: {
    /**
     * 上午下午
     * */
    getTimeState: function getTimeState() {
      // 获取当前时间
      var timeNow = new Date();
      // 获取当前小时
      var hours = timeNow.getHours();
      // 设置默认文字
      var text = "";
      // 判断当前时间段
      if (hours >= 0 && hours <= 10) {
        text = "\u65E9\u4E0A\u597D";
      } else if (hours > 10 && hours <= 14) {
        text = "\u4E2D\u5348\u597D";
      } else if (hours > 14 && hours <= 18) {
        text = "\u4E0B\u5348\u597D";
      } else if (hours > 18 && hours <= 24) {
        text = "\u665A\u4E0A\u597D";
      }
      // 返回当前时间段对应的状态
      return text;
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    var _this5 = this;

    return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee3() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this5.$Utils.showWaiting();
              _context3.next = 3;
              return _this5.refreshIndex();

            case 3:
              wx.stopPullDownRefresh();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this5);
    }))();
  },

  onShareAppMessage: function onShareAppMessage(res) {
    if (res.from === "button") {
      console.log("来自页面内转发按钮");
    } else {
      console.log("来自右上角转发菜单");
    }
    return {
      title: "风险机遇面对面",
      path: "/pages/index/main",
      imageUrl: ""
    };
  }
});

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "index-container"
  }, [(_vm.is_login) ? _c('div', {
    staticClass: "index-header"
  }, [_c('div', {
    staticClass: "index-header-user-info",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.goUserCenter
    }
  }, [_c('div', {
    staticClass: "photo"
  }, [_c('img', {
    attrs: {
      "src": _vm.user_photo,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "message"
  }, [_vm._v("\"" + _vm._s(_vm.nick_name) + "\"" + _vm._s(_vm.getTimeState) + "，参与投研，洞见未来")])])]) : _c('div', {
    staticClass: "index-header"
  }, [_c('div', {
    staticClass: "index-header-user-info",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.openLogin
    }
  }, [_c('div', {
    staticClass: "photo",
    staticStyle: {
      "background-color": "#fff"
    }
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/nologin.png",
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "message"
  }, [_vm._v("点击登陆")])])]), _vm._v(" "), _c('div', {
    staticClass: "index-activity-list"
  }, _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "index-activity-item",
      attrs: {
        "eventid": '2_' + index
      },
      on: {
        "click": function($event) {
          _vm.goActivity(item)
        }
      }
    }, [_c('div', {
      staticClass: "activity-item-img"
    }, [_c('img', {
      attrs: {
        "src": item.main_graph,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "activity-item-info"
    }, [_c('p', {
      staticClass: "info-title"
    }, [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('div', {
      staticClass: "info-status_time"
    }, [(item.status == 1) ? _c('span', {
      staticClass: "status active-span"
    }, [_vm._v("--- 预约中 ---")]) : _vm._e(), _vm._v(" "), (item.status == 2) ? _c('span', {
      staticClass: "status active-span"
    }, [_vm._v("--- 活动中 ---")]) : _vm._e(), _vm._v(" "), (item.status == 3) ? _c('span', {
      staticClass: "status"
    }, [_vm._v("--- 已结束 ---")]) : _vm._e(), _vm._v(" "), _c('span', {
      staticClass: "time"
    }, [_vm._v("活动时间：" + _vm._s(item.meeting_time))])])], 1)])
  })), _vm._v(" "), _c('getUserInfo', {
    attrs: {
      "isScope": _vm.is_scope,
      "message": "请授权头像信息，否则无法使用",
      "eventid": '3',
      "mpcomid": '0'
    },
    on: {
      "setUserInfo": _vm.setUserInfo
    }
  }), _vm._v(" "), _c('tab', {
    attrs: {
      "message-count": _vm.message_count,
      "mpcomid": '1'
    }
  }), _vm._v(" "), (_vm.is_popup) ? _c('div', {
    staticClass: "tip_overlay"
  }, [_c('div', {
    staticClass: "professional-box"
  }, [_c('h1', {
    staticClass: "professional-title"
  }, [_vm._v("选择不超过3个，您最关注的行业用于向您推荐相关行业的BP和投研活动")]), _vm._v(" "), _c('v-checkbox-group', {
    attrs: {
      "value": _vm.changge_professional,
      "eventid": '6',
      "mpcomid": '3'
    },
    on: {
      "change": _vm.onChange
    }
  }, [_c('div', {
    staticClass: "professional-change"
  }, _vm._l((_vm.professional_list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "professional-item"
    }, [_c('v-checkbox', {
      attrs: {
        "name": item,
        "mpcomid": '2_' + index
      }
    }, [_vm._v(_vm._s(item))])], 1)
  })), _vm._v(" "), _c('div', {
    staticClass: "professional-button"
  }, [_c('button', {
    staticClass: "submit",
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("提交")]), _vm._v(" "), _c('p', {
    staticClass: "wait",
    attrs: {
      "eventid": '5'
    },
    on: {
      "click": function($event) {
        _vm.is_popup = false
      }
    }
  }, [_vm._v("稍后提交")])], 1)])], 1)]) : _vm._e()], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-675665fc", esExports)
  }
}

/***/ })

},[158]);