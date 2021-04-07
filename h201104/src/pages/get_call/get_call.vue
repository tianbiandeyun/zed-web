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
      console.log('33');
      this.$Utils.showWaiting();

      this.$Utils.closeWaiting();

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
