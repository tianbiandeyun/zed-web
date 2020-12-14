require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([11],{

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activity_end_details__ = __webpack_require__(110);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__activity_end_details__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_activity_end_details_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_13c57ed6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_activity_end_details_vue__ = __webpack_require__(113);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(111)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-13c57ed6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_activity_end_details_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_13c57ed6_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_activity_end_details_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/activity_end_details/activity_end_details.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] activity_end_details.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13c57ed6", Component.options)
  } else {
    hotAPI.reload("data-v-13c57ed6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 111:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 112:
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
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "activity-end-details",
  data: function data() {
    return {
      title: "",
      details_info: {},
      list: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$Utils.showWaiting();

    // 获取活动详情信息
    this.$store.dispatch("fetch", {
      im: this.$Config.INTER_FACE.get_salon_activity_info,
      fps: {
        activity_id: this.$root.$mp.query.activity_id
      },
      url: this.$Config.REQUEST_URI
    }).then(function (res) {
      if (res.result === "failure") {
        _this.$Utils.closeWaiting();
        _this.$Utils.showErrorInfo(res, "get_salon_activity_info");
      } else {
        _this.details_info = res.back_value;
        var result = res.back_value.inner_data;
        _this.title = result.title;
        var o = [];
        for (var i = 0; i < result.centont.length; i++) {

          if (result.centont[i].split(".").includes("png")) {
            o.push({
              img: result.centont[i]
            });
          } else if (result.centont[i].split(".").includes("jpg")) {
            o.push({
              img: result.centont[i]
            });
          } else if (result.centont[i].split(".").includes("jpeg")) {
            o.push({
              img: result.centont[i]
            });
          } else {
            o.push({
              content: result.centont[i]
            });
          }
        }
        _this.list = o;
        _this.$Utils.closeWaiting();
      }
    });
  },

  methods: {
    goUserList: function goUserList() {
      wx.navigateTo({
        url: "/pages/activity_user_list/main?activity_id=" + this.$root.$mp.query.activity_id
      });
    }
  },
  onUnload: function onUnload() {
    this.$Utils.restData(this);
  },

  onShareAppMessage: function onShareAppMessage(res) {
    if (res.from === "button") {
      console.log("来自页面内转发按钮");
    } else {
      console.log("来自右上角转发菜单");
    }
    return {
      title: this.title,
      path: "/pages/activity_end_details/main?activity_id=" + this.$root.$mp.query.activity_id,
      imageUrl: ""
    };
  }
});

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "activity-end-details-container"
  }, [_c('div', {
    staticClass: "activity-end-details-log"
  }, [_c('img', {
    attrs: {
      "src": _vm.details_info.main_graph,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "activity-end-details-content"
  }, [_c('h1', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index
    }, [(item.img) ? _c('div', {
      staticClass: "img"
    }, [_c('img', {
      attrs: {
        "mode": "widthFix",
        "src": item.img,
        "alt": ""
      }
    })]) : _c('p', [_vm._v(_vm._s(item.content))])], 1)
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "activity-end-details-bottom"
  }, [_c('div', [_c('button', {
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.goUserList
    }
  }, [_vm._v("本次活动人员名单")])], 1), _vm._v(" "), _c('div', [_c('button', {
    attrs: {
      "open-type": "share"
    }
  }, [_c('img', {
    attrs: {
      "src": "../../../static/images/share.png",
      "alt": ""
    }
  })])], 1)])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-13c57ed6", esExports)
  }
}

/***/ })

},[109]);