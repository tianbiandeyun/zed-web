<template>
  <section class="analysis-container">

    <div class="analysis-photo">
      <img :src="data.avatar" alt="">
    </div>

    <div class="analysis-content">
      <p class="analysis-content-title" v-if="data.userid && corpid">
        <ww-open-data
          :corpid="corpid"
          :openid="data.userid"
          type="userName"></ww-open-data>
      </p>
      <p class="analysis-content-detail">状态：{{data.task_count}}个相关绩效表</p>
    </div>

    <div class="analysis-next">
      <img src="../../../static/images/right.png" alt="">
    </div>

  </section>
</template>

<script>
  export default {
    name: "analysis-container",
    props: {
      /**
       * 企业 ID
       * */
      corpid: {
        type: String
      },
      /**
       * 每一个元素
       * */
      data: {
        type: Object
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .analysis-container {
    border-bottom: 1px solid #e8eaec;
    .default-flex();
    padding: 5px 0;

    .analysis-photo {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      overflow: hidden;
      width: 40px;
      height: 44px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .analysis-content {
      width: calc(100% - 100px);

      .analysis-content-title, .analysis-content-detail {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .analysis-content-title {
        color: @default-content-color;
        font-size: @default-font-size-16;
        display: flex;
      }

      .analysis-content-detail {
        color: @default-sub-color;
        font-size: @default-font-size-12;
      }
    }
    .analysis-next {
      font-size: 0;
      img {
        width: 20px;
        height: 20px;
      }
    }

  }


</style>
