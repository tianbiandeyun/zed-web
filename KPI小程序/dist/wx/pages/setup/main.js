require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([10],{

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__setup__ = __webpack_require__(233);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__setup__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_setup_vue__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_f703cf68_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_setup_vue__ = __webpack_require__(236);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(234)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f703cf68"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_setup_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_f703cf68_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_setup_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/setup/setup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] setup.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f703cf68", Component.options)
  } else {
    hotAPI.reload("data-v-f703cf68", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 234:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_CK_add_member_CKaddMember__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_CK_button_CKbutton__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuex__ = __webpack_require__(2);



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "setup",
  components: { CKaddMember: __WEBPACK_IMPORTED_MODULE_3__components_CK_add_member_CKaddMember__["a" /* default */], CKtitleNotice: __WEBPACK_IMPORTED_MODULE_4__components_CK_title_notice_CKtitleNotice__["a" /* default */], CKbutton: __WEBPACK_IMPORTED_MODULE_5__components_CK_button_CKbutton__["a" /* default */] },
  data: function data() {
    return {
      isOverlay: false,
      corpid: "",
      global_button_name: { title: "添加统计管理员", detail: "统计管理员拥有全局查看所有KPI数据的权限" },
      global_user: [] // 统计
    };
  },
  mounted: function mounted() {
    var _this = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
      var that;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              that = _this;

              that.$unit.showWaiting();
              that.corpid = that.registUser.data.back_value.corpid;
              that.refreshRequestSetup();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  methods: {
    /**
     * 完成
     * */
    goIndex: function goIndex() {
      wx.navigateBack({ delta: 1 });
    },

    /**
     * 打开选择统计管理
     * */
    operatGlobalUser: function operatGlobalUser() {
      var that = this;
      that.isOverlay = true;
      that._selectUser(function (res) {
        if (res === "fail") {
          that.isOverlay = false;
          return;
        }
        that.$unit.showWaiting();
        that.global_user = [];
        that.addMemberByUser(res, 0);
      });
    },

    /**
     * 递归添加联系人
     * */
    addMemberByUser: function addMemberByUser(arr, index) {
      var that = this;
      if (index > arr.length - 1) {
        that.refreshRequestSetup();
        return false;
      } else {
        that.$store.dispatch("_addGLobalMember", {
          im: that.$constData.INTER_FACE.add_statisticians,
          fps: {
            userid: that.registUser.data.back_value.userid,
            member_userid: arr[index].id,
            avatar: arr[index].avatar
          },
          url: that.$constData.REQUEST_URI
        }).then(function (res) {
          if (res.data.back_value) {
            index++;
            that.addMemberByUser(arr, index);
          }
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "add_statisticians");
          }
        });
      }
    },

    /**
     * 删除联系人
     * */
    operatDelUser: function operatDelUser(userid) {
      var that = this;
      wx.showActionSheet({
        itemList: ["删除"],
        success: function success() {
          that.$unit.showWaiting();
          that.$store.dispatch("_delGlobalMember", {
            im: that.$constData.INTER_FACE.del_statistical,
            fps: {
              userid: that.registUser.data.back_value.userid,
              member_userid: userid
            },
            url: that.$constData.REQUEST_URI
          }).then(function (res) {
            if (res.data.back_value) {
              that.global_user = [];
              that.refreshRequestSetup();
            }
            if (res.data.result === "failure") {
              that.$unit.showErrorInfo(res.data, "del_statistical");
            }
          });
        }
      });
    },

    /**
     * 获取已保存的联系人
     * */
    refreshRequestSetup: function refreshRequestSetup() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var that;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                that = _this2;
                _context2.next = 3;
                return that.$store.dispatch("_getGlobalMember", {
                  im: that.$constData.INTER_FACE.get_statistical,
                  fps: {
                    userid: that.registUser.data.back_value.userid
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_statistical");
                  } else {
                    that.global_user = res.data.back_value;
                  }
                });

              case 3:
                that.$unit.closeWaiting();
                that.isOverlay = false;

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },

    /**
     * 打开选择联系人
     * */
    _selectUser: function _selectUser(callback) {
      var that = this;
      wx.qy.selectEnterpriseContact({
        fromDepartmentId: that.getAddressMulti.data.back_value.from_department_id,
        mode: that.getAddressMulti.data.back_value.mode,
        type: that.getAddressMulti.data.back_value.type,
        success: function success(res) {
          callback(res.result.userList);
        },
        fail: function fail(res) {
          callback("fail");
        }
      });
    }
  },
  onUnload: function onUnload() {
    var that = this;
    that.$unit.restData(that);
  },

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_6_vuex__["b" /* mapGetters */])(["registUser", "getAddressMulti"])),
  onPullDownRefresh: function onPullDownRefresh() {
    var _this3 = this;

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee3() {
      var that;
      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              that = _this3;

              that.$unit.showWaiting();
              _context3.next = 4;
              return that.refreshRequestSetup();

            case 4:
              wx.stopPullDownRefresh();

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  }
});

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "setupContainer"
  }, [_c('CKtitleNotice', {
    attrs: {
      "ord-message": "可以查看统计数据的管理人员",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "setupGlobal"
  }, [_vm._l((_vm.global_user), function(item, i) {
    return _c('div', {
      key: i,
      staticClass: "setupUserTable"
    }, [_c('div', {
      staticClass: "setupUserTablePhoto"
    }, [_c('img', {
      attrs: {
        "src": item.avatar,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "setupUserTableContent"
    }, [_c('p', {
      staticClass: "setupUserTableContentName"
    }, [_vm._v("统计管理员")]), _vm._v(" "), _c('p', {
      staticClass: "setupUserTableContentDetail"
    }, [_c('ww-open-data', {
      attrs: {
        "corpid": _vm.corpid,
        "openid": item.userid,
        "type": "userName",
        "mpcomid": '1_' + i
      }
    })], 1)], 1), _vm._v(" "), _c('div', {
      staticClass: "setupUserTableContentRight",
      attrs: {
        "eventid": '0_' + i
      },
      on: {
        "click": function($event) {
          _vm.operatDelUser(item.userid)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": "../../../static/images/more.png",
        "alt": ""
      }
    })])])
  }), _vm._v(" "), _c('CKaddMember', {
    attrs: {
      "obj-message": _vm.global_button_name,
      "eventid": '1',
      "mpcomid": '2'
    },
    on: {
      "addMember": _vm.operatGlobalUser
    }
  })], 2), _vm._v(" "), _c('CKbutton', {
    attrs: {
      "name": "完成设置",
      "eventid": '2',
      "mpcomid": '3'
    },
    on: {
      "operat": _vm.goIndex
    }
  }), _vm._v(" "), _c('v-overlay', {
    attrs: {
      "show": _vm.isOverlay,
      "mpcomid": '4'
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-f703cf68", esExports)
  }
}

/***/ })

},[232]);