require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_center_jieshao__ = __webpack_require__(203);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__user_center_jieshao__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_user_center_jieshao_vue__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_706d9fbe_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_user_center_jieshao_vue__ = __webpack_require__(206);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(204)
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

/***/ 204:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(7);
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



/* harmony default export */ __webpack_exports__["a"] = ({
  name: "sign_up",
  data: function data() {
    return {
      type: 1, // 区分是打开的那个列表。1 是in_work 2 是watch_work
      professional_list: [], // 职业列表
      changge_professional: [], // 选择的职业
      is_popup: false, // 是否打开选择职业

      photoList: [], // 展示的头像
      jieshao: "", // 个人介绍
      photo: "", // 选择的头像
      in_work: '请选择所在行业',
      watch_work: '请选择关注行业'
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
              _this.$store.dispatch("fetch", {
                im: _this.$Config.INTER_FACE.get_member_info,
                fps: {
                  open_id: _this.openid.back_value.open_id,
                  u_key: _this.$root.$mp.query.u_key || ""
                },
                url: _this.$Config.REQUEST_URI
              }).then(function (res) {
                if (res.result === "failure") {
                  _this.$Utils.closeWaiting();
                  _this.$Utils.showErrorInfo(res, "get_member_info");
                } else {
                  var _res = res.back_value;
                  _this.in_work = _res.industry_involved === null ? '请选择所在行业' : _res.industry_involved;
                  _this.watch_work = _res.interest === null ? '请选择关注行业' : _res.interest;
                  _this.jieshao = _res.brief_introduction || "";
                  if (_res.head_portrait !== null || _res.head_portrait !== "") {
                    _this.photoList.push({
                      url: _res.head_portrait
                    });
                  } else {
                    _this.photoList = [];
                  }
                }
              });

              // 职业选项
              _context.next = 4;
              return _this.$store.dispatch("fetch", {
                im: _this.$Config.INTER_FACE.get_occupation_list,
                fps: {},
                url: _this.$Config.REQUEST_URI
              }).then(function (res) {
                if (res.result === "failure") {
                  _this.$Utils.closeWaiting();
                  _this.$Utils.showErrorInfo(res, "get_occupation_list");
                } else {
                  _this.professional_list = res.back_value;
                }
              });

            case 4:
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
    /**
     * 提交行业
     */
    submitProfessional: function submitProfessional() {
      var size = this.changge_professional.length;

      if (size === 0) {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "请选择一个行业",
          success: function success(res) {}
        });
        return false;
      }
      if (size > 3) {
        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "最多选择三个行业",
          success: function success(res) {}
        });
        return false;
      }
      if (this.type === 1) {
        this.in_work = this.changge_professional.join('|');
      }

      if (this.type === 2) {
        this.watch_work = this.changge_professional.join('|');
      }

      this.is_popup = false;
      this.changge_professional = [];
    },

    /**
     * 选择professional
     */
    onChange: function onChange(event) {
      this.changge_professional = event.mp.detail;
    },

    /**
     * 打开professional
     */
    openChangeWork: function openChangeWork(res) {

      this.type = res;

      if (this.in_work !== '请选择所在行业' && this.type === 1) {
        this.changge_professional = this.in_work.split('|');
      }

      if (this.watch_work !== '请选择关注行业' && this.type === 2) {
        this.changge_professional = this.watch_work.split('|');
      }

      this.is_popup = true;
    },

    /**
     * 临时删除照片，从新上传
     */
    deleteItem: function deleteItem(event) {
      var index = event.mp.detail.index;
      this.photoList.splice(index, 1);
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
      this.photoList.push({
        url: path
      });
    },

    /**
     * 提交信息
     */
    submit: function submit() {
      var _this3 = this;

      if (this.in_work === "请选择所在行业") {

        wx.showModal({
          title: "提示",
          showCancel: false,
          content: "所属行业不能为空",
          success: function success(res) {}
        });

        return false;
      }

      if (this.watch_work === "请选择关注行业") {

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
          industry_involved: this.in_work, // 所属行业
          interest: this.watch_work, // 关注行业
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
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapGetters */])(["openid"])),
  onUnload: function onUnload() {
    this.$Utils.restData(this);
  }
});

/***/ }),

/***/ 206:
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
  }, [_c('div', [_c('span', [_vm._v("所属行业：")]), _vm._v(" "), _c('div', {
    staticClass: "professional",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        _vm.openChangeWork(1)
      }
    }
  }, [_vm._v(_vm._s(_vm.in_work))])]), _vm._v(" "), _c('div', [_c('span', [_vm._v("关注行业：")]), _vm._v(" "), _c('div', {
    staticClass: "professional",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": function($event) {
        _vm.openChangeWork(2)
      }
    }
  }, [_vm._v(_vm._s(_vm.watch_work))])]), _vm._v(" "), _c('div', [_c('span', [_vm._v("自我介绍：")]), _vm._v(" "), _c('textarea', {
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
      "fileList": _vm.photoList,
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
  }, [_vm._v("保存")])], 1), _vm._v(" "), _c('v-popup', {
    attrs: {
      "show": _vm.is_popup,
      "eventid": '8',
      "mpcomid": '3'
    },
    on: {
      "close": function($event) {
        _vm.is_popup = false
      }
    }
  }, [_c('div', {
    staticClass: "professional-box"
  }, [_c('h1', {
    staticClass: "professional-title"
  }, [_vm._v("选择不超过3个，用于向您推荐相关行业的BP和投研活动")]), _vm._v(" "), _c('v-checkbox-group', {
    attrs: {
      "value": _vm.changge_professional,
      "eventid": '7',
      "mpcomid": '2'
    },
    on: {
      "change": _vm.onChange
    }
  }, [_c('div', {
    staticClass: "professional-change"
  }, _vm._l((_vm.professional_list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: "professional-item"
    }, [_c('v-checkbox', {
      attrs: {
        "name": item,
        "mpcomid": '1_' + index
      }
    }, [_vm._v(_vm._s(item))])], 1)
  })), _vm._v(" "), _c('div', {
    staticClass: "professional-button"
  }, [_c('button', {
    staticClass: "submit",
    attrs: {
      "eventid": '5'
    },
    on: {
      "click": _vm.submitProfessional
    }
  }, [_vm._v("确定")]), _vm._v(" "), _c('p', {
    staticClass: "wait",
    attrs: {
      "eventid": '6'
    },
    on: {
      "click": function($event) {
        _vm.is_popup = false;
        _vm.changge_professional = []
      }
    }
  }, [_vm._v("关闭")])], 1)])], 1)])], 1)
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

},[202]);