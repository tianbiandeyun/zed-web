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

  </section>
</template>

<script>
  import ZedRecordItem from "../../components/ZedRecordItem";
  import echart from "../../components/echart";

  export default {
    components: { ZedRecordItem, echart },
    data() {
      return {
        list: [
          {
            month: 3,
            list: [1, 2, 4, 5, 6, 7, 8, 9]
          },
          {
            month: 4,
            list: [1, 2, 4, 5, 6, 7, 8, 9]
          }
        ]
      };
    },
    methods: {}
  };
</script>

<style lang="less" scoped>
  .index-container {
    padding: 20px;

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
  }
</style>
