<template>
  <section class="input_group-container">
    <div class="group-title">{{title}}</div>
    <div class="group">

      <v-field :value="value" type="textarea" placeholder="请输入留言" @change="operatGetContent" autosize></v-field>

    </div>
    <div class="group-btn">
      <button @click="submit">{{btnMseeage}}</button>
    </div>
  </section>
</template>

<script>
  export default {
    name: "input_group",
    props: {
      title: {
        type: String,
        default: '新增回复'
      },
      btnMseeage: {
        type: String,
        default: '提交回复'
      }
    },
    data() {
      return {
        value: ''
      }
    },
    methods: {
      /**
       * 输入框文本
       * */
      operatGetContent(event) {
        this.value = event.mp.detail;
      },
      submit() {
        console.log(this.value);
        if (this.value === '') {

          wx.showModal({
            title: "提示",
            content: '留言不能为空',
            showCancel: false,
            confirmText: "继续",
            success() {}
          });

          return false;
        }
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
