<template>
  <!-- 我创建的对话 / 我收到的对话 -->
  <section class="call_item-container">
    <div hover-class='click_active' @click.stop='onClick'>
      <div class="call_item-header">
        <div v-if="type === '我收到的会话'">
          <span>{{item.name}}</span>
          <span>{{time}}</span>
        </div>
        <div v-if="type === '我建立的会话'">
          <span>我</span>
          <span>{{time}}，给"{{item.name}}"留言</span>
        </div>
        <div @click.stop="onDelete">{{status}}</div>
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
      },
      type: {
        type: String,
        default: '我建立的会话'
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
      grid-template-columns: 5fr 1fr;
      grid-column-gap: 6px;
      margin-bottom: 10px;
      align-items: center;

      div {
        font-size: 14px;

        &:nth-of-type(1) {
          color: #808695;

          span {

            &:nth-of-type(1) {
              color: #17233d;
              font-size: 18px;
              margin-right: 10px;
            }
          }
        }

        &:nth-of-type(2) {
          color: #FF0000;
        }
      }
    }

    .call_item-message {
      color: #17233d;
      font-size: 16px;
    }

    .click_active {
      background-color: #e8eaec !important;
    }
  }

</style>
