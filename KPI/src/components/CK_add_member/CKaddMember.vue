<template>
  <div class="addUserContainer" @click="addMember">
    <div class="addUserImg">
      <img src="../../../static/images/adduser.png" alt="">
    </div>
    <div class="addUserContent">
      <p class="addUserContentTitle">{{objMessage.title}}</p>
      <p v-if="objMessage.detail" class="addUserContentDetail">{{objMessage.detail}}</p>
    </div>
    <div class="addUserRight">
      <img src="../../../static/images/right.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "CKaddMember",
    props: {
      objMessage: {
        type: Object
      }
    },
    methods: {
      addMember() {
        const that = this;
        that.$emit("addMember", { "res": "success" });
      }
    }
  };
</script>

<style>
  .addUserContainer {
    /*border-bottom: 1px solid #e8eaec;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
  }

  .addUserImg {
    width: 35px;
    height: 35px;
    padding: 2px;
    border: .5px solid #808695;
    text-align: center;
    line-height: 35px;
    font-size: 0;
  }

  .addUserImg img {
    vertical-align: middle;
    width: 80%;
    height: 80%;
  }

  .addUserContent {
    width: calc(100% - 90px);
  }

  .addUserContentTitle {
    color: #515a6e;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .addUserContentDetail {
    color: #808695;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .addUserRight {
    font-size: 0;
  }

  .addUserRight img {
    width: 20px;
    height: 20px;
  }
</style>
