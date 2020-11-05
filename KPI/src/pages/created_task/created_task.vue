<template>
  <section class="created-task-container">

    <!--名称-->
    <div class="created-task-name">
      <p class="created-task-lable">目标名称：</p>
      <p class="created-task-name-value">
        <input type="text"
               v-model="task_name"
               hold-keyboard
               placeholder="请输入考核目标名称"></p>
    </div>

    <!--备注-->
    <div class="created-textarea">
      <textarea class="textarea"
                v-model="task_details"
                hold-keyboard
                adjust-position
                fixed
                show-confirm-bar
                placeholder="达标标准"></textarea>
    </div>

    <div class="created-task-information">

      <!--起始时间-->
      <div class="created-task-information-item" v-if="picker_date">
        <p class="created-task-information-item-lable">起始时间：</p>
        <picker class="created-task-information-picker"
                @change="getStartDate"
                mode="date" :start="picker_date" end="2020-12-31"
                :value="start_date">{{start_date}}
        </picker>
      </div>

      <!--结束时间-->
      <div class="created-task-information-item" v-if="picker_date">
        <p class="created-task-information-item-lable">结束时间：</p>
        <picker class="created-task-information-picker"
        @change="getEndDate"
        mode="date" :start="picker_date" end="2020-12-31"
        :value="end_date">{{end_date}}
        </picker>
      </div>

      <!--审查时间-->
      <div class="created-task-information-item">
        <p class="created-task-information-item-lable">审查时间：</p>
        <p class="created-task-information-picker" @click="operatOpenReviewDate">{{review_placeholder}}</p>
      </div>
      <v-popup :show="is_review_data_popup"
               closeable
               @close="operatCloseReviewDate"
               position="bottom"
               custom-style="height: 90%;">
        <section class="calendar-container">

          <CKtitleNotice ord-message="点选对应日期（多选）"></CKtitleNotice>

          <div class="calendar-prompt">
            <div class="calendar-prompt-now">当前日期</div>
            <div class="calendar-prompt-change">已选日期</div>
          </div>

          <div v-for="(item,index) in month_list" :key="index">
            <!--抬头说明-->
            <p style="padding-left: 20px;font-weight: bold">{{item.ym}}</p>
            <CKcalendarPiker
              :weekList="week_list"
              :onTheDay="on_the_day"
              :showDate="review_value"
              :date="item.ymd"
              @changDate="operatChangeReviewDate">
            </CKcalendarPiker>
          </div>

          <!--加载更多-->
          <p class="calendar-get-more-date" @click.stop="operatGetMoreDate">点击加载更多</p>

          <!--按钮-->
          <CKbutton name="确认" @operat="confirmReviewDate"></CKbutton>

        </section>
      </v-popup>

    </div>

    <!--添加人员-->
    <div class="created-task-add-user">

      <CKtitleNotice ord-message="执行人"></CKtitleNotice>
      <div class="created-task-add-user-list" v-if="refresh_user_name">
        <!--列表-->
        <div class="user-item" v-for="(item,j) in doing_list" :key="j" @click="operatOpenSelectDoingUser">
          <div class="user-item-photo">
            <img :src="item.avatar" alt="">
          </div>
          <div class="user-item-content">
            <ww-open-data :corpid="corpid" :openid="item.id" type="userName"></ww-open-data>
          </div>
          <div class="user-item-content-next">
            <img src="../../../static/images/right.png" alt="">
          </div>
        </div>

        <CKaddMember v-if="doing_list.length === 0" :obj-message="doing_button"
                     @addMember="operatOpenSelectDoingUser"></CKaddMember>
      </div>

      <CKtitleNotice ord-message="审查人"></CKtitleNotice>
      <div class="created-task-add-user-list" v-if="refresh_user_name">
        <!--列表-->
        <div class="user-item" v-for="(item,j) in review_list" :key="j" @click="operatOpenSelectReviewUser">
          <div class="user-item-photo">
            <img :src="item.avatar" alt="">
          </div>
          <div class="user-item-content">
            <ww-open-data :corpid="corpid" :openid="item.id" type="userName"></ww-open-data>
          </div>
          <div class="user-item-content-next">
            <img src="../../../static/images/right.png" alt="">
          </div>
        </div>

        <CKaddMember v-if="review_list.length === 0" :obj-message="review_button"
                     @addMember="operatOpenSelectReviewUser"></CKaddMember>
      </div>

    </div>

    <!--按钮-->
    <CKbutton name="保存" @operat="saveTaskDetails"></CKbutton>

    <v-overlay :show="is_overlay"></v-overlay>

  </section>
</template>

<script>
  import CKaddMember from "../../../src/components/CK_add_member/CKaddMember";
  import CKbutton from "../../components/CK_button/CKbutton";
  import CKcalendarPiker from "../../components/CK_calendar_piker/CKcalendarPiker";
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";
  import { mapGetters } from "vuex";

  export default {
    name: "created-task-container",
    components: { CKaddMember, CKbutton, CKcalendarPiker, CKtitleNotice },
    data() {
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
        picker_date: "",// 日期选择器开始时间
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
    mounted() {
      const that = this;
      that.corpid = that.registUser.data.back_value.corpid;

      // ---
      // that.picker_date = `${that.on_the_day.year}-${that.on_the_day.month}-${that.on_the_day.day}`;

      // 获取系统时间
      that.$store.dispatch("_getTime", {
        im: that.$constData.INTER_FACE.get_system_setting_date,
        fps: {},
        url: that.$constData.REQUEST_URI
      }).then(res => {
        let _tiem = res.data.back_value;
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
      saveTaskDetails() {
        const that = this;
        let task_id = "";

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
              review_day: Object.values(that.review_value).join("|")
            },
            url: that.$constData.REQUEST_URI
          }).then(async res => {
            if (res.data.result === "failure") {
              that.$unit.closeWaiting();
              that.$unit.showErrorInfo(res.data, "update_task");
            } else {
              task_id = res.data.back_value.id;
              // 3 执行人
              that.addMemberByUser(that.doing_list, task_id, 0, 3, res => {
                if (res) {
                  // 2 审查人
                  that.addMemberByUser(that.review_list, task_id, 0, 2, res => {
                    if (res) {
                      that.$unit.closeWaiting();
                      wx.showModal({
                        title: "提示",
                        content: "考核目标创建完成",
                        showCancel: false,
                        success() {
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
          });
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
              review_day: Object.values(that.review_value).join("|")
            },
            url: that.$constData.REQUEST_URI
          }).then(async res => {
            if (res.data.result === "failure") {
              that.$unit.closeWaiting();
              that.$unit.showErrorInfo(res.data, "add_task");
            } else {
              task_id = res.data.back_value.id;
              // 3 执行人
              that.addMemberByUser(that.doing_list, task_id, 0, 3, res => {
                if (res) {
                  // 2 审查人
                  that.addMemberByUser(that.review_list, task_id, 0, 2, res => {
                    if (res) {
                      that.$unit.closeWaiting();
                      wx.showModal({
                        title: "提示",
                        content: "考核目标创建完成",
                        showCancel: false,
                        success() {
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
          });
        }
      },
      /**
       * 加载更多日期
       * */
      operatGetMoreDate() {
        const that = this;
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
      operatOpenSelectReviewUser() {
        const that = this;
        that.is_overlay = true;
        that.refresh_user_name = false;
        that._selectUser(res => {
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
      operatOpenSelectDoingUser() {
        const that = this;
        that.is_overlay = true;
        that.refresh_user_name = false;
        that._selectUser(res => {
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
      confirmReviewDate() {
        const that = this;

        // 祛重
        for (let key in that.review_value) {
          if (that.review_value[key] === "") {
            delete that.review_value[key];
          }
        }

        // 如果没选择
        if (JSON.stringify(that.review_value) === "{}") {
          that.review_placeholder = "请选择审查时长";
          that.is_review_data_popup = false;
          return;
        }

        // 如果选择的时间大于1天，则显示天数
        if (Array.from(Object.values(that.review_value)).length > 1) {
          that.review_placeholder = `${Array.from(Object.values(that.review_value)).length}天`;
        } else {
          that.review_placeholder = Array.from(Object.values(that.review_value));
        }

        console.log(that.review_value);

        that.is_review_data_popup = false;
      },
      /**
       * 点击一次选择一个日期,放在一个对象里
       * */
      operatChangeReviewDate(res) {
        const that = this;
        if (that.review_value[res]) {
          that.$set(that.review_value, res, "");
        } else {
          that.$set(that.review_value, res, res);
        }
      },
      /**
       * 打开选择审查时间
       * */
      operatOpenReviewDate() {
        const that = this;
        that.is_review_data_popup = true;
      },
      /**
       * 关闭选择审查时间
       * */
      operatCloseReviewDate() {
        const that = this;
        that.is_review_data_popup = false;
      },
      /**
       * 开始时间
       * */
      getStartDate(e) {
        const that = this;
        that.start_date = e.mp.detail.value;
      },
      /**
       * 结束时间
       * */
      getEndDate(e) {
        const that = this;
        that.end_date = e.mp.detail.value;
      },
      /**
       * 递归添加联系人
       * arr 选择的人员
       * index 模拟下标从 0 开始
       * type 类型
       * */
      addMemberByUser(arr, task_id, index, type, callback) {
        const that = this;
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
          }).then(res => {
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
      _selectUser(callback) {
        const that = this;
        wx.qy.selectEnterpriseContact({
          fromDepartmentId: that.getAddressMulti.data.back_value.from_department_id,
          mode: that.getAddressMulti.data.back_value.mode,
          type: that.getAddressMulti.data.back_value.type,
          success(res) {
            callback(res.result.userList);
            that.is_overlay = false;
          },
          fail(res) {
            callback("fail");
          }
        });
      },
      /**
       * 设置12个月
       * */
      setMoth(size) {
        const that = this;
        let dataArr = [];
        let data = new Date();
        for (let i = 1; i <= size; i++) {
          //每次循环一次 月份值加1
          data.setMonth(data.getMonth() + 1, 1);
          let year = data.getFullYear();
          let m = data.getMonth();
          if (m === 0) {
            m = 12;
            year = year - 1;
          }
          m = m < 10 ? "0" + m : m;
          dataArr.push({
            ymd: `${year}-${m}-01`,
            ym: `${year}-${m}`
          });
        }
        that.month_list = [...that.month_list, ...dataArr];
      },
      /**
       * 获取任务详情
       * 如果是修改任务则要显示
       * */
      async getTaskDetails() {
        const that = this;
        that.$unit.showWaiting();
        that.refresh_user_name = false;

        that.$store.dispatch("_getTaskDetalis", {
          im: that.$constData.INTER_FACE.get_task_details,
          fps: {
            userid: that.registUser.data.back_value.userid,
            task_id: that.$root.$mp.query.task_id
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_task_details");
          } else {
            const details = res.data.back_value;
            that.task_name = details.task_name;
            that.task_details = details.describe;
            that.start_date = details.start_date;
            that.end_date = details.end_date;
            that.review_placeholder = details.review_day;
            details.review_day.forEach((item, index, arr) => {
              that.$set(that.review_value, item, item);
            });
            // 如果选择的时间大于1天，则显示天数
            if (Array.from(Object.values(that.review_value)).length > 1) {
              that.review_placeholder = `${Array.from(Object.values(that.review_value)).length}天`;
            } else {
              that.review_placeholder = Array.from(Object.values(that.review_value));
            }
          }
        });

        // 执行人
        await that.$store.dispatch("_getTaskHolders", {
          im: that.$constData.INTER_FACE.get_holders,
          fps: {
            task_id: that.$root.$mp.query.task_id,
            holder_type: 3
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_holders");
          } else {

            const doing = res.data.back_value;
            doing.forEach((item, index, arr) => {
              that.doing_list.push({
                avatar: item.avatar,
                id: item.userid
              });
            });

          }
        });

        // 审查人
        await that.$store.dispatch("_getTaskHolders", {
          im: that.$constData.INTER_FACE.get_holders,
          fps: {
            task_id: that.$root.$mp.query.task_id,
            holder_type: 2
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_holders");
          } else {

            const review = res.data.back_value;
            review.forEach((item, index, arr) => {
              that.review_list.push({
                avatar: item.avatar,
                id: item.userid
              });
            });

          }
        });

        that.refresh_user_name = true;
        that.$unit.closeWaiting();

      }
    },
    onUnload() {
      const that = this;
      that.$unit.restData(that);
    },
    computed: {
      ...mapGetters([
        "registUser",
        "getAddressMulti"
      ])
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  @box-margin-bottom: 10px;

  .created-task-container {
    padding-bottom: @default-padding-bottom-80;

    /*名称*/
    .created-task-name {
      .default-box-sizing;
      .default-flex();
      .default-padding-10-20();
      background-color: #fff;
      margin-bottom: @box-margin-bottom;
      font-size: @default-font-size-16;
      color: @default-content-color;
      .created-task-lable {
        width: 90px;
      }
      .created-task-name-value {
        color: @default-sub-color;
        width: calc(100% - 100px);
        text-align: left;
      }
    }

    /*任务描述*/
    .created-textarea {
      .default-box-sizing;
      height: 100px;
      background-color: #fff;
      .default-padding-10-20();
      margin-bottom: @box-margin-bottom;
      .textarea {
        color: @default-sub-color;
        width: 100%;
        height: 100%;
        font-size: @default-font-size-16;
      }
    }

    /*起始时间 结束时间 审查时间*/
    .created-task-information {
      .default-box-sizing;
      background-color: #fff;
      .default-padding-10-20(@t:0px,@b:0px);

      .created-task-information-item {
        .default-flex();
        font-size: @default-font-size-16;
        .default-padding-10-20(@r:0px,@l:0px);
        border-bottom: 1px solid @default-divider-color;

        .created-task-information-item-lable {
          color: @default-content-color;
          width: 90px;
        }

        .created-task-information-picker {
          color: @default-sub-color;
          width: calc(100% - 100px);
          text-align: left;
        }
      }

      .calendar-container {
        padding-bottom: @default-padding-bottom-80;

        .calendar-prompt, .calendar-prompt-change, .calendar-prompt-now {
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          text-align: center;
          font-size: @default-font-size-12;
          padding: 4px;
        }

        .calendar-prompt {
          .default-box-sizing;
          .default-padding-10-20(@t:0px,@b:0px);
          .default-flex(@jc:flex-start,@ai:flex-start);
          .calendar-prompt-now {
            color: #fff;
            background-color: @default-sub-color;
            margin-right: 10px;
          }

          .calendar-prompt-change {
            background-color: @default-button-color;
          }
        }

        .calendar-get-more-date {
          font-size: @default-font-size-14;
          color: @default-sub-color;
          text-align: center;
          line-height: 4;
        }

      }
    }

    /*添加成员*/
    .created-task-add-user {
      margin-bottom: @box-margin-bottom;

      .created-task-add-user-list {
        background-color: #fff;
        .default-padding-10-20(@t:4px,@b:4px);

        .user-item {
          border-bottom: 1px solid @default-divider-color;
          .default-flex();
          padding: 5px 0;

          .user-item-photo {
            width: 35px;
            height: 35px;
            padding: 2px;
            text-align: center;
            line-height: 35px;
            font-size: 0;

            img {
              vertical-align: middle;
              width: 100%;
              height: 100%;
            }
          }

          .user-item-content {
            width: calc(100% - 90px);
            color: @default-content-color;
            font-size: @default-font-size-14;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .user-item-content-next {
            font-size: 0;

            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
</style>
