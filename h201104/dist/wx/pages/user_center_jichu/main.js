require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([5],{

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_center_jichu__ = __webpack_require__(184);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__user_center_jichu__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_user_center_jichu_vue__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_2b4256ce_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_user_center_jichu_vue__ = __webpack_require__(187);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(185)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2b4256ce"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_user_center_jichu_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_2b4256ce_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_user_center_jichu_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/user_center_jichu/user_center_jichu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] user_center_jichu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2b4256ce", Component.options)
  } else {
    hotAPI.reload("data-v-2b4256ce", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 185:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(5);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      result: ["email"],
      index: 0,
      array: ["男", "女"],
      complate: "",
      zhiwei: "",
      email: "",
      phone_message: "获取手机号码",
      phone: "",
      disabled: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$Utils.showWaiting();

    this.$store.dispatch("fetch", {
      im: this.$Config.INTER_FACE.get_member_info,
      fps: {
        open_id: this.openid.back_value.open_id,
        u_key: this.$root.$mp.query.u_key || ""
      },
      url: this.$Config.REQUEST_URI
    }).then(function (res) {
      if (res.result === "failure") {
        _this.$Utils.closeWaiting();
        _this.$Utils.showErrorInfo(res, "get_member_info");
      } else {
        var _user_info = res.back_value;

        if (_user_info.phone) {
          _this.disabled = true;
        }

        _this.name = _user_info.name || "";+_user_info.sex === 1 ? _this.index = 0 : _this.index = 1 || 0;
        _this.complate = _user_info.company || "";
        _this.zhiwei = _user_info.job_description || "";
        _this.email = _user_info.mail || "";
        _this.phone = _user_info.phone || "";

        _this.$Utils.closeWaiting();
      }
    });
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
        im: this.$Config.INTER_FACE.update_user_info,
        fps: {
          open_id: this.openid.back_value.open_id,
          name: this.name,
          sex: this.array[this.index] === "男" ? 1 : 2,
          company: this.complate,
          job_description: this.zhiwei,
          mail: this.email,
          phone: this.phone,
          phone_restrict: this.result.includes("phone") ? 1 : 2,
          mail_restrict: this.result.includes("email") ? 1 : 2
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {

        if (res.result === "failure") {
          _this2.$Utils.closeWaiting();
          _this2.$Utils.showErrorInfo(res, "update_user_info");
        } else {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "修改成功",
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
    bindPickerChange: function bindPickerChange(e) {
      this.index = e.mp.detail.value;
    },
    radioChange: function radioChange(e) {
      this.result = e.mp.detail;
      console.log(this.result);
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapGetters */])(["openid"
  // "user_info"
  ])),
  onUnload: function onUnload() {
    this.$Utils.restData(this);
  }
});

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "jichu-container"
  }, [_c('div', {
    staticClass: "jichu-tip"
  }, [_c('p', {
    staticClass: "tip"
  }, [_vm._v(" -- 请如实填写 -- ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "jichu-message"
  }, [_c('div', {
    staticClass: "message"
  }, [_c('div', [_c('span', [_vm._v("姓名：")]), _vm._v(" "), _c('input', {
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
      "eventid": '0'
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
  })]), _vm._v(" "), _c('div', [_c('span', [_vm._v("性别：")]), _vm._v(" "), _c('picker', {
    attrs: {
      "value": _vm.index,
      "range": _vm.array,
      "eventid": '1'
    },
    on: {
      "change": _vm.bindPickerChange
    }
  }, [_c('p', [_vm._v(_vm._s(_vm.array[_vm.index]))])], 1)], 1), _vm._v(" "), _c('div', [_c('span', [_vm._v("单位名称：")]), _vm._v(" "), _c('input', {
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
      "eventid": '2'
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
  })]), _vm._v(" "), _c('div', [_c('span', [_vm._v("现任职务：")]), _vm._v(" "), _c('input', {
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
      "eventid": '3'
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
  })]), _vm._v(" "), _c('div', [_c('span', [_vm._v("邮箱：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    attrs: {
      "type": "text",
      "hold-keyboard": "",
      "placeholder": "请输入邮箱",
      "eventid": '4'
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
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
      "placeholder": "手机号码",
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
  }, [_vm._v("\n          " + _vm._s(_vm.phone_message) + "\n        ")])], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "jichu-tip"
  }, [_c('p', {
    staticClass: "tip"
  }, [_vm._v(" -- 隐私设置 -- ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "jichu-yinsi"
  }, [_c('v-checkbox-group', {
    attrs: {
      "value": _vm.result,
      "eventid": '7',
      "mpcomid": '2'
    },
    on: {
      "change": _vm.radioChange
    }
  }, [_c('div', {
    staticStyle: {
      "margin-bottom": "20px"
    }
  }, [_c('v-checkbox', {
    attrs: {
      "name": "email",
      "mpcomid": '0'
    }
  }, [_vm._v("公开邮箱信息　　　　　　　　　　　　")])], 1), _vm._v(" "), _c('v-checkbox', {
    attrs: {
      "name": "phone",
      "mpcomid": '1'
    }
  }, [_vm._v("公开手机号码信息　　　　　　　　　　　")])], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "submit"
  }, [_c('button', {
    attrs: {
      "eventid": '8'
    },
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("保存")])], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2b4256ce", esExports)
  }
}

/***/ })

},[183]);