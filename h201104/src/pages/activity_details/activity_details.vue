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
      <signItem :item="item" @getUserId="getUserId"></signItem>
    </div>

    <div class="details-bottom">
      <div>
        <button @click="sign">{{button_msg}}</button>
      </div>
      <div>
        <button open-type="share">
          <img src="../../../static/images/share.png" alt="">
        </button>
      </div>
    </div>

    <getUserInfo :isScope="is_scope" @setUserInfo="setUserInfo"></getUserInfo>

  </section>
</template>

<script>
  import signItem from "../../components/sign";
  import getUserInfo from "../../components/getUserInfo";
  import login from "../../utils/login";
  import { mapGetters } from "vuex";

  export default {
    name: "details",
    components: { signItem, getUserInfo },
    mixins: [login],
    data() {
      return {
        more_content: "更多详情",
        is_more: false,
        details_info: "",
        user_list: [],
        button_msg: "",
        is_scope: false,
        u_key: ""
      };
    },
    async onShow() {

      this.$Utils.showWaiting("正在加载");

      // 因为这个页面需要分享出去，所以要判断是否有 openid 如果没有则获取
      if (!this.openid.back_value) {
        await this.getOpenid();
      }

      await this.refreshDetails();

      this.$Utils.closeWaiting();

    },
    methods: {
      getUserId(res) {
        wx.navigateTo({
          url: `/pages/user_center/main?u_key=${res}`
        });
      },
      more() {
        this.is_more = !this.is_more;
        this.is_more ? this.more_content = "收起" : this.more_content = "更多详情";
      },
      /**
       * 前往组织详情
       * */
      organize() {
        wx.navigateTo({
          url: `/pages/organize/main?organize_id=${this.details_info.organizers_id}`
        });
      },
      /**
       * 报名参与
       * */
      sign() {

        // 判断是否授权获取用户资料
        wx.getSetting({
          success: res => {
            if (res.authSetting["scope.userInfo"]) {
              // 授权
              wx.navigateTo({
                url: `/pages/participate/main?activity_id=${this.$root.$mp.query.activity_id}`
              });
            } else {
              // 未授权
              this.is_scope = true;
            }
          }
        });

      },
      /**
       * 授权用户信息并保存
       * */
      setUserInfo(res) {
        this.$Utils.showWaiting();

        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.set_update_user_info,
          fps: {
            open_id: this.openid.back_value.open_id,
            encrypted_data: res.encryptedData,
            iv: res.iv
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "set_update_user_info");
          } else {
            this.$Utils.closeWaiting();
            this.is_scope = false;
            wx.navigateTo({
              url: `/pages/participate/main?activity_id=${this.$root.$mp.query.activity_id}`
            });
          }
        });

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
          }
        });

        // 获取是否报名
        await this.$store.dispatch("isRegistration", {
          im: this.$Config.INTER_FACE.get_user_sign_up_status,
          fps: {
            open_id: this.openid.back_value.open_id,
            activity_id: this.$root.$mp.query.activity_id
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_user_sign_up_status");
          } else {
            let msg = {
              1: "报名参会",
              2: "修改报名信息",
              3: "等待审核"
            };
            this.button_msg = msg[res.back_value];
          }
        });

        // 获取人员列表
        await this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_activity_member_list,
          fps: {
            open_id: this.openid.back_value.open_id,
            activity_id: this.$root.$mp.query.activity_id
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_activity_member_list");
          } else {
            this.user_list = res.back_value;
          }
        });

      }
    },
    computed: {
      ...mapGetters([
        "openid"
      ])
    },
    onUnload() {
      this.$Utils.restData(this);
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
        title: `"${this.details_info.title}"邀请函`,
        path: `/pages/activity_details/main?activity_id=${this.$root.$mp.query.activity_id}`,
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
