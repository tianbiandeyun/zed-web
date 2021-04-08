<template>
  <section class="photo-container">
    <v-uploader upload-text="点击上传" accept="image" max-count="1" :fileList="fileList" @afterRead="afterRead">
    </v-uploader>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        fileList: []
      }
    },
    methods: {
      afterRead(event) {

        console.log('afterRead');

        // this.$Utils.showWaiting();

        // let path = event.mp.detail.file.path;
        // console.log(path);

        // const requestUrl = this.$Utils.produceRequestUrl(this.$Config.INTER_FACE.make_img_route, {}, this.$Config
        //   .REQUEST_URI, "post");

        // wx.uploadFile({
        //   url: requestUrl,
        //   filePath: path,
        //   name: "uploads",
        //   header: {
        //     "Content-Type": "multipart/form-data"
        //   },
        //   formData: {
        //     "fps[open_id]": this.openid.back_value.open_id,
        //     "fps[img]": ""
        //   },
        //   success: (res) => {

        //     if (JSON.parse(res.data).result === "failure") {
        //       this.$Utils.closeWaiting();
        //       this.$Utils.showErrorInfo(res, "make_img_route");
        //     } else {
        //       console.log(res);
        //       this.photo = JSON.parse(res.data).back_value;
        //       this.$Utils.closeWaiting();
        //     }

        //   }
        // });

        // this.fileList.push({
        //   url: path
        // });

      }
    }
  }

</script>
<style lang="less" scoped>

</style>
