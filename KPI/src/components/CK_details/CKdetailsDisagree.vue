<template>
  <div class="details-disagree-container">

    <section class="task-detail-disagree" v-for="(item,index) in data" :key="index">
      <div class="task-detail-disagree-title disagree-active" style="display: flex">
        <!--1 创建人 2 审查人 3 执行人-->
        <span>{{item.type === 2 ? "审查人" : "执行人"}}</span>
        "
        <ww-open-data :corpid="corpid" :openid="item.userid" type="userName"></ww-open-data>
        "
        <span>的驳回消息</span>
      </div>
      <div class="task-detail-disagree-content disagree-active">
        {{item.inner_data}}
      </div>
    </section>

  </div>
</template>

<script>
  export default {
    name: "CKdetailsDisagree",
    props: {
      data: Array,
      corpid: String
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .details-disagree-container {

    .task-detail-disagree {

      .task-detail-disagree-title, .task-detail-disagree-content {
        .default-box-sizing;
        color: @default-sub-color;
        font-size: @default-font-size-14;
        .default-padding-10-20();
      }
      .task-detail-disagree-content {
        color: @default-content-color;
        background-color: #fff;
      }
      .disagree-active {
        color: red !important;
      }
    }
  }

</style>
