<template>
  <section class="video_detail_container" v-if="index">
    <video
      id="myVideo"
      :src="getVideoInfo.data.back_value[index].url"
      controls
      autoplay
    ></video>
  </section>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "video_detail",
    data() {
      return {
        index: ""
      };
    },
    mounted() {
      const that = this;
      that.index = that.$root.$mp.query.index;
      console.log(that.getVideoInfo.data.back_value[that.index].url);
    },
    computed: {
      ...mapGetters([
        "getVideoInfo"
      ])
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .video_detail_container video {
    width: 100%;
  }
</style>
