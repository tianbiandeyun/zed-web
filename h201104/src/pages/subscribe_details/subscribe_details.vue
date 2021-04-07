<template>
  <section class="user_details-container">

    <div class="user_details_tip">签到成功</div>

    <div>
      <div class="user_details_name">{{user_details_info.name}}</div>

      <div style="width: 80px;height: 6px;background-color: #3ba888;margin: 0 auto;"></div>
    </div>

    <div class="user_details_time">
      <span>{{day}}</span>
      <span>{{week}}</span>
    </div>

    <div class="user_details_start" @click="goIndex">
      <img :src="user_details_info.map_image" alt="">
    </div>

    <div class="user_details-show-box">
      <div class="user_details_show_1">{{user_details_info.title}}</div>

      <div class="user_details_show_2"></div>

      <div class="user_details_show_3">
        <p v-for="(item,index) in user_details_info.describe" :key="index">
          {{item}}
        </p>
      </div>
    </div>

    <div class="user_details_from">
      <img :src="user_details_info.icon" alt="">
    </div>

  </section>
</template>

<script>
  import {
    mapGetters
  } from "vuex";

  export default {
    name: "user_details",
    data() {
      return {
        user_details_info: {},
        week: "week",
        day: "day"
      };
    },
    mounted() {

      let activity_id = this.$root.$mp.query.activity_id;

      if (activity_id) {

        this.$Utils.showWaiting();

        // 获取签到成功个人信息
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_member_checkin_info,
          fps: {
            open_id: this.openid.back_value.open_id,
            activity_id: activity_id
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {

          this.$Utils.closeWaiting();

          if (res.result === "failure") {
            this.$Utils.showErrorInfo(res, "get_member_checkin_info");
          } else {
            this.user_details_info = res.back_value;
            let dateObject = new Date(res.back_value.check_in_time.split(" ")[0]);
            let weekDay = dateObject.getDay();
            let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            this.week = weeks[weekDay];
            this.day = res.back_value.check_in_time.split(" ")[1];
          }
        });
      } else {
        this.$Utils.closeWaiting();
        wx.showModal({
          title: "错误",
          showCancel: false,
          content: "没有活动ID",
          success(res) {}
        });
      }
    },
    methods: {
      goIndex() {
        wx.reLaunch({
          url: `/pages/activity_details/main?activity_id=${this.$root.$mp.query.activity_id}`
        });
      }
    },
    computed: {
      ...mapGetters([
        "openid"
      ])
    }
  };

</script>

<style lang="less">
  page {
    height: 100%;
  }

  .user_details-container {
    height: 100%;
    border: 20px solid #3ba888;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
    display: grid;
    align-items: center;

    >div {
      text-align: center;
    }

    .user_details_tip {
      font-size: 16px;
      color: #808695;
    }

    .user_details_name {
      font-size: 44px;
      color: #3ba888;
    }

    .user_details_time {
      font-size: 16px;
      color: #808695;

      span {
        &:nth-of-type(1) {
          margin-right: 10px;
        }
      }
    }

    .user_details_start {
      height: 200px;
      font-size: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user_details-show-box {

      .user_details_show_1 {
        font-size: 20px;
        color: #808695;
      }

      .user_details_show_2 {
        height: 10px;
        background-image: url("../../../static/images/xiahuaxian.png");
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 8px;
      }

      .user_details_show_3 {
        font-size: 14px;
        line-height: 1.6;
        color: #808695;
      }

    }

    .user_details_from {
      height: 60px;
      font-size: 0;

      img {
        width: 100%;
        height: 100%;
      }
    }

  }

</style>
