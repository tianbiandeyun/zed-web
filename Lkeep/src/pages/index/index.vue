<template>
  <section class="index-container">

    <div class="record">

      <div class="header">
        <div>
          <p>2020年03月30日，星期二</p>
          <p>上午</p>
        </div>
        <div>
          <v-icon name="arrow" size="26px" color="#495060"></v-icon>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="content">
        我是一些内容
      </div>

    </div>

  </section>
</template>

<script>

  export default {
    data() {
      return {};
    }
  };
</script>

<style lang="less" scoped>
  .index-container {
    padding: 20px;

    .record {
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

      }
    }
  }
</style>
