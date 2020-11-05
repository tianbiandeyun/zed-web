<template>
  <section class="bottom-button-container">
    <button @click="operat">{{name}}</button>
  </section>
</template>

<script>
  export default {
    name: "CKbutton",
    props: {
      name: {
        type: String
      }
    },
    methods: {
      operat() {
        const that = this;
        that.$emit("operat");
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .bottom-button-container {
    .default-box-sizing;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    padding: 4px 20px;
    background-color: #fff;
    height: 70px;
    -moz-box-shadow: 0 0 8px #808695;
    -webkit-box-shadow: 0 0 8px #808695;
    box-shadow: 0 0 8px #808695;

    button {
      background-color: @default-button-color;
      color: #fff;
      height: 40px;
      line-height: 40px;
      font-size: @default-font-size-16;
    }

  }

</style>
