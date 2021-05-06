<template>
  <div class="details-doing-container">

    <CKtitleNotice ord-message="执行日期"></CKtitleNotice>
    <section class="task-detail-date">
      <div class="date">
        <p class="date-miaoshu">开时时间：</p>
        <p class="date-value">{{data.start_date}}</p>
      </div>
      <div class="date">
        <p class="date-miaoshu">结束时间：</p>
        <p class="date-value">{{data.end_date}}</p>
      </div>
    </section>

  </div>
</template>

<script>
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";

  export default {
    name: "CKdetailsDate",
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

  .details-doing-container {

    .task-detail-date {
      .default-box-sizing;
      .default-padding-10-20(@t:0px,@b:0px);
      .date {
        .default-flex();
        font-size: @default-font-size-16;
        .default-padding-10-20(@r:0px,@l:0px);
        border-bottom: 1px solid @default-divider-color;
      }

      .date-miaoshu {
        width: 90px;
        color: @default-content-color;
      }

      .date-value {
        color: @default-sub-color;
        width: calc(100% - 94px);
        text-align: left;
      }
    }

  }


</style>
