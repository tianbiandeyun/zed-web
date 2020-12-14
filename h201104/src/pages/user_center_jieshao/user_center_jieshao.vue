<template>
  <section class="jieshao-container">

    <div class="jieshao-tip">
      <p class="tip"> -- 个人信息 -- </p>
    </div>

    <div class="jieshao-message">

      <div class="message">

        <div>
          <span>所属行业：</span>
          <picker @change="changeIndustry" :value="index" :range="industry">
            <p>{{industry[index]}}</p>
          </picker>
        </div>

        <div>
          <span>关注行业：</span>
          <picker @change="changeWatchIndustry" :value="w_index" :range="w_industry">
            <p>{{w_industry[w_index]}}</p>
          </picker>
        </div>

        <div>
          <span>自我介绍：</span>
          <textarea
            v-model="jieshao"
            placeholder="请输入自我介绍"
            maxlength="300"
            adjust-position
            show-confirm-bar
            disable-default-padding
          ></textarea>
        </div>

        <div>
          <span>个人照片：</span>
          <div style="padding-left: 50px">
            <v-uploader
              upload-text="点击上传"
              max-count="1"
              :fileList="fileList"
              @afterRead="afterRead"
              @deleteItem="deleteItem"
              accept="image"></v-uploader>
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
  import { mapGetters } from "vuex";

  export default {
    name: "sign_up",
    data() {
      return {
        fileList: [],
        index: 0,
        industry: [
          "请选择",
          "IT|互联网|通信|电子", "金融|银行|保险", "消费零售|贸易|交通物流", "加工制造|仪表设备",
          "房产|建筑建设|物业", "广告|传媒|印刷出版", "管理咨询|教育科研|中介服务", "医药生物|医疗保健",
          "酒店旅游", "能源矿产|石油化工", "政府|非赢利机构|科研|其他", "财会|金融",
          "汽车|工程机械", "消费品|生产|物流", "市场|媒介|设计", "管理|人力资源|行政",
          "咨询|法律|教育|翻译", "服务业"
        ],
        w_index: 0,
        w_industry: [
          "请选择",
          "IT|互联网|通信|电子", "金融|银行|保险", "消费零售|贸易|交通物流", "加工制造|仪表设备",
          "房产|建筑建设|物业", "广告|传媒|印刷出版", "管理咨询|教育科研|中介服务", "医药生物|医疗保健",
          "酒店旅游", "能源矿产|石油化工", "政府|非赢利机构|科研|其他", "财会|金融",
          "汽车|工程机械", "消费品|生产|物流", "市场|媒介|设计", "管理|人力资源|行政",
          "咨询|法律|教育|翻译", "服务业"
        ],
        jieshao: "",
        photo: ""
      };
    },
    mounted() {

      let _index = this.user_info.back_value.industry_involved || this.industry[0];
      let __index = this.user_info.back_value.interest || this.w_industry[0];

      this.index = this.industry.indexOf(_index);
      this.w_index = this.w_industry.indexOf(__index);
      this.jieshao = this.user_info.back_value.brief_introduction || "";

      if (this.user_info.back_value.head_portrait !== null || this.user_info.back_value.head_portrait !== "") {
        this.fileList.push({
          url: this.user_info.back_value.head_portrait
        });
      } else {
        this.fileList = [];
      }

    },
    methods: {
      deleteItem(event) {
        let index = event.mp.detail.index;
        this.fileList.splice(index, 1);
      },
      afterRead(event) {

        this.$Utils.showWaiting();

        let path = event.mp.detail.file.path;

        const requestUrl = this.$Utils.produceRequestUrl(this.$Config.INTER_FACE.make_img_route, {}, this.$Config.REQUEST_URI, "post");

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

        if (this.industry[this.index] === "请选择") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "所属行业不能为空",
            success(res) {
            }
          });

          return false;
        }

        if (this.w_industry[this.w_index] === "请选择") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "关注行业不能为空",
            success(res) {
            }
          });

          return false;
        }


        if (this.jieshao === "") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "自我介绍不能为空",
            success(res) {
            }
          });

          return false;
        }

        this.$Utils.showWaiting();

        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.update_user_info,
          fps: {
            open_id: this.openid.back_value.open_id,
            industry_involved: this.industry[this.index],
            interest: this.w_industry[this.w_index],
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

      },

      changeIndustry(e) {
        this.index = e.mp.detail.value;
      },
      changeWatchIndustry(e) {
        this.w_index = e.mp.detail.value;
      }
    },
    computed: {
      ...mapGetters([
        "openid",
        "user_info"
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

        > div {
          display: grid;
          grid-template-columns: 1fr 3fr;
          border-bottom: 1px solid #dcdee2;
          padding: 10px 0;

          > span {
            font-size: 16px;
            font-weight: bold;
            color: #17233d;
            line-height: 30px;
          }

          > input {
            height: 30px;
          }

          > picker {
            font-size: 16px;
            height: 30px;
            line-height: 30px;
            color: #17233d;
          }

          > textarea {
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
