<template>
  <section class="review-score-container">

    <CKdetailsHeader
      :data="task_details"
      :corpid="registUser.data.back_value.corpid"
      :login-userid="registUser.data.back_value.userid">
    </CKdetailsHeader>

    <!--考核描述-->
    <CKdetailsContent :data="task_details"></CKdetailsContent>

    <!--评审阶段-->
    <CKtitleNotice ord-message="评审阶段"></CKtitleNotice>
    <section class="review-score-stage">{{review_stage.start}} ~ {{review_stage.end}}，共工作{{review_stage.day}}天</section>

    <!--等待打分的执行人-->
    <CKtitleNotice ord-message="等待打分的执行人"></CKtitleNotice>
    <section class="review-score-user">
      <div class="review-score-user-item" v-for="(item,index) in review_score_user" :key="index"
           @click="operatOpenSetScore(item,index)">
        <div class="photo"><img :src="item.avatar" alt=""></div>
        <div class="name" v-if="corpid && item.executor_userid">
          <ww-open-data
            :corpid="corpid"
            :openid="item.executor_userid"
            type="userName"></ww-open-data>
        </div>

        <div v-if="item.status === 8" class="score">{{item.score*100}}分，[点击修改]</div>
        <div v-if="item.status === 7" class="score">[无法打分]</div>
        <div v-if="item.status === 6" class="score">[点击打分]</div>

        <!--6 黄色 点击评分 7 蓝色 未到期 8 绿色 已完成-->
        <icon v-if="item.status === 6" type="info" color="#ffc300" size="26"></icon>
        <icon v-if="item.status === 7" type="waiting" size="26"></icon>
        <icon v-if="item.status === 8" type="success" size="26"></icon>
      </div>
    </section>

    <!--打分框-->
    <v-popup :show="set_score_show" round>
      <section class="review_score_set_score">
        <div class="review_score_set_score_tile">
          考察日期{{review_stage.start}} 到 {{review_stage.end}}
          <p>共计{{review_stage.day}}天</p>
        </div>
        <div class="review_score_set_score_slider">
          <p>完成度{{value}}%</p>
          <div>
            <slider @change="operatGetSlider" step="5" :value="value"></slider>
          </div>
          <p>拖动滑条调整完成度</p>
        </div>
        <div class="review_score_set_score_content">
          <textarea
            placeholder="备注信息"
            fixed
            adjust-position
            v-model="content"></textarea>
        </div>
        <div class="review_score_set_score_button">
          <p @click="() => {set_score_show = false;content = '';value = 100}">取消</p>
          <p @click="operatSetScore">提交分数</p>
        </div>
      </section>
    </v-popup>

  </section>
</template>

<script>
  import CKdetailsHeader from "../../components/CK_details/CKdetailsHeader";
  import CKdetailsContent from "../../components/CK_details/CKdetailsContent";
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";

  import { mapGetters } from "vuex";

  export default {
    name: "review-score-container",
    components: {
      CKtitleNotice,
      CKdetailsHeader,
      CKdetailsContent
    },
    data() {
      return {
        corpid: "",
        value: 100, // 滑动值
        review_stage: "", // 审查阶段显示
        task_details: "", // 任务详情
        review_score_user: "", // 被审查人列表
        index_score: "", // 等待打分的执行人下标
        set_score_show: false, // 打分窗口
        content: "" // 评审内容
      };
    },
    async mounted() {
      const that = this;
      that.corpid = that.registUser.data.back_value.corpid;
      await that.refreshReviewScore();
      const review_date = that.$root.$mp.query.review_date; // 审查日时间
      const task_end_date = that.task_details.end_date; // 结束时间
      const task_work_day_count = that.$root.$mp.query.work_day_count; // 当前阶段的工作天数
      that.review_stage = await that._init_stage(task_end_date, review_date, task_work_day_count);
    },
    methods: {
      /**
       * 提交审查内容
       * */
      operatSetScore() {
        const that = this;

        if (that.content === "" || that.content === undefined || that.content === null) {
          wx.showToast({
            title: "请填写审查内容",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        that.$store.dispatch("_setReviewTask", {
          im: that.$constData.INTER_FACE.set_svaluation_and_score,
          fps: {
            userid: that.registUser.data.back_value.userid,
            task_id: that.$root.$mp.query.task_id,
            review_date: that.review_score_user[that.index_score].review_date,
            excutor_userid: that.review_score_user[that.index_score].executor_userid,
            score: that.value / 100,
            comment: that.content
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "set_svaluation_and_score");
          } else {
            that.set_score_show = false;
            if (res.data.back_value) {
              that.content = "";
              that.value = 100;
              that.refreshReviewScore();
            }
          }
        });
      },
      /**
       * 审核任务
       * */
      operatOpenSetScore(res, index) {
        const that = this;

        // 6 黄色 点击评分 7 蓝色 未到期 8 绿色 已完成
        if (res.status === 7) {
          wx.showToast({
            title: "无法打分",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        // 如果评价过则显示评价内容
        that.content = that.review_score_user[index].comment;
        that.value = that.review_score_user[index].score * 100 === 0 ? 100 : that.review_score_user[index].score * 100;

        // 数组下标
        that.index_score = index;
        // 显示弹框
        that.set_score_show = true;
      },
      /**
       * 获取滑动调节分数
       * */
      operatGetSlider(res) {
        const that = this;
        that.value = res.mp.detail.value;
      },
      /**
       * 获得任务列表
       * */
      async refreshReviewScore() {
        const that = this;
        that.$unit.showWaiting();

        await that.$store.dispatch("_getTaskDetalis", {
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
            that.task_details = res.data.back_value;
          }
        });

        // 获取被审查人列表
        await that.$store.dispatch("_getReviewUserList", {
          im: that.$constData.INTER_FACE.get_waiting_for_review_list,
          fps: {
            userid: that.registUser.data.back_value.userid,
            task_id: that.$root.$mp.query.task_id,
            review_date: that.$root.$mp.query.review_date
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_waiting_for_review_list");
          } else {
            that.review_score_user = res.data.back_value;
          }
        });

        that.$unit.closeWaiting();
      },
      /**
       * 格式每个阶段日期显示
       * */
      _init_stage(end, review_date, task_work_day_count) {
        const that = this;

        const ss_by_task_end_date = Date.parse(end.replace(/\-/g, "/")); // 获取任务结束时间毫秒
        const ss_by_review_date = Date.parse(review_date.replace(/\-/g, "/")); // 获取审查时间毫秒

        // 审查日当天的日期对象
        const { year, month, day } = that.$unit.getYearMonthDay(new Date(review_date));
        const review_date_hm = that.$unit.getDate(year, month, day);

        // 审查日往前推x天，就是这个任务第几个阶段开始的日期
        const task_start_date = parseInt(task_work_day_count) - 1;

        // 审查日往前推x天的毫秒，总数
        let hm = task_start_date * 60 * 60 * 1000 * 24;

        // 如果审查时间大于任务结束时间
        if (ss_by_review_date > ss_by_task_end_date) {
          hm += (ss_by_review_date - ss_by_task_end_date);
        }

        let y = new Date(review_date_hm - hm).getFullYear();
        let m = parseInt(new Date(review_date_hm - hm).getMonth() + 1) < 10 ? "0" + parseInt(new Date(review_date_hm - hm).getMonth() + 1) : parseInt(new Date(review_date_hm - hm).getMonth() + 1);
        let d = new Date(review_date_hm - hm).getDate() < 10 ? "0" + new Date(review_date_hm - hm).getDate() : new Date(review_date_hm - hm).getDate();
        return {
          start: `${y}-${m}-${d}`,
          end: `${review_date}`,
          day: `${task_work_day_count}`
        };
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

  .review-score-container {
    padding-bottom: @default-padding-bottom-80;

    section {
      background-color: #fff;
    }

    .review-score-stage {
      .default-box-sizing;
      .default-padding-10-20();
      text-align: center;
      color: @default-content-color;
      font-size: @default-font-size-16;
    }

    .review-score-user {
      .default-box-sizing;
      .default-padding-10-20(@t:0px,@b:0px);

      .review-score-user-item {
        font-size: @default-font-size-14;
        color: @default-content-color;
        line-height: 3;
        .default-flex();
        border-bottom: 1px solid @default-divider-color;

        .photo {
          width: 40px;
          height: 40px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .score {
          color: @default-sub-color;
        }
      }
    }

    .review_score_set_score {
      .default-box-sizing;
      .default-padding-10-20(@b:0px);
      font-size: @default-font-size-16;
      color: @default-content-color;

      .review_score_set_score_tile {
        text-align: center;
        margin-bottom: 10px;
      }

      .review_score_set_score_slider {
        text-align: center;
        margin-bottom: 10px;

        p {
          font-size: @default-font-size-14;
          color: @default-sub-color;
        }
      }
      .review_score_set_score_content {
        border: 1px solid @default-divider-color;

        textarea {
          .default-box-sizing;
          padding: 5px;
        }
      }
      .review_score_set_score_button {
        text-align: center;
        display: flex;
        p {
          flex: 1;
          line-height: 3;
          &:nth-of-type(2) {
            color: @default-button-color;
          }
        }
      }
    }

  }

</style>
