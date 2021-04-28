<template>
  <section class="home-contaienr">
    <button @click="countAdd">add</button>
    <p>{{count}}</p>
    <test name='jack' @sendName='sendName'></test>
  </section>
</template>
<script>
  import test from '@/components/test'
  import {
    reactive,
    toRefs
  } from 'vue'
  export default {
    name: 'home',
    components: {
      test
    },
    setup(props, context) {

      const data = reactive({
        count: 99,
      })

      const countAdd = () => {
        data.count++;
        console.log(context);
      }

      const sendName = res => {
        console.log(res);
      }

      return {
        ...toRefs(data),
        countAdd,
        sendName
      }
    }
  }
</script>
<style lang="less">

</style>