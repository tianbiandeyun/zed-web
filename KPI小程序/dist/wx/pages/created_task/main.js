require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__created_task__ = __webpack_require__(145);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__created_task__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_created_task_vue__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_795c3550_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_created_task_vue__ = __webpack_require__(165);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(146)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-795c3550"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_created_task_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_795c3550_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_created_task_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/created_task/created_task.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] created_task.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-795c3550", Component.options)
  } else {
    hotAPI.reload("data-v-795c3550", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 146:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_regenerator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_components_CK_add_member_CKaddMember__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_CK_button_CKbutton__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_CK_calendar_piker_CKcalendarPiker__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_CK_title_notice_CKtitleNotice__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vuex__ = __webpack_require__(2);







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "created-task-container",
  components: { CKaddMember: __WEBPACK_IMPORTED_MODULE_7__src_components_CK_add_member_CKaddMember__["a" /* default */], CKbutton: __WEBPACK_IMPORTED_MODULE_8__components_CK_button_CKbutton__["a" /* default */], CKcalendarPiker: __WEBPACK_IMPORTED_MODULE_9__components_CK_calendar_piker_CKcalendarPiker__["a" /* default */], CKtitleNotice: __WEBPACK_IMPORTED_MODULE_10__components_CK_title_notice_CKtitleNotice__["a" /* default */] },
  data: function data() {
    return {
      corpid: "", // 企业ID
      doing_button: { title: "添加执行人", detail: "执行此绩效考核的人" },
      review_button: { title: "添加审查人", detail: "授权审查人对此任务进行考评" },
      task_name: "", // 任务名
      task_details: "", // 任务详情
      start_date: "请选择开始时间",
      end_date: "请选择结束时间",
      month_list: [], // 生成的月份列表
      month_size: 2, // 一次显示几个月
      week_list: ["日", "一", "二", "三", "四", "五", "六"], // 周几
      picker_date: "", // 日期选择器开始时间
      // on_the_day: {
      //   year: new Date().getFullYear(),
      //   month: parseInt(new Date().getMonth() + 1) < 10 ? "0" + parseInt(new Date().getMonth() + 1) : parseInt(new Date().getMonth() + 1),
      //   day: new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()
      // },
      on_the_day: {
        year: "",
        month: "",
        day: ""
      },
      is_review_data_popup: false, // 控制打开选择审查日期
      review_placeholder: "请选择审查时长",
      review_value: {},
      refresh_user_name: true, // 控制重复选择之后，userid 查询name无法渲染页面，导致名字不变化
      is_overlay: false, // 控制遮罩弹出，防止多与操作
      doing_list: [], // 选择的执行人
      review_list: [] // 选择的审查人
    };
  },
  mounted: function mounted() {
    var that = this;
    that.corpid = that.registUser.data.back_value.corpid;

    // ---
    // that.picker_date = `${that.on_the_day.year}-${that.on_the_day.month}-${that.on_the_day.day}`;

    // 获取系统时间
    that.$store.dispatch("_getTime", {
      im: that.$constData.INTER_FACE.get_system_setting_date,
      fps: {},
      url: that.$constData.REQUEST_URI
    }).then(function (res) {
      var _tiem = res.data.back_value;
      that.picker_date = _tiem;
      that.on_the_day.year = parseInt(_tiem.split("-")[0]);
      that.on_the_day.month = parseInt(_tiem.split("-")[1]);
      that.on_the_day.day = parseInt(_tiem.split("-")[2]);
    });

    // ---

    that.setMoth(that.month_size); // 生成月份
    // 如果是修改任务则执行请求
    if (that.$root.$mp.query.task_id) {
      that.getTaskDetails();
    }
  },

  methods: {
    /**
     * 保存新建的任务
     * */
    saveTaskDetails: function saveTaskDetails() {
      var _this = this;

      var that = this;
      var task_id = "";

      if (that.task_name === "") {
        wx.showToast({
          title: "请填写目标名称",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }
      if (that.task_details === "") {
        wx.showToast({
          title: "请填写达标标准",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }
      if (that.start_date === "请选择开始时间") {
        wx.showToast({
          title: "请选择开始时间",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }
      if (that.end_date === "请选择结束时间") {
        wx.showToast({
          title: "请选择结束时间",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }
      if (that.review_placeholder === "请选择审查时长") {
        wx.showToast({
          title: "请选择审查时间",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }

      if (that.doing_list.length === 0) {
        wx.showToast({
          title: "请选择执行人",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }

      if (that.review_list.length === 0) {
        wx.showToast({
          title: "请选择审查人",
          icon: "none",
          mask: true,
          duration: 1000
        });
        return false;
      }

      that.$unit.showWaiting("提交中，请稍后");

      if (that.$root.$mp.query.task_id) {
        // 保存除 执行人 审查人以外的数据
        that.$store.dispatch("_modifyTask", {
          im: that.$constData.INTER_FACE.update_task,
          fps: {
            userid: that.registUser.data.back_value.userid,
            task_id: that.$root.$mp.query.task_id,
            task_name: that.task_name,
            describe: that.task_details,
            start_date: that.start_date,
            end_date: that.end_date,
            review_day: __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values___default()(that.review_value).join("|")
          },
          url: that.$constData.REQUEST_URI
        }).then(function () {
          var _ref = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_4_babel_runtime_regenerator___default.a.mark(function _callee(res) {
            return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (res.data.result === "failure") {
                      that.$unit.closeWaiting();
                      that.$unit.showErrorInfo(res.data, "update_task");
                    } else {
                      task_id = res.data.back_value.id;
                      // 3 执行人
                      that.addMemberByUser(that.doing_list, task_id, 0, 3, function (res) {
                        if (res) {
                          // 2 审查人
                          that.addMemberByUser(that.review_list, task_id, 0, 2, function (res) {
                            if (res) {
                              that.$unit.closeWaiting();
                              wx.showModal({
                                title: "提示",
                                content: "考核目标创建完成",
                                showCancel: false,
                                success: function success() {
                                  wx.navigateBack({
                                    delta: 1
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      } else {
        // 保存除 执行人 审查人以外的数据
        that.$store.dispatch("_addTask", {
          im: that.$constData.INTER_FACE.add_task,
          fps: {
            userid: that.registUser.data.back_value.userid,
            task_name: that.task_name,
            describe: that.task_details,
            start_date: that.start_date,
            end_date: that.end_date,
            review_day: __WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values___default()(that.review_value).join("|")
          },
          url: that.$constData.REQUEST_URI
        }).then(function () {
          var _ref2 = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_4_babel_runtime_regenerator___default.a.mark(function _callee2(res) {
            return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (res.data.result === "failure") {
                      that.$unit.closeWaiting();
                      that.$unit.showErrorInfo(res.data, "add_task");
                    } else {
                      task_id = res.data.back_value.id;
                      // 3 执行人
                      that.addMemberByUser(that.doing_list, task_id, 0, 3, function (res) {
                        if (res) {
                          // 2 审查人
                          that.addMemberByUser(that.review_list, task_id, 0, 2, function (res) {
                            if (res) {
                              that.$unit.closeWaiting();
                              wx.showModal({
                                title: "提示",
                                content: "考核目标创建完成",
                                showCancel: false,
                                success: function success() {
                                  wx.navigateBack({
                                    delta: 1
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, _this);
          }));

          return function (_x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      }
    },

    /**
     * 加载更多日期
     * */
    operatGetMoreDate: function operatGetMoreDate() {
      var that = this;
      that.$unit.showWaiting();
      that.month_list = "";
      that.month_size += 1;
      that.setMoth(that.month_size);
      that.$unit.closeWaiting();
      console.log("加载更多日期");
    },

    /**
     * 打开选择审查人
     * */
    operatOpenSelectReviewUser: function operatOpenSelectReviewUser() {
      var that = this;
      that.is_overlay = true;
      that.refresh_user_name = false;
      that._selectUser(function (res) {
        if (res === "fail") {
          that.refresh_user_name = true;
          that.is_overlay = false;
          return;
        }
        that.refresh_user_name = true;
        that.review_list = res;
      });
    },

    /**
     * 打开选择执行人
     * */
    operatOpenSelectDoingUser: function operatOpenSelectDoingUser() {
      var that = this;
      that.is_overlay = true;
      that.refresh_user_name = false;
      that._selectUser(function (res) {
        if (res === "fail") {
          that.refresh_user_name = true;
          that.is_overlay = false;
          return;
        }
        that.refresh_user_name = true;
        that.doing_list = res;
      });
    },

    /**
     * 确认选择的审查时间
     * */
    confirmReviewDate: function confirmReviewDate() {
      var that = this;

      // 祛重
      for (var key in that.review_value) {
        if (that.review_value[key] === "") {
          delete that.review_value[key];
        }
      }

      // 如果没选择
      if (__WEBPACK_IMPORTED_MODULE_3_babel_runtime_core_js_json_stringify___default()(that.review_value) === "{}") {
        that.review_placeholder = "请选择审查时长";
        that.is_review_data_popup = false;
        return;
      }

      // 如果选择的时间大于1天，则显示天数
      if (__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values___default()(that.review_value)).length > 1) {
        that.review_placeholder = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values___default()(that.review_value)).length + "\u5929";
      } else {
        that.review_placeholder = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values___default()(that.review_value));
      }

      console.log(that.review_value);

      that.is_review_data_popup = false;
    },

    /**
     * 点击一次选择一个日期,放在一个对象里
     * */
    operatChangeReviewDate: function operatChangeReviewDate(res) {
      var that = this;
      if (that.review_value[res]) {
        that.$set(that.review_value, res, "");
      } else {
        that.$set(that.review_value, res, res);
      }
    },

    /**
     * 打开选择审查时间
     * */
    operatOpenReviewDate: function operatOpenReviewDate() {
      var that = this;
      that.is_review_data_popup = true;
    },

    /**
     * 关闭选择审查时间
     * */
    operatCloseReviewDate: function operatCloseReviewDate() {
      var that = this;
      that.is_review_data_popup = false;
    },

    /**
     * 开始时间
     * */
    getStartDate: function getStartDate(e) {
      var that = this;
      that.start_date = e.mp.detail.value;
    },

    /**
     * 结束时间
     * */
    getEndDate: function getEndDate(e) {
      var that = this;
      that.end_date = e.mp.detail.value;
    },

    /**
     * 递归添加联系人
     * arr 选择的人员
     * index 模拟下标从 0 开始
     * type 类型
     * */
    addMemberByUser: function addMemberByUser(arr, task_id, index, type, callback) {
      var that = this;
      if (index > arr.length - 1) {
        callback(true);
        return false;
      } else {
        // 部门主管 = 2; 添加统计管理员 = 4
        that.$store.dispatch("_addTaskMember", {
          im: that.$constData.INTER_FACE.append_holder,
          fps: {
            userid: that.registUser.data.back_value.userid,
            task_id: task_id,
            holder_userid: arr[index].id,
            holder_avatar: arr[index].avatar,
            holder_type: type // 2 审查人 3 执行人
          },
          url: that.$constData.REQUEST_URI
        }).then(function (res) {
          if (res.data.back_value) {
            index++;
            that.addMemberByUser(arr, task_id, index, type, callback);
          }
          if (res.data.result === "failure") {
            that.$unit.closeWaiting();
            that.$unit.showErrorInfo(res.data, "append_holder");
          }
        });
      }
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
          that.is_overlay = false;
        },
        fail: function fail(res) {
          callback("fail");
        }
      });
    },

    /**
     * 设置12个月
     * */
    setMoth: function setMoth(size) {
      var that = this;
      var dataArr = [];
      var data = new Date();
      for (var i = 1; i <= size; i++) {
        //每次循环一次 月份值加1
        data.setMonth(data.getMonth() + 1, 1);
        var year = data.getFullYear();
        var m = data.getMonth();
        if (m === 0) {
          m = 12;
          year = year - 1;
        }
        m = m < 10 ? "0" + m : m;
        dataArr.push({
          ymd: year + "-" + m + "-01",
          ym: year + "-" + m
        });
      }
      that.month_list = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(that.month_list), dataArr);
    },

    /**
     * 获取任务详情
     * 如果是修改任务则要显示
     * */
    getTaskDetails: function getTaskDetails() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_4_babel_runtime_regenerator___default.a.mark(function _callee3() {
        var that;
        return __WEBPACK_IMPORTED_MODULE_4_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                that = _this2;

                that.$unit.showWaiting();
                that.refresh_user_name = false;

                that.$store.dispatch("_getTaskDetalis", {
                  im: that.$constData.INTER_FACE.get_task_details,
                  fps: {
                    userid: that.registUser.data.back_value.userid,
                    task_id: that.$root.$mp.query.task_id
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_task_details");
                  } else {
                    var details = res.data.back_value;
                    that.task_name = details.task_name;
                    that.task_details = details.describe;
                    that.start_date = details.start_date;
                    that.end_date = details.end_date;
                    that.review_placeholder = details.review_day;
                    details.review_day.forEach(function (item, index, arr) {
                      that.$set(that.review_value, item, item);
                    });
                    // 如果选择的时间大于1天，则显示天数
                    if (__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values___default()(that.review_value)).length > 1) {
                      that.review_placeholder = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values___default()(that.review_value)).length + "\u5929";
                    } else {
                      that.review_placeholder = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_array_from___default()(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_core_js_object_values___default()(that.review_value));
                    }
                  }
                });

                // 执行人
                _context3.next = 6;
                return that.$store.dispatch("_getTaskHolders", {
                  im: that.$constData.INTER_FACE.get_holders,
                  fps: {
                    task_id: that.$root.$mp.query.task_id,
                    holder_type: 3
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_holders");
                  } else {

                    var doing = res.data.back_value;
                    doing.forEach(function (item, index, arr) {
                      that.doing_list.push({
                        avatar: item.avatar,
                        id: item.userid
                      });
                    });
                  }
                });

              case 6:
                _context3.next = 8;
                return that.$store.dispatch("_getTaskHolders", {
                  im: that.$constData.INTER_FACE.get_holders,
                  fps: {
                    task_id: that.$root.$mp.query.task_id,
                    holder_type: 2
                  },
                  url: that.$constData.REQUEST_URI
                }).then(function (res) {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "get_holders");
                  } else {

                    var review = res.data.back_value;
                    review.forEach(function (item, index, arr) {
                      that.review_list.push({
                        avatar: item.avatar,
                        id: item.userid
                      });
                    });
                  }
                });

              case 8:

                that.refresh_user_name = true;
                that.$unit.closeWaiting();

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }))();
    }
  },
  onUnload: function onUnload() {
    var that = this;
    that.$unit.restData(that);
  },

  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_11_vuex__["b" /* mapGetters */])(["registUser", "getAddressMulti"]))
});

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKcalendarPiker_vue__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_3aebc5ac_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKcalendarPiker_vue__ = __webpack_require__(164);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(162)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3aebc5ac"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_CKcalendarPiker_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_3aebc5ac_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_CKcalendarPiker_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/CK_calendar_piker/CKcalendarPiker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CKcalendarPiker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3aebc5ac", Component.options)
  } else {
    hotAPI.reload("data-v-3aebc5ac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 162:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "calendarPiker",
  props: {
    /**
     * 是否可以选择日期
     * */
    noclick: {
      type: Boolean,
      default: false
    },
    /**
     * 选择之后展示的日期
     * */
    showDate: {
      type: Object
    },
    /**
     * 日期表盘
     * */
    weekList: {
      type: []
    },
    /**
     * 当天的日期 比如：今天的日期
     * */
    onTheDay: {
      type: Object
    },
    /**
     * 需要展示的月份，比如：2020-06-01 2020-07-01 2020-08-01 等
     * */
    date: {
      type: String
    }
  },
  data: function data() {
    return {};
  },

  methods: {
    /**
     * 选择日历之后（单个日期，比如：2020-06-01），发送至上一级，做处理
     * */
    chooseDate: function chooseDate(y, m, d) {
      var that = this;
      console.log(that.noclick ? "无法选择" : "可以选择");
      if (that.noclick) {
        return;
      }
      // 选择的日期
      var date = y + "-" + m + "-" + d;
      // 今天的日期
      var day = that.onTheDay.year + "-" + that.onTheDay.month + "-" + that.onTheDay.day;
      if (Date.parse(date.replace(/\-/g, "/")) >= Date.parse(day.replace(/\-/g, "/"))) {
        that.$emit("changDate", date);
      } else {
        wx.showToast({
          title: "不可选择之前的日期",
          icon: "none",
          duration: 2000
        });
      }
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
    /**
     * 把当前月格式化42天
     * */
    visibeDays: function visibeDays() {
      var that = this;
      // 需要展示的月份，比如：2020-06-01 2020-07-01 2020-08-01 等

      var _that$$unit$getYearMo = that.$unit.getYearMonthDay(new Date(this.date)),
          year = _that$$unit$getYearMo.year,
          month = _that$$unit$getYearMo.month,
          day = _that$$unit$getYearMo.day;
      // 当前月份的第一天


      var currentFirstDay = that.$unit.getDate(year, month, day);
      // 当前月份的第一天是周几
      var week = currentFirstDay.getDay();
      // 往前推几天
      var startDay = currentFirstDay - week * 60 * 60 * 1000 * 24;
      var arr = []; // 每周
      // 42是每个月份单元格都需要显示42天
      for (var i = 0; i < 42; i++) {
        var y = new Date(startDay + i * 60 * 60 * 1000 * 24).getFullYear();
        var m = parseInt(new Date(startDay + i * 60 * 60 * 1000 * 24).getMonth() + 1) < 10 ? "0" + parseInt(new Date(startDay + i * 60 * 60 * 1000 * 24).getMonth() + 1) : parseInt(new Date(startDay + i * 60 * 60 * 1000 * 24).getMonth() + 1);
        var d = new Date(startDay + i * 60 * 60 * 1000 * 24).getDate() < 10 ? "0" + new Date(startDay + i * 60 * 60 * 1000 * 24).getDate() : new Date(startDay + i * 60 * 60 * 1000 * 24).getDate();
        arr.push({
          nowYear: year, // 当前
          nowMonth: parseInt(month + 1) < 10 ? "0" + parseInt(month + 1) : parseInt(month + 1), // 当前
          year: y, // 每天
          month: m, // 每天
          day: d // 每天
        }); // 把日期放进去
      }
      return arr;
    }
  }, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapGetters */])([]))
});

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "calendarPikerContainer"
  }, [_c('div', {
    staticClass: "calendarPiker"
  }, [_vm._l((_vm.weekList), function(item, week) {
    return _c('div', {
      key: week,
      staticClass: "calendarPikerWeek"
    }, [_vm._v("\n      " + _vm._s(item) + "\n    ")])
  }), _vm._v(" "), _vm._l((6), function(item, row) {
    return _c('div', {
      key: row,
      staticClass: "calendarPikerRow"
    }, _vm._l((7), function(item, col) {
      return _c('div', {
        key: col,
        staticClass: "calendarPikerCol",
        attrs: {
          "eventid": '0_' + row + '-' + col
        },
        on: {
          "click": function($event) {
            _vm.chooseDate(_vm.visibeDays[(row) * 7 + (col)].year, _vm.visibeDays[(row) * 7 + (col)].month, _vm.visibeDays[(row) * 7 + (col)].day)
          }
        }
      }, [(_vm.visibeDays[(row) * 7 + (col)].nowMonth === _vm.visibeDays[(row) * 7 + (col)].month && _vm.visibeDays[(row) * 7 + (col)].nowYear === _vm.visibeDays[(row) * 7 + (col)].year) ? _c('p', {
        class: [{
            isMonth: _vm.visibeDays[(row) * 7 + (col)].nowMonth === _vm.visibeDays[(row) * 7 + (col)].month && _vm.visibeDays[(row) * 7 + (col)].nowYear === _vm.visibeDays[(row) * 7 + (col)].year
          },
          {
            isTody: _vm.showDate[_vm.visibeDays[(row) * 7 + (col)].year + '-' + (_vm.visibeDays[(row) * 7 + (col)].month) + '-' + _vm.visibeDays[(row) * 7 + (col)].day]
          },
          {
            today: _vm.onTheDay.day === _vm.visibeDays[(row) * 7 + (col)].day && _vm.onTheDay.month === _vm.visibeDays[(row) * 7 + (col)].month && _vm.onTheDay.year === _vm.visibeDays[(row) * 7 + (col)].year
          }
        ]
      }, [_vm._v("\n          " + _vm._s(_vm.visibeDays[(row) * 7 + (col)].day))]) : _c('p', {
        staticClass: "notMonth"
      }, [_vm._v(_vm._s(_vm.visibeDays[(row) * 7 + (col)].day))])], 1)
    }))
  })], 2)])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3aebc5ac", esExports)
  }
}

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "created-task-container"
  }, [_c('div', {
    staticClass: "created-task-name"
  }, [_c('p', {
    staticClass: "created-task-lable"
  }, [_vm._v("目标名称：")]), _vm._v(" "), _c('p', {
    staticClass: "created-task-name-value"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.task_name),
      expression: "task_name"
    }],
    attrs: {
      "type": "text",
      "hold-keyboard": "",
      "placeholder": "请输入考核目标名称",
      "eventid": '0'
    },
    domProps: {
      "value": (_vm.task_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.task_name = $event.target.value
      }
    }
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "created-textarea"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.task_details),
      expression: "task_details"
    }],
    staticClass: "textarea",
    attrs: {
      "hold-keyboard": "",
      "adjust-position": "",
      "fixed": "",
      "show-confirm-bar": "",
      "placeholder": "达标标准",
      "eventid": '1'
    },
    domProps: {
      "value": (_vm.task_details)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.task_details = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "created-task-information"
  }, [(_vm.picker_date) ? _c('div', {
    staticClass: "created-task-information-item"
  }, [_c('p', {
    staticClass: "created-task-information-item-lable"
  }, [_vm._v("起始时间：")]), _vm._v(" "), _c('picker', {
    staticClass: "created-task-information-picker",
    attrs: {
      "mode": "date",
      "start": _vm.picker_date,
      "end": "2020-12-31",
      "value": _vm.start_date,
      "eventid": '2'
    },
    on: {
      "change": _vm.getStartDate
    }
  }, [_vm._v(_vm._s(_vm.start_date) + "\n      ")])], 1) : _vm._e(), _vm._v(" "), (_vm.picker_date) ? _c('div', {
    staticClass: "created-task-information-item"
  }, [_c('p', {
    staticClass: "created-task-information-item-lable"
  }, [_vm._v("结束时间：")]), _vm._v(" "), _c('picker', {
    staticClass: "created-task-information-picker",
    attrs: {
      "mode": "date",
      "start": _vm.picker_date,
      "end": "2020-12-31",
      "value": _vm.end_date,
      "eventid": '3'
    },
    on: {
      "change": _vm.getEndDate
    }
  }, [_vm._v(_vm._s(_vm.end_date) + "\n      ")])], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "created-task-information-item"
  }, [_c('p', {
    staticClass: "created-task-information-item-lable"
  }, [_vm._v("审查时间：")]), _vm._v(" "), _c('p', {
    staticClass: "created-task-information-picker",
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": _vm.operatOpenReviewDate
    }
  }, [_vm._v(_vm._s(_vm.review_placeholder))])], 1), _vm._v(" "), _c('v-popup', {
    attrs: {
      "show": _vm.is_review_data_popup,
      "closeable": "",
      "position": "bottom",
      "custom-style": "height: 90%;",
      "eventid": '8',
      "mpcomid": '3'
    },
    on: {
      "close": _vm.operatCloseReviewDate
    }
  }, [_c('section', {
    staticClass: "calendar-container"
  }, [_c('CKtitleNotice', {
    attrs: {
      "ord-message": "点选对应日期（多选）",
      "mpcomid": '0'
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "calendar-prompt"
  }, [_c('div', {
    staticClass: "calendar-prompt-now"
  }, [_vm._v("当前日期")]), _vm._v(" "), _c('div', {
    staticClass: "calendar-prompt-change"
  }, [_vm._v("已选日期")])]), _vm._v(" "), _vm._l((_vm.month_list), function(item, index) {
    return _c('div', {
      key: index
    }, [_c('p', {
      staticStyle: {
        "padding-left": "20px",
        "font-weight": "bold"
      }
    }, [_vm._v(_vm._s(item.ym))]), _vm._v(" "), _c('CKcalendarPiker', {
      attrs: {
        "weekList": _vm.week_list,
        "onTheDay": _vm.on_the_day,
        "showDate": _vm.review_value,
        "date": item.ymd,
        "eventid": '5_' + index,
        "mpcomid": '1_' + index
      },
      on: {
        "changDate": _vm.operatChangeReviewDate
      }
    })], 1)
  }), _vm._v(" "), _c('p', {
    staticClass: "calendar-get-more-date",
    attrs: {
      "eventid": '6'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.operatGetMoreDate($event)
      }
    }
  }, [_vm._v("点击加载更多")]), _vm._v(" "), _c('CKbutton', {
    attrs: {
      "name": "确认",
      "eventid": '7',
      "mpcomid": '2'
    },
    on: {
      "operat": _vm.confirmReviewDate
    }
  })], 2)], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "created-task-add-user"
  }, [_c('CKtitleNotice', {
    attrs: {
      "ord-message": "执行人",
      "mpcomid": '4'
    }
  }), _vm._v(" "), (_vm.refresh_user_name) ? _c('div', {
    staticClass: "created-task-add-user-list"
  }, [_vm._l((_vm.doing_list), function(item, j) {
    return _c('div', {
      key: j,
      staticClass: "user-item",
      attrs: {
        "eventid": '9_' + j
      },
      on: {
        "click": _vm.operatOpenSelectDoingUser
      }
    }, [_c('div', {
      staticClass: "user-item-photo"
    }, [_c('img', {
      attrs: {
        "src": item.avatar,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "user-item-content"
    }, [_c('ww-open-data', {
      attrs: {
        "corpid": _vm.corpid,
        "openid": item.id,
        "type": "userName",
        "mpcomid": '5_' + j
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "user-item-content-next"
    }, [_c('img', {
      attrs: {
        "src": "../../../static/images/right.png",
        "alt": ""
      }
    })])])
  }), _vm._v(" "), (_vm.doing_list.length === 0) ? _c('CKaddMember', {
    attrs: {
      "obj-message": _vm.doing_button,
      "eventid": '10',
      "mpcomid": '6'
    },
    on: {
      "addMember": _vm.operatOpenSelectDoingUser
    }
  }) : _vm._e()], 2) : _vm._e(), _vm._v(" "), _c('CKtitleNotice', {
    attrs: {
      "ord-message": "审查人",
      "mpcomid": '7'
    }
  }), _vm._v(" "), (_vm.refresh_user_name) ? _c('div', {
    staticClass: "created-task-add-user-list"
  }, [_vm._l((_vm.review_list), function(item, j) {
    return _c('div', {
      key: j,
      staticClass: "user-item",
      attrs: {
        "eventid": '11_' + j
      },
      on: {
        "click": _vm.operatOpenSelectReviewUser
      }
    }, [_c('div', {
      staticClass: "user-item-photo"
    }, [_c('img', {
      attrs: {
        "src": item.avatar,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "user-item-content"
    }, [_c('ww-open-data', {
      attrs: {
        "corpid": _vm.corpid,
        "openid": item.id,
        "type": "userName",
        "mpcomid": '8_' + j
      }
    })], 1), _vm._v(" "), _c('div', {
      staticClass: "user-item-content-next"
    }, [_c('img', {
      attrs: {
        "src": "../../../static/images/right.png",
        "alt": ""
      }
    })])])
  }), _vm._v(" "), (_vm.review_list.length === 0) ? _c('CKaddMember', {
    attrs: {
      "obj-message": _vm.review_button,
      "eventid": '12',
      "mpcomid": '9'
    },
    on: {
      "addMember": _vm.operatOpenSelectReviewUser
    }
  }) : _vm._e()], 2) : _vm._e()], 1), _vm._v(" "), _c('CKbutton', {
    attrs: {
      "name": "保存",
      "eventid": '13',
      "mpcomid": '10'
    },
    on: {
      "operat": _vm.saveTaskDetails
    }
  }), _vm._v(" "), _c('v-overlay', {
    attrs: {
      "show": _vm.is_overlay,
      "mpcomid": '11'
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-795c3550", esExports)
  }
}

/***/ })

},[144]);