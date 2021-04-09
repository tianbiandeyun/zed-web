require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([13],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__created__ = __webpack_require__(139);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__created__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_created_vue__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_22c711e8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_created_vue__ = __webpack_require__(145);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(140)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-22c711e8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_created_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_22c711e8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_created_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/created/created.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] created.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22c711e8", Component.options)
  } else {
    hotAPI.reload("data-v-22c711e8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 140:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_input_group__ = __webpack_require__(36);
//
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
  name: "created",
  components: {
    inputGroup: __WEBPACK_IMPORTED_MODULE_0__components_input_group__["a" /* default */]
  },
  data: function data() {
    return {
      u_key: '',
      title: ''
    };
  },
  mounted: function mounted() {
    this.$Utils.showWaiting();
    this.u_key = this.$root.$mp.query.u_key;
    this.title = '\u7ED9\uFF08' + this.$root.$mp.query.name + '\uFF09\u7559\u8A00\uFF1A';
    this.$Utils.closeWaiting();
  },

  methods: {
    submit: function submit(p) {

      var that = this;

      console.log('u_key =' + that.$root.$mp.query.m_key);
      console.log('second_ukey =' + that.$root.$mp.query.u_key);
      that.$Utils.showWaiting();

      wx.requestSubscribeMessage({
        tmplIds: ['gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8'],
        success: function success(res) {
          if (res.gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8 === 'accept') {
            that.$store.dispatch("fetch", {
              im: that.$Config.INTER_FACE.set_initiate_a_session,
              fps: {
                'u_key': that.$root.$mp.query.m_key,
                'second_ukey': that.$root.$mp.query.u_key,
                'content': p.message,
                'receive_message': 1
              },
              url: that.$Config.REQUEST_URI
            }).then(function (res) {
              if (res.result === "failure") {
                that.$Utils.closeWaiting();
                that.$Utils.showErrorInfo(res, "set_initiate_a_session");
              } else {
                if (res.back_value) {
                  wx.showModal({
                    title: "提交",
                    content: '\u53D1\u9001\u6210\u529F',
                    showCancel: false,
                    confirmText: "好的",
                    success: function success() {
                      wx.navigateBack({
                        delta: 1
                      });
                    }
                  });
                }
              }
            });
          }
          if (res.gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8 === 'reject') {
            that.$store.dispatch("fetch", {
              im: that.$Config.INTER_FACE.set_initiate_a_session,
              fps: {
                'u_key': that.$root.$mp.query.m_key,
                'second_ukey': that.$root.$mp.query.u_key,
                'content': p.message,
                'receive_message': 2
              },
              url: that.$Config.REQUEST_URI
            }).then(function (res) {
              if (res.result === "failure") {
                that.$Utils.closeWaiting();
                that.$Utils.showErrorInfo(res, "set_initiate_a_session");
              } else {
                if (res.back_value) {
                  wx.showModal({
                    title: "提交",
                    content: '\u53D1\u9001\u6210\u529F',
                    showCancel: false,
                    confirmText: "好的",
                    success: function success() {
                      wx.navigateBack({
                        delta: 1
                      });
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  }
});

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "created-container"
  }, [_c('div', {
    staticClass: "call"
  }, [_c('input-group', {
    attrs: {
      "title": _vm.title,
      "btn-mseeage": "发送对话",
      "eventid": '0',
      "mpcomid": '0'
    },
    on: {
      "submit": _vm.submit
    }
  })], 1)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-22c711e8", esExports)
  }
}

/***/ })

},[138]);