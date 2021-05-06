<template>
  <section class="index-container">

    <!--背景图-->
    <div class="index-background"></div>

    <!--操作区域-->
    <CKindexOperat :has-notice="has_notice" @operat="goPage"></CKindexOperat>

    <!--抬头说明-->
    <CKtitleNotice ord-message="系统通知"></CKtitleNotice>

    <!--系统消息列表-->
    <div v-for="(item,index) in notice_list" :key="index">
      <div class="notice-list-item-container">
        <div class="notice-list-item" @click="goNotice(item.id)">
          <img v-if="item.status === 1" class="notice-list-item-hd" src="../../../static/images/redTip.png" alt="">
          <div class="notice-list-item-text">
            <CKnoticeList :item="item.title"></CKnoticeList>
          </div>
          <img class="notice-list-item-rg" src="../../../static/images/right.png" alt="">
        </div>
      </div>
    </div>

    <!--再次授权弹框-->
    <v-popup :show="is_popup">
      <div class="get-avatar">
        <div class="get-avatar-title">
          <p>程序需要使用您的头像</p>
          <p>用于展示请授权后使用</p>
        </div>
        <button class="get-avatar-button" @click="operatAgeing">再次授权</button>
      </div>
    </v-popup>

  </section>
</template>

<script>
  import CKindexOperat from "../../components/CK_index_operat/CKindexOperat";
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";
  import CKnoticeList from "../../components/CK_notice_list/CKnoticeList";
  import CKmixins from "../../utils/mixins";
  import { mapGetters } from "vuex";

  export default {
    components: { CKindexOperat, CKtitleNotice, CKnoticeList },
    data() {
      return {
        is_popup: false,
        has_notice: "",
        notice_list: "",
        corpid: ""
      };
    },
    mixins: [CKmixins],
    async onShow() {
      const that = this;
      that.$unit.showWaiting();

      // 注册用户，获取 企业ID 和 userid
      await that._regist_user();

      // 服务器返回的头像 corpid
      const avatar = that.registUser.data.back_value.avatar;

      if (avatar) {
        // 头像存在
        that.refreshIndex();
      } else {
        that.$unit.closeWaiting();
        that._getUserAvatar();
      }

    },
    methods: {
      /**
       * 设置用户信息
       * */
      _setUserInfo(avatar) {
        const that = this;
        that.$store.dispatch("_setUserInfo", {
          im: that.$constData.INTER_FACE.set_user_info,
          fps: {
            userid: that.registUser.data.back_value.userid,
            avatar: avatar
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.back_value) {
            console.log(res.data);
          }
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "set_user_info");
          }
        });
      },
      /**
       * 获取头像
       * */
      _getUserAvatar() {
        const that = this;
        wx.qy.getAvatar({
          success: function(res) {
            that.is_popup = false;
            that._setUserInfo(res.avatar);
          },
          fail: function(res) {
            console.log(res);
            that.is_popup = true;
          }
        });
      },
      /**
       * 前往消息详情
       * */
      goNotice(notice_id) {
        const that = this;
        that.$store.dispatch("_setSystemNotice", {
          im: that.$constData.INTER_FACE.set_message_status,
          fps: {
            userid: that.registUser.data.back_value.userid,
            msg_id: notice_id
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "set_message_status");
          } else {
            if (res.data.back_value) {
              wx.navigateTo({
                url: `/pages/all_notice/main`
              });
            }
          }
        });
      },
      /**
       * 前往操作页面
       * */
      async goPage(res) {
        const that = this;
        let page = that.$constData.PAGE[res];
        wx.navigateTo({
          url: `/pages/${page}/main`
        });
      },
      /**
       * 拒绝之后再次获取头像
       * */
      operatAgeing() {
        const that = this;
        that._getUserAvatar();
      },
      async refreshIndex() {
        const that = this;

        // 获取通讯录参数 单选 / 多选
        await that.$store.dispatch("_getAddress", {
          im: that.$constData.INTER_FACE.get_select_enterprise_contact,
          fps: { type: "" },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_select_enterprise_contact");
          }
          if (res.data.back_value) {
            return that.$store.dispatch("_getAddressMulti", {
              im: that.$constData.INTER_FACE.get_select_enterprise_contact,
              fps: { type: "multi" },
              url: that.$constData.REQUEST_URI
            });
          }
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_select_enterprise_contact");
          }
        });

        // 获取首页有无消息提醒
        await that.$store.dispatch("_getHasNotice", {
          im: that.$constData.INTER_FACE.has_notice,
          fps: {
            userid: that.registUser.data.back_value.userid
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "has_notice");
          } else {
            console.log(res.data.back_value);
            that.has_notice = res.data.back_value;
          }
        });

        // 获取消息
        await that.$store.dispatch("_getNotice", {
          im: that.$constData.INTER_FACE.get_notice_list,
          fps: {
            userid: that.registUser.data.back_value.userid,
            mag_type: "",
            start: 0,
            len: 200
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_notice_list");
          } else {
            that.notice_list = res.data.back_value;
          }
        });

        that.$unit.closeWaiting();
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
      that.refreshIndex();
      wx.stopPullDownRefresh();
    }
  };
</script>

<style lang="less" scoped>
  @import url(../../../static/css/default);

  .index-container {
    padding-bottom: 20px;

    .index-background {
      background-color: #4f69f4;
      height: 100px
    }

    .notice-list-item-container {
      width: 90%;
      background-color: #fff;
      .default-box-sizing;
      margin: 0 auto;
      padding: 0 10px;

      .notice-list-item {
        border-bottom: 1px solid #e8eaec;
        .default-flex;
        .default-box-sizing;
        padding: 10px 0;
        .notice-list-item-hd {
          width: 10px;
          height: 10px;
        }

        .notice-list-item-text {
          width: calc(100% - 40px);
          font-size: @default-font-size-14;
          color: @default-content-color;
          padding-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .notice-list-item-rg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .get-avatar {
      width: 300px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      .get-avatar-title {
        padding: 20px;
        text-align: center;
        p {
          font-size: @default-font-size-14;
          color: @default-content-color;
        }
      }
      .get-avatar-button {
        width: 200px;
        margin-bottom: 5px;
      }
    }
  }


</style>
