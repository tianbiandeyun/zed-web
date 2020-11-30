<template>
  <section class="details-container">

    <div class="details-log">
      <img :src="details_info.main_graph" alt="">
    </div>

    <div class="details-box">
      <div class="details-time">
        <span>会议时间：</span>
        <span>{{details_info.meeting_time}}</span>
      </div>
      <div class="details-post" @click="getLocation">
        <span>会议地点：</span>
        <span>{{details_info.congress_venue}}</span>
        <span> > </span>
      </div>
      <div class="details-origin" @click="organize">
        <span>组织信息：</span>
        <span>{{details_info.organizers_title}}</span>
        <span> > </span>
      </div>
    </div>

    <div class="details-content">
      <h1>活动介绍：</h1>
      <p>{{details_info.activity_brief}}</p>
    </div>

    <div class="details-content-more">

      <div class="more-box" v-show="is_more">
        <h1>活动流程：</h1>
        <p v-for="(item,index) in details_info.activity_flow" :key="index">
          {{item}}
        </p>
      </div>

      <p class="more" @click="more"> -- {{more_content}} -- </p>

    </div>

    <div class="details-tip">与会嘉宾/签到簿：</div>

    <div v-for="(item,index) in user_list" :key="index" class="details-sign">
      <signItem :item="item"></signItem>
    </div>

    <div class="details-bottom">
      <div>
        <button open-type="getUserInfo" @getuserinfo="sign">{{is_button ? "报名参会" : "修改报名信息"}}</button>
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
  import signItem from "../../components/sign";
  import login from "../../utils/login";

  export default {
    name: "details",
    components: { signItem },
    mixins: [login],
    data() {
      return {
        more_content: "更多详情",
        is_more: false,
        openid_info: "",
        details_info: "",
        user_list: [],
        is_button: true
      };
    },
    async onShow() {

      this.$Utils.showWaiting("正在加载");

      this.openid_info = await this.getOpenid();

      await this.refreshDetails();

      this.$Utils.closeWaiting();

    },
    methods: {
      more() {
        this.is_more = !this.is_more;
        this.is_more ? this.more_content = "收起" : this.more_content = "更多详情";
      },
      organize() {
        wx.navigateTo({
          url: `/pages/organize/main?organize_id=${this.details_info.organizers_id}`
        });
      },
      sign(e) {

        if (e.mp.detail.errMsg !== "getUserInfo:fail auth deny") {

          // 保存用户头像
          this.$store.dispatch("fetch", {
            im: this.$Config.INTER_FACE.set_user_photo,
            fps: {
              open_id: this.openid_info.back_value.open_id,
              wx_photo: JSON.parse(e.mp.detail.rawData).avatarUrl
            },
            url: this.$Config.REQUEST_URI
          }).then(res => {
            if (res.result === "failure") {
              this.$Utils.showErrorInfo(res, "set_user_photo");
            } else {
              if (res.back_value) {
                wx.navigateTo({
                  url: `/pages/sign_up/main?activity_id=${this.details_info.id}`
                });
              }
            }
          });
        } else {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "请授权头像信息，否则无法报名",
            success(res) {
            }
          });
        }
      },
      /**
       * 获取经纬度并且打开地图位置
       * */
      getLocation() {

        const that = this;

        this.$Utils.showWaiting("请稍后");

        wx.openLocation({
          latitude: 39.994041,
          longitude: 116.333473,
          name: "太库科技（北京市海淀区五道口东升大厦A座901）",
          scale: 18,
          success() {
            that.$Utils.closeWaiting();
          },
          fail() {
            that.$Utils.closeWaiting();
          }
        });

      },

      async refreshDetails() {

        // 获取活动详情信息
        await this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_salon_activity_list,
          fps: { open_id: this.openid_info.back_value.open_id },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_salon_activity_list");
          } else {
            this.details_info = res.back_value[0];
          }
        });

        // 获取是否报名
        await this.$store.dispatch("isRegistration", {
          im: this.$Config.INTER_FACE.has_registration,
          fps: {
            open_id: this.openid_info.back_value.open_id,
            activity_id: this.details_info.id
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "has_registration");
          } else {
            this.is_button = res.back_value;
          }
        });

        // 获取人员列表
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_activity_member_list,
          fps: {
            open_id: this.openid_info.back_value.open_id,
            activity_id: this.details_info.id
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_activity_member_list");
          } else {
            this.user_list = [];
            this.user_list = [...this.user_list, ...res.back_value];
          }
        });

      }
    },
    async onPullDownRefresh() {
      this.$Utils.showWaiting();
      await this.refreshDetails();
      this.$Utils.closeWaiting();
      wx.stopPullDownRefresh();
    },
    onShareAppMessage: function(res) {
      if (res.from === "button") {
        console.log("来自页面内转发按钮");
      }
      else {
        console.log("来自右上角转发菜单");
      }
      return {
        title: "风险机遇面对面",
        path: "/pages/details/main",
        imageUrl: ""
      };
    }

  };
</script>

<style lang="less" scoped>

  .details-container {
    padding-bottom: 80px;

    .details-log {
      font-size: 0;
      height: 180px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .details-box {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 10px;

      > div {
        display: grid;
        grid-template-columns: 2.4fr 6fr 1fr;
        padding: 6px 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        > span {
          padding: 4px 0;
          font-size: 16px;

          &:nth-of-type(1) {
            color: #17233d;
            font-weight: bold;
          }

          &:nth-of-type(2) {
            color: #19be6b;
          }

          &:nth-of-type(3) {
            text-align: center;
            color: #17233d;
          }
        }

        &:nth-of-type(1) {
          grid-template-columns: 1.4fr 4fr;

          > span {

            &:nth-of-type(2) {
              color: #515a6e;
            }
          }
        }

      }

    }

    .details-content {
      background-color: #fff;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px;
      margin-bottom: 10px;

      h1 {
        color: #17233d;
        font-size: 16px;
        font-weight: bold;
      }

      p {
        text-indent: 30px;
        font-size: 14px;
        color: #515a6e;
        line-height: 1.8;
      }
    }

    .details-content-more {
      margin-bottom: 10px;

      .more {
        background-color: #fff;
        text-align: center;
        font-size: 14px;
        color: #19be6b;
        padding: 10px 0;
      }

      .more-box {
        background-color: #fff;
        margin-bottom: 2px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;

        h1 {
          color: #17233d;
          font-size: 16px;
          font-weight: bold;
        }

        p {
          font-size: 14px;
          line-height: 1.8;
          color: #515a6e;
        }
      }
    }

    .details-tip {
      background-color: #fff;
      color: #17233d;
      font-size: 16px;
      font-weight: bold;
      padding: 10px;
    }

    .details-sign {
      background-color: #fff;
      padding: 10px;
    }

    .details-bottom {
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

      > div {

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

          > button {
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
