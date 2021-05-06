<template>
  <section class="operat-container">
    <!--操作区域-->

    <div class="operat-item">
      <div class="left" @click="operat(0)">
        <img v-if="hasNotice.user_task" class="tip" src="../../../static/images/redTip.png" alt="">
        <img class="show-img" src="../../../static/images/assess.png" alt="">
        <p>我的考核</p>
      </div>
      <div class="right" @click="operat(1)">
        <img v-if="hasNotice.review_task" class="tip" src="../../../static/images/redTip.png" alt="">
        <img class="show-img" src="../../../static/images/review.png" alt="">
        <p>我的审查</p>
      </div>
    </div>

    <div class="operat-item">
      <div class="left" @click="operat(2)">
        <img v-if="hasNotice['create']" class="tip" src="../../../static/images/redTip.png" alt="">
        <img class="show-img" src="../../../static/images/created.png" alt="">
        <p>统计管理</p>
      </div>
      <div class="right" @click="operat(3)">
        <img class="show-img" src="../../../static/images/analysis.png" alt="">
        <p>应用设置</p>
      </div>
    </div>

    <div class="operat-item">
      <div class="left" @click="operat(4)">
        <img class="show-img" src="../../../static/images/setup.png" alt="">
        <p>建议反馈</p>
      </div>
      <div class="right" @click="operat(5)">
        <img class="show-img" src="../../../static/images/feedback.png" alt="">
        <p>系统帮助</p>
      </div>
    </div>

  </section>
</template>

<script>

  export default {
    name: "operat.vue",
    props: {
      hasNotice: {
        type: Object
      }
    },
    methods: {
      operat(index) {
        const that = this;
        that.$emit("operat", index);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .operat-container {
    width: 90%;
    margin: -50px auto 10px;
    .default-box-sizing;

    .operat-item {
      background-color: #ffffff;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      overflow: hidden;
      padding: 10px 0;

      &:nth-of-type(2) {
        margin: 20px 0;
      }
      .left, .right {
        width: 49.9%;
        position: relative;
        .default-flex(@jc:center);
        flex-wrap: wrap;
        p {
          text-align: center;
          width: 140px;
          font-size: @default-font-size-14;
          color: @default-content-color;
        }
        .tip {
          width: 10px;
          height: 10px;
          position: absolute;
          top: 0;
          right: 60px;
        }
        .show-img {
          width: 50px;
          height: 50px;
        }
      }

      .left {
        float: left;
        &:before {
          content: "";
          width: 1px;
          height: 75px;
          position: absolute;
          top: 0;
          right: 0;
          background: @default-divider-color;
        }
      }

      .right {
        float: right;
      }
    }
  }

</style>
