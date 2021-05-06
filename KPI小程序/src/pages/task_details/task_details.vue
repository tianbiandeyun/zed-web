<template>
  <section class="task-detail-container" v-if="page_show">

    <!--头-->
    <CKdetailsHeader
      :data="task_details"
      :corpid="corpid"
      :login-userid="userid"
      @modifyTask="operatCreatedTask">
    </CKdetailsHeader>

    <!--考核描述-->
    <CKdetailsContent :data="task_details"></CKdetailsContent>

    <!--拒绝理由-->
    <CKdetailsDisagree v-if="disagree.length !== 0" :data="disagree" :corpid="corpid"></CKdetailsDisagree>

    <!--执行日期-->
    <CKdetailsDate :data="task_details"></CKdetailsDate>

    <!--执行人列表-->
    <CKdetailsUserList :data="doing_list" title="执行人列表"></CKdetailsUserList>

    <!--审查人列表-->
    <CKdetailsUserList :data="review_list" title="审查人列表"></CKdetailsUserList>

    <!--审查结果列表-->
    <CKdetailsReviewResult
      :data="review_result_list"
      :status="review_status"
      :corpid="corpid">
    </CKdetailsReviewResult>

    <!--操作按钮-->
    <CKdetailsOperatButton
      :data="task_details"
      :login-userid="userid"
      :button-status="button_status"
      cancelText="我有异议"
      confirmText="接受考核"
      @cancel="operatDisagree"
      @confirm="operatAccept">
    </CKdetailsOperatButton>

    <!--拒绝理由弹窗-->
    <v-popup :show="disagree_show" round>

      <section class="disagree">
        <div class="disagree-title">请填写拒绝原因</div>
        <div class="disagree-content">
    <textarea class="textarea"
              v-model="user_disagree"
              hold-keyboard
              adjust-position
              fixed
              show-confirm-bar
              placeholder="请填写拒绝原因"></textarea>
        </div>
        <div class="disagree-button">
          <p @click="() => {disagree_show = false;user_disagree = ''}">取消</p>
          <p @click="setDisagree">提交</p>
        </div>
      </section>

    </v-popup>

  </section>
</template>

<script>
  import CKdetailsHeader from "../../components/CK_details/CKdetailsHeader";
  import CKdetailsContent from "../../components/CK_details/CKdetailsContent";
  import CKdetailsDisagree from "../../components/CK_details/CKdetailsDisagree";
  import CKdetailsDate from "../../components/CK_details/CKdetailsDate";
  import CKdetailsUserList from "../../components/CK_details/CKdetailsUserList";
  import CKdetailsOperatButton from "../../components/CK_details/CKdetailsOperatButton";
  import CKdetailsReviewResult from "../../components/CK_details/CKdetailsReviewResult";
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";
  import { mapGetters } from "vuex";

  export default {
    name: "task-detail-container",
    components: {
      CKtitleNotice,
      CKdetailsHeader,
      CKdetailsContent,
      CKdetailsDisagree,
      CKdetailsDate,
      CKdetailsUserList,
      CKdetailsOperatButton,
      CKdetailsReviewResult
    },
    data() {
      return {
        page_show: false,
        disagree_show: false, // 拒绝理由弹窗
        corpid: "", // 企业 id
        userid: "", // 上个页面传递过来的 userid
        button_status: "", // 用户操作过什么按钮 1 没有操作过 2 点击过接受 3 点击过拒绝
        user_type: "3", // 用户类型 1 创建人 2 审查人 3 执行人
        task_details: "", // 任务详情
        doing_list: "", // 执行人
        review_list: "", // 审查人
        disagree: [], // 展示拒绝理由
        user_disagree: "", // 填写的拒绝理由
        review_result_list: [], // 审查结果
        review_status: {} // 审查状态
      };
    },
    mixins: [],
    onShow() {
      const that = this;
      that.refreshTaskDetails();
    },
    methods: {
      /**
       * 创建考核任务
       * */
      operatCreatedTask() {
        const that = this;
        wx.navigateTo({
          url: `/pages/created_task/main?task_id=${that.task_details.id}`
        });
      },
      /**
       * 提交拒绝任务原因
       * */
      setDisagree() {
        const that = this;
        if (that.user_disagree === "") {
          wx.showToast({
            title: "请填写拒绝任务原因",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }
        that._setTaskStatus(3, that.user_type, that.user_disagree);
      },
      /**
       * 接受任务
       * */
      operatAccept() {
        const that = this;
        wx.showModal({
          title: `确认KPI考核内容`,
          content: `确认KPI考核内容意味着您接受如上审查标准，并接受该任务的工作权重`,
          cancelText: `仍需考虑`,
          confirmText: `接受`,
          confirmColor: `#19be6b`,
          success(res) {
            if (res.confirm) {
              that._setTaskStatus(2, that.user_type);
            }
          }
        });
      },
      /**
       * 拒绝任务
       * */
      operatDisagree() {
        const that = this;
        that.disagree_show = true;
      },
      /**
       * 设置任务状态
       * */
      _setTaskStatus(status, user_type, reason = "") {
        const that = this;
        that.$store.dispatch("_setTask", {
          im: that.$constData.INTER_FACE.confirm_task,
          fps: {
            userid: that.userid,
            task_id: that.$root.$mp.query.task_id,
            holder_type: user_type,
            status: status,
            reason: reason
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "confirm_task");
          } else {
            if (res.data.back_value) {
              that.disagree_show = false;
              that.refreshTaskDetails();
            }
          }
        });
      },
      /**
       * 获得任务列表
       * */
      async refreshTaskDetails() {
        const that = this;
        that.$unit.showWaiting();

        // 如果单独从 任务详情进入 ，判断请求链接是否存在 corpid，如果存在则不添加，如果不存在则添加
        if (that._getUrlParam("qy_id", that.$constData.REQUEST_URI)) {
        } else {
          that.$constData.SET_REQUEST_URI(that.$root.$mp.query.corpid);
        }

        that.corpid = that.$root.$mp.query.corpid;
        that.userid = that.$root.$mp.query.userid;

        that.$store.dispatch("_getTaskDetalis", {
          im: that.$constData.INTER_FACE.get_task_details,
          fps: {
            userid: that.userid,
            task_id: that.$root.$mp.query.task_id
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_task_details");
          } else {
            that.task_details = res.data.back_value;
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
            that.doing_list = res.data.back_value;
            // ---

            that.doing_list.forEach((item, index, arr) => {

              if (item.userid === that.userid) {
                console.log(parseInt(item.status));
                that.button_status = parseInt(item.status);
              }

            });

            // ---
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
            that.review_list = res.data.back_value;
          }
        });

        // 审查状态列表
        await that.$store.dispatch("_getTaskReviewList", {
          im: that.$constData.INTER_FACE.get_review_result_list,
          fps: {
            userid: that.userid,
            task_id: that.$root.$mp.query.task_id
          },
          url: that.$constData.REQUEST_URI
        }).then(async res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_review_result_list");
          } else {
            that.review_result_list = res.data.back_value;
            that._init_review_status();
          }
        });

        // 获取拒绝原因
        await that.$store.dispatch("_getDisagree", {
          im: that.$constData.INTER_FACE.get_reason,
          fps: {
            userid: that.userid,
            task_id: that.$root.$mp.query.task_id
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_reason");
          } else {
            that.disagree = [];
            that.disagree = res.data.back_value;
          }
        });

        that.page_show = true;
        that.$unit.closeWaiting();
      },
      /**
       * 初始化审查结果列表是否显示扣分显示
       * */
      _init_review_status() {
        const that = this;
        that.review_result_list.forEach((item, index, arr) => {
          if (item.review_result_list.length === 0) {
            // 未审核
            that.review_status[index] = 111;
          } else {

            for (let i = 0; i < item.review_result_list.length; i++) {
              let score = Math.round(item.review_result_list[i].score * 100);
              if (score === 100) {
                // 未扣分
                that.review_status[index] = 222;
              } else {
                // 扣分
                that.review_status[index] = 333;
                break;
              }
            }

          }
        });
      },
      _getUrlParam(name, url) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
        let r = url.substr(1).match(reg); // 匹配目标参数
        if (r != null) return decodeURI(r[2]);
        return null; // 返回参数值
      }
    },
    onUnload() {
      const that = this;
      that.$unit.restData(that);
    },
    computed: {
      ...mapGetters([
        // "registUser"
      ])
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .task-detail-container {
    padding-bottom: @default-padding-bottom-80;

    section {
      background-color: #fff;
    }

    .disagree {
      .default-padding-10-20();

      .disagree-title {
        color: @default-sub-color;
        font-size: @default-font-size-14;
        .default-padding-10-20(@l:0px,@r:0px);
        text-align: center;
      }

      .disagree-content {
        border: 1px solid @default-divider-color;
        height: 140px;
        width: 240px;
        .textarea {
          padding: 5px;
          color: @default-sub-color;
          width: 100%;
          height: 100%;
          font-size: @default-font-size-14;
        }
      }

      .disagree-button {
        display: flex;
        justify-content: space-around;
        align-items: center;
        p {
          flex: 1;
          text-align: center;
          color: @default-sub-color;
          .default-padding-10-20(@b:0px);

          &:nth-of-type(2) {
            color: @default-button-color !important;
          }
        }
      }

    }

  }

</style>
