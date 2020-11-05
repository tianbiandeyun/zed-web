<template>
  <div class="details-content-container">

    <CKtitleNotice ord-message="考核描述"></CKtitleNotice>
    <section class="task-detail-content">{{data.describe}}</section>

  </div>
</template>

<script>
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";

  export default {
    name: "CKdetailsContent",
    components: { CKtitleNotice },
    props: {
      data: Object
    }

  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  section {
    background-color: #fff;
  }

  .details-content-container {

    .task-detail-content {
      .default-box-sizing;
      .default-padding-10-20();
      font-size: @default-font-size-14;
      color: @default-content-color;
    }
  }

</style>
