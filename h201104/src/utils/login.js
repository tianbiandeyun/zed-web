export default {
  name: "list",
  mixins: [],
  data() {
    return {};
  },
  methods: {

    async getOpenid() {

      let code = await this.wxLogin();

      // 获取openid
      return new Promise((resolve, reject) => {
        this.$store.dispatch("getOpenid", {
          im: this.$Config.INTER_FACE.xi_login,
          fps: { xicode: code },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.showErrorInfo(res, "xi_login");
          } else {
            resolve(res);
          }
        });
      });

    },
    wxLogin() {
      return new Promise((resolve, reject) => {
        // 获取code
        wx.login({
          success(res) {
            resolve(res.code);
          },
          fail(error) {
            reject(error);
          }
        });
      });
    }

  }
};
