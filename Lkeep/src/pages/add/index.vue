<template>
  <section class="add-container">

    <div class="time-box">
      <p>2020年03月31日</p>
      <p>星期三</p>
    </div>

    <div class="add-box">
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
          <input type="number" v-model="shenggao" placeholder="请输入身高">
        </div>
      </div>
      <div class="item">
        <p>当前体重：</p>
        <div>
          <input type="number" v-model="tizhong" placeholder="请输入当前体重">
        </div>
      </div>
      <div class="item">
        <p>BMI：</p>
        <div>
          <p>24.1</p>
        </div>
      </div>
      <div class="item">
        <p>今日目标：</p>
        <div>
          <input type="number" v-model="mubiao" placeholder="请输入今日目标">
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

  </section>
</template>

<script>

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
        shenggao: "",
        tizhong: "",
        mubiao: ""
      };
    },
    methods: {
      selectSex: function(e) {
        this.sex = e.mp.detail.value;
        console.log(this.sex);
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

  }

</style>
