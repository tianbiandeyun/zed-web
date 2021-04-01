<template>
  <section class="my-container">

    <div class="photo-box">
      <div class="photo">
        <img @click="openSheet" src="../../../static/images/photo.png" alt="张琳">
      </div>
      <div class="name" @click="openDialog">
        <p>名字</p>
        <v-icon name="edit" size="18" color="#495060"></v-icon>
      </div>
    </div>

    <div class="myself-box">
      <div class="title">
        <p>个人身体数据</p>
      </div>
      <div class="data">
        <div>
          <p>性别：</p>
          <p>{{message.xingbie}}</p>
        </div>
        <div>
          <p>年龄：</p>
          <p>{{message.nianling}}<span>岁</span></p>
        </div>
        <div>
          <p>身高：</p>
          <p>{{message.shengao}}<span>CM</span></p>
        </div>
        <div>
          <p>体重：</p>
          <p>{{message.tizhong}}<span>Kg</span></p>
        </div>
        <div>
          <p>BMI：</p>
          <p>{{message.bmi}}</p>
        </div>
        <div>
          <p>睡眠状态：</p>
          <p>{{message.shuimian}}</p>
        </div>
        <div>
          <p>健身记录：</p>
          <p>{{message.jianshen}}次<span>/周</span></p>
        </div>
        <div v-if="message.xingbie == '女'">
          <p>生理期：</p>
          <p>{{message.shengli}}</p>
        </div>
        <div>
          <p>情绪状态：</p>
          <p>{{message.qingxu}}</p>
        </div>
        <div>
          <p>身体症状：</p>
          <p>{{message.zhengzhuang}}</p>
        </div>
      </div>
    </div>

    <div class="curves-box" v-show="is_echart">
      <p>一周体重趋势</p>
      <ZedEchart :t="t"></ZedEchart>
    </div>

    <!--点击头像菜单-->
    <v-action-sheet
      :show="is_sheet"
      :actions="actions"
      description="头像操作"
      z-index="9999"
      @close="closeSheet"
      @select="selectSheet"></v-action-sheet>

    <!--修改名字-->
    <v-dialog
      use-slot
      title="修改名字"
      :show="is_dialog"
      show-cancel-button
      confirm-button-color="#1c2438"
      cancel-button-color="#495060"
      @close="closeDialog"
      @confirm="confirmDialog"
    >
      <v-field
        placeholder="请输入用户名"
      ></v-field>
    </v-dialog>
  </section>
</template>

<script>
  import ZedEchart from "../../components/ZedEchart";

  export default {
    components: { ZedEchart },
    data() {
      return {
        is_echart: true,
        t: [83, 90, 99, 102, 110, 92, 89],
        is_sheet: false,
        actions: [
          {
            name: "查看大图"
          },
          {
            name: "更换头像"
          }
        ],
        is_dialog: false,
        message: ""
      };
    },
    created() {

      this.$Utils.showWaiting();

      this.$store.dispatch("fetch", {
        im: "getMesssage",
        fps: {
          "page": "wodexinxi"
        },
        url: this.$Config.CONST_REQUEST_URI
      }).then(res => {
        this.message = res.data;
        this.$Utils.closeWaiting();
      });

    },
    onTabItemTap(res) {
      console.log(res);
    },
    methods: {
      openSheet() {
        this.is_sheet = true;
        this.is_echart = false;
      },
      closeSheet() {
        this.is_sheet = false;
        this.is_echart = true;
      },
      openDialog() {
        this.is_dialog = true;
        this.is_echart = false;
      },
      closeDialog() {
        this.is_dialog = false;
        this.is_echart = true;
      },
      selectSheet(event) {
        let name = event.mp.detail;
        if (name === "查看大图") {

        }
        if (name === "更换头像") {

        }
      },
      confirmDialog() {
        console.log("确认");
      }
    }
  };
</script>

<style lang="less" scoped>
  .my-container {
    padding: 10px 20px 20px 20px;

    .photo-box {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 0 10px #dddee1;
      -webkit-box-shadow: 0 0 10px #dddee1;
      box-shadow: 0 0 10px #dddee1;
      margin-bottom: 10px;

      div {
        display: grid;
        align-items: center;
        justify-items: center;
      }

      .photo {
        font-size: 0;
        padding: 10px 0;

        img {
          width: 80px;
          height: 80px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
      }

      .name {
        display: flex;
        justify-content: center;

        p {
          font-size: 18px;
          font-weight: bold;
          color: #495060;
          line-height: 2;
          margin-right: 10px;
        }
      }
    }

    .curves-box {
      padding-top: 20px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 0 10px #dddee1;
      -webkit-box-shadow: 0 0 10px #dddee1;
      box-shadow: 0 0 10px #dddee1;

      p {
        font-size: 16px;
        color: #495060;
        text-align: center;
        font-weight: bold;
      }
    }

    .myself-box {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 0 10px #dddee1;
      -webkit-box-shadow: 0 0 10px #dddee1;
      box-shadow: 0 0 10px #dddee1;
      padding: 20px 0;
      margin-bottom: 10px;

      .title {
        margin-bottom: 10px;

        p {
          font-size: 16px;
          color: #495060;
          text-align: center;
          margin-right: 10px;
          font-weight: bold;
        }
      }

      .data {

        div {
          display: grid;
          grid-template-columns: 4fr 6fr;
          margin-bottom: 6px;

          &:last-child {
            margin-bottom: 0;
          }

          p {
            font-size: 16px;
            color: #1c2438;
            text-align: center;

            &:nth-of-type(1) {
              text-align: right;
            }

            &:nth-of-type(2) {
              color: #495060;
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;

              span {
                margin-left: 5px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
</style>
