<template>
  <section class="user-center-container" v-if="is_page">

    <div class="user-j">

      <div class="user-j-name">
        <span>{{user_info.name === null || user_info.name === "" ? "无" : user_info.name}}</span>
        <img v-if="user_info.sex == 1" src="../../../static/images/nan.png" alt="">
        <img v-else src="../../../static/images/nv.png" alt="">
      </div>

      <div class="user-j-company">
        <span>{{user_info.company === null || user_info.company === "" ? "暂无企业" : user_info.company}}</span>
        <span v-if="openid.back_value.open_id === user_info.open_id" @click="goEdit(1)">
          <img src="../../../static/images/bianji.png" alt="">
          编辑
        </span>
      </div>

      <div class="user-j-other">
        <span>职务：</span>
        <span>{{user_info.job_description === null || user_info.job_description === "" ? "无" : user_info.job_description}}</span>
      </div>

      <div class="user-j-other">
        <span>电话：</span>
        <span>{{user_info.phone === null || user_info.phone === "" ? "暂无电话" : user_info.phone}} <span
            v-if="openid.back_value.open_id === user_info.open_id">{{is_phone == 1 ? "（公开）" : "（仅自己可见）"}}</span></span>
      </div>

      <div class="user-j-other">
        <span>邮箱：</span>
        <span>{{user_info.mail === null || user_info.mail === "" ? "暂无邮箱" : user_info.mail}} <span
            v-if="openid.back_value.open_id === user_info.open_id">{{is_mail == 1 ? "（公开）" : "（仅自己可见）"}}</span></span>
      </div>

    </div>

    <div class="user-g">

      <div class="user-g-edit">
        <span>个人介绍：</span>
        <span v-if="openid.back_value.open_id === user_info.open_id" @click="goEdit(2)">
          <img src="../../../static/images/bianji.png" alt="">
          编辑
        </span>
      </div>

      <div class="user-g-other">
        <span>所在行业：</span>
        <span>{{user_info.industry_involved === null || user_info.industry_involved === "" ? "暂无所在行业" : user_info.industry_involved}}</span>
      </div>

      <div class="user-g-other">
        <span>关注行业：</span>
        <span>{{user_info.interest === null || user_info.interest === "" ? "暂无关注行业" : user_info.interest}}</span>
      </div>

      <div class="user-g-text">
        <span>自我介绍：</span>
        <span>
          {{user_info.brief_introduction === null || user_info.brief_introduction === "" ? "暂无自我介绍" : user_info.brief_introduction}}
        </span>
      </div>

    </div>

    <button @click="goReply">留言</button>

    <div class="user-e">
      <h1>形象照片</h1>
      <div>
        <p v-if="!user_info.head_portrait">暂无可以通过编辑添加</p>
        <img v-else :src="user_info.head_portrait" alt="">
      </div>
    </div>

  </section>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import login from "../../utils/login";

  export default {
    name: "user_center",
    mixins: [login],
    data() {
      return {
        is_page: false,
        user_info: "",
        is_phone: 1,
        is_mail: 1
      };
    },
    async onShow() {

      this.$Utils.showWaiting();

      // 因为这个页面需要分享出去，所以要判断是否有 openid 如果没有则获取
      if (!this.openid.back_value) {
        await this.getOpenid();
        this.is_page = true;
      } else {
        this.is_page = true;
      }

      await this.refreshUserCenter();
      this.$Utils.closeWaiting();

    },
    methods: {
      goReply() {
        wx.navigateTo({
          url: `/pages/call_line/main?u_key=${this.$root.$mp.query.u_key}`
        });
      },
      goEdit(res) {
        if (res === 1) {
          wx.navigateTo({
            url: `/pages/user_center_jichu/main?u_key=${this.$root.$mp.query.u_key}`
          });
        } else {
          wx.navigateTo({
            url: `/pages/user_center_jieshao/main?u_key=${this.$root.$mp.query.u_key}`
          });
        }
      },
      async refreshUserCenter() {
        await this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_member_info,
          fps: {
            open_id: this.openid.back_value.open_id,
            u_key: this.$root.$mp.query.u_key || ""
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_member_info");
          } else {
            this.is_phone = res.back_value.inner_data.phone_restrict;
            this.is_mail = res.back_value.inner_data.mail_restrict;
            this.user_info = res.back_value;
          }
        });
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
      await this.refreshUserCenter();
      this.$Utils.closeWaiting();
      wx.stopPullDownRefresh();
    },
    onShareAppMessage: function (res) {
      console.log(this.$root.$mp.query.u_key);
      return {
        title: "创新投研会",
        path: `/pages/user_center/main?u_key=${this.$root.$mp.query.u_key}`,
        imageUrl: ""
      };
    }
  };

</script>

<style lang="less" scoped>
  .user-center-container {

    .user-j {
      padding: 10px;
      background-color: #fff;
      margin-bottom: 10px;

      .user-j-name {
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

      .user-j-company {
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

      .user-j-other {
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

    .user-g {
      background-color: #fff;
      padding: 10px;
      margin-bottom: 10px;

      .user-g-edit {
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

      .user-g-other {
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

      .user-g-text {
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

    .user-e {
      background-color: #fff;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px;
      margin-bottom: 10px;

      h1 {
        color: #17233d;
        font-size: 16px;
        margin-bottom: 10px;
      }

      div {
        margin: 0 auto;
        width: 200px;
        height: 260px;

        p {
          text-align: center;
          color: #17233d;
          font-size: 16px;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

</style>
