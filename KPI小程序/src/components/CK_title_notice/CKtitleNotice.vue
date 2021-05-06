<template>
  <section class="title-notice-container">

    <div v-if="ordMessage" class="title-notice">{{ordMessage}}</div>

    <div v-else class="title-notice">请传入显示信息</div>

  </section>
</template>

<script>
  export default {
    name: "title-notice-container",
    props: {
      /**
       * 普通提示
       * */
      ordMessage: {
        type: String
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .title-notice {
    .default-box-sizing;
    color: @default-sub-color;
    font-size: @default-font-size-14;
    .default-padding-10-20()
  }
</style>
