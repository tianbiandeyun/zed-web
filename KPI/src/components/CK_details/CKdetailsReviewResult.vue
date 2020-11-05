<template>
  <div class="details-review-result">

    <CKtitleNotice ord-message="审查结果列表"></CKtitleNotice>
    <section class="task-detail-result">
      <div class="task-detail-result-item" v-for="(item,index) in data_" :key="index">
        <div class="task-detail-result-item-title">
          <p class="task-detail-result-item-title-date">审查日：{{item.review_date}}</p>
          <p class="task-detail-result-item-title-status" v-if="status[index] === 111">[未审核]</p>
          <p class="task-detail-result-item-title-status"
             :class='status[index] === 333 ? "k_status_active" : ""'
             v-if="status[index] === 333">[扣分]</p>
          <p class="task-detail-result-item-title-status"
             :class='status[index] === 222 ? "wk_status_active" : ""'
             v-if="status[index] === 222">[未扣分]</p>
        </div>
        <div class="task-detail-result-item-details" v-for="(it,ind) in item.review_result_list" :key="ind">
          <p style="display: flex">
            <ww-open-data :corpid="corpid" :openid="it.userid" type="userName"></ww-open-data>
            给
            <span v-if="it.executor_userid !== it.userid">
              <ww-open-data :corpid="corpid" :openid="it.executor_userid" type="userName"></ww-open-data>
            </span>
            <span v-else>自己</span>评{{it.score}}分
          </p>
          <p style="padding-left: 10px">备注：{{it.comment}}</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";

  export default {
    name: "CKdetailsReviewResult",
    components: { CKtitleNotice },
    props: {
      corpid: String,
      data: Array,
      status: Array
    },
    computed: {
      // 处理 小数点 精度问题
      data_() {
        const that = this;
        that.data.forEach((item, index, arr) => {
          item.review_result_list.forEach((item, index, arr) => {
            item.score = parseInt(item.score * 100);
          });
        });
        return that.data;
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  section {
    background-color: #fff
  }

  .task-detail-result {
    .default-box-sizing;
    .default-padding-10-20(@t:0px,@b:0px);
    font-size: @default-font-size-16;
    margin-bottom: 10px;
    .task-detail-result-item {
      line-height: 3;

      .task-detail-result-item-title {
        border-bottom: 1px solid @default-divider-color;
        .default-flex();

        .task-detail-result-item-title-date {
          color: @default-content-color;
        }

        .task-detail-result-item-title-status {
          color: @default-sub-color;
          font-size: @default-font-size-14;
        }

        .wk_status_active {
          color: @default-button-color;
        }
        .k_status_active {
          color: red;
        }

      }

      .task-detail-result-item-details {
        line-height: 2;
        font-size: @default-font-size-14;
        color: @default-sub-color;
      }

    }
  }

</style>
