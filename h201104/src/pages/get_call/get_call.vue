<template>
  <section class="get-call-container">

    <div class="call" v-if="list != ''">
      <get-line :item='list.conversation' @getCall="goUser(list)" @delCall='delCall2(list.conversation)'></get-line>
    </div>

    <div class="call" v-for="(item,index) in list.reply" :key="index">

      <div v-if='u_key == item.trigger_ukey'>
        <reply :item='item' @revoke='revoke(item)'></reply>
      </div>
      <div v-else>
        <get-line :item='item' @delCall='delCall(index)'></get-line>
      </div>

    </div>

    <div class="call">
      <input-group @submit='submit'></input-group>
    </div>

    <!-- 请选择举报原因 -->
    <v-dialog use-slot title="请选择举报原因" confirm-button-color='#19be6b' :show="is_dialog" show-cancel-button
      @cancel='is_dialog = false;checkbox = []' @confirm="confirm">
      <div class="jubao">
        <v-checkbox-group :value="checkbox" @change="onChange">
          <v-checkbox name="发布不适内容对我造成骚扰">发布不适内容对我造成骚扰</v-checkbox>
          <div class="item"></div>
          <v-checkbox name="存在欺诈骗钱行为">存在欺诈骗钱行为</v-checkbox>
          <div class="item"></div>
          <v-checkbox name="存在侵权行文">存在侵权行文</v-checkbox>
          <div class="item"></div>
          <v-checkbox name="存在煽动反动色情内容">存在煽动反动色情内容</v-checkbox>
        </v-checkbox-group>
      </div>
    </v-dialog>

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
        list: '',
        is_dialog: false,
        checkbox: [],
        index: '' // 举报信息的index
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
      goUser(res) {
        wx.navigateTo({
          url: `/pages/user_center/main?m_key=${this.u_key}&u_key=${res.conversation.trigger_ukey}`
        });
      },
      /**
       * 举报信息
       */
      confirm() {
        const that = this;
        that.is_dialog = false;

        if (that.checkbox.length === 0) {
          wx.showModal({
            title: "提示",
            showCancel: false,
            content: "请选择举报原因",
            success(res) {}
          });
          return false;
        }

        let content = that.checkbox.join('|');

        // 因为要共用一个选择举报理由的选框，所以如果是 9999 的话，说明点击的是顶部的举报信息
        if (that.index === 9999) {

          let id = that.list.conversation.id;
          let operation_status = that.list.conversation.operation_status;

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
                      content: content
                    },
                    url: that.$Config.REQUEST_URI
                  }).then(res => {
                    if (res.result === "failure") {
                      that.$Utils.closeWaiting();
                      that.$Utils.showErrorInfo(res, "accuse_message");
                    } else {
                      if (res.back_value) {
                        that.checkbox = [];
                        // 获取对话详情
                        that.refreshMessageDetails(that.id);
                      }
                    }
                  });
                } else if (res.cancel) {
                  that.checkbox = [];
                  console.log('用户点击取消')
                }
              }
            })
          }

        } else {

          let id = that.list.reply[that.index].id;
          let operation_status = that.list.reply[that.index].operation_status;

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
                      content: content
                    },
                    url: that.$Config.REQUEST_URI
                  }).then(res => {
                    if (res.result === "failure") {
                      that.$Utils.closeWaiting();
                      that.$Utils.showErrorInfo(res, "accuse_message");
                    } else {
                      if (res.back_value) {
                        this.checkbox = [];
                        // 获取对话详情
                        that.refreshMessageDetails(that.id);
                      }
                    }
                  });
                } else if (res.cancel) {
                  that.checkbox = [];
                  console.log('用户点击取消')
                }
              }
            })
          }

        }
      },
      /**
       * 选择举报理由
       */
      onChange(event) {
        this.checkbox = event.mp.detail;
      },
      /**
       * 打开举报信息
       */
      delCall(index) {

        this.index = index;
        let operation_status = this.list.reply[this.index].operation_status;
        // 如果已经举报则退出
        if (operation_status === 3) {
          return false;
        }
        this.is_dialog = true;

      },
      delCall2(res) {

        this.index = 9999;
        let operation_status = res.operation_status;
        // 如果已经举报则退出
        if (operation_status === 3) {
          return false;
        }
        this.is_dialog = true;

      },
      /**
       * 我说的
       */
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
                    if (res.error_code === 2012240131) {

                      wx.showModal({
                        title: "提交",
                        content: "消息对方已阅读无法撤回",
                        showCancel: false,
                        confirmText: "好的",
                        success() {
                          wx.navigateBack({
                            delta: 1
                          });
                        }
                      });
                      return false;
                    }

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
        that.$Utils.showWaiting();
        let _id = that.$root.$mp.query.id;
        let _u_key = that.u_key;
        let _trigger_ukey = that.list.conversation.trigger_ukey;
        let _message = p.message;

        that.$store.dispatch("fetch", {
          im: that.$Config.INTER_FACE.set_reply_to_message,
          fps: {
            'message_id': _id,
            'u_key': _u_key,
            'second_ukey': _trigger_ukey,
            'content': _message,
            'receive_message': ''
          },
          url: that.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            that.$Utils.closeWaiting();
            if (res.error_code === 201204121753) {

              wx.showModal({
                title: "提交",
                content: "对方已结束本次会话，无法回复",
                showCancel: false,
                confirmText: "好的",
                success() {
                  wx.navigateBack({
                    delta: 1
                  });
                }
              });
              return false;
            }


            that.$Utils.showErrorInfo(res, "set_reply_to_message");
          } else {
            if (res.back_value) {
              that.refreshMessageDetails(that.id);
            }
          }
        });

        // wx.requestSubscribeMessage({
        //   tmplIds: ['gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8'],
        //   success: res => {
        //     if (res.gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8 === 'accept') {
        //       that.$Utils.showWaiting();
        //       that.$store.dispatch("fetch", {
        //         im: that.$Config.INTER_FACE.set_reply_to_message,
        //         fps: {
        //           'message_id': _id,
        //           'u_key': _u_key,
        //           'second_ukey': _trigger_ukey,
        //           'content': _message,
        //           'receive_message': 1
        //         },
        //         url: that.$Config.REQUEST_URI
        //       }).then(res => {
        //         if (res.result === "failure") {
        //           that.$Utils.closeWaiting();
        //           that.$Utils.showErrorInfo(res, "set_reply_to_message");
        //         } else {
        //           if (res.back_value) {
        //             that.refreshMessageDetails(that.id);
        //           }
        //         }
        //       });
        //     }
        //     if (res.gvUFOaZJZQiZ9upgHghtJZ4GUr2wN7BJabg4I687gv8 === 'reject') {
        //       that.$Utils.showWaiting();
        //       that.$store.dispatch("fetch", {
        //         im: that.$Config.INTER_FACE.set_reply_to_message,
        //         fps: {
        //           'message_id': _id,
        //           'u_key': _u_key,
        //           'second_ukey': _trigger_ukey,
        //           'content': _message,
        //           'receive_message': 2
        //         },
        //         url: that.$Config.REQUEST_URI
        //       }).then(res => {
        //         if (res.result === "failure") {
        //           that.$Utils.closeWaiting();
        //           that.$Utils.showErrorInfo(res, "set_reply_to_message");
        //         } else {
        //           if (res.back_value) {
        //             that.refreshMessageDetails(that.id);
        //           }
        //         }
        //       });
        //     }
        //   }
        // })
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

    .jubao {
      padding: 10px 0;
      display: grid;
      align-items: center;
      justify-items: center;

      .item {
        margin-bottom: 10px !important;
      }
    }

  }

</style>
