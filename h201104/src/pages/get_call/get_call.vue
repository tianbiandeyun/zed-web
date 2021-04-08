<template>
  <section class="get-call-container">

    <div class="call" v-for="(item,index) in list" :key="index">
      <div v-if="u_key != item.trigger_ukey">
        <get-line :item='item' del-content='举报此消息'></get-line>
      </div>
      <div v-else>
        <reply :item='item' del-content='撤回'></reply>
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
        list: []
      }
    },
    mounted() {
      this.$Utils.showWaiting();
      this.u_key = this.$root.$mp.query.u_key;

      // 获取对话详情
      this.refreshMessageDetails(this.$root.$mp.query.id);
    },
    methods: {
      submit(res) {

        this.$Utils.showWaiting();

        let _id = this.$root.$mp.query.id;
        let _u_key = this.$root.$mp.query.u_key;
        let _trigger_ukey = this.list[0].trigger_ukey;
        let _message = res.message;

        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.set_reply_to_message,
          fps: {
            'message_id': _id,
            'u_key': _u_key,
            'second_ukey': _trigger_ukey,
            'content': _message,
            'receive_message': 1
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "set_reply_to_message");
          } else {
            if (res.back_value) {
              this.refreshMessageDetails(this.$root.$mp.query.id);
            }
          }
        });

      },
      refreshMessageDetails(...res) {
        let [id] = [...res];
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_chat_record_info,
          fps: {
            message_id: id
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
