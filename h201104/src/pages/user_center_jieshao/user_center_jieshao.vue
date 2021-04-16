<template>
  <section class="jieshao-container">

    <div class="jieshao-tip">
      <p class="tip"> -- 个人信息 -- </p>
    </div>

    <div class="jieshao-message">

      <div class="message">

        <div>
          <span>所属行业：</span>
          <div class="professional"></div>
        </div>

        <div>
          <span>关注行业：</span>
          <div class="professional"></div>
        </div>

        <div>
          <span>自我介绍：</span>
          <textarea v-model="jieshao" placeholder="请输入自我介绍" maxlength="300" adjust-position show-confirm-bar
            disable-default-padding></textarea>
        </div>

        <div>
          <span>个人照片：</span>
          <div style="padding-left: 50px">
            <v-uploader upload-text="点击上传" max-count="1" :fileList="fileList" @afterRead="afterRead"
              @deleteItem="deleteItem" accept="image"></v-uploader>
          </div>
        </div>

      </div>

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
        fileList: [],
        jieshao: "",
        photo: ""
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

          // let _index = _user_info.industry_involved || this.industry[0];
          // let __index = _user_info.interest || this.w_industry[0];

          // this.index = this.industry.indexOf(_index);
          // this.w_index = this.w_industry.indexOf(__index);

          this.jieshao = _user_info.brief_introduction || "";
          if (_user_info.head_portrait !== null || _user_info.head_portrait !== "") {
            this.fileList.push({
              url: _user_info.head_portrait
            });
          } else {
            this.fileList = [];
          }

          this.$Utils.closeWaiting();

        }
      });


    },
    methods: {
      deleteItem(event) {
        let index = event.mp.detail.index;
        this.fileList.splice(index, 1);
      },
      afterRead(event) {
        this.$Utils.showWaiting();
        let path = event.mp.detail.file.path;
        const requestUrl = this.$Utils.produceRequestUrl(this.$Config.INTER_FACE.make_img_route, {}, this.$Config
          .REQUEST_URI, "post");
        wx.uploadFile({
          url: requestUrl,
          filePath: path,
          name: "uploads",
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            "fps[open_id]": this.openid.back_value.open_id,
            "fps[img]": ""
          },
          success: (res) => {
            if (JSON.parse(res.data).result === "failure") {
              this.$Utils.closeWaiting();
              this.$Utils.showErrorInfo(res, "make_img_route");
            } else {
              console.log(res);
              this.photo = JSON.parse(res.data).back_value;
              this.$Utils.closeWaiting();
            }
          }
        });
        this.fileList.push({
          url: path
        });
      },
      submit() {

        // if (this.industry[this.index] === "请选择") {

        //   wx.showModal({
        //     title: "提示",
        //     showCancel: false,
        //     content: "所属行业不能为空",
        //     success(res) {}
        //   });

        //   return false;
        // }

        // if (this.w_industry[this.w_index] === "请选择") {

        //   wx.showModal({
        //     title: "提示",
        //     showCancel: false,
        //     content: "关注行业不能为空",
        //     success(res) {}
        //   });

        //   return false;
        // }


        // if (this.jieshao === "") {

        //   wx.showModal({
        //     title: "提示",
        //     showCancel: false,
        //     content: "自我介绍不能为空",
        //     success(res) {}
        //   });

        //   return false;
        // }

        // this.$Utils.showWaiting();

        // this.$store.dispatch("fetch", {
        //   im: this.$Config.INTER_FACE.update_user_info,
        //   fps: {
        //     open_id: this.openid.back_value.open_id,
        //     industry_involved: this.industry[this.index], // 所属行业
        //     interest: this.w_industry[this.w_index], // 关注行业
        //     brief_introduction: this.jieshao,
        //     head_portrait: this.photo
        //   },
        //   url: this.$Config.REQUEST_URI
        // }).then(res => {

        //   if (res.result === "failure") {
        //     this.$Utils.closeWaiting();
        //     this.$Utils.showErrorInfo(res, "update_user_info");
        //   } else {
        //     wx.showModal({
        //       title: "提示",
        //       showCancel: false,
        //       content: "保存成功",
        //       success(res) {
        //         wx.navigateBack({
        //           delta: 1
        //         });
        //       }
        //     });
        //     this.$Utils.closeWaiting();
        //   }
        // });

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
  .jieshao-container {
    padding-top: 10px;

    .jieshao-tip {
      margin-bottom: 10px;

      .tip {
        background-color: #fff;
        text-align: center;
        font-size: 14px;
        color: #17233d;
        padding: 10px 0;
      }
    }

    .jieshao-message {
      padding: 0 10px 10px 10px;
      background-color: #fff;
      margin-bottom: 10px;

      .message {

        >div {
          display: grid;
          grid-template-columns: 1fr 3fr;
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

          >.professional {
            border: 1px solid black;
            font-size: 16px;
            height: 30px;
            line-height: 30px;
            color: #17233d;
          }

          >textarea {
            width: 100%;
            border: 1px solid #dcdee2;
            padding: 10px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
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
