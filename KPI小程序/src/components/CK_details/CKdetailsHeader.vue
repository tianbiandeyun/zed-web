<template>

  <!--v-if="corpid && data.userid" 如果不加这个则名字查询不出来，问题原因是拿不到值-->
  <div class="details-header-container" v-if="corpid && data.userid">

    <section class="task-detail-header">
      <p class="task-detail-name">{{data.task_name}}</p>
      <!--只有 登陆人 === 任务创建人 才显示，修改任务-->
      <p class="task-detail-modify"
         v-if="loginUserid === data.userid && page !=='review_details' " @click="modifyTask">
        修改考核目标</p>
    </section>
    <section class="task-detail-created-user">
      目标创建人：
      <ww-open-data
        :corpid="corpid"
        :openid="data.userid"
        type="userName"></ww-open-data>
      <span style="margin-left: 10px">创建时间：{{data.start_date}}</span>
    </section>

  </div>
</template>

<script>
  export default {
    name: "CKdetailsHeader",
    props: {
      page: {
        type: String
      },
      data: {
        type: Object
      },
      corpid: {
        type: String
      },
      loginUserid: {
        type: String
      }
    },
    methods: {
      modifyTask() {
        const that = this;
        that.$emit("modifyTask");
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  section {
    background-color: #fff;
  }

  .details-header-container {

    .task-detail-header {
      .default-box-sizing;
      .default-padding-10-20();
      .default-flex();
      font-size: @default-font-size-16;

      .task-detail-name {
        color: @default-title-color;
      }

      .task-detail-modify {
        color: green;
        font-size: @default-font-size-14;
      }
    }

    .task-detail-created-user {
      display: flex;
      .default-box-sizing;
      .default-padding-10-20(@t:0px);
      font-size: @default-font-size-14;
      color: @default-sub-color;
    }
  }

</style>
