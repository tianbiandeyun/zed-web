<template>
  <section class="record-container">

    <div class="header">
      <div>
        <p>{{n}}，{{w}}</p>
        <p>{{item.shijianduan}}</p>
      </div>
      <div>
        <v-icon name="arrow" size="26px" color="#495060"></v-icon>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="content">
      <p>{{item.beizhu}}</p>
    </div>

  </section>
</template>

<script>
  export default {
    name: "ZedRecordItem",
    props: {
      item: {
        type: Object
      }
    },
    computed: {
      n() {
        let _item = this.item;
        return this.$Utils.assignDate("YYYY年MM月DD日", _item.riqi);
      },
      w() {
        let _item = this.item;
        return this.$Utils.assignDate("星期W", _item.riqi);
      }
    }
  };

</script>

<style lang="less" scoped>
  .record-container {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    -moz-box-shadow: 0 0 10px #dddee1;
    -webkit-box-shadow: 0 0 10px #dddee1;
    box-shadow: 0 0 10px #dddee1;

    .header {
      display: grid;
      grid-template-columns: 9fr 1fr;
      align-items: center;

      div:nth-of-type(1) {

        p:nth-of-type(1) {
          color: #1c2438;
          font-size: 16px;
        }

        p:nth-of-type(2) {
          color: #495060;
          font-size: 14px;
        }
      }

      div:nth-of-type(2) {
        display: flex;
        align-items: center;
        justify-items: center;
      }
    }

    .content {

      p {
        color: #495060;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
        /*追加这一行代码*/
      }
    }
  }

</style>
