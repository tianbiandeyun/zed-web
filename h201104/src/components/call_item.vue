<template>
  <!-- 我创建的对话 / 我收到的对话 -->
  <section class="call_item-container">
    <div hover-class='click_active' @click.stop='onClick'>
      <div class="call_item-header">
        <p>我</p>
        <p>{{time}}，给"{{item.name}}"留言</p>
        <p @click.stop="onDelete">{{status}}</p>
      </div>
      <div class="call_item-message">{{item.content}}</div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "call_item",
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      onClick() {
        this.$emit('onClick');
      },
      onDelete() {
        this.$emit("onDelete");
      }
    },
    computed: {
      time() {
        let time = this.item.creation_time;
        if (time) {
          return this.$Utils.format(time);
        }
      },
      status() {
        let _status = {
          1: '',
          2: '举报信息',
          3: '已经举报',
          4: '撤回',
          5: '删除'
        }
        return _status[this.item.operation_status];
      }
    }
  };

</script>

<style lang="less" scoped>
  .call_item-container {

    .call_item-header {
      display: grid;
      grid-template-columns: 30px 4fr 1fr;
      grid-column-gap: 6px;
      margin-bottom: 10px;
      align-items: center;

      p {

        &:nth-of-type(1),
        &:nth-of-type(3) {
          text-align: center;
        }

        &:nth-of-type(1) {
          color: #17233d;
          font-size: 18px;
        }

        &:nth-of-type(2) {
          color: #808695;
          font-size: 14px;
        }

        &:nth-of-type(3) {
          color: #FF0000;
          font-size: 14px;
        }
      }
    }

    .call_item-message {
      color: #515a6e;
      font-size: 16px;
    }

    .click_active {
      background-color: #e8eaec !important;
    }
  }

</style>
