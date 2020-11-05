<template>
  <section class="assess-container" v-if="tabShow">

    <v-tabs
      :active="active"
      color="green"
      animated="true"
      sticky="true"
      swipeable="true"
      @change="operatChangTab">
      <v-tab title="全部">
        <div class="no-data" v-if="all.length === 0">暂无数据</div>
        <div class="assess-tab-item" v-for="(item,index) in all" :key="index" @click="goTaskDetail(item)">
          <CKtaskList :data="item"></CKtaskList>
        </div>
      </v-tab>
      <v-tab title="待生效">
        <div class="no-data" v-if="wait_effective.length === 0">暂无数据</div>
        <div class="assess-tab-item" v-for="(item,index) in wait_effective" :key="index" @click="goTaskDetail(item)">
          <CKtaskList :data="item"></CKtaskList>
        </div>
      </v-tab>
      <v-tab title="已生效">
        <div class="no-data" v-if="effective.length === 0">暂无数据</div>
        <div class="assess-tab-item" v-for="(item,index) in effective" :key="index" @click="goTaskDetail(item)">
          <CKtaskList :data="item"></CKtaskList>
        </div>
      </v-tab>
      <v-tab title="已结束">
        <div class="no-data" v-if="end.length === 0">暂无数据</div>
        <div class="assess-tab-item" v-for="(item,index) in end" :key="index" @click="goTaskDetail(item)">
          <CKtaskList :data="item"></CKtaskList>
        </div>
      </v-tab>
    </v-tabs>

    <!--按钮-->
    <CKbutton name="创建考核目标" @operat="operatCreatedTask"></CKbutton>

  </section>
</template>

<script>
  import CKtaskList from "../../components/CK_task_list/CKtaskList";
  import CKbutton from "../../components/CK_button/CKbutton";
  import { mapGetters } from "vuex";

  export default {
    name: "assess-container",
    components: { CKbutton, CKtaskList },
    data() {
      return {
        tabShow: false,
        active: 0,
        effective: [],
        wait_effective: [],
        end: [],
        all: []
      };
    },
    onShow() {
      const that = this;
      that.$unit.showWaiting();
      that.refreshAssess();
    },
    methods: {
      /**
       * 选项卡
       * */
      operatChangTab(e) {
        const that = this;
        that.active = e.mp.detail.index;
      },
      /**
       * 查看考核详情
       * */
      goTaskDetail(item) {
        const that = this;
        let task_id = item.id;
        wx.navigateTo({
          url: `/pages/task_details/main?task_id=${task_id}&userid=${that.registUser.data.back_value.userid}&corpid=${that.registUser.data.back_value.corpid}`
        });
      },
      /**
       * 创建考核任务
       * */
      operatCreatedTask() {
        wx.navigateTo({
          url: `/pages/created_task/main`
        });
      },
      /**
       * 获得任务列表
       * */
      async refreshAssess() {
        const that = this;
        await that.$store.dispatch("_getTaskList", {
          im: that.$constData.INTER_FACE.get_task_list,
          fps: {
            userid: that.registUser.data.back_value.userid,
            content_type: 1,
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
       * 1 / 3 -> 反馈 feedback
       * 2 -> 待生效 wait_effective
       * 4 -> 已生效 effective
       * 5 -> 结束 end
       * */
      _initData(res) {
        const that = this;
        that.effective = [];
        that.wait_effective = [];
        that.end = [];
        that.all = [];
        res.forEach((item, index, arr) => {
          const task_status = item.attachinfo_of_task.task_icon_status;

          // 全部
          that.all.push(item);

          if (1 === task_status || 3 === task_status || 2 === task_status) {
            that.wait_effective.push(item);
          }
          if (4 === task_status) {
            that.effective.push(item);
          }
          if (5 === task_status) {
            that.end.push(item);
          }
        });
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
      that.refreshAssess();
      wx.stopPullDownRefresh();
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .assess-container {
    padding-bottom: @default-padding-bottom-80;
    .assess-tab-item {
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
