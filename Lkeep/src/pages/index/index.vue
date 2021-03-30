<template>
  <section class="index-container">


    <div class="record-box" v-for="(item,index) in 10" :key="index">
      <ZedRecordItem></ZedRecordItem>
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
        t: [80, 97, 99, 104, 111, 101, 87]
      };
    },
    methods: {}
  };
</script>

<style lang="less" scoped>
  .index-container {
    padding: 20px;

    .record-box {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
