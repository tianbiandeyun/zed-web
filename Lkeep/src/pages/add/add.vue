<template>
  <section class="add-container">

    <div class="time-box">
      <p>{{ymd}}</p>
      <p>{{week}}</p>
    </div>

    <div class="add-box">
      <div class="item">
        <p>年龄：</p>
        <div>
          <input type="number" v-model="nianling" placeholder="请输入年龄">
        </div>
      </div>
      <div class="item">
        <p>性别：</p>
        <div>
          <picker @change="selectSex" :value="sex" :range="a0">
            {{a0[sex]}}
          </picker>
        </div>
      </div>
      <div class="item">
        <p>身高：</p>
        <div>
          <input type="digit" v-model="shenggao" placeholder="请输入身高">
        </div>
      </div>
      <div class="item">
        <p>当前体重：</p>
        <div>
          <input type="digit" v-model="tizhong" placeholder="请输入当前体重">
        </div>
      </div>
      <div class="item">
        <p>BMI：</p>
        <div>
          <p>{{bmi}}</p>
        </div>
      </div>
      <div class="item">
        <p>今日目标：</p>
        <div>
          <input type="digit" v-model="mubiao" placeholder="请输入今日目标">
        </div>
      </div>
      <div class="item">
        <p>时间段：</p>
        <div>
          <picker @change="selectTime" :value="time" :range="a1">
            {{a1[time]}}
          </picker>
        </div>
      </div>
      <div class="item">
        <p>用餐情况：</p>
        <div>
          <picker @change="selectEat" :value="eat" :range="a2">
            {{a2[eat]}}
          </picker>
        </div>
      </div>
      <div class="item">
        <p>身体症状：</p>
        <div>
          <picker @change="selectDisease" :value="disease" :range="a3">
            {{a3[disease]}}
          </picker>
        </div>
      </div>
      <div class="item">
        <p>情绪状况：</p>
        <div>
          <picker @change="selectMoody" :value="moody" :range="a4">
            {{a4[moody]}}
          </picker>
        </div>
      </div>
      <div class="item" v-if="sex == 2">
        <p>生理期：</p>
        <div>
          <picker @change="selectTo" :value="to" :range="a5">
            {{a5[to]}}
          </picker>
        </div>
      </div>
      <div class="item">
        <p>睡眠状态：</p>
        <div>
          <picker @change="selectSleep" :value="sleep" :range="a6">
            {{a6[sleep]}}
          </picker>
        </div>
      </div>
      <div class="item">
        <p>健身状态：</p>
        <div>
          <picker @change="selectDuanLian" :value="duanlian" :range="a7">
            {{a7[duanlian]}}
          </picker>
        </div>
      </div>
      <div class="item">
        <p>备注：</p>
        <div style="height: auto;display: flex;align-items: center">
          <textarea
            maxlength="-1"
            adjust-position
            auto-height
            placeholder="请输入备注"
            v-model="beizhu">
          </textarea>
        </div>
      </div>
    </div>

    <div class="add-button">
      <button @click="add">添加</button>
    </div>

  </section>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    components: {},
    data() {
      return {
        sex: 0,
        a0: ["请选择性别", "男", "女"],
        time: 0,
        a1: ["请选择时间段", "上午", "中午", "下午", "晚上"],
        eat: 0,
        a2: ["请选择用餐情况", "一餐", "二餐", "三餐", "没进食"],
        disease: 0,
        a3: ["请选择身体症状", "舒适", "疼痛", "眩晕", "腹胀", "乏力", "咳嗽"],
        moody: 0,
        a4: ["请选择情绪情况", "无感", "开心", "沮丧", "焦虑", "正常"],
        to: 0,
        a5: ["请选择生理期时间", "进行中", "结束", "马上", "无"],
        sleep: 0,
        a6: ["请选择睡眠情况", "良好", "没睡醒", "还可以", "困"],
        duanlian: 0,
        a7: ["请选择健身情况", "1次", "2次", "3次", "4次", "5次", "6次", "7次"],
        nianling: "",
        shenggao: "",
        tizhong: "",
        mubiao: "",
        beizhu: "",
        ymd: "",
        week: ""
      };
    },
    created() {
      this.ymd = this.$Utils.format("YYYY年MM月DD日");
      this.week = this.$Utils.format("星期W");
      console.log('add')
    },
    methods: {
      add() {

        if (this.nianling === "") {
          wx.showToast({
            title: "请输入年龄",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.sex == 0) {
          wx.showToast({
            title: "请选择性别",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.shenggao == "") {
          wx.showToast({
            title: "请输入身高",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.tizhong == "") {
          wx.showToast({
            title: "请输入当前体重",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.mubiao == "") {
          wx.showToast({
            title: "请输入目标体重",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.time == 0) {
          wx.showToast({
            title: "请选择体重记录时间段",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.eat == 0) {
          wx.showToast({
            title: "请选择用餐记录",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.disease == 0) {
          wx.showToast({
            title: "请选择今日身体症状",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.moody == 0) {
          wx.showToast({
            title: "请选择今日情绪状况",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.sex == 2) {
          if (this.sleep == 0) {
            wx.showToast({
              title: "请选择生理期阶段",
              icon: "none",
              mask: true,
              duration: 1000
            });
            return false;
          }
        }

        if (this.sleep == 0) {
          wx.showToast({
            title: "请选择今日睡眠状况",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        if (this.duanlian == 0) {
          wx.showToast({
            title: "请选择本周健身预计次数",
            icon: "none",
            mask: true,
            duration: 1000
          });
          return false;
        }

        let fps = {
          "page": "tianjiajilu",
          "xingbie": this.a0[this.sex],
          "nianling": this.nianling,
          "shengao": this.shenggao,
          "tizhong": this.tizhong,
          "bmi": this.bmi,
          "mubiao": this.mubiao,
          "shijianduan": this.a1[this.time],
          "yongcan": this.a2[this.eat],
          "zhengzhuang": this.a3[this.disease],
          "qingxu": this.a4[this.moody],
          "shuimian": this.a6[this.sleep],
          "jianshen": this.a7[this.duanlian],
          "beizhu": this.beizhu || "今日比较无语，没有写备注。"
        };

        if (this.sex == 2) {
          fps["shengli"] = this.a5[this.to];
        }

        this.$Utils.showWaiting();

        this.$store.dispatch("fetch", {
          im: "setUserInfo",
          fps,
          url: this.$Config.CONST_REQUEST_URI
        }).then(res => {
          console.log(res);
          if (res.success) {
            wx.showModal({
              title: "祝贺你",
              content: "今日健康添加完成，努力完成吧！",
              showCancel: false,
              success() {
                wx.navigateBack({
                  delta: 1
                });
              }
            });
          }
          this.$Utils.closeWaiting();
        });

      },
      selectSex: function(e) {
        this.sex = e.mp.detail.value;
        if (this.sex != 2) {
          this.to = 0;
        }
      },
      selectTime: function(e) {
        this.time = e.mp.detail.value;
      },
      selectEat: function(e) {
        this.eat = e.mp.detail.value;
      },
      selectDisease: function(e) {
        this.disease = e.mp.detail.value;
      },
      selectMoody: function(e) {
        this.moody = e.mp.detail.value;
      },
      selectTo: function(e) {
        this.to = e.mp.detail.value;
      },
      selectSleep: function(e) {
        this.sleep = e.mp.detail.value;
      },
      selectDuanLian: function(e) {
        this.duanlian = e.mp.detail.value;
      }
    },
    // onUnload() {
    //   this.$Utils.restData(this);
    // },
    computed: {
      bmi() {
        return Math.floor(this.tizhong / ((this.shenggao * this.shenggao) / 10000) * 100) / 100 || 0;
      },
      ...mapGetters([
        "openid"
      ])
    }
  };
</script>

<style lang="less" scoped>

  .add-container {
    padding: 10px 20px 20px 20px;

    .time-box {
      margin-bottom: 10px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 0 10px #dddee1;
      -webkit-box-shadow: 0 0 10px #dddee1;
      box-shadow: 0 0 10px #dddee1;
      padding: 10px 20px;

      p {
        font-size: 28px;
        font-weight: 600;

        &:nth-of-type(1) {
          color: #1c2438;
        }

        &:nth-of-type(2) {
          font-size: 16px;
          color: #495060;
        }
      }
    }

    .add-box {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 0 10px #dddee1;
      -webkit-box-shadow: 0 0 10px #dddee1;
      box-shadow: 0 0 10px #dddee1;
      padding: 10px 20px;
      margin-bottom: 10px;

      .item {
        display: grid;
        grid-template-columns: 3fr 7fr;

        > p {
          line-height: 40px;
          font-size: 16px;
          color: #1c2438;
          text-align: center;
        }

        div {
          height: 40px;

          input, textarea {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-left: 10px;
            color: #495060;
          }

          picker, p {
            width: 100%;
            height: 100%;
            color: #495060;
            line-height: 40px;
            box-sizing: border-box;
            padding-left: 10px;
          }
        }
      }
    }

    .add-button {

      button {
        font-size: 16px;
        color: #fff;
        background-color: #19be6b;
        width: 200px;
      }
    }

  }

</style>
