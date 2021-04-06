<template>
  <section class="index-container">

    <div class="record-box" v-for="(item,index) in list" :key="index">
      <v-sticky>
        <h1 class="title">{{item.month}}月</h1>
      </v-sticky>
      <div class="item" v-for="(i,k) in item.list" :key="k">
        <ZedRecordItem :item="i"></ZedRecordItem>
      </div>
    </div>

    <div class="add-box" @click="add">
      <v-icon name="add" color="#19be6b" size="40"></v-icon>
      <p>健康生活，控制体重</p>
    </div>

  </section>
</template>

<script>
  import ZedRecordItem from "../../components/ZedRecordItem";
  import echart from "../../components/ZedEchart";

  export default {
    components: { ZedRecordItem, echart },
    data() {
      return {
        list: []
      };
    },
    created() {
      this.refresh();
    },
    onTabItemTap(res) {
      this.refresh();
    },
    methods: {

      // async getOpenid() {
      //
      //   let code = await this.wxLogin();
      //
      //   // 获取openid
      //   return new Promise((resolve, reject) => {
      //     this.$store.dispatch("getOpenid", {
      //       im: this.$Config.INTER_FACE.xi_login,
      //       fps: { xicode: code },
      //       url: this.$Config.REQUEST_URI
      //     }).then(res => {
      //       if (res.result === "failure") {
      //         this.$Utils.showErrorInfo(res, "xi_login");
      //       } else {
      //         resolve(res);
      //       }
      //     });
      //   });
      //
      // },
      // wxLogin() {
      //   return new Promise((resolve, reject) => {
      //     // 获取code
      //     wx.login({
      //       success(res) {
      //         resolve(res.code);
      //       },
      //       fail(error) {
      //         reject(error);
      //       }
      //     });
      //   });
      // },

      add() {
        wx.navigateTo({
          url: `/pages/add/main`
        });
      },
      async refresh() {

        this.$Utils.showWaiting();

        await this.$store.dispatch("fetch", {
          im: "getProjectList",
          fps: {
            "page": "shouye"
          },
          url: this.$Config.CONST_REQUEST_URI
        }).then(res => {
          let result = res.data;
          let new_data = [];
          let _o = {};
          result.forEach(item => {
            let _m = new Date(item.riqi).getMonth() + 1;
            if (undefined === _o[_m]) {
              _o[_m] = [];
            }
            _o[_m].push(item);
          });

          Object.keys(_o).forEach((item, index) => {
            new_data.push({
              "month": item,
              "list": Object.values(_o)[index]
            });
          });

          this.list = new_data;

          console.log(this.list);

        });

        this.$Utils.closeWaiting();
      }
    }
  };
</script>

<style lang="less" scoped>
  .index-container {
    padding: 10px 20px 80px 20px;

    .record-box {
      margin-bottom: 10px;

      .title {
        padding-left: 20px;
        font-size: 20px;
        font-weight: bold;
        color: #1c2438;
        background-color: #fff;
        line-height: 2;
        margin-bottom: 10px;
      }

      .item {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }

    }

    .add-box {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 0 10px #dddee1;
      -webkit-box-shadow: 0 0 10px #dddee1;
      box-shadow: 0 0 10px #dddee1;
      position: fixed;
      left: 50%;
      bottom: 10px;
      margin-left: -150px;
      width: 300px;
      z-index: 999;
      background-color: #fff;
      display: grid;
      align-items: center;
      justify-content: center;
      padding: 5px 0;

      p {
        font-size: 10px;
        line-height: 2;
        color: #495060;
      }
    }
  }
</style>
