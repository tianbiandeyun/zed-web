<template>
  <section class="sign-container" @click="getUserId">

    <div class="sign-header-photo">
      <img :src="item.wx_photo" alt="">
    </div>

    <div class="sign-plo-details">
      <p>
        <span>{{item.name}}</span>
        <span>（{{item.company}}）</span>
      </p>
      <p v-if="item.display == 2 && item.status == 1">已报名</p>
      <p v-else-if="item.display == 2 && item.status == 2">{{time}}</p>
      <p v-else>审核中</p>
    </div>

    <div v-if="item.display == 2 && item.status == 2" class="sign-is-sign">
      <span>已签到</span>
    </div>

  </section>
</template>

<script>
  export default {
    name: "sign",
    props: {
      item: {
        type: Object
      }
    },
    methods: {
      getUserId() {
        this.$emit("getUserId", this.item.u_key);
      }
    },
    computed: {
      time() {
        let time = this.item.check_in_time;
        if (time) {
          return this.$Utils.format(time);
        }
      }
    }
  };

</script>

<style lang="less" scoped>
  .sign-container {
    border-bottom: 1px solid #dcdee2;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    justify-content: center;
    grid-column-gap: 10px;
    padding-bottom: 10px;

    .sign-header-photo {
      display: grid;
      justify-content: center;

      img {
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 1px solid #dcdee2;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
      }
    }

    .sign-plo-details {
      display: grid;
      grid-template-rows: repeat(2, 1fr);

      >p {
        font-size: 14px;
        color: #c5c8ce;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:nth-of-type(1) {

          span {

            &:nth-of-type(1) {
              color: #515a6e;
              font-weight: bold;
            }
          }
        }
      }
    }

    .sign-is-sign {
      text-align: center;
      font-size: 14px;
      color: #19be6b;
    }
  }

</style>
