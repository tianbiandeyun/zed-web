require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([17],{

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activity_details__ = __webpack_require__(104);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__activity_details__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_activity_details_vue__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_2dbb7ad6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_activity_details_vue__ = __webpack_require__(115);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(105)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2dbb7ad6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_activity_details_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_2dbb7ad6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_activity_details_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/activity_details/activity_details.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] activity_details.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2dbb7ad6", Component.options)
  } else {
    hotAPI.reload("data-v-2dbb7ad6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 105:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_sign__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_getUserInfo__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_login__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuex__ = __webpack_require__(4);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "details",
  components: {
    signItem: __WEBPACK_IMPORTED_MODULE_3__components_sign__["a" /* default */],
    getUserInfo: __WEBPACK_IMPORTED_MODULE_4__components_getUserInfo__["a" /* default */]
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_5__utils_login__["a" /* default */]],
  data: function data() {
    return {
      more_content: "更多详情",
      is_more: false,
      details_info: "",
      user_list: [],
      button_msg: "",
      is_scope: false,
      u_key: ""
    };
  },
  onShow: function onShow() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              _this.$Utils.showWaiting("正在加载");

              // 因为这个页面需要分享出去，所以要判断是否有 openid 如果没有则获取

              if (_this.openid.back_value) {
                _context.next = 4;
                break;
              }

              _context.next = 4;
              return _this.getOpenid();

            case 4:
              _context.next = 6;
              return _this.refreshDetails();

            case 6:

              _this.$Utils.closeWaiting();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  methods: {
    getUserId: function getUserId(res) {
      wx.navigateTo({
        url: "/pages/user_center/main?u_key=" + res + "&m_key=" + this.$root.$mp.query.m_key
      });
    },
    more: function more() {
      this.is_more = !this.is_more;
      this.is_more ? this.more_content = "收起" : this.more_content = "更多详情";
    },

    /**
     * 前往组织详情
     * */
    organize: function organize() {
      wx.navigateTo({
        url: "/pages/organize/main?organize_id=" + this.details_info.organizers_id
      });
    },

    /**
     * 报名参与
     * */
    sign: function sign() {
      var _this2 = this;

      // 获取用户信息
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_member_info,
        fps: {
          open_id: this.openid.back_value.open_id,
          u_key: ""
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this2.$Utils.closeWaiting();
          _this2.is_scope = true;
          // this.$Utils.showErrorInfo(res, "get_member_info");
          console.log(res.error_code);
          console.log(res.error_info);
        } else {
          wx.navigateTo({
            url: "/pages/participate/main?activity_id=" + _this2.$root.$mp.query.activity_id
          });
        }
      });
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
          open_id: this.openid.back_value.open_id,
          encrypted_data: res.encryptedData,
          iv: res.iv
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this3.$Utils.closeWaiting();
          _this3.$Utils.showErrorInfo(res, "set_update_user_info");
        } else {
          _this3.$Utils.closeWaiting();
          _this3.is_scope = false;
          wx.navigateTo({
            url: "/pages/participate/main?activity_id=" + _this3.$root.$mp.query.activity_id
          });
        }
      });
    },

    /**
     * 获取经纬度并且打开地图位置
     * */
    getLocation: function getLocation() {

      var that = this;

      this.$Utils.showWaiting("请稍后");

      console.log(this.details_info);

      wx.openLocation({
        latitude: +that.details_info.longitude,
        longitude: +that.details_info.latitude,
        name: that.details_info.congress_venue,
        scale: 18,
        success: function success() {
          that.$Utils.closeWaiting();
        },
        fail: function fail() {
          that.$Utils.closeWaiting();
        }
      });
    },
    refreshDetails: function refreshDetails() {
      var _this4 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this4.$store.dispatch("fetch", {
                  im: _this4.$Config.INTER_FACE.get_salon_activity_info,
                  fps: {
                    activity_id: _this4.$root.$mp.query.activity_id
                  },
                  url: _this4.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    _this4.$Utils.closeWaiting();
                    _this4.$Utils.showErrorInfo(res, "get_salon_activity_info");
                  } else {
                    _this4.details_info = res.back_value;
                  }
                });

              case 2:
                _context2.next = 4;
                return _this4.$store.dispatch("fetch", {
                  im: _this4.$Config.INTER_FACE.get_user_sign_up_status,
                  fps: {
                    open_id: _this4.openid.back_value.open_id,
                    activity_id: _this4.$root.$mp.query.activity_id
                  },
                  url: _this4.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    _this4.$Utils.closeWaiting();
                    _this4.$Utils.showErrorInfo(res, "get_user_sign_up_status");
                  } else {
                    var msg = {
                      1: "报名参会",
                      2: "修改报名信息",
                      3: "等待审核"
                    };
                    _this4.button_msg = msg[res.back_value];
                  }
                });

              case 4:
                _context2.next = 6;
                return _this4.$store.dispatch("fetch", {
                  im: _this4.$Config.INTER_FACE.get_activity_member_list,
                  fps: {
                    open_id: _this4.openid.back_value.open_id,
                    activity_id: _this4.$root.$mp.query.activity_id
                  },
                  url: _this4.$Config.REQUEST_URI
                }).then(function (res) {
                  if (res.result === "failure") {
                    _this4.$Utils.closeWaiting();
                    _this4.$Utils.showErrorInfo(res, "get_activity_member_list");
                  } else {
                    _this4.user_list = res.back_value;
                  }
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this4);
      }))();
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_6_vuex__["b" /* mapGetters */])(["openid"])),
  onUnload: function onUnload() {
    this.$Utils.restData(this);
  },
  onPullDownRefresh: function onPullDownRefresh() {
    var _this5 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this5.$Utils.showWaiting();
              _context3.next = 3;
              return _this5.refreshDetails();

            case 3:
              _this5.$Utils.closeWaiting();
              wx.stopPullDownRefresh();

            case 5:
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
      title: "\"" + this.details_info.title + "\"\u9080\u8BF7\u51FD",
      path: "/pages/activity_details/main?activity_id=" + this.$root.$mp.query.activity_id,
      imageUrl: ""
    };
  }

});

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "details-container"
  }, [_c('div', {
    staticClass: "details-log"
  }, [_c('img', {
    attrs: {
      "src": _vm.details_info.main_graph,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "details-box"
  }, [_c('div', {
    staticClass: "details-time"
  }, [_c('span', [_vm._v("会议时间：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.details_info.meeting_time))])]), _vm._v(" "), _c('div', {
    staticClass: "details-post",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.getLocation
    }
  }, [_c('span', [_vm._v("会议地点：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.details_info.congress_venue))]), _vm._v(" "), _c('span', [_vm._v(" > ")])]), _vm._v(" "), _c('div', {
    staticClass: "details-origin",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.organize
    }
  }, [_c('span', [_vm._v("组织信息：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.details_info.organizers_title))]), _vm._v(" "), _c('span', [_vm._v(" > ")])])]), _vm._v(" "), _c('div', {
    staticClass: "details-content"
  }, [_c('h1', [_vm._v("活动介绍：")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.details_info.activity_brief))])], 1), _vm._v(" "), _c('div', {
    staticClass: "details-content-more"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.is_more),
      expression: "is_more"
    }],
    staticClass: "more-box"
  }, [_c('h1', [_vm._v("活动流程：")]), _vm._v(" "), _vm._l((_vm.details_info.activity_flow), function(item, index) {
    return _c('p', {
      key: index
    }, [_vm._v("\n        " + _vm._s(item) + "\n      ")])
  })], 2), _vm._v(" "), _c('p', {
    staticClass: "more",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.more
    }
  }, [_vm._v(" -- " + _vm._s(_vm.more_content) + " -- ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "details-tip"
  }, [_vm._v("与会嘉宾/签到簿：")]), _vm._v(" "), _vm._l((_vm.user_list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "details-sign"
    }, [_c('signItem', {
      attrs: {
        "item": item,
        "eventid": '3_' + index,
        "mpcomid": '0_' + index
      },
      on: {
        "getUserId": _vm.getUserId
      }
    })], 1)
  }), _vm._v(" "), _c('div', {
    staticClass: "details-bottom"
  }, [_c('div', [_c('button', {
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.sign
    }
  }, [_vm._v(_vm._s(_vm.button_msg))])], 1), _vm._v(" "), _c('div', [_c('button', {
    attrs: {
      "open-type": "share"
    }
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/share.png",
      "alt": ""
    }
  })])], 1)]), _vm._v(" "), _c('getUserInfo', {
    attrs: {
      "isScope": _vm.is_scope,
      "eventid": '5',
      "mpcomid": '1'
    },
    on: {
      "setUserInfo": _vm.setUserInfo
    }
  })], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2dbb7ad6", esExports)
  }
}

/***/ })

},[103]);