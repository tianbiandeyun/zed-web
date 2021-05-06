<template>
  <section class="jieshao-container">

    <div class="jieshao-tip">
      <p class="tip"> -- 个人信息 -- </p>
    </div>

    <div class="jieshao-message">

      <div class="message">

        <div>
          <span>所属行业：</span>
          <div class="professional" @click='openChangeWork(1)'>{{in_work}}</div>
        </div>

        <div>
          <span>关注行业：</span>
          <div class="professional" @click='openChangeWork(2)'>{{watch_work}}</div>
        </div>

        <div>
          <span>自我介绍：</span>
          <textarea v-model="jieshao" placeholder="请输入自我介绍" maxlength="300" adjust-position show-confirm-bar
            disable-default-padding></textarea>
        </div>

        <div>
          <span>个人照片：</span>
          <div style="padding-left: 50px">
            <v-uploader upload-text="点击上传" max-count="1" :fileList="photoList" @afterRead="afterRead"
              @deleteItem="deleteItem" accept="image"></v-uploader>
          </div>
        </div>

      </div>

    </div>

    <div class="submit">
      <button @click="submit">保存</button>
    </div>

    <!-- 选择行业 -->
    <div class="tip_overlay" v-if="is_popup">
      <div class="professional-box">
        <h1 class="professional-title">选择不超过3个，用于向您推荐相关行业的BP和投研活动</h1>
        <v-checkbox-group :value="changge_professional" @change="onChange">
          <div class="professional-change">
            <div class="professional-item" v-for='(item,index) in professional_list' :key="index">
              <v-checkbox :name="item">{{item}}</v-checkbox>
            </div>
          </div>
          <div class="professional-button">
            <button class="submit" @click='submitProfessional'>提交</button>
            <p class="wait" @click="is_popup = false;changge_professional = []">关闭</p>
          </div>
        </v-checkbox-group>
      </div>
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
        type: 1, // 区分是打开的那个列表。1 是in_work 2 是watch_work
        professional_list: [], // 职业列表
        changge_professional: [], // 选择的职业
        is_popup: false, // 是否打开选择职业
        photoList: [], // 展示的头像
        jieshao: "", // 个人介绍
        photo: "", // 选择的头像
        in_work: '请选择所在行业',
        watch_work: '请选择关注行业'
      };
    },
    async mounted() {
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
          let _res = res.back_value;
          this.in_work = _res.industry_involved === null ? '请选择所在行业' : _res.industry_involved;
          this.watch_work = _res.interest === null ? '请选择关注行业' : _res.interest;
          this.jieshao = _res.brief_introduction || "";
          if (_res.head_portrait !== null || _res.head_portrait !== "") {
            this.photoList.push({
              url: _res.head_portrait
            });
          } else {
            this.photoList = [];
          }
        }
      });

      // 职业选项
      await this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_occupation_list,
        fps: {},
        url: this.$Config.REQUEST_URI
      }).then(res => {
        if (res.result === "failure") {
          this.$Utils.closeWaiting();
          this.$Utils.showErrorInfo(res, "get_occupation_list");
        } else {
          this.professional_list = res.back_value;
        }
      });
      this.$Utils.closeWaiting();
    },
    methods: {
      /**
       * 提交行业
       */
      submitProfessional() {
        let size = this.changge_professional.length;

        if (size === 0) {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "请选择一个行业",
            success(res) {}
          });
          return false;
        }
        if (size > 3) {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "最多选择三个行业",
            success(res) {}
          });
          return false;
        }
        if (this.type === 1) {
          this.in_work = this.changge_professional.join('|');
        }

        if (this.type === 2) {
          this.watch_work = this.changge_professional.join('|');
        }

        this.is_popup = false;
        this.changge_professional = [];
      },
      /**
       * 选择professional
       */
      onChange(event) {
        this.changge_professional = event.mp.detail;
      },
      /**
       * 打开professional
       */
      openChangeWork(res) {

        this.type = res;

        if (this.in_work !== '请选择所在行业' && this.type === 1) {
          this.changge_professional = this.in_work.split('|');
        }

        if (this.watch_work !== '请选择关注行业' && this.type === 2) {
          this.changge_professional = this.watch_work.split('|');
        }

        this.is_popup = true;

      },
      /**
       * 临时删除照片，从新上传
       */
      deleteItem(event) {
        let index = event.mp.detail.index;
        this.photoList.splice(index, 1);
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
        this.photoList.push({
          url: path
        });
      },
      /**
       * 提交信息
       */
      submit() {

        if (this.in_work === "请选择所在行业") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "所属行业不能为空",
            success(res) {}
          });

          return false;
        }

        if (this.watch_work === "请选择关注行业") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "关注行业不能为空",
            success(res) {}
          });

          return false;
        }


        if (this.jieshao === "") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "自我介绍不能为空",
            success(res) {}
          });

          return false;
        }

        this.$Utils.showWaiting();

        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.update_user_info,
          fps: {
            open_id: this.openid.back_value.open_id,
            industry_involved: this.in_work, // 所属行业
            interest: this.watch_work, // 关注行业
            brief_introduction: this.jieshao,
            head_portrait: this.photo
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
              content: "保存成功",
              success(res) {
                wx.navigateBack({
                  delta: 1
                });
              }
            });
            this.$Utils.closeWaiting();
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

    .tip_overlay {
      box-sizing: border-box;
      padding-top: 20px;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      background-color: rgba(0, 0, 0, .7);

      .professional-box {
        margin: 0 auto;
        width: 300px;
        padding: 10px 20px;
        background-color: #fff;
        border-radius: 5px;

        .professional-title {
          font-size: 14px;
          margin-bottom: 5px;
          color: #17233d;
        }

        .professional-change {
          width: 300px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-column-gap: 4px;
          grid-row-gap: 6px;
          margin-bottom: 5px;

          .professional-item {
            font-size: 14px;
          }
        }

        .professional-button {
          padding: 6px 0;

          .submit {
            background-color: #19be6b;
            width: 100px;
            height: 40px;
            line-height: 40px;
            color: #fff;
            margin-bottom: 10px;
          }

          .wait {
            text-align: center;
            font-size: 14px;
            color: #515a6e;
          }

        }

      }
    }

  }

</style>
