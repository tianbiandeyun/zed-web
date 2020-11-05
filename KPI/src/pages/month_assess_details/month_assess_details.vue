<template>
  <section class="month-assess-details-container" v-if="isShow">

    <!--标题-->
    <CKtitleNotice :ord-message="month"></CKtitleNotice>
    <div class="month-assess-details" v-if="corpid && executor_userid">
      <ww-open-data :corpid="corpid" :openid="executor_userid" type="userName"></ww-open-data>
      月度评分：{{month_assess_details.aggregate_score}}
    </div>

    <!--图表-->
    <CKtitleNotice ord-message="考核权重占比图"></CKtitleNotice>
    <div v-if="list.length !== 0">
      <CKoccupyEcharts :occupy-list="list" :color="color"></CKoccupyEcharts>
    </div>
    <!--列表-->
    <div class="month-assess-details-list" v-if="list.length !== 0">
      <div class="month-assess-details-list-item" v-for="(item,index) in list" :key="index">

        <div class="month-assess-details-list-item-top">
          <div :style="{ backgroundColor: color[index] }"></div>
          <p>{{item.task_name}}</p>
        </div>

        <div class="month-assess-details-list-item-bottom">
          权重{{item.value}}%，评审天数{{item.working_day_count}}，得分{{item.score}}
        </div>

      </div>
    </div>

  </section>
</template>

<script>
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";
  import CKoccupyEcharts from "../../components/CK_occupy_echarts/CKoccupyEcharts";
  import { mapGetters } from "vuex";

  export default {
    name: "workOccupy",
    components: { CKtitleNotice, CKoccupyEcharts },
    data() {
      return {
        isShow: false,
        corpid: "",
        executor_userid: "",
        month: "",
        month_assess_details: "", // 详情
        list: [],
        occup_list: [
          { "value": 10 },
          { "value": 20 }
        ],
        color: [
          "#FF8247",
          "#71C671",
          "#61a0a8",
          "#d48265",
          "#91c7ae",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ]
      };
    },
    mounted() {
      const that = this;
      that.$unit.showWaiting();
      that.corpid = that.registUser.data.back_value.corpid;
      that.month = `${that.$root.$mp.query.month}月考评信息`;
      that.executor_userid = that.$root.$mp.query.executor_userid;
      that.refreshMonthAssessDetails();
    },
    methods: {
      /**
       * 获得任务列表
       * */
      async refreshMonthAssessDetails() {
        const that = this;
        await that.$store.dispatch("_getEveryMonthDetails", {
          im: that.$constData.INTER_FACE.get_task_month_list,
          fps: {
            userid: that.registUser.data.back_value.userid,
            executor_userid: that.$root.$mp.query.executor_userid,
            month: that.$root.$mp.query.month
          },
          url: that.$constData.REQUEST_URI
        }).then(async res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_task_month_list");
          } else {
            that.month_assess_details = res.data.back_value;
            const val = res.data.back_value.task_data_list;

            for (let i = 0; i < val.length; i++) {
              that.list.push({
                task_name: val[i].task_name,
                working_day_count: val[i].working_day_count,
                score: val[i].score,
                value: Math.round(val[i].task_weight * 100)
              });
            }

            console.log(that.list);

          }
        });

        that.isShow = true;
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

  .month-assess-details-container {
    .month-assess-details {
      display: flex;
      .default-padding-10-20();
      background-color: #fff;
      text-align: center;
      color: @default-content-color;
      font-size: @default-font-size-18;
    }
    .month-assess-details-list {
      .default-box-sizing;
      .default-padding-10-20(@t:0px,@b:0px);
      background-color: #fff;
      .month-assess-details-list-item {
        border-bottom: 1px solid @default-divider-color;
        .default-padding-10-20(@r:0px,@l:0px);
        color: @default-content-color;
        .month-assess-details-list-item-top {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
          div {
            width: 40px;
            height: 16px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            margin-right: 10px;
          }
          p {
            font-size: @default-font-size-16;
            color: @default-content-color;
          }
        }
        .month-assess-details-list-item-bottom {
          font-size: @default-font-size-14;
          color: @default-sub-color;
        }
      }
    }
  }
</style>
