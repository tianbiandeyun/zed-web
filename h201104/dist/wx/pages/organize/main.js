require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([10],{

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__organize__ = __webpack_require__(169);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__organize__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_organize_vue__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_a357ae14_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_organize_vue__ = __webpack_require__(172);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(170)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_organize_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_a357ae14_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_organize_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/organize/organize.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] organize.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a357ae14", Component.options)
  } else {
    hotAPI.reload("data-v-a357ae14", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 170:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(4);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "organize",
  data: function data() {
    return {
      index: 0,
      array: ["投资", "企业", "协会"],
      activeNames: [],
      info: [],
      user: "",
      photo: "",
      complate: ""
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$Utils.showWaiting();

    // 获取手风琴信息
    this.$store.dispatch("fetch", {
      im: this.$Config.INTER_FACE.get_organizers_info,
      fps: {
        open_id: this.openid.back_value.open_id,
        organizers_id: this.$root.$mp.query.organize_id
      },
      url: this.$Config.REQUEST_URI
    }).then(function (res) {

      if (res.result === "failure") {
        _this.$Utils.closeWaiting();
        _this.$Utils.showErrorInfo(res, "get_organizers_info");
      } else {
        _this.info = res.back_value.inner_data;
        _this.activeNames.push(_this.info.length);
        _this.$Utils.closeWaiting();
      }
    });
  },

  methods: {
    submit: function submit() {
      var _this2 = this;

      if (this.user === "") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "对接联系人不能为空",
          success: function success(res) {}
        });

        return false;
      }

      if (this.photo === "") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "联系电话不能为空",
          success: function success(res) {}
        });

        return false;
      }

      if (this.complate === "") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "机构名称不能为空",
          success: function success(res) {}
        });

        return false;
      }

      this.$Utils.showWaiting();

      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.set_enter_info,
        fps: {
          open_id: this.openid.back_value.open_id,
          enter_type: this.array[this.index],
          docking_contacts: this.user,
          phone: this.photo,
          company: this.complate
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this2.$Utils.closeWaiting();
          _this2.$Utils.showErrorInfo(res, "set_enter_info");
        } else {
          _this2.$Utils.closeWaiting();
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "申请成功",
            success: function success(res) {
              wx.navigateBack({
                delta: 1
              });
            }
          });
        }
      });
    },
    onChange: function onChange(e) {
      this.activeNames = e.mp.detail;
    },
    bindPickerChange: function bindPickerChange(e) {
      this.index = e.mp.detail.value;
    }
  },
  onUnload: function onUnload() {
    this.$Utils.restData(this);
  },

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapGetters */])(["openid"]))
});

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.info.length !== 0) ? _c('section', {
    staticClass: "organize-container"
  }, [_c('v-collapse', {
    attrs: {
      "value": _vm.activeNames,
      "eventid": '5',
      "mpcomid": '2'
    },
    on: {
      "change": _vm.onChange
    }
  }, [_vm._l((_vm.info), function(item, index) {
    return _c('v-collapse-item', {
      key: index,
      attrs: {
        "title": item.title,
        "name": index,
        "mpcomid": '0_' + index
      }
    }, _vm._l((item.centont), function(k, v) {
      return _c('div', {
        key: k,
        staticClass: "organize-content"
      }, [_c('p', {
        staticClass: "organize-content-title"
      }, [_vm._v(_vm._s(k.title))]), _vm._v(" "), (k.describe) ? _c('p', {
        staticClass: "organize-content-message"
      }, [_vm._v(_vm._s(k.describe))]) : _c('p', {
        staticClass: "organize-content-images"
      }, [_c('img', {
        attrs: {
          "src": k.images,
          "alt": ""
        }
      })])], 1)
    }))
  }), _vm._v(" "), (_vm.info.length) ? _c('v-collapse-item', {
    attrs: {
      "title": "网家家创新中国入驻申请",
      "name": _vm.info.length,
      "mpcomid": '1'
    }
  }, [_c('div', {
    staticClass: "organize-message"
  }, [_c('div', {
    staticClass: "message"
  }, [_c('div', [_c('span', [_vm._v("申请类型：")]), _vm._v(" "), _c('picker', {
    attrs: {
      "value": _vm.index,
      "range": _vm.array,
      "eventid": '0'
    },
    on: {
      "change": _vm.bindPickerChange
    }
  }, [_c('p', [_vm._v(_vm._s(_vm.array[_vm.index]))])], 1)], 1), _vm._v(" "), _c('div', [_c('span', [_vm._v("对接联系人：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user),
      expression: "user"
    }],
    attrs: {
      "type": "text",
      "hold-keyboard": "",
      "placeholder": "请输入对接联系人（中文）",
      "eventid": '1'
    },
    domProps: {
      "value": (_vm.user)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('span', [_vm._v("联系电话：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.photo),
      expression: "photo"
    }],
    attrs: {
      "type": "text",
      "hold-keyboard": "",
      "placeholder": "请输入联系电话",
      "eventid": '2'
    },
    domProps: {
      "value": (_vm.photo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.photo = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('span', [_vm._v("机构名称：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.complate),
      expression: "complate"
    }],
    attrs: {
      "type": "text",
      "hold-keyboard": "",
      "placeholder": "请输入机构名称",
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
  })])]), _vm._v(" "), _c('div', {
    staticClass: "organize-submit"
  }, [_c('button', {
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("提交")])], 1)])]) : _vm._e()], 2)], 1) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a357ae14", esExports)
  }
}

/***/ })

},[168]);