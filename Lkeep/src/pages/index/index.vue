<template>
  <section class="index-container">

    <div class="record-box" v-for="(item,index) in list" :key="index">
      <v-sticky>
        <h1 class="title">{{item.month}}月</h1>
      </v-sticky>
      <div class="item" v-for="(i,k) in item.list" :key="k">
        <ZedRecordItem></ZedRecordItem>
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
        list: [
          {
            month: 3,
            list: [1, 2, 4]
          },
          {
            month: 4,
            list: [1, 2, 4, 5, 6, 7]
          }
        ]
      };
    },
    methods: {
      add() {
        wx.navigateTo({
          url: `/pages/add/main`
        });
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
