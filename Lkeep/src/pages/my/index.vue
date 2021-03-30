<template>
  <section class="my-container">

    <div class="photo-box">
      <div class="photo">
        <img @click="show = true" src="../../../static/images/photo.png" alt="张琳">
      </div>
      <div class="name">
        <p>名字</p>
        <v-icon name="edit" size="18" color="#495060"></v-icon>
      </div>
    </div>

    <div class="curves-box">
      <p>一周体重趋势</p>
      <ZedEchart :t="t"></ZedEchart>
    </div>

    <!--点击头像菜单-->
    <v-action-sheet
      :show="show"
      :actions="actions"
      description="头像操作"
      z-index="9999"
      @close="close"
      @select="select"></v-action-sheet>
  </section>
</template>

<script>
  import ZedEchart from "../../components/ZedEchart";

  export default {
    components: { ZedEchart },
    data() {
      return {
        t: [83, 90, 99, 102, 110, 92, 89],
        show: false,
        actions: [
          {
            name: "查看大图"
          },
          {
            name: "更换头像"
          }
        ]
      };
    },
    methods: {
      close() {
        this.show = false;
      },

      select(event) {
        let name = event.mp.detail;
        if (name === "查看大图") {

        }
        if (name === "更换头像") {

        }
      }
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
