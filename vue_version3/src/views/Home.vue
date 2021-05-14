<template>
  <section class="home-contaienr">
    <button @click="countAdd">add</button>
    <p>{{count}}</p>
    <test name='jack' @sendName='sendName'></test>

    <router-link to='/about'>about</router-link>

  </section>
</template>
<script>
  import test from '@/components/test'
  import {
    useRouter
  } from 'vue-router'
  import {
    useStore,
  } from 'vuex'
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

      const store = useStore();

      console.log(store.state);

      const {
        push
      } = useRouter();

      const data = reactive({
        count: 99,
      })

      const countAdd = () => {
        data.count++;
        push(`/about?a=${20}&b=jack`)
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