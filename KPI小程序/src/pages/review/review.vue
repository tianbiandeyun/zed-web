<template>
  <section class="review-container" v-if="tabShow">
    <v-tabs
      :active="active"
      color="green"
      animated="true"
      sticky="true"
      swipeable="true"
      @change="operatChangTab">
      <v-tab title="全部">
        <div class="no-data" v-if="all.length === 0">暂无数据</div>
        <div class="review-tab-item" v-for="(item,index) in all" :key="index" @click="goTaskDetail(item.id)">
          <CKtaskList :data="item"></CKtaskList>
        </div>
      </v-tab>
      <v-tab title="待审查">
        <div class="no-data" v-if="wait_review.length === 0">暂无数据</div>
        <div class="review-tab-item" v-for="(item,index) in wait_review" :key="index" @click="goTaskDetail(item.id)">
          <CKtaskList :data="item"></CKtaskList>
        </div>
      </v-tab>
      <v-tab title="待确认">
        <div class="no-data" v-if="wait_end.length === 0">暂无数据</div>
        <div class="review-tab-item" v-for="(item,index) in wait_end" :key="index" @click="goTaskDetail(item.id)">
          <CKtaskList :data="item"></CKtaskList>
        </div>
      </v-tab>
      <v-tab title="已完成">
        <div class="no-data" v-if="finish.length === 0">暂无数据</div>
        <div class="review-tab-item" v-for="(item,index) in finish" :key="index" @click="goTaskDetail(item.id)">
          <CKtaskList :data="item"></CKtaskList>
        </div>
      </v-tab>
    </v-tabs>
  </section>
</template>

<script>
  import CKtaskList from "../../components/CK_task_list/CKtaskList";
  import { mapGetters } from "vuex";

  export default {
    name: "review-container",
    components: { CKtaskList },
    data() {
      return {
        tabShow: false,
        active: 0,
        all: [],
        finish: [],
        wait_review: [],
        wait_end: []
      };
    },
    onShow() {
      const that = this;
      that.$unit.showWaiting();
      that.refreshReview();
    },
    methods: {
      /**
       * 创建考核任务
       * */
      goTaskDetail(task_id) {
        const that = this;
        wx.navigateTo({
          url: `/pages/review_detail/main?task_id=${task_id}&userid=${that.registUser.data.back_value.userid}&corpid=${that.registUser.data.back_value.corpid}`
        });
      },
      /**
       * 获得任务列表
       * */
      async refreshReview() {
        const that = this;
        await that.$store.dispatch("_getTaskList", {
          im: that.$constData.INTER_FACE.get_task_list,
          fps: {
            userid: that.registUser.data.back_value.userid,
            content_type: 2,
            list_type: ""
          },
          url: that.$constData.REQUEST_URI
        }).then(async res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_task_list");
          } else {
            await that._initData(res.data.back_value);
            that.tabShow = true;
          }
        });
        that.$unit.closeWaiting();
      },
      /**
       * 格式化数据
       * 黄 - 1
       * 蓝 - 2
       * 绿 - 4
       *
       * 1 = 什么都没点击过 ；2 = 点击过确认；3 = 点击过拒绝
       * */
      _initData(res) {
        const that = this;

        that.all = []; // 全部
        that.finish = []; // 完成
        that.wait_review = []; // 待审查
        that.wait_end = []; // 待确认

        for (let i = 0; i < res.length; i++) {

          const task_status = res[i].attachinfo_of_task.task_icon_status; // 任务状态
          const button_status = res[i].attachinfo_of_task.task_user_status; // 按钮状态

          // 全部
          that.all.push(res[i]);

          if (button_status === 2) {

            // 点击过 确认 && 黄色 -> 待审核
            // 点击过 确认 && 蓝色 -> 待审核
            if (task_status === 1 || task_status === 2) {
              that.wait_review.push(res[i]);
            }

            // 点击过 确认 && 绿色 -> 已完成
            if (task_status === 4) {
              that.finish.push(res[i]);
            }

          } else {
            // 未操作过 || 点击过拒绝 -> 待确认
            that.wait_end.push(res[i]);
          }

        }

      }
    },
    onUnload() {
      const that = this;
      console.log(that.active);
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
      that.refreshReview();
      wx.stopPullDownRefresh();
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .review-container {
    padding-bottom: 20px;
    .review-tab-item {
      background-color: #fff;
      .default-box-sizing;
      .default-padding-10-20(@b:0px);
    }
    .no-data {
      font-size: @default-font-size-18;
      text-align: center;
      line-height: 4;
      color: @default-sub-color;
    }
  }

</style>
