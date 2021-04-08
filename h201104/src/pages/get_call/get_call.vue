<template>
  <section class="get-call-container">

    <!-- <div class="call">
      <get-line @getCall="getCall" @delGetCall="delGetCall"></get-line>
    </div>

    <div class="call">
      <reply></reply>
    </div>

    <div class="call">
      <input-group></input-group>
    </div> -->

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
    mounted() {
      this.$Utils.showWaiting();
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
            console.log(res);
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
