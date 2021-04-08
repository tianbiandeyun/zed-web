<template>
  <section class="input_group-container">
    <div class="group-title">新增回复</div>
    <div class="group">
      <textarea placeholder="请输入内容" maxlength="-1" show-confirm-bar adjust-position disable-default-padding
        v-model="value"></textarea>
    </div>
    <div class="group-btn">
      <button @click="submit">提交回复</button>
    </div>
  </section>
</template>

<script>
  export default {
    name: "input_group",
    data() {
      return {
        value: ''
      }
    },
    methods: {
      submit() {
        this.$emit('submit', {
          message: this.value
        });
        this.value = '';
      }
    }
  };

</script>

<style lang="less" scoped>
  .input_group-container {
    .group-title {
      color: #17233d;
      font-size: 14px;
      padding: 10px 0;
    }

    .group {
      margin-bottom: 10px;

      textarea {
        border: 1px solid #dcdee2;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        width: 100%;
      }
    }

    .group-btn {

      button {
        color: #fff;
        background-color: #19be6b;
        width: 200px;
      }
    }
  }

</style>
