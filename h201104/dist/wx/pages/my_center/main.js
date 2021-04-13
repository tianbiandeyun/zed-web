require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([11],{

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__my_center__ = __webpack_require__(164);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__my_center__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_my_center_vue__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_32e6eee8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_my_center_vue__ = __webpack_require__(167);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(165)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-32e6eee8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_my_center_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_32e6eee8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_my_center_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/my_center/my_center.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] my_center.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32e6eee8", Component.options)
  } else {
    hotAPI.reload("data-v-32e6eee8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 165:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 166:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 这里面所有的u_key都是，点击谁就是谁的
// m_key 永远都是登录人的，也就是首页个人信息的
// import {
//   mapGetters
// } from "vuex";
// import login from "../../utils/login";

/* harmony default export */ __webpack_exports__["a"] = ({
  // name: "my_center",
  // mixins: [login],
  // data() {
  //   return {
  //     is_page: false,
  //     user_info: "",
  //     is_phone: 1,
  //     is_mail: 1,
  //     message_count: 0
  //   };
  // },
  // async onShow() {

  //   this.$Utils.showWaiting();

  //   // 因为这个页面需要分享出去，所以要判断是否有 openid 如果没有则获取
  //   if (!this.openid.back_value) {
  //     await this.getOpenid();
  //     this.is_page = true;
  //   } else {
  //     this.is_page = true;
  //   }

  //   this.refreshUserCenter(this.$root.$mp.query.u_key);

  // },
  // methods: {
  //   /**
  //    * 创建留言
  //    */
  //   createdReply() {
  //     let m_key = this.$root.$mp.query.m_key;
  //     let u_key = this.$root.$mp.query.u_key;
  //     let name = this.user_info.name;
  //     wx.navigateTo({
  //       url: `/pages/created/main?m_key=${m_key}&u_key=${u_key}&name=${name}`
  //     });
  //   },
  //   /**
  //    * 我的消息
  //    */
  //   goReply() {
  //     let u_key = this.$root.$mp.query.u_key;
  //     wx.navigateTo({
  //       url: `/pages/call_line/main?u_key=${u_key}`
  //     });
  //   },
  //   /**
  //    * 编辑信息
  //    */
  //   goEdit(res) {
  //     let u_key = this.$root.$mp.query.u_key;
  //     if (res === 1) {
  //       wx.navigateTo({
  //         url: `/pages/user_center_jichu/main?u_key=${u_key}`
  //       });
  //     } else {
  //       wx.navigateTo({
  //         url: `/pages/user_center_jieshao/main?u_key=${u_key}`
  //       });
  //     }
  //   },
  //   async refreshUserCenter(u_key) {

  //     await this.$store.dispatch("fetch", {
  //       im: this.$Config.INTER_FACE.get_member_info,
  //       fps: {
  //         open_id: this.openid.back_value.open_id,
  //         u_key: u_key || ""
  //       },
  //       url: this.$Config.REQUEST_URI
  //     }).then(res => {
  //       if (res.result === "failure") {
  //         this.$Utils.closeWaiting();
  //         this.$Utils.showErrorInfo(res, "get_member_info");
  //       } else {
  //         this.is_phone = res.back_value.inner_data.phone_restrict;
  //         this.is_mail = res.back_value.inner_data.mail_restrict;
  //         this.user_info = res.back_value;
  //       }
  //     });

  //     // 信息条数
  //     await this.$store.dispatch("fetch", {
  //       im: this.$Config.INTER_FACE.get_unread_message,
  //       fps: {
  //         u_key
  //       },
  //       url: this.$Config.REQUEST_URI
  //     }).then(res => {
  //       if (res.result === "failure") {
  //         this.$Utils.closeWaiting();
  //         this.$Utils.showErrorInfo(res, "get_unread_message");
  //       } else {
  //         this.message_count = res.back_value;
  //       }
  //     });

  //     this.$Utils.closeWaiting();

  //   }
  // },
  // computed: {
  //   ...mapGetters([
  //     "openid"
  //   ])
  // },
  // onUnload() {
  //   this.$Utils.restData(this);
  // },
  // async onPullDownRefresh() {
  //   this.$Utils.showWaiting();
  //   await this.refreshUserCenter(this.$root.$mp.query.u_key);
  //   wx.stopPullDownRefresh();
  // },
  // onShareAppMessage: function (res) {
  //   console.log(this.$root.$mp.query.u_key);
  //   return {
  //     title: "创新投研会",
  //     path: `/pages/user_center/main?u_key=${this.$root.$mp.query.u_key}`,
  //     imageUrl: ""
  //   };
  // }
});

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!_vm.is_page) ? _c('section', {
    staticClass: "user-center-container"
  }, [_vm._v("\n\n  my_center\n\n  "), _vm._v(" "), _c('tab', {
    attrs: {
      "selected": "1",
      "mpcomid": '0'
    }
  })], 1) : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-32e6eee8", esExports)
  }
}

/***/ })

},[163]);