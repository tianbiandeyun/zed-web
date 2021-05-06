<template>
  <section class="activity-end-details-container">

    <div class="activity-end-details-log">
      <img :src="details_info.main_graph" alt="">
    </div>

    <!--图文-->

    <div class="activity-end-details-content">

      <h1>{{title}}</h1>

      <div v-for="(item,index) in list" :key="index">
        <div class="img" v-if="item.img">
          <img mode="widthFix" :src="item.img" alt="">
        </div>
        <p v-else>{{item.content}}</p>
      </div>

    </div>

    <div class="activity-end-details-bottom">
      <div>
        <button @click="goUserList">本次活动人员名单</button>
      </div>
      <div>
        <button open-type="share">
          <img src="../../../static/images/share.png" alt="">
        </button>
      </div>
    </div>

  </section>
</template>

<script>
  export default {
    name: "activity-end-details",
    data() {
      return {
        title: "",
        details_info: {},
        list: []
      };
    },
    mounted() {

      this.$Utils.showWaiting();

      // 获取活动详情信息
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_salon_activity_info,
        fps: {
          activity_id: this.$root.$mp.query.activity_id
        },
        url: this.$Config.REQUEST_URI
      }).then(res => {
        if (res.result === "failure") {
          this.$Utils.closeWaiting();
          this.$Utils.showErrorInfo(res, "get_salon_activity_info");
        } else {
          this.details_info = res.back_value;
          let result = res.back_value.inner_data;
          this.title = result.title;
          let o = [];
          for (let i = 0; i < result.centont.length; i++) {

            if (result.centont[i].split(".").includes("png")) {
              o.push({
                img: result.centont[i]
              });
            } else if (result.centont[i].split(".").includes("jpg")) {
              o.push({
                img: result.centont[i]
              });
            } else if (result.centont[i].split(".").includes("jpeg")) {
              o.push({
                img: result.centont[i]
              });
            } else {
              o.push({
                content: result.centont[i]
              });
            }
          }
          this.list = o;
          this.$Utils.closeWaiting();
        }
      });

    },
    methods: {
      goUserList() {
        wx.navigateTo({
          url: `/pages/activity_user_list/main?activity_id=${this.$root.$mp.query.activity_id}&m_key=${this.$root.$mp.query.m_key}`
        });
      }
    },
    onUnload() {
      this.$Utils.restData(this);
    },
    onShareAppMessage: function (res) {
      if (res.from === "button") {
        console.log("来自页面内转发按钮");
      } else {
        console.log("来自右上角转发菜单");
      }
      return {
        title: this.title,
        path: `/pages/activity_end_details/main?activity_id=${this.$root.$mp.query.activity_id}`,
        imageUrl: ""
      };
    }
  };

</script>

<style lang="less" scoped>
  .activity-end-details-container {
    padding-bottom: 80px;
    background-color: #fff;

    .activity-end-details-log {
      font-size: 0;
      height: 180px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .activity-end-details-content {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px;

      h1 {
        color: #17233d;
        font-size: 16px;
        font-weight: bold;
        line-height: 2;
        text-align: center;
      }

      .img {
        font-size: 0;
        text-align: center;
        margin: 10px 0;
      }

      p {
        font-size: 14px;
        line-height: 3;
        color: #515a6e;
      }
    }

    .activity-end-details-bottom {
      background-color: #fff;
      padding: 10px 0 20px 0;
      -moz-box-shadow: 0px -3px 5px #dcdee2;
      -webkit-box-shadow: 0px -3px 5px #dcdee2;
      box-shadow: 0px -3px 5px #dcdee2;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      position: fixed;
      width: 100%;
      left: 0;
      bottom: 0;
      display: grid;
      grid-template-columns: 10fr 2fr;
      align-items: center;
      justify-items: flex-end;

      >div {

        &:nth-of-type(1) {
          padding-right: 34px;

          button {
            background-color: #19be6b;
            color: #fff;
            width: 200px;
          }
        }

        &:nth-of-type(2) {
          button::after {
            border: none;
          }

          >button {
            background-color: transparent;
            border: none;
            padding-left: 0;
            line-height: inherit;
            border-radius: 0;
            padding-right: 20px;

            img {
              width: 30px;
              height: 26px;
            }
          }
        }
      }
    }

  }

</style>
