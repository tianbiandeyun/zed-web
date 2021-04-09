<template>
  <section class="send-call-container">

    <div class="call" v-for="(item,index) in list" :key="index">
      <div v-if="u_key != item.trigger_ukey">
        <get-line :item='item'></get-line>
      </div>
      <div v-else>
        <reply :item='item'></reply>
      </div>
    </div>

    <div class="call">
      <input-group></input-group>
    </div>
  </section>
</template>

<script>
  import getLine from "@/components/get_line";
  import reply from "@/components/reply";
  import inputGroup from '@/components/input_group'

  export default {
    name: "send-call",
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
            console.log(this.list);
            this.$Utils.closeWaiting();
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .send-call-container {

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
