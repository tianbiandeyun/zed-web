<template>
  <section class="getUserInfo-container" v-if="isScope">
    <div class="getUserInfo-logo">
      <img src="../../static/images/logo.png" alt="">
    </div>
    <!-- <button open-type="getUserInfo" @getuserinfo="setUserInfo">开启授权</button> -->
    <button @click='setUserInfo'>click me</button>
  </section>
</template>

<script>
  export default {
    name: "getUserInfo",
    props: {
      isScope: {
        type: Boolean
      },
      message: {
        type: String,
        default: "请授权头像信息，否则无法进行"
      }
    },
    methods: {
      setUserInfo(e) {
        console.log('33');

        wx.getUserProfile({
          desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
          success: (res) => {
            this.$emit("setUserInfo", res);
            // userInfo:
            //   avatarUrl:
            //   "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL5a5hW2NhrxX5UYVvYj0fS5Yurt5BDDfQqYjrDHXcJt7RjE6qzNLHp2aQt4VRKkgU2evjNH95Avw/132"
            // city: ""
            // country: "China"
            // gender: 2
            // language: "zh_CN"
            // nickName: "Zed"
            // province: ""
          },
          fail: (res) => {
            if (res.errMsg === 'getUserProfile:fail auth deny') {
              wx.showModal({
                title: "提示",
                showCancel: false,
                content: this.message,
                success(res) {}
              });
            }
          }
        })
      }
    }
  };

</script>

<style lang="less" scoped>
  .getUserInfo-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: #fff;
    display: grid;
    grid-template-rows: 2fr 2fr;
    align-items: center;
    justify-items: center;

    .getUserInfo-logo {
      padding-top: 100px;

      img {
        width: 180px;
        height: 180px;
      }
    }

    button {
      width: 300px;
      height: 40px;
      line-height: 40px;
      background-color: #19be6b;
      color: #fff;
    }
  }

</style>
