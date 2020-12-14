<template>
  <section class="activity_user_list">

    <div class="user_list_details-tip">与会嘉宾/签到簿：</div>

    <div v-for="(item,index) in user_list" :key="index" class="user_list_details-sign">
      <signItem :item="item" @getUserId="getUserId"></signItem>
    </div>

  </section>
</template>

<script>
  import signItem from "../../components/sign";
  import { mapGetters } from "vuex";
  import login from "../../utils/login";

  export default {
    name: "activity_user_list",
    components: { signItem },
    mixins: [login],
    data() {
      return {
        user_list: [],
        user_id: ""
      };
    },
    async mounted() {
      this.$Utils.showWaiting();

      // 因为这个页面需要分享出去，所以要判断是否有 openid 如果没有则获取
      if (!this.openid.back_value) {
        await this.getOpenid();
      }

      // 获取人员列表
      this.$store.dispatch("fetch", {
        im: this.$Config.INTER_FACE.get_activity_member_list,
        fps: {
          open_id: this.openid.back_value.open_id,
          activity_id: this.$root.$mp.query.activity_id
        },
        url: this.$Config.REQUEST_URI
      }).then(res => {
        if (res.result === "failure") {
          this.$Utils.closeWaiting();
          this.$Utils.showErrorInfo(res, "get_activity_member_list");
        } else {
          this.user_list = res.back_value;
          this.$Utils.closeWaiting();
        }
      });
    },
    methods: {
      getUserId(res) {
        wx.navigateTo({
          url: `/pages/user_center/main?u_key=${res}`
        });
      }
    },
    computed: {
      ...mapGetters([
        "openid"
      ])
    },
    onShareAppMessage: function(res) {
      if (res.from === "button") {
        console.log("来自页面内转发按钮");
      }
      else {
        console.log("来自右上角转发菜单");
      }
      return {
        title: "《创新投研会》参会大咖",
        path: `/pages/activity_user_list/main?activity_id=${this.$root.$mp.query.activity_id}`,
        imageUrl: ""
      };
    }
  };
</script>

<style lang="less" scoped>
  .activity_user_list {
    .user_list_details-tip {
      background-color: #fff;
      color: #17233d;
      font-size: 16px;
      font-weight: bold;
      padding: 10px;
    }

    .user_list_details-sign {
      background-color: #fff;
      padding: 10px;
    }
  }
</style>
