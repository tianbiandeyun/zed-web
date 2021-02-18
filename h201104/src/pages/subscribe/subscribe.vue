<template>
  <section class="list-container">

    <div class="list-tip">嘉宾列表（请点击签到）：</div>

    <div v-for="(item,index) in  list" :key="index">
      <listItem @signIn="signIn" :item="item"></listItem>
    </div>

    <v-popup
      :show="popup_show"
      closeable
      round
      @close="closePopup">

      <div class="popup-container">
        <div class="popup-photo">
          <img :src="user_info[2]" alt="">
        </div>
        <div class="popup-name">{{user_info[0]}}</div>
        <div class="popup-signin">
          <button @click="isMe">确认是我</button>
        </div>
      </div>

    </v-popup>

  </section>
</template>

<script>
  import listItem from "../../components/listItem";
  import login from "../../utils/login";

  export default {
    name: "subscribe",
    components: { listItem },
    mixins: [login],
    data() {
      return {
        popup_show: false,
        list: [],
        openid_info: "",
        user_info: [],// 打开签到之后展示的 name status photo id
        activity_id: "" // 活动 id
      };
    },
    async onShow() {

      wx.hideHomeButton();

      this.$Utils.showWaiting("正在加载");

      this.openid_info = await this.getOpenid();

      await this.refreshList();

      this.$Utils.closeWaiting();

    },
    methods: {
      /**
       * 确认签到
       * */
      isMe() {
        let u_key = this.user_info[3];
        let photo = this.user_info[4];

        this.$Utils.showWaiting("签到中");

        // 保存用户头像
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.set_user_photo,
          fps: {
            open_id: this.openid_info.back_value.open_id,
            wx_photo: photo
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.showErrorInfo(res, "set_user_photo");
          } else {
            if (res.back_value) {

              // 签到成功
              this.$store.dispatch("fetch", {
                im: this.$Config.INTER_FACE.set_punch_the_clock,
                fps: {
                  open_id: this.openid_info.back_value.open_id,
                  activity_id: this.activity_id,
                  u_key: u_key
                },
                url: this.$Config.REQUEST_URI
              }).then(async res => {

                this.$Utils.closeWaiting();

                if (res.result === "failure") {

                  if (res.error_code === 2012140710 || res.error_code === "2012140710") {
                    wx.showModal({
                      title: "提示",
                      showCancel: false,
                      content: "请选择本人，进行签到",
                      success(res) {

                      }
                    });
                  } else {
                    this.$Utils.showErrorInfo(res, "set_punch_the_clock");
                  }
                } else {
                  this.popup_show = false;
                  this.user_info = [];
                  // 跳转页面
                  wx.navigateTo({
                    url: `/pages/subscribe_details/main?activity_id=${this.activity_id}`
                  });
                }

              });

            }
          }
        });

      },
      /**
       * 打开签到
       * */
      signIn(res) {

        this.user_info = [...this.user_info, ...res];

        this.popup_show = true;

      },
      closePopup() {
        this.popup_show = false;
        this.user_info = [];
      },
      /**
       * 请求数据
       * */
      refreshList() {
        // 获取 活动 ID
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_activity_id,
          fps: { open_id: this.openid_info.back_value.open_id },
          url: this.$Config.REQUEST_URI
        }).then(res => {

          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_activity_id");
          } else {
            this.activity_id = res.back_value;

            // 判断是否 签到过
            return this.$store.dispatch("fetch", {
              im: this.$Config.INTER_FACE.has_punch_the_clock,
              fps: {
                open_id: this.openid_info.back_value.open_id,
                activity_id: res.back_value
              },
              url: this.$Config.REQUEST_URI
            });
          }
        }).then(res => {

          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "has_punch_the_clock");
          } else {

            if (res.back_value) {
              // 报过名 -> 签到成功
              wx.redirectTo({
                url: `/pages/subscribe_details/main?activity_id=${this.activity_id}`
              });
            } else {
              // 无报名

              // 获取 签到 列表
              this.$store.dispatch("fetch", {
                im: this.$Config.INTER_FACE.get_activity_member_list,
                fps: {
                  open_id: this.openid_info.back_value.open_id,
                  activity_id: this.activity_id
                },
                url: this.$Config.REQUEST_URI
              }).then(res => {
                if (res.result === "failure") {
                  this.$Utils.closeWaiting();
                  this.$Utils.showErrorInfo(res, "get_activity_member_list");
                } else {
                  let result = res.back_value;

                  for (let i = 0; i < result.length; i++) {
                    if (result[i].display != 2) {
                      result.splice(i, 1);
                    }
                  }

                  this.list = result;

                }
              });

            }
          }
        });

      }
    },
    async onPullDownRefresh() {
      this.$Utils.showWaiting();
      await this.refreshList();
      this.$Utils.closeWaiting();
      wx.stopPullDownRefresh();
    }
  };
</script>

<style lang="less" scoped>
  .list-container {
    padding: 10px 0;

    .list-tip {
      background-color: #fff;
      font-size: 18px;
      padding: 5px 5px 5px 20px;
      margin-bottom: 10px;
      color: #17233d;
    }

    .popup-container {
      padding: 30px 20px 20px 20px;
      width: 260px;
      height: 360px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      .popup-photo {
        margin: 0 auto;
        width: 160px;
        height: 220px;
        border: 1px solid #dcdee2;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        font-size: 0;
        margin-bottom: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .popup-name {
        font-weight: bold;
        color: #17233d;
        font-size: 18px;
        text-align: center;
        padding: 4px 0;
        margin-bottom: 10px;
      }

      .popup-signin {

        button {
          background-color: #19be6b;
          color: #fff;
          width: 100px;
          font-size: 14px;
        }
      }
    }
  }
</style>
