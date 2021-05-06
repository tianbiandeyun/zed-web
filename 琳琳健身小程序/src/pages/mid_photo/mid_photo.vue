<template>
  <section class="photo_container">
    <div class="photo_box">
      <v-uploader upload-text="请点击选择头像" preview-size='200' accept="image" max-count="1" :fileList="fileList"
        @afterRead="afterRead" @deleteItem="deleteItem">
      </v-uploader>
    </div>
    <div class="submit">
      <button>上传</button>
    </div>
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
      deleteItem(event) {
        const index = event.mp.detail.index;
        this.fileList.splice(index, 1);
      },
      afterRead(event) {

        // this.$Utils.showWaiting();

        let path = event.mp.detail.file.path;
        console.log(path);

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

        this.fileList.push({
          url: path
        });

      }
    }
  }

</script>
<style lang="less" scoped>
  .photo_container {
    padding: 20px 10px;
    display: grid;
    justify-items: center;
    grid-row-gap: 10px;

    .submit {
      button {
        font-size: 16px;
        color: #fff;
        background-color: #19be6b;
        width: 200px;
      }
    }
  }

</style>
