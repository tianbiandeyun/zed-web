<template>
  <section class="jichu-container">

    <div class="jichu-tip">
      <p class="tip"> -- 请如实填写 -- </p>
    </div>

    <div class="jichu-message">

      <div class="message">
        <div>
          <span>姓名：</span>
          <input type="text" hold-keyboard v-model="name" placeholder="请输入姓名">
        </div>
        <div>
          <span>性别：</span>

          <picker @change="bindPickerChange" :value="index" :range="array">
            <p>{{array[index]}}</p>
          </picker>

        </div>
        <div>
          <span>单位名称：</span>
          <input type="text" hold-keyboard v-model="complate" placeholder="请输入单位名称">
        </div>
        <div>
          <span>现任职务：</span>
          <input type="text" hold-keyboard v-model="zhiwei" placeholder="请输入现任职务">
        </div>
        <div>
          <span>邮箱：</span>
          <input type="text" hold-keyboard v-model="email" placeholder="请输入邮箱">
        </div>
      </div>

      <div class="phone" style="border-bottom: 1px solid #dcdee2;">
        <div>
          <span>手机号码：</span>
        </div>
        <div>
          <input type="text" hold-keyboard v-model="phone" disabled placeholder="手机号码">
        </div>
        <div>
          <button open-type="getPhoneNumber" @getphonenumber="getPhone" :disabled="disabled"
            :class="disabled ? 'button_active' : ''">
            {{phone_message}}
          </button>
        </div>
      </div>

    </div>

    <div class="jichu-tip">
      <p class="tip"> -- 隐私设置 -- </p>
    </div>

    <div class="jichu-yinsi">
      <v-checkbox-group :value="result" @change="radioChange">
        <div style="margin-bottom: 20px">
          <v-checkbox name="email">公开邮箱信息　　　　　　　　　　　　</v-checkbox>
        </div>
        <v-checkbox name="phone">公开手机号码信息　　　　　　　　　　　</v-checkbox>
      </v-checkbox-group>
    </div>

    <div class="submit">
      <button @click="submit">保存</button>
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
        result: ["email"],
        index: 0,
        array: ["男", "女"],
        complate: "",
        zhiwei: "",
        email: "",
        phone_message: "获取手机号码",
        phone: "",
        disabled: false
      };
    },
    mounted() {

      this.$Utils.showWaiting();

      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_member_info,
        fps: {
          open_id: this.openid.back_value.open_id,
          u_key: this.$root.$mp.query.u_key || ""
        },
        url: this.$Config.REQUEST_URI
      }).then(res => {
        if (res.result === "failure") {
          this.$Utils.closeWaiting();
          this.$Utils.showErrorInfo(res, "get_member_info");
        } else {
          let _user_info = res.back_value;

          if (_user_info.phone) {
            this.disabled = true;
          }

          this.name = _user_info.name || ""; +
          _user_info.sex === 1 ? this.index = 0 : this.index = 1 || 0;
          this.complate = _user_info.company || "";
          this.zhiwei = _user_info.job_description || "";
          this.email = _user_info.mail || "";
          this.phone = _user_info.phone || "";

          this.$Utils.closeWaiting();

        }
      });

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
          im: this.$Config.INTER_FACE.update_user_info,
          fps: {
            open_id: this.openid.back_value.open_id,
            name: this.name,
            sex: this.array[this.index] === "男" ? 1 : 2,
            company: this.complate,
            job_description: this.zhiwei,
            mail: this.email,
            phone: this.phone,
            phone_restrict: this.result.includes("phone") ? 1 : 2,
            mail_restrict: this.result.includes("email") ? 1 : 2
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {

          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "update_user_info");
          } else {
            wx.showModal({
              title: "提示",
              showCancel: false,
              content: "修改成功",
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
      bindPickerChange(e) {
        this.index = e.mp.detail.value;
      },
      radioChange(e) {
        this.result = e.mp.detail;
        console.log(this.result);
      }
    },
    computed: {
      ...mapGetters([
        "openid"
        // "user_info"
      ])
    },
    onUnload() {
      this.$Utils.restData(this);
    }
  };

</script>

<style lang="less" scoped>
  .jichu-container {
    padding-top: 10px;

    .jichu-tip {
      margin-bottom: 10px;

      .tip {
        background-color: #fff;
        text-align: center;
        font-size: 14px;
        color: #17233d;
        padding: 10px 0;
      }
    }

    .jichu-yinsi {
      padding: 10px;
      background-color: #fff;
      margin-bottom: 10px;
    }

    .jichu-message {
      padding: 0 10px 10px 10px;
      background-color: #fff;
      margin-bottom: 10px;

      .message {

        >div {
          display: grid;
          grid-template-columns: 1fr 3fr;
          height: 30px;
          border-bottom: 1px solid #dcdee2;
          padding: 10px 0;

          >span {
            font-size: 16px;
            font-weight: bold;
            color: #17233d;
            line-height: 30px;
          }

          >input {
            height: 30px;
          }

          >picker {
            font-size: 16px;
            height: 30px;
            line-height: 30px;
            color: #17233d;
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
