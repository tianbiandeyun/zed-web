<template>
  <section class="get-call-container">

    <div class="call" v-if="list != ''">
      <get-line :item='list.conversation' @delCall='delCall(list.conversation)'></get-line>
    </div>

    <div class="call" v-for="(item,index) in list.reply" :key="index">

      <div v-if='u_key == item.trigger_ukey'>
        <reply :item='item' @revoke='revoke(item)'></reply>
      </div>
      <div v-else>
        <get-line :item='item' @delCall='delCall(item)'></get-line>
      </div>

    </div>

    <div class="call">
      <input-group @submit='submit'></input-group>
    </div>

  </section>
</template>

<script>
  import getLine from "@/components/get_line";
  import reply from "@/components/reply";
  import inputGroup from '@/components/input_group'

  export default {
    name: "get_call",
    components: {
      getLine,
      reply,
      inputGroup
    },
    data() {
      return {
        u_key: '',
        id: '',
        list: ''
      }
    },
    mounted() {
      this.$Utils.showWaiting();
      this.u_key = this.$root.$mp.query.u_key;
      this.id = this.$root.$mp.query.id;

      // 获取对话详情
      this.refreshMessageDetails(this.id);
    },
    methods: {
      delCall(res) {

        let id = res.id;
        let operation_status = res.operation_status;
        const that = this;
        if (operation_status === 2) {

          wx.showModal({
            title: '提示',
            content: '确定举报吗？',
            success(res) {
              if (res.confirm) {
                that.$Utils.showWaiting();
                that.$store.dispatch("fetch", {
                  im: that.$Config.INTER_FACE.accuse_message,
                  fps: {
                    id,
                    u_key: that.u_key,
                    // 举报内容 - 新增
                    content: ''
                  },
                  url: that.$Config.REQUEST_URI
                }).then(res => {
                  if (res.result === "failure") {
                    that.$Utils.closeWaiting();
                    that.$Utils.showErrorInfo(res, "accuse_message");
                  } else {
                    if (res.back_value) {
                      // 获取对话详情
                      that.refreshMessageDetails(that.id);
                    }
                  }
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

        }

      },
      revoke(res) {

        let id = res.id;
        let operation_status = res.operation_status;
        const that = this;

        if (operation_status === 4) {

          wx.showModal({
            title: '提示',
            content: '确定撤回吗？',
            success(res) {
              if (res.confirm) {
                that.$Utils.showWaiting();
                that.$store.dispatch("fetch", {
                  im: that.$Config.INTER_FACE.revoke_message,
                  fps: {
                    id,
                    u_key: that.u_key
                  },
                  url: that.$Config.REQUEST_URI
                }).then(res => {
                  if (res.result === "failure") {
                    that.$Utils.closeWaiting();
                    that.$Utils.showErrorInfo(res, "revoke_message");
                  } else {
                    console.log(res);
                    if (res.back_value) {
                      // 获取对话详情
                      that.refreshMessageDetails(that.id);
                    }
                  }
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })

        }

      },
      submit(p) {

        const that = this;

        let _id = that.$root.$mp.query.id;
        let _u_key = that.u_key;
        let _trigger_ukey = that.list[0].trigger_ukey;
        let _message = p.message;

        wx.requestSubscribeMessage({
          tmplIds: ['gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8'],
          success: res => {
            if (res.gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8 === 'accept') {
              that.$Utils.showWaiting();
              that.$store.dispatch("fetch", {
                im: that.$Config.INTER_FACE.set_reply_to_message,
                fps: {
                  'message_id': _id,
                  'u_key': _u_key,
                  'second_ukey': _trigger_ukey,
                  'content': _message,
                  'receive_message': 1
                },
                url: that.$Config.REQUEST_URI
              }).then(res => {
                if (res.result === "failure") {
                  that.$Utils.closeWaiting();
                  that.$Utils.showErrorInfo(res, "set_reply_to_message");
                } else {
                  if (res.back_value) {
                    that.refreshMessageDetails(that.id);
                  }
                }
              });
            }
            if (res.gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8 === 'reject') {
              that.$Utils.showWaiting();
              that.$store.dispatch("fetch", {
                im: that.$Config.INTER_FACE.set_reply_to_message,
                fps: {
                  'message_id': _id,
                  'u_key': _u_key,
                  'second_ukey': _trigger_ukey,
                  'content': _message,
                  'receive_message': 2
                },
                url: that.$Config.REQUEST_URI
              }).then(res => {
                if (res.result === "failure") {
                  that.$Utils.closeWaiting();
                  that.$Utils.showErrorInfo(res, "set_reply_to_message");
                } else {
                  if (res.back_value) {
                    that.refreshMessageDetails(that.id);
                  }
                }
              });
            }
          }
        })
      },
      refreshMessageDetails(...res) {
        let [id] = [...res];
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_chat_record_info,
          fps: {
            message_id: id,
            u_key: this.u_key
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_chat_record_info");
          } else {
            this.list = res.back_value;
            this.$Utils.closeWaiting();
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .get-call-container {

    .call {
      background-color: #FFF;
      border-bottom: 1px solid #dcdee2;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px 14px 10px 14px;
    }

  }

</style>
