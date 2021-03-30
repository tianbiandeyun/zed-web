<template>
  <section class="my-container">

    <div class="photo-box">
      <div class="photo">
        <img src="../../../static/images/photo.png" alt="张琳">
      </div>
      <div class="name">名字</div>
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
  .my-container {
    padding: 10px 20px 80px 20px;

    .photo-box {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 0 10px #dddee1;
      -webkit-box-shadow: 0 0 10px #dddee1;
      box-shadow: 0 0 10px #dddee1;

      div {
        display: grid;
        align-items: center;
        justify-items: center;
      }

      .photo {
        font-size: 0;
        padding: 10px 0;

        img {
          width: 80px;
          height: 80px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
        }
      }

      .name {
        font-size: 18px;
        font-weight: bold;
        color: #495060;
        line-height: 2;
      }
    }
  }
</style>
