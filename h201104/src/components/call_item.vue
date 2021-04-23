<template>
  <!-- 我创建的对话 / 我收到的对话 -->
  <section class="call_item-container">
    <div hover-class='click_active' @click.stop='onClick'>

      <div class="call_item-header">
        <div v-if="type === '我收到的会话'">
          <span>{{item.name}}</span>
          <span>{{time}}</span>
          <span v-if="item.message_status === 1"></span>
        </div>
        <div v-if="type === '我建立的会话'">
          <span>我</span>
          <span>{{time}}，给"{{item.name}}"留言</span>
          <span v-if="item.message_status === 1"></span>
        </div>
        <div v-if="type === 'system'">
          <span style='color:red'>系统消息</span>
          <span>{{time}}</span>
          <span v-if="item.message_status === 1"></span>
        </div>
        <div @click.stop="onDelete">{{status}}</div>
      </div>

      <button v-if="type === 'system'" session-from="laiyuan" :send-message-title="item.content" open-type="contact"
        send-message-path="pages/call_line/main" :send-message-img="item.file_img" show-message-card="true"
        @contact="onContact">{{item.content}}</button>

      <div v-else class="call_item-message">{{item.content}}</div>

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
      },
      onContact(e) {
        this.$emit("onContact");
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

            &:nth-of-type(3) {
              display: inline-block;
              background-color: red;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              margin-left: 10px;
            }
          }
        }

        &:nth-of-type(2) {
          color: #19be6b;
        }
      }
    }

    .call_item-message {
      color: #17233d;
      font-size: 16px;
    }

    button {
      background-color: transparent;
      text-align: left;
      padding: 0;
      color: #17233d;
      font-size: 16px;
      line-height: 1;

      &::after {
        border: none;
      }
    }

    .click_active {
      background-color: #e8eaec !important;
    }
  }

</style>
