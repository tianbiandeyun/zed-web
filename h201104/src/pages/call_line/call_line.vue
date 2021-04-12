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

  </section>
</template>

<script>
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
        active: 0,
        call_line_list: [],
        u_key: ''
      };
    },
    mounted() {
      this.$Utils.showWaiting();

      // 本页面用到的所有 u_key 在此修改
      this.u_key = this.$root.$mp.query.u_key;

      // 先获取一下 我收到的留言
      this.refreshCallLine("accepter_ukey", this.u_key);
    },
    methods: {
      /**
       * 我建立的 删除留言
       */
      delCreatedLine(res) {
        let id = res.id;
        const that = this;

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

      },
      /**
       * 我建立的 留言详情
       */
      sendCall(res) {
        let id = res.id;

        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.read_message,
          fps: {
            u_key: this.u_key,
            id
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
        const that = this;

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
                },
                url: that.$Config.REQUEST_URI
              }).then(res => {
                if (res.result === "failure") {
                  that.$Utils.closeWaiting();
                  that.$Utils.showErrorInfo(res, "conceal_message");
                } else {
                  if (res.back_value) {
                    // 我收到的 accepter_ukey
                    that.refreshCallLine("accepter_ukey", that.u_key);
                  }
                }
              });

            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })

      },
      /**
       * 我收到的 留言详情
       */
      getCall(res) {
        let id = res.id;

        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.read_message,
          fps: {
            u_key: this.u_key,
            id
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
      },
      /**
       * tab 点击
       */
      clickTabs(event) {
        this.$Utils.showWaiting();
        this.call_line_list = [];
        if (event.mp.detail.index === 0) {
          // 我收到的 accepter_ukey
          this.refreshCallLine("accepter_ukey", this.u_key);
        } else {
          // 我建立的 trigger_ukey
          this.refreshCallLine("trigger_ukey", this.u_key);
        }
      },
      /**
       * 获取留言信息
       */
      refreshCallLine(...res) {
        let [type, key] = [...res];
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_chat_record_list,
          fps: {
            u_key: key,
            type_str: type
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_chat_record_list");
          } else {
            this.call_line_list = res.back_value;
            this.$Utils.closeWaiting();
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .call_line-container {
    background-color: #fff;

    .call {
      border-bottom: 1px solid #dcdee2;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px 14px 10px 14px;
    }
  }

</style>
