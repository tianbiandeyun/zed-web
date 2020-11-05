<template>
  <section class="analysis-container">
    <CKtitleNotice ord-message="员工统计列表"></CKtitleNotice>
    <div class="no-data" v-if="analysi_user_list.length === 0">暂无数据</div>
    <div class="analysis-item" v-for="(item,index) in analysi_user_list" :key="index" @click="goStaffChart(item)">
      <CKanalysisList :data="item" :corpid="corpid"></CKanalysisList>
    </div>
  </section>
</template>

<script>
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";
  import CKanalysisList from "../../components/CK_analysis_list/CKanalysisList";
  import { mapGetters } from "vuex";

  export default {
    name: "analysis-container",
    components: { CKtitleNotice, CKanalysisList },
    data() {
      return {
        corpid: "",
        analysi_user_list: ""
      };
    },
    onShow() {
      const that = this;
      that.$unit.showWaiting();
      that.corpid = that.registUser.data.back_value.corpid;
      that.refreshAanlysis();
    },
    methods: {
      goStaffChart(res) {
        const that = this;
        wx.navigateTo({
          url: `/pages/staff_chart/main?executor_userid=${res.userid}`
        });
      },
      /**
       * 获取统计管理人员统计
       * */
      async refreshAanlysis() {
        const that = this;
        await that.$store.dispatch("_getAnalysisList", {
          im: that.$constData.INTER_FACE.get_personnel_list,
          fps: {
            userid: that.registUser.data.back_value.userid
          },
          url: that.$constData.REQUEST_URI
        }).then(async res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_personnel_list");
          } else {
            that.analysi_user_list = res.data.back_value;
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

  .analysis-container {
    padding-bottom: @default-padding-bottom-80;
    .no-data {
      font-size: @default-font-size-18;
      text-align: center;
      line-height: 4;
      color: @default-sub-color;
    }
    .analysis-item {
      background-color: #fff;
      .default-box-sizing;
      .default-padding-10-20(@b:0px);
    }
  }

</style>
