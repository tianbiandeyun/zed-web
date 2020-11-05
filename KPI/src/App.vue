<script>
  export default {
    created() {
      wx.getSystemInfo({
        success(res) {
          if (res.environment === undefined) {
            wx.showModal({
              title: "提示",
              content: `微信环境 请切换至 企业微信`,
              showCancel: false
            });
          } else {
            console.log("企业微信");

            const updateManager = wx.getUpdateManager();

            updateManager.onCheckForUpdate(res => {
              // 请求完新版本信息的回调，返回 true / false
              console.log(res);
              if (res.hasUpdate) {
                updateManager.onUpdateReady(() => {
                  wx.showModal({
                    title: "更新提示",
                    content: "新版本已经准备好，是否重启应用？",
                    success: function(res) {
                      if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                      }
                    }
                  });
                });
                updateManager.onUpdateFailed(() => {
                  // 新版本下载失败
                  wx.showModal({
                    title: "发现新版本",
                    content: "请删除当前小程序，重新搜索打开..."
                  });
                });
              }
            });

          }
        }
      });
    },
    methods: {},
    computed: {}
  };
</script>

<style>
  page {
    background-color: #f0f0f0;
  }
</style>
