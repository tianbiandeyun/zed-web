<template>
  <section class="call_line-container">

    <v-tabs :active="active" color="#19be6b" animated swipeable @change="clickTabs">

      <v-tab title="我收到的会话">
        <div class="call" v-for="(item,index) in call_line_list" :key="index">
          <get-line :item="item" @getCall="getCall(item)" @delCall="delGetLine(item)"></get-line>
        </div>
      </v-tab>

      <v-tab title="我建立的会话">
        <div class="call" v-for="(item,index) in call_line_list" :key="index">
          <created-line :item="item" @sendCall='sendCall(item)' @delCall="delCreatedLine(item)"></created-line>
        </div>
      </v-tab>

    </v-tabs>

    <!-- 自定义 tab -->
    <tab selected='1' :message-count='message_count'></tab>

  </section>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import getLine from "@/components/get_line";
  import createdLine from "@/components/create_lline";

  export default {
    name: "call_line",
    components: {
      getLine,
      createdLine
    },
    data() {
      return {
        message_count: 0, // 信息条数
        active: 0, // tab 下标
        call_line_list: [], // 列表
        u_key: '' // 本人 key
      };
    },
    async onShow() {
      this.$Utils.showWaiting();

      // 获取 u_key
      await this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_member_info,
        fps: {
          open_id: this.openid.back_value.open_id,
          u_key: ""
        },
        url: this.$Config.REQUEST_URI
      }).then(res => {
        if (res.result === "failure") {
          this.$Utils.closeWaiting();
          if (res.error_code === 2012100231) {
            throw new Error("未登录");
          } else {
            this.$Utils.showErrorInfo(res, "get_member_info");
          }
        } else {
          if (res.back_value.name === "" || res.back_value.name === null) {
            throw new Error("未登录");
          } else {
            this.u_key = res.back_value.u_key;
          }
        }
      });

      if (this.active === 1) {
        // 如果点击的是我创建的对话，并且从我创建的对话详情回来的
        this.refreshCallLine("trigger_ukey");
      } else {
        // 先获取一下 我收到的留言
        this.refreshCallLine("accepter_ukey");
      }

    },
    methods: {
      /**
       * 我建立的 删除留言
       */
      delCreatedLine(res) {
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
                      // 我建立的 trigger_ukey
                      that.refreshCallLine("trigger_ukey");
                    }
                  }
                });
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        if (operation_status === 5) {
          wx.showModal({
            title: '提示',
            content: '确定移除吗？',
            success(res) {
              if (res.confirm) {
                that.$Utils.showWaiting();
                that.$store.dispatch("fetch", {
                  im: that.$Config.INTER_FACE.conceal_message,
                  fps: {
                    id,
                    u_key: that.u_key
                  },
                  url: that.$Config.REQUEST_URI
                }).then(res => {
                  if (res.result === "failure") {
                    that.$Utils.closeWaiting();
                    that.$Utils.showErrorInfo(res, "conceal_message");
                  } else {
                    if (res.back_value) {
                      // 我建立的 trigger_ukey
                      that.refreshCallLine("trigger_ukey", that.u_key);
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
      /**
       * 我建立的 留言详情
       */
      sendCall(res) {
        let id = res.id;
        this.$Utils.showWaiting();
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.read_message,
          fps: {
            id,
            u_key: this.u_key
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "read_message");
          } else {
            if (res.back_value) {
              wx.navigateTo({
                url: `/pages/send_call/main?id=${id}&u_key=${this.u_key}`
              });
            }
            this.$Utils.closeWaiting();
          }
        });
      },
      /**
       * 我收到的 删除留言
       */
      delGetLine(res) {
        let id = res.id;
        let operation_status = res.operation_status;
        const that = this;
        if (operation_status === 5) {
          wx.showModal({
            title: '提示',
            content: '确定移除吗？',
            success(res) {
              if (res.confirm) {
                that.$Utils.showWaiting();
                that.$store.dispatch("fetch", {
                  im: that.$Config.INTER_FACE.conceal_message,
                  fps: {
                    id,
                    u_key: that.u_key
                  },
                  url: that.$Config.REQUEST_URI
                }).then(res => {
                  if (res.result === "failure") {
                    that.$Utils.closeWaiting();
                    that.$Utils.showErrorInfo(res, "conceal_message");
                  } else {
                    if (res.back_value) {
                      // 我收到的 accepter_ukey
                      that.refreshCallLine("accepter_ukey");
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
      /**
       * 我收到的 留言详情
       */
      getCall(res) {
        if (res.trigger_ukey !== 'root') {
          let id = res.id;
          this.$Utils.showWaiting();
          this.$store.dispatch("fetch", {
            im: this.$Config.INTER_FACE.read_message,
            fps: {
              id,
              u_key: this.u_key
            },
            url: this.$Config.REQUEST_URI
          }).then(res => {
            if (res.result === "failure") {
              this.$Utils.closeWaiting();
              this.$Utils.showErrorInfo(res, "read_message");
            } else {
              if (res.back_value) {
                wx.navigateTo({
                  url: `/pages/get_call/main?id=${id}&u_key=${this.u_key}`
                });
              }
              this.$Utils.closeWaiting();
            }
          });
        } else {
          console.log(res.name);
        }
      },
      /**
       * tab 点击
       */
      clickTabs(event) {
        this.$Utils.showWaiting();
        this.call_line_list = [];
        this.active = event.mp.detail.index;
        if (event.mp.detail.index === 0) {
          // 我收到的 accepter_ukey
          this.refreshCallLine("accepter_ukey");
        } else {
          // 我建立的 trigger_ukey
          this.refreshCallLine("trigger_ukey");
        }
      },
      /**
       * 获取留言信息
       */
      async refreshCallLine(...res) {
        let [type] = [...res];
        await this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_chat_record_list,
          fps: {
            u_key: this.u_key,
            type_str: type
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_chat_record_list");
          } else {
            this.call_line_list = res.back_value;
          }
        });
        // 信息条数
        await this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_unread_message,
          fps: {
            u_key: this.u_key
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_unread_message");
          } else {
            this.message_count = res.back_value;
          }
        });
        this.$Utils.closeWaiting();
      }
    },
    computed: {
      ...mapGetters([
        "openid"
      ])
    }
  };

</script>

<style lang="less" scoped>
  .call_line-container {
    padding-bottom: 100px;

    .call {
      background-color: #fff;
      border-bottom: 1px solid #dcdee2;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px 14px 10px 14px;

      &:last-child {
        border-bottom: none;
      }
    }
  }

</style>
