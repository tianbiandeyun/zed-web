<template>
  <section class="add-container">

    <div class="time-box">
      <p>2020年03月31日</p>
      <p>星期三</p>
    </div>

    <div class="add-box">
      <div class="item">
        <p>当前体重：</p>
        <div>
          <input type="text" placeholder="请输入当前体重">
        </div>
      </div>
      <div class="item">
        <p>时间段：</p>
        <div>
          <picker @change="bindPickerChange" :value="index" :range="array">
            <p>
              当前选择：{{array[index]}}
            </p>
          </picker>
        </div>
      </div>
    </div>

    <!--时间段-->
    <v-popup
      :show="is_popup"
      position="bottom"
      @close="closePopup"
    >
      <!--<v-picker-->
      <!--show-toolbar-->
      <!--title="选择时间段"-->
      <!--:columns="columns"-->
      <!--@cancel="closeDayTime"-->
      <!--@confirm="getDayTime">-->
      <!--</v-picker>-->


    </v-popup>

  </section>
</template>

<script>

  export default {
    components: {},
    data() {
      return {
        index: 0,
        array: ["美国", "中国", "巴西", "日本"],
        is_popup: false,
        columns: ["上午", "中午", "下午", "晚上"]
      };
    },
    methods: {
      bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e);
      },
      closePopup() {
        this.is_popup = false;
      },
      getDayTime(event) {
        console.log(event.mp.detail);
        this.is_popup = false;
      },
      closeDayTime() {
        this.is_popup = false;
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

          input {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-left: 10px;
          }

          p {
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
