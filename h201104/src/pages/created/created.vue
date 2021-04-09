<template>
  <section class="created-container">

    <div class="call">
      <input-group @submit='submit' :title='title'></input-group>
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
        title: ''
      }
    },
    mounted() {
      this.$Utils.showWaiting();
      this.u_key = this.$root.$mp.query.u_key;
      this.title = `给（${this.$root.$mp.query.name}）留言：`
      this.$Utils.closeWaiting();
    },
    methods: {}
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
