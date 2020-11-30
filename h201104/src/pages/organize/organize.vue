<template>
  <section class="organize-container" v-if="info.length !== 0">

    <v-collapse :value="activeNames" @change="onChange">

      <v-collapse-item
        v-for="(item,index) in info"
        :key="index"
        :title="item.title"
        :name="index">

        <div class="organize-content" v-for="(k,v) in item.centont" :key="k">
          <p class="organize-content-title">{{k.title}}</p>
          <p v-if="k.describe" class="organize-content-message">{{k.describe}}</p>
          <p v-else class="organize-content-images">
            <img :src="k.images" alt="">
          </p>
        </div>

      </v-collapse-item>

      <v-collapse-item v-if="info.length" title="网家家创新中国入驻申请" :name="info.length">

        <div class="organize-message">

          <div class="message">
            <div>
              <span>申请类型：</span>
              <picker @change="bindPickerChange" :value="index" :range="array">
                <p>{{array[index]}}</p>
              </picker>
            </div>
            <div>
              <span>对接联系人：</span>
              <input type="text" hold-keyboard v-model="user" placeholder="请输入对接联系人（中文）">
            </div>
            <div>
              <span>联系电话：</span>
              <input type="text" hold-keyboard v-model="photo" placeholder="请输入联系电话">
            </div>
            <div>
              <span>机构名称：</span>
              <input type="text" hold-keyboard v-model="complate" placeholder="请输入机构名称">
            </div>
          </div>

          <div class="organize-submit">
            <button @click="submit">提交</button>
          </div>

        </div>

      </v-collapse-item>

    </v-collapse>

  </section>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "organize",
    data() {
      return {
        index: 0,
        array: ["投资", "企业", "协会"],
        activeNames: [],
        info: [],
        user: "",
        photo: "",
        complate: ""
      };
    },
    mounted() {

      this.$Utils.showWaiting();

      // 获取手风琴信息
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_organizers_info,
        fps: {
          open_id: this.openid.back_value.open_id,
          organizers_id: this.$root.$mp.query.organize_id
        },
        url: this.$Config.REQUEST_URI
      }).then(res => {

        if (res.result === "failure") {
          this.$Utils.closeWaiting();
          this.$Utils.showErrorInfo(res, "get_organizers_info");
        } else {
          this.info = res.back_value.inner_data;
          this.activeNames.push(this.info.length);
          this.$Utils.closeWaiting();
        }
      });

    },
    methods: {
      submit() {

        if (this.user === "") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "对接联系人不能为空",
            success(res) {
            }
          });

          return false;
        }

        if (this.photo === "") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "联系电话不能为空",
            success(res) {
            }
          });

          return false;
        }

        if (this.complate === "") {

          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "机构名称不能为空",
            success(res) {
            }
          });

          return false;
        }

        this.$Utils.showWaiting();

        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.set_enter_info,
          fps: {
            open_id: this.openid.back_value.open_id,
            enter_type: this.array[this.index],
            docking_contacts: this.user,
            phone: this.photo,
            company: this.complate
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "set_enter_info");
          } else {
            this.$Utils.closeWaiting();
            wx.showModal({
              title: "提示",
              showCancel: false,
              content: "申请成功",
              success(res) {
                wx.navigateBack({
                  delta: 1
                });
              }
            });
          }
        });

      },
      onChange(e) {
        this.activeNames = e.mp.detail;
      },
      bindPickerChange(e) {
        this.index = e.mp.detail.value;
      }
    },
    onUnload() {
      this.$Utils.restData(this);
    },
    computed: {
      ...mapGetters([
        "openid"
      ])
    }
  };
</script>

<style lang="less">
  .organize-container {

    .van-cell {
      font-size: 16px;
      color: #f8f8f9;
      background-color: #808695;
    }

    .van-icon {
      color: #fff !important;
    }

    .van-cell:after {
      border-bottom: 1px solid #808695;
    }

    .organize-content {
      margin-bottom: 10px;

      .organize-content-title {
        font-size: 16px;
        color: #17233d;
        margin-bottom: 5px;
      }

      .organize-content-message {
        font-size: 14px;
        color: #515a6e;
        line-height: 1.8;
      }

      .organize-content-images {
        height: 700px;

        img {
          width: 100%;
          height: 100%;
        }
      }

    }

    .organize-message {
      background-color: #fff;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      > .message {
        margin-bottom: 10px;

        > div {
          display: grid;
          grid-template-columns: 1.2fr 3fr;
          height: 30px;
          border-bottom: 1px solid #dcdee2;
          padding: 10px 0;

          > span {
            font-size: 16px;
            font-weight: bold;
            color: #17233d;
            line-height: 30px;
          }

          > input {
            font-size: 16px;
            height: 30px;
            color: #17233d;
          }

          > picker {
            font-size: 16px;
            height: 30px;
            line-height: 30px;
            color: #17233d;
          }
        }

      }

      .organize-submit {

        button {
          background-color: #19be6b;
          color: #fff;
          width: 300px;
        }
      }
    }

  }
</style>
