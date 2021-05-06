<template>
  <div class="details-review-container">

    <CKtitleNotice :ord-message="title"></CKtitleNotice>
    <section class="task-detail-user">
      <div class="task-detail-user-item" v-for="(item,index) in data" :key="index">
        <img class="task-detail-user-photo" :src="item.avatar" alt="">
        <div class="task-detail-user-status">
          <!--1 黄色 ffc300 info-->
          <!--2 蓝色 waiting-->
          <!--3 红色 red info-->
          <!--4 绿色 success-->
          <icon v-if="item.attachinfo_of_task.task_icon_status === 1" type="info" color="#ffc300" size="16"></icon>
          <icon v-if="item.attachinfo_of_task.task_icon_status === 2" type="waiting" size="16"></icon>
          <icon v-if="item.attachinfo_of_task.task_icon_status === 3" type="info" color="red" size="16"></icon>
          <icon v-if="item.attachinfo_of_task.task_icon_status === 4" type="success" size="16"></icon>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";

  export default {
    name: "CKdetailsUserList",
    components: { CKtitleNotice },
    props: {
      data: Array,
      title: String
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  section {
    background-color: #fff;
  }

  .details-review-container {

    .task-detail-user {
      .default-box-sizing;
      .default-padding-10-20();
      .default-flex(@jc:flex-start);
      flex-wrap: wrap;

      .task-detail-user-item {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        position: relative;

        .task-detail-user-photo {
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          width: 100%;
          height: 100%;
        }
        .task-detail-user-status {
          background-color: #fff;
          border-radius: 50%;
          position: absolute;
          top: -4px;
          right: -4px;
          z-index: 1;
          width: 16px;
          height: 16px;
          font-size: 0;
        }

      }
    }
  }


</style>
