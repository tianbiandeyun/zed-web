<template>
  <section class="reply">
    <div class="reply-who">
      <p>我</p>
    </div>
    <div class="reply-details">
      <p>十几分钟，之前给xxx留言 | 未读</p>
      <p>移除</p>
    </div>
    <div class="reply-message">
      我是留言。我是留言。我是留言。我是留言。我是留言。我是留言。
      我是留言。我是留言。
    </div>
  </section>
</template>

<script>
  export default {
    name: "reply"
  };

</script>

<style lang="less" scoped>
  .reply {

    .reply-who {
      margin-bottom: 10px;

      p {
        color: #17233d;
        font-size: 18px;
      }
    }

    .reply-details {
      display: grid;
      grid-template-columns: 4fr 1fr;
      grid-column-gap: 6px;
      margin-bottom: 10px;
      align-items: center;

      p {

        &:nth-of-type(1) {
          color: #808695;
          font-size: 14px;
        }

        &:nth-of-type(2) {
          text-align: center;
          color: #FF0000;
          font-size: 14px;
        }
      }

    }

    .reply-message {
      color: #515a6e;
      font-size: 16px;
    }

  }

</style>
