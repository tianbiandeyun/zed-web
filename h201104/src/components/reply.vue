<template>
  <section class="reply">
    <div class="reply-who">
      <p>{{speak}}</p>
    </div>
    <div class="reply-details">
      <p>{{item.creation_time}} | 未读</p>
      <p v-if="index != 0" @click='revoke'>撤销</p>
    </div>
    <div class="reply-message">
      {{item.content}}
    </div>
  </section>
</template>

<script>
  export default {
    name: "reply",
    props: {
      item: {
        type: Object
      },
      speak: {
        type: String,
        default: '我的回复'
      },
      // 控制我发送的信息，第一个没有撤回按钮
      index: {
        type: Number
      },
    },
    methods: {
      revoke() {
        this.$emit('revoke');
      }
    }
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
