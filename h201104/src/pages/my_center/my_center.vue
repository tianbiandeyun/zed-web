<template>
  <section class="user-center-container">

    <div class="basis box">

      <div class="basis-name">
        <span>{{user_info.name === null || user_info.name === "" ? "无" : user_info.name}}</span>
        <img v-if="user_info.sex == 1" src="../../../static/images/nan.png" alt="">
        <img v-else src="../../../static/images/nv.png" alt="">
      </div>

      <div class="basis-company">
        <span>{{user_info.company === null || user_info.company === "" ? "暂无企业" : user_info.company}}</span>
        <span v-if="openid.back_value.open_id === user_info.open_id" @click="edit(1)">
          <img src="../../../static/images/bianji.png" alt="">
          编辑
        </span>
      </div>

      <div class="basis-other">
        <span>职务：</span>
        <span>{{user_info.job_description === null || user_info.job_description === "" ? "无" : user_info.job_description}}</span>
      </div>

      <div class="basis-other">
        <span>电话：</span>
        <span>{{user_info.phone === null || user_info.phone === "" ? "暂无电话" : user_info.phone}} <span
            v-if="openid.back_value.open_id === user_info.open_id">{{is_phone == 1 ? "（公开）" : "（仅自己可见）"}}</span></span>
      </div>

      <div class="basis-other">
        <span>邮箱：</span>
        <span>{{user_info.mail === null || user_info.mail === "" ? "暂无邮箱" : user_info.mail}} <span
            v-if="openid.back_value.open_id === user_info.open_id">{{is_mail == 1 ? "（公开）" : "（仅自己可见）"}}</span></span>
      </div>

    </div>

    <div class="introduce box">

      <div class="introduce-edit">
        <span>个人介绍：</span>
        <span v-if="openid.back_value.open_id === user_info.open_id" @click="edit(2)">
          <img src="../../../static/images/bianji.png" alt="">
          编辑
        </span>
      </div>

      <div class="introduce-other">
        <span>所在行业：</span>
        <span>{{user_info.industry_involved === null || user_info.industry_involved === "" ? "暂无所在行业" : user_info.industry_involved}}</span>
      </div>

      <div class="introduce-other">
        <span>关注行业：</span>
        <span>{{user_info.interest === null || user_info.interest === "" ? "暂无关注行业" : user_info.interest}}</span>
      </div>

      <div class="introduce-text">
        <span>自我介绍：</span>
        <span>
          {{user_info.brief_introduction === null || user_info.brief_introduction === "" ? "暂无自我介绍" : user_info.brief_introduction}}
        </span>
      </div>

    </div>

    <div class="photo box">
      <h1>形象照片</h1>
      <div>
        <p v-if="!user_info.head_portrait">暂无可以通过编辑添加</p>
        <img v-else :src="user_info.head_portrait" alt="">
      </div>
    </div>

    <getUserInfo :isScope="is_scope" @setUserInfo="setUserInfo"></getUserInfo>

    <!-- 自定义 tab -->
    <tab selected='2' :message-count='message_count'></tab>

  </section>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import login from "../../utils/login";
  import getUserInfo from "@/components/getUserInfo";

  export default {
    name: "user_center",
    components: {
      getUserInfo
    },
    mixins: [login],
    data() {
      return {
        is_scope: false,
        message_count: 0, // 信息条数
        u_key: '', // 本人 key
        user_info: "", // 获取个人信息
        is_phone: 1, // 电话是否公开 
        is_mail: 1 // 邮箱是否公开
      };
    },
    async onShow() {

      this.$Utils.showWaiting();

      // 获取 u_key 个人信息 
      await this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_member_info,
        fps: {
          open_id: this.openid.back_value.open_id,
          u_key: ""
        },
        url: this.$Config.REQUEST_URI
      }).then(res => {
        if (res.result === "failure") {
          this.$Utils.closeWaiting();
          this.$Utils.showErrorInfo({
            error_attachmsg: null,
            error_code: 2012100231,
            error_info: "请登录后，查看其他内容",
            result: "failure",
            sign: "CFEApiH201104"
          }, "提示", () => {
            this.is_scope = true;
          });
        } else {
          if (res.back_value.inner_data === null || res.back_value.inner_data === '') {
            wx.showModal({
              title: `inner_data`,
              showCancel: false,
              content: `res.back_value.inner_data 是 null 或者 空`,
              success() {}
            });
            return false;
          }
          this.is_phone = res.back_value.inner_data.phone_restrict;
          this.is_mail = res.back_value.inner_data.mail_restrict;
          this.user_info = res.back_value;
          this.u_key = res.back_value.u_key;
        }
      });

      this.refreshUserCenter(this.u_key);

    },
    onHide() {
      console.log('my_center');
      this.is_scope = false;
    },
    methods: {
      /**
       * 编辑信息
       */
      edit(res) {
        if (res === 1) {
          wx.navigateTo({
            url: `/pages/user_center_jichu/main`
          });
        } else {
          wx.navigateTo({
            url: `/pages/user_center_jieshao/main`
          });
        }
      },
      /**
       * 授权用户信息并保存
       * */
      setUserInfo(res) {
        this.$Utils.showWaiting();
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.set_update_user_info,
          fps: {
            open_id: this.openid.back_value.open_id,
            encrypted_data: res.encryptedData,
            iv: res.iv
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "set_update_user_info");
          } else {
            this.is_scope = false;
            this.$store.dispatch("fetch", {
              im: this.$Config.INTER_FACE.get_member_info,
              fps: {
                open_id: this.openid.back_value.open_id,
                u_key: ""
              },
              url: this.$Config.REQUEST_URI
            }).then(res => {
              if (res.back_value.inner_data === null || res.back_value.inner_data === '') {
                this.$Utils.closeWaiting();
                wx.showModal({
                  title: `inner_data`,
                  showCancel: false,
                  content: `res.back_value.inner_data 是 null 或者 空`,
                  success() {}
                });
                return false;
              }
              this.is_phone = res.back_value.inner_data.phone_restrict;
              this.is_mail = res.back_value.inner_data.mail_restrict;
              this.user_info = res.back_value;
              this.u_key = res.back_value.u_key;
              this.$Utils.closeWaiting();
            })
          }
        });
      },
      async refreshUserCenter(u_key) {
        // 信息条数
        await this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_unread_message,
          fps: {
            u_key
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_unread_message");
          } else {
            this.message_count = res.back_value;
          }
        });
        this.$Utils.closeWaiting();
      }
    },
    computed: {
      ...mapGetters([
        "openid"
      ])
    },
    onUnload() {
      this.$Utils.restData(this);
    },
    async onPullDownRefresh() {
      this.$Utils.showWaiting();
      await this.refreshUserCenter(this.u_key);
      wx.stopPullDownRefresh();
    }
  };

</script>

<style lang="less" scoped>
  .user-center-container {
    padding-bottom: 90px;

    .box {
      padding: 10px;
      background-color: #fff;
      margin-bottom: 10px;
    }

    .basis {

      .basis-name {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        >span {
          font-size: 24px;
          font-weight: bold;
          color: #17233d;
          margin-right: 10px;
          border-bottom: 4px solid #808695;
        }

        >img {
          width: 20px;
          height: 20px;
        }
      }

      .basis-company {
        display: grid;
        grid-template-columns: 5fr 1fr;
        align-items: center;
        margin-bottom: 10px;

        >span {
          font-size: 16px;
          color: #17233d;

          &:nth-of-type(2) {
            font-size: 12px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            color: #515a6e;

            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }

      .basis-other {
        display: grid;
        grid-template-columns: 2fr 8fr;
        align-items: center;
        font-size: 16px;
        margin-bottom: 10px;

        >span {
          color: #17233d;

          &:nth-of-type(2) {
            font-size: 14px;
            color: #515a6e;
          }
        }
      }

    }

    .introduce {

      .introduce-edit {
        display: grid;
        grid-template-columns: 5fr 1fr;
        align-items: center;
        margin-bottom: 10px;

        >span {
          font-size: 16px;
          color: #17233d;

          &:nth-of-type(2) {
            font-size: 12px;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            align-items: center;
            color: #515a6e;

            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }

      .introduce-other {
        display: grid;
        grid-template-columns: 2fr 6fr;
        align-items: center;
        font-size: 16px;
        margin-bottom: 10px;

        >span {
          color: #17233d;

          &:nth-of-type(2) {
            font-size: 14px;
            color: #515a6e;
          }
        }
      }

      .introduce-text {
        display: grid;
        grid-template-columns: 2fr 6fr;
        font-size: 16px;
        margin-bottom: 10px;

        >span {
          color: #17233d;

          &:nth-of-type(2) {
            font-size: 14px;
            color: #515a6e;
          }
        }

      }
    }

    .photo {

      h1 {
        color: #17233d;
        font-size: 16px;
        margin-bottom: 10px;
      }

      div {
        margin: 0 auto;
        width: 200px;
        // height: 200px;
        border: 1px soold black;

        p {
          text-align: center;
          color: #17233d;
          font-size: 16px;
        }

        img {
          width: 100%;
          // height: 100%;
        }
      }
    }
  }

</style>
