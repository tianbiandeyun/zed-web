<template>
  <section class="sign-up-container">

    <div class="sign-up-box">
      <div class="sign-up-origin" @click="goBack">
        <span>会议名称：</span>
        <span>{{info.title}}</span>
        <span> > </span>
      </div>
      <div class="sign-up-time">
        <span>会议时间：</span>
        <span>{{info.meeting_time}}</span>
      </div>
      <div class="sign-up-post" @click="getLocation">
        <span>会议地点：</span>
        <span>{{info.congress_venue}}</span>
        <span> > </span>
      </div>
    </div>

    <div class="sign-up-tip">
      <p class="tip"> -- 请如实填写 -- </p>
    </div>

    <div class="sign-up-message">

      <div class="message">
        <p>
          <span>姓名：</span>
          <input type="text" hold-keyboard v-model="name" placeholder="请输入姓名">
        </p>
        <p>
          <span>单位名称：</span>
          <input type="text" hold-keyboard v-model="complate" placeholder="请输入单位名称">
        </p>
        <p>
          <span>现任职务：</span>
          <input type="text" hold-keyboard v-model="zhiwei" placeholder="请输入现任职务">
        </p>
      </div>

      <div class="phone" style="border-bottom: 1px solid #dcdee2;">
        <div>
          <span>手机号码：</span>
        </div>
        <div>
          <input type="text" hold-keyboard v-model="phone" disabled placeholder="点击右侧按钮">
        </div>
        <div>
          <button open-type="getPhoneNumber" @getphonenumber="getPhone" :disabled="disabled"
            :class="disabled ? 'button_active' : ''">
            {{phone_message}}
          </button>
        </div>
      </div>

      <div style="padding: 10px 0;font-size: 14px;text-align: center;color: #515a6e;">
        * 手机号隐私保障：仅提交给主办方和好友。
      </div>

    </div>

    <div class="submit">
      <button @click="submit">提交</button>
    </div>

  </section>
</template>

<script>
  import {
    mapGetters
  } from "vuex";

  export default {
    name: "sign_up",
    data() {
      return {
        name: "",
        complate: "",
        zhiwei: "",
        phone_message: "获取手机号码",
        phone: "",
        disabled: false,
        info: ""
      };
    },
    async mounted() {

      this.$Utils.showWaiting();

      // 获取活动信息
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
          this.info = res.back_value;
        }
      });

      // 如果报名过则显示报名信息
      await this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_member_info,
        fps: {
          open_id: this.openid.back_value.open_id,
          u_key: ""
        },
        url: this.$Config.REQUEST_URI
      }).then(res => {
        if (res.result === "failure") {
          this.$Utils.closeWaiting();
          this.$Utils.showErrorInfo(res, "get_member_info ");
        } else {
          this.name = res.back_value.name || "";
          this.complate = res.back_value.company || "";
          this.zhiwei = res.back_value.job_description || "";
          this.phone = res.back_value.phone || "";
          if (this.phone !== "") {
            this.disabled = true;
          }
        }
      });
      this.$Utils.closeWaiting();
    },
    methods: {
      submit() {

        if (this.name === "") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "姓名不能为空",
            success(res) {}
          });

          return false;
        }

        if (this.complate === "") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "公司不能为空",
            success(res) {}
          });

          return false;
        }

        if (this.zhiwei === "") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "职位不能为空",
            success(res) {}
          });

          return false;
        }

        if (this.phone === "") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "电话不能为空",
            success(res) {}
          });

          return false;
        }

        this.$Utils.showWaiting();

        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.set_registration,
          fps: {
            open_id: this.openid.back_value.open_id,
            activity_id: this.$root.$mp.query.activity_id,
            name: this.name,
            company: this.complate,
            job_description: this.zhiwei,
            phone: this.phone
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {

          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "set_registration");
          } else {
            wx.showModal({
              title: "提示",
              showCancel: false,
              content: "报名成功",
              success(res) {
                wx.navigateBack({
                  delta: 1
                });
              }
            });
            this.$Utils.closeWaiting();
          }
        });

      },
      goBack() {
        wx.navigateBack({
          delta: 1
        });
      },
      /**
       * 获取手机号码
       * */
      getPhone(e) {

        if (e.mp.detail.errMsg === "getPhoneNumber:ok") {

          this.$Utils.showWaiting();

          let {
            encryptedData,
            iv
          } = e.mp.detail;

          this.$store.dispatch("fetch", {
            im: this.$Config.INTER_FACE.get_user_phone,
            fps: {
              open_id: this.openid.back_value.open_id,
              encrypted_data: encryptedData,
              iv: iv,
              cloud_id: ""
            },
            url: this.$Config.REQUEST_URI
          }).then(res => {
            if (res.result === "failure") {
              this.$Utils.showErrorInfo(res, "get_user_phone");
            } else {
              this.phone = res.back_value.phoneNumber;
              this.phone_message = "已获取";
              this.disabled = true;
              this.$Utils.closeWaiting();
            }
          });

        } else {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "未授权手机号码，无法提交。",
            success(res) {}
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
          latitude: +that.info.longitude,
          longitude: +that.info.latitude,
          name: that.info.congress_venue,
          scale: 18,
          success() {
            that.$Utils.closeWaiting();
          },
          fail() {
            that.$Utils.closeWaiting();
          }
        });
      }
    },
    computed: {
      ...mapGetters([
        "openid",
        "is_registration"
      ])
    },
    onUnload() {
      this.$Utils.restData(this);
    }
  };

</script>

<style lang="less" scoped>
  .sign-up-container {
    padding-top: 10px;

    .sign-up-box {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 10px;

      >div {
        display: grid;
        grid-template-columns: 2.4fr 6fr 1fr;
        padding: 6px 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        >span {
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

        &:nth-of-type(2) {
          grid-template-columns: 1.4fr 4fr;

          >span {

            &:nth-of-type(2) {
              color: #515a6e;
            }
          }
        }

      }

    }

    .sign-up-tip {
      margin-bottom: 10px;

      .tip {
        background-color: #fff;
        text-align: center;
        font-size: 14px;
        color: #17233d;
        padding: 10px 0;
      }
    }

    .sign-up-message {
      padding: 0 10px;
      background-color: #fff;
      margin-bottom: 20px;

      .message {

        p {
          display: grid;
          grid-template-columns: 1fr 3fr;
          height: 30px;
          border-bottom: 1px solid #dcdee2;
          padding: 10px 0;

          span {
            font-size: 16px;
            font-weight: bold;
            color: #17233d;
            line-height: 30px;
          }

          input {
            height: 30px;
          }
        }
      }

      .phone {
        display: grid;
        grid-template-columns: .8fr 1fr 1.4fr;
        padding: 10px 0;

        >div {

          span {
            font-size: 16px;
            font-weight: bold;
            color: #17233d;
            line-height: 30px;
          }

          input {
            height: 30px;
          }

          button {
            background-color: #19be6b;
            color: #fff;
            font-size: 14px;
            width: 120px;
            height: 30px;
            line-height: 30px;
          }

          .button_active {
            background-color: #c5c8ce;
            color: #808695;
          }
        }

      }
    }

    .submit {

      button {
        background-color: #19be6b;
        color: #fff;
        width: 300px;
      }
    }

  }

</style>
