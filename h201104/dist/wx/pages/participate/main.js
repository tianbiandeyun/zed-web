require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([9],{

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__participate__ = __webpack_require__(175);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__participate__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_participate_vue__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_4f200954_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_participate_vue__ = __webpack_require__(178);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(176)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4f200954"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_participate_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_4f200954_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_participate_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/participate/participate.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] participate.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f200954", Component.options)
  } else {
    hotAPI.reload("data-v-4f200954", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 176:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(4);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "sign_up",
  data: function data() {
    return {
      name: "",
      complate: "",
      zhiwei: "",
      phone_message: "获取手机号码",
      phone: "",
      disabled: false,
      info: ""
    };
  },
  mounted: function mounted() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:

              _this.$Utils.showWaiting();

              // 获取活动信息
              _this.$store.dispatch("fetch", {
                im: _this.$Config.INTER_FACE.get_salon_activity_info,
                fps: {
                  activity_id: _this.$root.$mp.query.activity_id
                },
                url: _this.$Config.REQUEST_URI
              }).then(function (res) {
                if (res.result === "failure") {
                  _this.$Utils.closeWaiting();
                  _this.$Utils.showErrorInfo(res, "get_salon_activity_info");
                } else {
                  _this.info = res.back_value;
                }
              });

              // 如果报名过则显示报名信息
              // if (this.is_registration.back_value != 1) {
              _context.next = 4;
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
                  _this.$Utils.showErrorInfo(res, "get_member_info ");
                } else {

                  _this.name = res.back_value.name || "";
                  _this.complate = res.back_value.company || "";
                  _this.zhiwei = res.back_value.job_description || "";
                  _this.phone = res.back_value.phone || "";

                  if (_this.phone !== "") {
                    _this.disabled = true;
                  }
                }
              });

            case 4:
              // }

              _this.$Utils.closeWaiting();

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  methods: {
    submit: function submit() {
      var _this2 = this;

      if (this.name === "") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "姓名不能为空",
          success: function success(res) {}
        });

        return false;
      }

      if (this.complate === "") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "公司不能为空",
          success: function success(res) {}
        });

        return false;
      }

      if (this.zhiwei === "") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "职位不能为空",
          success: function success(res) {}
        });

        return false;
      }

      if (this.phone === "") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "电话不能为空",
          success: function success(res) {}
        });

        return false;
      }

      this.$Utils.showWaiting();

      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.set_registration,
        fps: {
          open_id: this.openid.back_value.open_id,
          activity_id: this.$root.$mp.query.activity_id,
          name: this.name,
          company: this.complate,
          job_description: this.zhiwei,
          phone: this.phone
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {

        if (res.result === "failure") {
          _this2.$Utils.closeWaiting();
          _this2.$Utils.showErrorInfo(res, "set_registration");
        } else {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "报名成功",
            success: function success(res) {
              wx.navigateBack({
                delta: 1
              });
            }
          });
          _this2.$Utils.closeWaiting();
        }
      });
    },
    goBack: function goBack() {
      wx.navigateBack({
        delta: 1
      });
    },

    /**
     * 获取手机号码
     * */
    getPhone: function getPhone(e) {
      var _this3 = this;

      if (e.mp.detail.errMsg === "getPhoneNumber:ok") {

        this.$Utils.showWaiting();

        var _e$mp$detail = e.mp.detail,
            encryptedData = _e$mp$detail.encryptedData,
            iv = _e$mp$detail.iv;


        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_user_phone,
          fps: {
            open_id: this.openid.back_value.open_id,
            encrypted_data: encryptedData,
            iv: iv,
            cloud_id: ""
          },
          url: this.$Config.REQUEST_URI
        }).then(function (res) {
          if (res.result === "failure") {
            _this3.$Utils.showErrorInfo(res, "get_user_phone");
          } else {
            _this3.phone = res.back_value.phoneNumber;
            _this3.phone_message = "已获取";
            _this3.disabled = true;
            _this3.$Utils.closeWaiting();
          }
        });
      } else {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "未授权手机号码，无法提交。",
          success: function success(res) {}
        });
      }
    },

    /**
     * 获取经纬度并且打开地图位置
     * */
    getLocation: function getLocation() {
      var that = this;

      this.$Utils.showWaiting("请稍后");

      wx.openLocation({
        latitude: +that.info.longitude,
        longitude: +that.info.latitude,
        name: that.info.congress_venue,
        scale: 18,
        success: function success() {
          that.$Utils.closeWaiting();
        },
        fail: function fail() {
          that.$Utils.closeWaiting();
        }
      });
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapGetters */])(["openid", "is_registration"])),
  onUnload: function onUnload() {
    this.$Utils.restData(this);
  }
});

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "sign-up-container"
  }, [_c('div', {
    staticClass: "sign-up-box"
  }, [_c('div', {
    staticClass: "sign-up-origin",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.goBack
    }
  }, [_c('span', [_vm._v("会议名称：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.info.title))]), _vm._v(" "), _c('span', [_vm._v(" > ")])]), _vm._v(" "), _c('div', {
    staticClass: "sign-up-time"
  }, [_c('span', [_vm._v("会议时间：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.info.meeting_time))])]), _vm._v(" "), _c('div', {
    staticClass: "sign-up-post",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.getLocation
    }
  }, [_c('span', [_vm._v("会议地点：")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.info.congress_venue))]), _vm._v(" "), _c('span', [_vm._v(" > ")])])]), _vm._v(" "), _c('div', {
    staticClass: "sign-up-tip"
  }, [_c('p', {
    staticClass: "tip"
  }, [_vm._v(" -- 请如实填写 -- ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "sign-up-message"
  }, [_c('div', {
    staticClass: "message"
  }, [_c('p', [_c('span', [_vm._v("姓名：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.name),
      expression: "name"
    }],
    attrs: {
      "type": "text",
      "hold-keyboard": "",
      "placeholder": "请输入姓名",
      "eventid": '2'
    },
    domProps: {
      "value": (_vm.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('p', [_c('span', [_vm._v("单位名称：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.complate),
      expression: "complate"
    }],
    attrs: {
      "type": "text",
      "hold-keyboard": "",
      "placeholder": "请输入单位名称",
      "eventid": '3'
    },
    domProps: {
      "value": (_vm.complate)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.complate = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('p', [_c('span', [_vm._v("现任职务：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.zhiwei),
      expression: "zhiwei"
    }],
    attrs: {
      "type": "text",
      "hold-keyboard": "",
      "placeholder": "请输入现任职务",
      "eventid": '4'
    },
    domProps: {
      "value": (_vm.zhiwei)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.zhiwei = $event.target.value
      }
    }
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "phone",
    staticStyle: {
      "border-bottom": "1px solid #dcdee2"
    }
  }, [_c('div', [_c('span', [_vm._v("手机号码：")])]), _vm._v(" "), _c('div', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.phone),
      expression: "phone"
    }],
    attrs: {
      "type": "text",
      "hold-keyboard": "",
      "disabled": "",
      "placeholder": "点击右侧按钮",
      "eventid": '5'
    },
    domProps: {
      "value": (_vm.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.phone = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('button', {
    class: _vm.disabled ? 'button_active' : '',
    attrs: {
      "open-type": "getPhoneNumber",
      "disabled": _vm.disabled,
      "eventid": '6'
    },
    on: {
      "getphonenumber": _vm.getPhone
    }
  }, [_vm._v("\n          " + _vm._s(_vm.phone_message) + "\n        ")])], 1)]), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding": "10px 0",
      "font-size": "14px",
      "text-align": "center",
      "color": "#515a6e"
    }
  }, [_vm._v("\n      * 手机号隐私保障：仅提交给主办方和好友。\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "submit"
  }, [_c('button', {
    attrs: {
      "eventid": '7'
    },
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("提交")])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4f200954", esExports)
  }
}

/***/ })

},[174]);