<template>
  <section class="my-container">

    <div class="photo-box">
      <div class="photo">
        <img @click="midPhoto" src="../../../static/images/photo.png" alt="张琳">
      </div>
      <div class="name" @click="midName">
        <p>{{adminInfo.admin_name}}</p>
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
          <p>{{message.jianshen}}<span>/周</span></p>
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

    <div class="curves-box">
      <p>一周体重趋势</p>
      <ZedEchart :t="t"></ZedEchart>
    </div>

    <!--点击头像菜单-->

    <!--修改名字-->

  </section>
</template>

<script>
  import ZedEchart from "@/components/ZedEchart";
  import {
    mapGetters
  } from "vuex";

  export default {
    components: {
      ZedEchart
    },
    data() {
      return {
        t: [83, 90, 99, 102, 110, 92, 89],
        message: "",
        adminInfo: ''
      };
    },
    onTabItemTap() {
      this.refresh();
    },
    methods: {
      async refresh() {

        this.$Utils.showWaiting();

        await this.$store.dispatch("fetch", {
          im: "getMesssage",
          fps: {
            "page": "wodexinxi",
            "openid": this.openidInfo.data.openid
          },
          url: this.$Config.CONST_REQUEST_URI
        }).then(res => {
          this.message = res.data;
        });

        this.$store.dispatch("fetch", {
          im: "getAdmin",
          fps: {
            "page": "wodexinxi",
            "openid": this.openidInfo.data.openid
          },
          url: this.$Config.CONST_REQUEST_URI
        }).then(res => {
          this.adminInfo = res.data;
        });

        this.$Utils.closeWaiting();
      },
      // 打开头像
      midPhoto() {
        wx.navigateTo({
          url: `/pages/mid_photo/main`,
        });
      },
      // 修改名字
      midName() {
        console.log('修改名字');
      }
    },
    computed: {
      ...mapGetters([
        "openidInfo"
      ])
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
