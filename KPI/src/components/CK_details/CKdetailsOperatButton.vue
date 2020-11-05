<template>
  <div class="details-button-container">

    <!--只有 登陆用户不是任务的创建人 才显示这两个按钮-->
    <section class="task-detail-operat" v-if="loginUserid !== data.userid">
      <button class="task-detail-operat-no"
              @click="cancel"
              v-if="buttonStatus === 1 || buttonStatus === 2">
        {{cancelText}}
      </button>
      <button class="task-detail-operat-ok"
              @click="confirm"
              v-if="buttonStatus === 1 || buttonStatus === 3">
        {{confirmText}}
      </button>
    </section>

  </div>
</template>

<script>
  export default {
    name: "CKdetailsOperatButton",
    props: {
      data: Object,
      loginUserid: String,
      buttonStatus: Number,
      cancelText: {
        type: String,
        default: "取消"
      },
      confirmText: {
        type: String,
        default: "确认"
      }
    },
    methods: {
      cancel() {
        const that = this;
        that.$emit("cancel");
      },
      confirm() {
        const that = this;
        that.$emit("confirm");
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  section {
    background-color: #fff;
  }

  .task-detail-operat {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    .default-box-sizing;
    padding: 4px 20px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    -moz-box-shadow: 0 0 8px #808695;
    -webkit-box-shadow: 0 0 8px #808695;
    box-shadow: 0 0 8px #808695;

    button {
      background-color: @default-button-color;
      color: #fff;
      width: 46%;
      height: 40px;
      line-height: 40px;
      font-size: @default-font-size-16;
    }

    .task-detail-operat-no {
      background-color: red !important;
    }

  }

</style>
