<template>
  <section class="my-container">

    <div class="photo-box">
      <div class="photo">
        <img src="../../../static/images/photo.png" alt="张琳">
      </div>
      <div class="name">
        <p>名字</p>
        <v-icon name="edit" size="18"></v-icon>
      </div>
    </div>

    <div class="curves-box">
      <p>一周体重趋势</p>
      <ZedEchart :t="t"></ZedEchart>
    </div>

  </section>
</template>

<script>
  import ZedEchart from "../../components/ZedEchart";

  export default {
    components: { ZedEchart },
    data() {
      return {
        t: [83, 90, 99, 102, 110, 92, 89]
      };
    }
  };
</script>

<style lang="less" scoped>
  .my-container {
    padding: 10px 20px 20px 20px;

    .photo-box {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 0 10px #dddee1;
      -webkit-box-shadow: 0 0 10px #dddee1;
      box-shadow: 0 0 10px #dddee1;
      margin-bottom: 10px;

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
        border: 1px solid black;
        display: flex;
        justify-content: center;

        p {
          font-size: 18px;
          font-weight: bold;
          color: #495060;
          line-height: 2;
          margin-right: 10px;
        }
      }
    }

    .curves-box {
      padding-top: 20px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      -moz-box-shadow: 0 0 10px #dddee1;
      -webkit-box-shadow: 0 0 10px #dddee1;
      box-shadow: 0 0 10px #dddee1;

      p {
        font-size: 16px;
        color: #495060;
        text-align: center;
      }
    }
  }
</style>
