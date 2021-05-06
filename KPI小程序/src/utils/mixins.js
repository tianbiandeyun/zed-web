export default {
  methods: {
    /**
     * 注册用户，获取 企业ID 和 userid
     * */
    async _regist_user() {
      const that = this;
      let code = await that.$unit.getCode();
      await that.$store.dispatch("_registUser", {
        im: that.$constData.INTER_FACE.regist_user,
        fps: { code: code },
        url: that.$constData.REQUEST_URI
      }).then(async res => {
        if (res.data.result === "failure") {
          that.$unit.closeWaiting();
          that.$unit.showErrorInfo(res.data, "regist_user");
        } else {
          // qy_id 如果存在，则无需添加
          if (that.getUrlParam("qy_id", that.$constData.REQUEST_URI)) {
          } else {
            that.$constData.SET_REQUEST_URI(res.data.back_value.corpid);
          }
        }
      });
    },
    getUrlParam(name, url) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
      let r = url.substr(1).match(reg); // 匹配目标参数
      if (r != null) return decodeURI(r[2]);
      return null; // 返回参数值
    }
  }
};
