<template>
  <section class="review-details-container" v-if="page_show">

    <CKdetailsHeader
      page="review_details"
      :data="task_details"
      :corpid="corpid"
      :login-userid="userid">
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

    <!--需要我审查的时间点-->
    <CKtitleNotice ord-message="需要我审查的时间点"></CKtitleNotice>
    <div class="review-details-time">
      <div class="review-details-time-item"
           v-for="(item,index) in review_time"
           :key="index"
           @click="operatShowReviewStatus(item,index)">
        <span>{{item.review_date}}</span>
        <span>{{item.working_day_count}}天</span>

        <!--1 或者 3 的时候，未确认-->
        <span v-if="button_status !== 2">[未确认]</span>
        <span v-else>
    <span v-if="item.status === 6">[点击评分]</span>
    <span v-if="item.status === 7">[未到期]</span>
    <span v-if="item.status === 8">[已完成]</span>
    </span>

        <!--6 黄色 点击评分 7 蓝色 未到期 8 绿色 已完成-->
        <icon v-show="item.status === 6" type="info" color="#ffc300" size="26"></icon>
        <icon v-show="item.status === 7" type="waiting" size="26"></icon>
        <icon v-show="item.status === 8" type="success" size="26"></icon>
      </div>
    </div>

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
      confirmText="同意成为审查人"
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
    name: "review-details-container",
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
        corpid: "", // 企业 id
        userid: "", // 上个页面传递过来的 userid
        disagree_show: false, // 拒绝理由弹窗
        button_status: "", // 用户操作过什么按钮 1 没有操作过 2 点击过接受 3 点击过拒绝
        user_type: "2", // 用户类型 1 创建人 2 审查人 3 执行人
        task_details: "", // 任务详情
        doing_list: "", // 执行人
        review_list: "", // 审查人
        disagree: "", // 展示拒绝理由
        user_disagree: "", // 用户填写的拒绝理由
        review_result_list: [], // 审查结果
        review_status: {}, // 审查状态
        review_time: "" // 审查时间点
      };
    },
    onShow() {
      const that = this;
      that.refreshReviewDetails();
    },
    methods: {
      /**
       * 未确认点击提示
       * */
      operatShowReviewStatus(item, index) {
        const that = this;
        if (that.button_status !== 2) {
          wx.showToast({
            title: "请先确认同意成为审查人",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        // 6 黄色 点击评分
        if (item.status === 6) {
          wx.navigateTo({
            url: `/pages/review_score/main?task_id=${that.$root.$mp.query.task_id}&work_day_count=${item.working_day_count}&review_date=${item.review_date}`
          });
        }

        // 7 蓝色 未到期
        if (item.status === 7) {
          const that = this;
          const { year, month, day } = that.$unit.getYearMonthDay(new Date());
          wx.showModal({
            title: `考核目标未到审查时间`,
            showCancel: false,
            content: `距离审查时间${item.review_date},还有${that.$unit.getDays(`${year}-${month + 1}-${day}`, item.review_date)}天`,
            success() {
            }
          });
        }

        // 8 绿色 已完成
        if (item.status === 8) {
          wx.showModal({
            title: `该审核已经结束`,
            content: `请谨慎操作，如果您强行撤回审核结果可能会影响到统计部门已核算的结果。`,
            cancelText: `仍需考虑`,
            confirmText: `撤回审核`,
            confirmColor: `#19be6b`,
            success(res) {
              if (res.confirm) {
                that.$store.dispatch("_withdrawReview", {
                  im: that.$constData.INTER_FACE.set_withdrawal_review,
                  fps: {
                    userid: that.userid,
                    task_id: that.$root.$mp.query.task_id,
                    review_date: item.review_date
                  },
                  url: that.$constData.REQUEST_URI
                }).then(res => {
                  if (res.data.result === "failure") {
                    that.$unit.showErrorInfo(res.data, "set_withdrawal_review");
                  } else {
                    if (res.data.back_value) {
                      that.refreshReviewDetails();
                    }
                  }
                });
              }
            }
          });
        }

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
       * 接受同意
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
       * 打开拒绝接受弹框
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
              that.refreshReviewDetails();
            }
          }
        });
      },
      /**
       * 获得任务列表
       * */
      async refreshReviewDetails() {
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

            // ---

            that.review_list.forEach((item, index, arr) => {

              if (item.userid === that.userid) {
                console.log(parseInt(item.status));
                that.button_status = parseInt(item.status);
              }

            });

            // ---

          }
        });

        // 需要我审查的时间点
        await that.$store.dispatch("_getReviewResultTime", {
          im: that.$constData.INTER_FACE.get_review_task_list,
          fps: {
            userid: that.userid,
            task_id: that.$root.$mp.query.task_id
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_review_task_list");
          } else {
            that.review_time = res.data.back_value;
          }
        });

        // 审查结果
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
            await that._init_review_status();
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
        "registUser"
      ])
    },
    async onPullDownRefresh() {
      const that = this;
      that.$unit.showWaiting();
      that.refreshReviewDetails();
      wx.stopPullDownRefresh();
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .review-details-container {
    padding-bottom: @default-padding-bottom-80;

    div {
      background-color: #fff;
    }

    .review-details-time {
      .default-box-sizing;
      .default-padding-10-20(@t:0px,@b:0px);

      .review-details-time-item {
        border-bottom: 1px solid @default-divider-color;
        line-height: 3;
        font-size: @default-font-size-16;
        .default-flex();
        color: @default-content-color;
      }

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
