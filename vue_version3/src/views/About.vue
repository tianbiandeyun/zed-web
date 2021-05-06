<template>
  <section class="about-container">

  </section>
</template>
<script>
  import {
    useRoute
  } from 'vue-router'
  export default {
    name: 'about',
    setup() {
      const {
        path,
        query
      } = useRoute();
      console.log(path);
      console.log(query);
    }
  }
</script>
<style lang="less">

</style>