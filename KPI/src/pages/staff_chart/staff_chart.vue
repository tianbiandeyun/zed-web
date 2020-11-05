<template>
  <section class="staff-chart-container">

    <div class="staff-chart-notice" v-if="corpid && staff_chart_details.userid">
      <ww-open-data
        :corpid="corpid"
        :openid="staff_chart_details.userid"
        type="userName"></ww-open-data>
      的员工画像
    </div>

    <div class="staff-chart-details">
      <div class="staff-chart-details-photo">
        <img :src="staff_chart_details.avatar" alt="">
      </div>
      <div class="staff-chart-details-content">
        <h1>综合评分：{{staff_chart_details.score}}分</h1>
        <p>{{staff_chart_details.task_count}}个考核项，{{staff_chart_details.examine_count}}次评审</p>
      </div>
    </div>

    <CKtitleNotice ord-message="考核项列表"></CKtitleNotice>
    <div class="staff-chart-list"
         v-for="(item,index) in staff_chart_details.month_list" :key="index"
         @click="goMonthAssessDetails(item)">
      <CKtaskList :data="item" :is-icon="isIcon" page="staff_chart"></CKtaskList>
    </div>

  </section>
</template>

<script>
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";
  import CKtaskList from "../../components/CK_task_list/CKtaskList";
  import { mapGetters } from "vuex";

  export default {
    name: "staff-chart-container",
    components: { CKtitleNotice, CKtaskList },
    data() {
      return {
        isIcon: false,
        corpid: "",
        staff_chart_details: ""
      };
    },
    onShow() {
      const that = this;
      that.$unit.showWaiting();
      that.corpid = that.registUser.data.back_value.corpid;
      that.refreshStaffChart();
    },
    methods: {
      goMonthAssessDetails(res) {
        const that = this;
        wx.navigateTo({
          url: `/pages/month_assess_details/main?executor_userid=${that.$root.$mp.query.executor_userid}&month=${res.date}`
        });
      },
      /**
       * 获得任务列表
       * */
      async refreshStaffChart() {
        const that = this;
        await that.$store.dispatch("_getStaffChart", {
          im: that.$constData.INTER_FACE.get_staff_portrait,
          fps: {
            userid: that.registUser.data.back_value.userid,
            executor_userid: that.$root.$mp.query.executor_userid
          },
          url: that.$constData.REQUEST_URI
        }).then(async res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_staff_portrait");
          } else {
            that.staff_chart_details = res.data.back_value;
          }
        });
        that.$unit.closeWaiting();
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
      wx.stopPullDownRefresh();
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  @photo-size: 100px;

  .staff-chart-container {
    .staff-chart-notice {
      display: flex;
      .default-box-sizing;
      color: @default-sub-color;
      font-size: @default-font-size-14;
      .default-padding-10-20();
    }
    .staff-chart-details {
      background-color: #fff;
      .default-box-sizing;
      .default-padding-10-20();
      display: flex;
      align-items: center;
      .staff-chart-details-photo {
        margin-right: 10px;
        width: @photo-size;
        height: @photo-size;
        font-size: 0;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .staff-chart-details-content {
        h1 {
          color: @default-content-color;
          font-size: @default-font-size-16;
        }
        p {
          color: @default-sub-color;
          font-size: @default-font-size-14;
        }
      }
    }
    .staff-chart-list {
      background-color: #fff;
      .default-box-sizing;
      .default-padding-10-20(@b:0px);
    }
  }
</style>
