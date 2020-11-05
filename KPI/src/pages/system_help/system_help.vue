<template>
  <section class="system-help-container">

    <div class="system-help-title">
      我的权限（
      <div v-for="(item,index) in administrators_list" :key="index" style="display: flex">
        <ww-open-data :corpid="corpid" :openid="item" type="userName"></ww-open-data>
        <p v-if="index !== administrators_list.length-1">、</p>
      </div>
      有权调整）
    </div>

    <div class="authority-list">
      <div class="authority-list-item">
        <p class="authority-list-item-left">执行人/审查人权限</p>
        <p class="authority-list-item-right">
          <icon
            v-if="icon_type[1]"
            class="icon-small"
            type="success_no_circle" size="20"></icon>
        </p>
      </div>
      <!--<div class="authority-list-item" @click="showState(22,icon_type[2])">-->
        <!--<p class="authority-list-item-left">部门主管权限</p>-->
        <!--<p class="authority-list-item-right">-->
          <!--<icon v-if="icon_type[2]" class="icon-small"-->
                <!--type="success_no_circle"-->
                <!--size="20"></icon>-->
          <!--<icon v-else class="icon-small" type="info_circle"-->
                <!--size="20"-->
                <!--color="#ffc300"></icon>-->
        <!--</p>-->
      <!--</div>-->
      <div class="authority-list-item" @click="showState(33,icon_type[4])">
        <p class="authority-list-item-left">统计管理权限</p>
        <p class="authority-list-item-right">
          <icon v-if="icon_type[4]" class="icon-small"
                type="success_no_circle"
                size="20"></icon>
          <icon v-else class="icon-small" type="info_circle"
                size="20"
                color="#ffc300"></icon>
        </p>
      </div>
      <div class="authority-list-item" @click="showState(44,icon_type[8])">
        <p class="authority-list-item-left">系统管理权限</p>
        <p class="authority-list-item-right">
          <icon v-if="icon_type[8]" class="icon-small" type="success_no_circle" size="20"></icon>
          <icon
            v-else
            class="icon-small" type="info_circle"
            size="20"
            color="#ffc300"></icon>
        </p>
      </div>
    </div>

    <CKtitleNotice ord-message="使用及帮助文档"></CKtitleNotice>
    <div class="authority-list" v-for="(item,index) in video_info" :key="index">
      <div class="authority-list-item" @click="goViedoDetail(index)">
        <p class="authority-list-item-left">{{item.title}}</p>
        <p class="authority-list-item-right">
          <span v-if="item.type === 2" style="color: red;font-size: 13px">必看</span>
          <img style="width: 20px;height: 20px" src="../../../static/images/right.png" alt="">
        </p>
      </div>
    </div>

  </section>
</template>

<script>
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";
  import { mapGetters } from "vuex";

  export default {
    name: "system_help",
    components: { CKtitleNotice },
    data() {
      return {
        type: 1,
        administrators_list: "",
        corpid: "",
        icon_type: "",
        video_info: ""
      };
    },
    onShow() {
      const that = this;
      that.$unit.showWaiting();
      that.corpid = that.registUser.data.back_value.corpid;
      that.refreshRequestSystemHelp();
    },
    methods: {
      goViedoDetail(index) {
        const that = this;
        wx.navigateTo({
          url: `/pages/video_detail/main?index=${index}`
        });
      },
      showState(type, state) {
        const that = this;
        if (type === 22 && state === false) {
          if (that.type === 1 || that.type === 5) {
            wx.showModal({
              title: "您暂无此权限",
              content: `可以联系管理员在应用首页“系统设置”中添加，添加后可以开启“部门主管权限”`,
              showCancel: false,
              confirmText: "好的",
              success() {
              }
            });
          }
        } else if (type === 33 && state === false) {
          if (that.type === 1 || that.type === 3) {
            wx.showModal({
              title: "您暂无此权限",
              content: `可以联系管理员在应用首页“系统设置”中添加，添加后可以开启“统计管理权限”`,
              showCancel: false,
              confirmText: "好的",
              success() {
              }
            });
          }

        } else if (type === 44 && state === false) {
          if (that.type === 1 || that.type === 3 || that.type === 5 || that.type === 7) {
            wx.showModal({
              title: "您暂无此权限",
              content: `可以联系管理员在应用首页“系统设置”中添加，添加后可以开启“系统管理权限”`,
              showCancel: false,
              confirmText: "好的",
              success() {
              }
            });
          }

        }
      },
      async refreshRequestSystemHelp() {
        const that = this;
        await that.$store.dispatch("_getUserInfo", {
          im: that.$constData.INTER_FACE.get_user_power,
          fps: {
            userid: that.registUser.data.back_value.userid
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_user_info");
          } else {
            let type = res.data.back_value;
            that.linabc(type);
          }
        });
        await that.$store.dispatch("_getAdministrators", {
          im: that.$constData.INTER_FACE.get_administrators_list,
          fps: {},
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_administrators_list");
          } else {
            that.administrators_list = res.data.back_value;
          }
        });
        await that.$store.dispatch("_getVideoInfo", {
          im: that.$constData.INTER_FACE.get_video_url,
          fps: {
            userid: that.registUser.data.back_value.userid
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_video_url");
          } else {
            that.video_info = res.data.back_value;
          }
        });
        that.$unit.closeWaiting();
      },
      linabc(type) {
        const that = this;
        let score = [8, 4, 2, 1];
        let result = [];
        for (let index in score) {
          result[score[index]] = false;
          if (type - score[index] >= 0) {
            type = type - score[index];
            result[score[index]] = true;
          }
        }
        that.icon_type = Array.from(result);
      }
    },
    computed: {
      ...mapGetters([
        "registUser"
      ])
    },
    async onPullDownRefresh() {
      const that = this;
      that.$unit.showWaiting();
      await that.refreshRequestSystemHelp();
      wx.stopPullDownRefresh();
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .system-help-container {

    .system-help-title {
      .default-box-sizing;
      color: @default-sub-color;
      font-size: @default-font-size-14;
      .default-padding-10-20();
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }

    .authority-list {
      .default-box-sizing;

      .authority-list-item {
        background-color: #fff;
        .default-box-sizing;
        .default-padding-10-20();
        font-size: @default-font-size-16;
        .default-flex();
        flex-wrap: wrap;
        color: @default-content-color;
        border-bottom: 1px solid @default-divider-color;

        .authority-list-item-right {
          display: flex;
        }
      }
    }

  }

</style>
