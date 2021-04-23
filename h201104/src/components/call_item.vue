<template>
  <!-- 我创建的对话 / 我收到的对话 -->
  <section class="call_item_container">

    <div hover-class='click_active' class="call" @click.stop='onClick'>

      <button v-if="type === 'system'" class="call_system_left" session-from="laiyuan"
        :send-message-title="item.content" open-type="contact" send-message-path="pages/call_line/main"
        :send-message-img="item.file_img" show-message-card="true" @contact="onContact">
        <div class="left_top">
          <span>系统消息</span>
          <span>{{time}}</span>
          <span v-if="item.message_status === 1"></span>
        </div>
        <div class="left_bottom">
          <div>{{item.content}}</div>
        </div>
      </button>

      <div v-else class="call_left">

        <div class="left_top">
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
        </div>

        <div class="left_bottom">
          <div>{{item.content}}</div>
        </div>

      </div>

      <div class="call_right">
        <div @click.stop="onDelete">{{status}}</div>
      </div>

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
  .call_item_container {

    .call {
      display: grid;
      grid-template-columns: 5fr 1fr;

      .call_system_left {
        background-color: transparent;
        text-align: left;
        padding: 0;
        color: #17233d;
        font-size: 16px;
        line-height: 1;
        width: 100%;

        &::after {
          border: none;
        }

        .left_top {
          margin-bottom: 10px;

          span {

            &:nth-of-type(1) {
              color: #17233d;
              font-size: 18px;
              margin-right: 10px;
              color: red;
            }

            &:nth-of-type(2) {
              font-size: 14px;
              color: #808695;
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

        .left_bottom {
          div {
            color: #17233d;
            font-size: 16px;
          }
        }
      }


      .call_left {

        .left_top {
          margin-bottom: 10px;

          div {

            &:nth-of-type(1) {

              span {

                &:nth-of-type(1) {
                  color: #17233d;
                  font-size: 18px;
                  margin-right: 10px;
                }

                &:nth-of-type(2) {
                  font-size: 14px;
                  color: #808695;
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
          }
        }

        .left_bottom {
          div {
            color: #17233d;
            font-size: 16px;
          }
        }
      }

      .call_right {
        div {
          color: #19be6b;
          text-align: center;
        }
      }
    }

    .click_active {
      background-color: #e8eaec !important;
    }
  }

</style>
