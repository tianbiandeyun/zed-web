<template>
  <section class="created-container">

    <div class="call">
      <input-group @submit='submit' :title='title' btn-mseeage='发送对话'></input-group>
    </div>

  </section>
</template>

<script>
  import inputGroup from '@/components/input_group'

  export default {
    name: "created",
    components: {
      inputGroup
    },
    data() {
      return {
        u_key: '',
        m_key: '',
        title: ''
      }
    },
    mounted() {
      this.$Utils.showWaiting();
      this.u_key = this.$root.$mp.query.u_key;
      this.m_key = this.$root.$mp.query.m_key;
      this.title = `给（${this.$root.$mp.query.name}）留言：`;
      this.$Utils.closeWaiting();
    },
    methods: {
      submit(p) {
        const that = this;
        that.$Utils.showWaiting();
        that.$store.dispatch("fetch", {
          im: that.$Config.INTER_FACE.set_initiate_a_session,
          fps: {
            'u_key': that.m_key,
            'second_ukey': that.u_key,
            'content': p.message,
            'receive_message': 1
          },
          url: that.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            that.$Utils.closeWaiting();
            that.$Utils.showErrorInfo(res, "set_initiate_a_session");
          } else {
            if (res.back_value) {
              that.$Utils.closeWaiting();
              wx.showModal({
                title: "提交",
                content: `发送成功`,
                showCancel: false,
                confirmText: "好的",
                success() {
                  wx.navigateBack({
                    delta: 1
                  });
                }
              });
            }
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .created-container {

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
