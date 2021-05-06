<template>
  <section class="all-notice-container">

    <div class="all-notice-title">
      <p>系统消息</p>
      <p>共{{all_notice_list.length}}条</p>
    </div>

    <div class="all-notice-list" v-for="(item,index) in all_notice_list" :key="index">

      <h1 class="all-notice-list-title">
        <CKnoticeList :item="item.title"></CKnoticeList>
      </h1>

      <p class="all-notice-list-content">
        <CKnoticeList :item="item.content"></CKnoticeList>
      </p>

      <p class="all-notice-list-date">时间 {{item.date}}</p>

    </div>

  </section>
</template>

<script>
  import CKnoticeList from "../../components/CK_notice_list/CKnoticeList";
  import { mapGetters } from "vuex";

  export default {
    name: "allNotice",
    components: { CKnoticeList },
    data() {
      return {
        all_notice_list: ""
      };
    },
    async onShow() {
      const that = this;
      that.refreshRequestAllnotice();
    },
    methods: {
      async refreshRequestAllnotice() {
        const that = this;
        that.$unit.showWaiting();
        // 获取消息
        await that.$store.dispatch("_getNotice", {
          im: that.$constData.INTER_FACE.get_notice_list,
          fps: {
            userid: that.registUser.data.back_value.userid,
            mag_type: "",
            start: 0,
            len: 200
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_notice_list");
          } else {
            that.all_notice_list = res.data.back_value;
          }
        });
        that.$unit.closeWaiting();
      }
    },
    computed: {
      ...mapGetters([
        "registUser"
      ])
    },
    async onPullDownRefresh() {
      const that = this;
      await that.refreshRequestAllnotice();
      wx.stopPullDownRefresh();
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .all-notice-container {
    padding-top: 20px;

    .all-notice-title {
      background-color: #fff;
      .default-padding-10-20(@t:6px,@b:6px);
      .default-flex();
      color: @default-content-color;
      font-size: @default-font-size-16;
      margin-bottom: 20px;
      p {
        &:nth-of-type(2) {
          color: @default-sub-color;
        }
      }
    }

    .all-notice-list {
      .default-box-sizing;
      .default-padding-10-20();
      background-color: #fff;
      margin-bottom: 20px;
      .all-notice-list-title {
        color: @default-content-color;
        font-size: @default-font-size-16;
        margin-bottom: 10px;
      }

      .all-notice-list-content {
        color: @default-sub-color;
        font-size: @default-font-size-14;
        margin-bottom: 10px;
      }

      .all-notice-list-date {
        color: @default-sub-color;
        font-size: @default-font-size-12;
      }
    }

  }


</style>
