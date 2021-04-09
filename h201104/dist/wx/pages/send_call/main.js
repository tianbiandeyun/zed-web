require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([8],{

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__send_call__ = __webpack_require__(165);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__send_call__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_send_call_vue__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_8b5e4afc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_send_call_vue__ = __webpack_require__(168);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(166)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8b5e4afc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_send_call_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_8b5e4afc_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_send_call_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/send_call/send_call.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] send_call.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8b5e4afc", Component.options)
  } else {
    hotAPI.reload("data-v-8b5e4afc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 166:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_get_line__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_reply__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_input_group__ = __webpack_require__(59);

//
//
//
//
//
//
//
//
//
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
  name: "send-call",
  components: {
    getLine: __WEBPACK_IMPORTED_MODULE_1__components_get_line__["a" /* default */],
    reply: __WEBPACK_IMPORTED_MODULE_2__components_reply__["a" /* default */],
    inputGroup: __WEBPACK_IMPORTED_MODULE_3__components_input_group__["a" /* default */]
  },
  data: function data() {
    return {
      u_key: '',
      list: []
    };
  },
  mounted: function mounted() {
    this.$Utils.showWaiting();
    this.u_key = this.$root.$mp.query.u_key;

    // 获取对话详情
    this.refreshMessageDetails(this.$root.$mp.query.id);
  },

  methods: {
    delCall: function delCall() {
      var _this = this;

      var id = res.id;
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.accuse_message,
        fps: {
          id: id,
          u_key: this.u_key
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this.$Utils.closeWaiting();
          _this.$Utils.showErrorInfo(res, "accuse_message");
        } else {
          if (res.back_value) {
            // 获取对话详情
            _this.refreshMessageDetails(_this.$root.$mp.query.id);
          }
        }
      });
    },
    revoke: function revoke(res) {
      var _this2 = this;

      var id = res.id;
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.revoke_message,
        fps: {
          id: id,
          u_key: this.u_key
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this2.$Utils.closeWaiting();
          _this2.$Utils.showErrorInfo(res, "revoke_message");
        } else {
          console.log(res);
          if (res.back_value) {
            // 获取对话详情
            _this2.refreshMessageDetails(_this2.$root.$mp.query.id);
          }
        }
      });
    },
    submit: function submit(res) {
      var _this3 = this;

      this.$Utils.showWaiting();

      var _id = this.$root.$mp.query.id;
      var _u_key = this.$root.$mp.query.u_key;
      var _trigger_ukey = this.list[0].trigger_ukey;
      var _message = res.message;

      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.set_reply_to_message,
        fps: {
          'message_id': _id,
          'u_key': _u_key,
          'second_ukey': _trigger_ukey,
          'content': _message,
          'receive_message': 1
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this3.$Utils.closeWaiting();
          _this3.$Utils.showErrorInfo(res, "set_reply_to_message");
        } else {
          if (res.back_value) {
            _this3.refreshMessageDetails(_this3.$root.$mp.query.id);
          }
        }
      });
    },
    refreshMessageDetails: function refreshMessageDetails() {
      var _this4 = this;

      for (var _len = arguments.length, res = Array(_len), _key = 0; _key < _len; _key++) {
        res[_key] = arguments[_key];
      }

      var _ref = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(res)),
          id = _ref[0];

      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_chat_record_info,
        fps: {
          message_id: id
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {
        if (res.result === "failure") {
          _this4.$Utils.closeWaiting();
          _this4.$Utils.showErrorInfo(res, "get_chat_record_info");
        } else {
          _this4.list = res.back_value;
          console.log(_this4.list);
          _this4.$Utils.closeWaiting();
        }
      });
    }
  }
});

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "send-call-container"
  }, [_vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "call"
    }, [(_vm.u_key != item.trigger_ukey) ? _c('div', [_c('get-line', {
      attrs: {
        "item": item,
        "del-message": "举报此消息",
        "eventid": '0_' + index,
        "mpcomid": '0_' + index
      },
      on: {
        "delCall": function($event) {
          _vm.delCall(item)
        }
      }
    })], 1) : _c('div', [_c('reply', {
      attrs: {
        "item": item,
        "speak": "我说",
        "eventid": '1_' + index,
        "mpcomid": '1_' + index
      },
      on: {
        "revoke": function($event) {
          _vm.revoke(item)
        }
      }
    })], 1)])
  }), _vm._v(" "), _c('div', {
    staticClass: "call"
  }, [_c('input-group', {
    attrs: {
      "eventid": '2',
      "mpcomid": '2'
    },
    on: {
      "submit": _vm.submit
    }
  })], 1)], 2)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-8b5e4afc", esExports)
  }
}

/***/ })

},[164]);