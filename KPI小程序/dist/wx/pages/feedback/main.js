require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([14],{

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__feedback__ = __webpack_require__(167);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__feedback__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_feedback_vue__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_c3abac20_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_feedback_vue__ = __webpack_require__(170);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(168)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_feedback_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_c3abac20_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_feedback_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/feedback/feedback.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] feedback.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c3abac20", Component.options)
  } else {
    hotAPI.reload("data-v-c3abac20", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 168:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_CK_button_CKbutton__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(2);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "feedback",
  components: { CKbutton: __WEBPACK_IMPORTED_MODULE_1__components_CK_button_CKbutton__["a" /* default */] },
  data: function data() {
    return {
      radio: "2",
      faeedBackContent: "",
      version: this.$constData.VERSION,
      array: ["以便我们有针对性的改进功能", "生产", "加工", "制造", "服务", "娱乐", "政治", "科研", "教育", "农业", "管理", "其他"],
      index: 0
    };
  },

  methods: {
    /**
     * 选择反馈意见
     * */
    operatSelectFeedBack: function operatSelectFeedBack(event) {
      var that = this;
      that.radio = event.mp.detail;
    },

    /**
     * 选择分数
     * */
    operatChangeIndustry: function operatChangeIndustry(e) {
      var that = this;
      that.index = parseInt(e.mp.detail.value);
    },

    /**
     * 输入框文本
     * */
    operatGetContent: function operatGetContent(e) {
      var that = this;
      that.faeedBackContent = e.mp.detail.value;
    },

    /**
     * 提交
     * */
    sendFeedBack: function sendFeedBack() {
      var that = this;
      // 设置问题反馈 意见反馈=2,BUG反馈=3
      that.$store.dispatch("_setFeedback", {
        im: that.$constData.INTER_FACE.set_feedback_content,
        fps: {
          userid: that.registUser.data.back_value.userid,
          type: that.radio,
          content: that.faeedBackContent,
          industry: that.array[that.index]
        },
        url: that.$constData.REQUEST_URI
      }).then(function (res) {
        if (res.data.back_value) {
          wx.showModal({
            title: "提交成功",
            content: "\u611F\u8C22\u4F7F\u7528\u5E76\u4E14\u53D1\u73B0\u95EE\u9898\u53CD\u9988\u7ED9\u6211\u4EEC",
            showCancel: false,
            confirmText: "好的",
            success: function success() {
              wx.navigateBack({
                delta: 1
              });
            }
          });
        }
        if (res.data.result === "failure") {
          that.$unit.showErrorInfo(res.data, "set_feedback_content");
        }
      });
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapGetters */])(["registUser"]))
});

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "feedback-container"
  }, [_c('div', {
    staticClass: "feedback-radio"
  }, [_c('v-radio-group', {
    attrs: {
      "value": _vm.radio,
      "eventid": '0',
      "mpcomid": '2'
    },
    on: {
      "change": _vm.operatSelectFeedBack
    }
  }, [_c('div', {
    staticClass: "feedback-radio-item"
  }, [_c('v-radio', {
    attrs: {
      "name": "2",
      "checked-color": "#07c160",
      "mpcomid": '0'
    }
  }, [_vm._v("意见反馈")])], 1), _vm._v(" "), _c('div', {
    staticClass: "feedback-radio-item"
  }, [_c('v-radio', {
    attrs: {
      "name": "3",
      "checked-color": "#07c160",
      "mpcomid": '1'
    }
  }, [_vm._v("BUG反馈")])], 1)])], 1), _vm._v(" "), _c('div', {
    staticClass: "feedback-industry"
  }, [_c('div', {
    staticClass: "feedback-industry-item"
  }, [_c('p', {
    staticClass: "feedback-industry-name"
  }, [_vm._v("选择行业：")]), _vm._v(" "), _c('picker', {
    staticClass: "feedback-industry-value",
    attrs: {
      "value": _vm.index,
      "range": _vm.array,
      "eventid": '1'
    },
    on: {
      "change": _vm.operatChangeIndustry
    }
  }, [_vm._v("\n        " + _vm._s(_vm.array[_vm.index]) + "\n      ")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "feedback-textarea"
  }, [_c('textarea', {
    attrs: {
      "adjust-position": "",
      "placeholder": "请输入...",
      "eventid": '2'
    },
    on: {
      "blur": _vm.operatGetContent
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "feedback-tip"
  }, [_vm._v("当前程序版本" + _vm._s(_vm.version) + "，本程序软件著作及解释权归属“北京慧致天诚企业管理咨询有限公司”所有。")]), _vm._v(" "), _c('CKbutton', {
    attrs: {
      "name": "提交反馈",
      "eventid": '3',
      "mpcomid": '3'
    },
    on: {
      "operat": _vm.sendFeedBack
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-c3abac20", esExports)
  }
}

/***/ })

},[166]);