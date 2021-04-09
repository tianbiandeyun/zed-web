require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_center_jieshao__ = __webpack_require__(194);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__user_center_jieshao__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_user_center_jieshao_vue__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_706d9fbe_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_user_center_jieshao_vue__ = __webpack_require__(197);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(195)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-706d9fbe"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_user_center_jieshao_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_706d9fbe_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_user_center_jieshao_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/user_center_jieshao/user_center_jieshao.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] user_center_jieshao.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-706d9fbe", Component.options)
  } else {
    hotAPI.reload("data-v-706d9fbe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 195:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 196:
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



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "sign_up",
  data: function data() {
    return {
      fileList: [],
      index: 0,
      industry: ["请选择", "IT|互联网|通信|电子", "金融|银行|保险", "消费零售|贸易|交通物流", "加工制造|仪表设备", "房产|建筑建设|物业", "广告|传媒|印刷出版", "管理咨询|教育科研|中介服务", "医药生物|医疗保健", "酒店旅游", "能源矿产|石油化工", "政府|非赢利机构|科研|其他", "财会|金融", "汽车|工程机械", "消费品|生产|物流", "市场|媒介|设计", "管理|人力资源|行政", "咨询|法律|教育|翻译", "服务业"],
      w_index: 0,
      w_industry: ["请选择", "IT|互联网|通信|电子", "金融|银行|保险", "消费零售|贸易|交通物流", "加工制造|仪表设备", "房产|建筑建设|物业", "广告|传媒|印刷出版", "管理咨询|教育科研|中介服务", "医药生物|医疗保健", "酒店旅游", "能源矿产|石油化工", "政府|非赢利机构|科研|其他", "财会|金融", "汽车|工程机械", "消费品|生产|物流", "市场|媒介|设计", "管理|人力资源|行政", "咨询|法律|教育|翻译", "服务业"],
      jieshao: "",
      photo: ""
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

        var _index = _user_info.industry_involved || _this.industry[0];
        var __index = _user_info.interest || _this.w_industry[0];

        _this.index = _this.industry.indexOf(_index);
        _this.w_index = _this.w_industry.indexOf(__index);
        _this.jieshao = _user_info.brief_introduction || "";

        if (_user_info.head_portrait !== null || _user_info.head_portrait !== "") {
          _this.fileList.push({
            url: _user_info.head_portrait
          });
        } else {
          _this.fileList = [];
        }

        _this.$Utils.closeWaiting();
      }
    });
  },

  methods: {
    deleteItem: function deleteItem(event) {
      var index = event.mp.detail.index;
      this.fileList.splice(index, 1);
    },
    afterRead: function afterRead(event) {
      var _this2 = this;

      this.$Utils.showWaiting();

      var path = event.mp.detail.file.path;

      var requestUrl = this.$Utils.produceRequestUrl(this.$Config.INTER_FACE.make_img_route, {}, this.$Config.REQUEST_URI, "post");

      wx.uploadFile({
        url: requestUrl,
        filePath: path,
        name: "uploads",
        header: {
          "Content-Type": "multipart/form-data"
        },
        formData: {
          "fps[open_id]": this.openid.back_value.open_id,
          "fps[img]": ""
        },
        success: function success(res) {

          if (JSON.parse(res.data).result === "failure") {
            _this2.$Utils.closeWaiting();
            _this2.$Utils.showErrorInfo(res, "make_img_route");
          } else {
            console.log(res);
            _this2.photo = JSON.parse(res.data).back_value;
            _this2.$Utils.closeWaiting();
          }
        }
      });

      this.fileList.push({
        url: path
      });
    },
    submit: function submit() {
      var _this3 = this;

      if (this.industry[this.index] === "请选择") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "所属行业不能为空",
          success: function success(res) {}
        });

        return false;
      }

      if (this.w_industry[this.w_index] === "请选择") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "关注行业不能为空",
          success: function success(res) {}
        });

        return false;
      }

      if (this.jieshao === "") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "自我介绍不能为空",
          success: function success(res) {}
        });

        return false;
      }

      this.$Utils.showWaiting();

      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.update_user_info,
        fps: {
          open_id: this.openid.back_value.open_id,
          industry_involved: this.industry[this.index],
          interest: this.w_industry[this.w_index],
          brief_introduction: this.jieshao,
          head_portrait: this.photo
        },
        url: this.$Config.REQUEST_URI
      }).then(function (res) {

        if (res.result === "failure") {
          _this3.$Utils.closeWaiting();
          _this3.$Utils.showErrorInfo(res, "update_user_info");
        } else {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "保存成功",
            success: function success(res) {
              wx.navigateBack({
                delta: 1
              });
            }
          });
          _this3.$Utils.closeWaiting();
        }
      });
    },
    changeIndustry: function changeIndustry(e) {
      this.index = e.mp.detail.value;
    },
    changeWatchIndustry: function changeWatchIndustry(e) {
      this.w_index = e.mp.detail.value;
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

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "jieshao-container"
  }, [_c('div', {
    staticClass: "jieshao-tip"
  }, [_c('p', {
    staticClass: "tip"
  }, [_vm._v(" -- 个人信息 -- ")])], 1), _vm._v(" "), _c('div', {
    staticClass: "jieshao-message"
  }, [_c('div', {
    staticClass: "message"
  }, [_c('div', [_c('span', [_vm._v("所属行业：")]), _vm._v(" "), _c('picker', {
    attrs: {
      "value": _vm.index,
      "range": _vm.industry,
      "eventid": '0'
    },
    on: {
      "change": _vm.changeIndustry
    }
  }, [_c('p', [_vm._v(_vm._s(_vm.industry[_vm.index]))])], 1)], 1), _vm._v(" "), _c('div', [_c('span', [_vm._v("关注行业：")]), _vm._v(" "), _c('picker', {
    attrs: {
      "value": _vm.w_index,
      "range": _vm.w_industry,
      "eventid": '1'
    },
    on: {
      "change": _vm.changeWatchIndustry
    }
  }, [_c('p', [_vm._v(_vm._s(_vm.w_industry[_vm.w_index]))])], 1)], 1), _vm._v(" "), _c('div', [_c('span', [_vm._v("自我介绍：")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.jieshao),
      expression: "jieshao"
    }],
    attrs: {
      "placeholder": "请输入自我介绍",
      "maxlength": "300",
      "adjust-position": "",
      "show-confirm-bar": "",
      "disable-default-padding": "",
      "eventid": '2'
    },
    domProps: {
      "value": (_vm.jieshao)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.jieshao = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', [_c('span', [_vm._v("个人照片：")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "padding-left": "50px"
    }
  }, [_c('v-uploader', {
    attrs: {
      "upload-text": "点击上传",
      "max-count": "1",
      "fileList": _vm.fileList,
      "accept": "image",
      "eventid": '3',
      "mpcomid": '0'
    },
    on: {
      "afterRead": _vm.afterRead,
      "deleteItem": _vm.deleteItem
    }
  })], 1)])])]), _vm._v(" "), _c('div', {
    staticClass: "submit"
  }, [_c('button', {
    attrs: {
      "eventid": '4'
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-706d9fbe", esExports)
  }
}

/***/ })

},[193]);