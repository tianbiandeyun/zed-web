<template>
  <section class="home-contaienr">
    <button @click="countAdd">add</button>
    <p>{{count}}</p>
    <test></test>
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

      return {
        ...toRefs(data),
        countAdd
      }
    }
  }
</script>
<style lang="less">

</style>