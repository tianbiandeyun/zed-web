<template>
  <section class="index-container">

    <!-- 展示头像 / 昵称 -->
    <div v-if="is_login" class="index-header">
      <div class="index-header-user-info" @click="goUserCenter">
        <div class="photo">
          <img :src="user_photo" alt="">
        </div>
        <div class="message">"{{nick_name}}"{{getTimeState}}，参与投研，洞见未来</div>
      </div>
    </div>

    <!-- 点击登陆 -->
    <div v-else class="index-header">
      <div class="index-header-user-info" @click="openLogin">
        <div class="photo" style="background-color: #fff">
          <img src="../../../static/images/nologin.png" alt="">
        </div>
        <div class="message">点击登陆</div>
      </div>
    </div>

    <!-- 活动列表 -->
    <div class="index-activity-list">
      <div class="index-activity-item" v-for="(item,index) in list" :key="index" @click="goActivity(item)">
        <div class="activity-item-img">
          <img :src="item.main_graph" alt="">
        </div>
        <div class="activity-item-info">
          <p class="info-title">{{item.title}}</p>
          <div class="info-status_time">
            <span class="status active-span" v-if="item.status == 1">--- 预约中 ---</span>
            <span class="status active-span" v-if="item.status == 2">--- 活动中 ---</span>
            <span class="status" v-if="item.status == 3">--- 已结束 ---</span>
            <span class="time">活动时间：{{item.meeting_time}}</span>
          </div>
        </div>
      </div>
    </div>

    <getUserInfo :isScope="is_scope" message="请授权头像信息，否则无法使用" @setUserInfo="setUserInfo"></getUserInfo>

    <!-- 自定义 tab -->
    <tab :message-count='message_count'></tab>

    <!-- 选择行业 -->
    <v-popup :show="is_popup" @close="is_popup = false">
      <div class="changeZy">
        <div class="item">
          <input type="checkbox" id="jack" value="Jack" v-model.lazy="checkedNames">
          <label for="jack">Jack</label>
        </div>
        <div class="item">
          <input type="checkbox" id="john" value="John" v-model.lazy="checkedNames">
          <label for="john">John</label>
        </div>
        <button @click='submit'>click</button>
      </div>
    </v-popup>

  </section>
</template>

<script>
  import login from "../../utils/login";
  import getUserInfo from "@/components/getUserInfo";

  export default {
    name: "index",
    mixins: [login],
    components: {
      getUserInfo
    },
    data() {
      return {
        checkedNames: [],
        is_popup: true,
        message_count: 0, // 信息条数
        is_login: false, // 是否登陆
        is_scope: false, // 是否打开请授权头像
        openid_info: "", // openid 信息
        nick_name: "", // 昵称
        user_photo: "", // 头像
        u_key: "", // 本人 key
        list: [] // 活动列表
      };
    },
    async onShow() {
      this.$Utils.showWaiting();
      this.openid_info = await this.getOpenid();
      this.refreshIndex();
    },
    methods: {
      submit() {
        console.log(this.checkedNames);
      },
      /**
       * 打开请授权头像
       */
      openLogin() {
        this.is_scope = true;
      },
      /**
       * 前往单个活动详情
       * */
      goActivity(res) {
        if (res.status != 3) {
          wx.navigateTo({
            url: `/pages/activity_details/main?activity_id=${res.id}&m_key=${this.u_key}`
          });
        } else {
          wx.navigateTo({
            url: `/pages/activity_end_details/main?activity_id=${res.id}&m_key=${this.u_key}`
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
            open_id: this.openid_info.back_value.open_id,
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
            this.refreshIndex();
          }
        });
      },
      /**
       * 首页信息获取
       * */
      async refreshIndex() {
        const that = this;
        // 获取用户信息
        await this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_member_info,
          fps: {
            open_id: this.openid_info.back_value.open_id,
            u_key: ""
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            if (res.error_code === 2012100231) {
              throw new Error("未登录");
            } else {
              this.$Utils.showErrorInfo(res, "get_member_info");
            }
          } else {
            if (res.back_value.name === "" || res.back_value.name === null) {
              throw new Error("未登录");
            } else {
              this.nick_name = res.back_value.name;
              this.user_photo = res.back_value.wx_photo;
              this.u_key = res.back_value.u_key;
              this.is_login = true;
            }
          }
        });
        // 获取首页活动列表
        await this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_salon_activity_list,
          fps: {
            open_id: this.openid_info.back_value.open_id
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_salon_activity_list");
          } else {

            let result = res.back_value;
            result.forEach((item, index, arr) => {
              item.meeting_time = `${item.meeting_time.split("日")[0]}日`;
            });
            this.list = result;
          }
        });
        // 信息条数
        await this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_unread_message,
          fps: {
            u_key: this.u_key
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
        // 职业选项
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_occupation_list,
          fps: {},
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_occupation_list");
          } else {
            console.log(
              res.back_value
            );
            setTimeout(() => {
              that.is_popup = true;
            }, 3000);
          }
        });

        this.$Utils.closeWaiting();
      }
    },
    computed: {
      /**
       * 上午下午
       * */
      getTimeState() {
        // 获取当前时间
        let timeNow = new Date();
        // 获取当前小时
        let hours = timeNow.getHours();
        // 设置默认文字
        let text = ``;
        // 判断当前时间段
        if (hours >= 0 && hours <= 10) {
          text = `早上好`;
        } else if (hours > 10 && hours <= 14) {
          text = `中午好`;
        } else if (hours > 14 && hours <= 18) {
          text = `下午好`;
        } else if (hours > 18 && hours <= 24) {
          text = `晚上好`;
        }
        // 返回当前时间段对应的状态
        return text;
      }
    },
    onShareAppMessage: function (res) {
      if (res.from === "button") {
        console.log("来自页面内转发按钮");
      } else {
        console.log("来自右上角转发菜单");
      }
      return {
        title: "风险机遇面对面",
        path: `/pages/index/main`,
        imageUrl: ""
      };
    }
  };

</script>

<style lang="less" scoped>
  .index-container {
    position: relative;

    .index-header {
      height: 140px;
      background-image: url("https://f.hztc.dev.hztcapp.com/h/index_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;

      .index-header-user-info {
        padding: 10px 10px 0 16px;
        display: grid;
        grid-template-columns: 1fr 5fr;
        align-items: center;

        .photo {
          width: 50px;
          height: 50px;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #fff;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .message {
          font-size: 16px;
          color: #fff;
        }
      }
    }

    .index-activity-list {
      box-sizing: border-box;
      padding: 0 20px 120px 20px;
      position: absolute;
      top: 80px;
      left: 0;
      width: 100%;

      .index-activity-item {
        background-color: #fff;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        padding: 16px 10px;
        margin-bottom: 10px;

        .activity-item-img {
          height: 140px;
          margin-bottom: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .activity-item-info {

          .info-title {
            font-size: 16px;
            color: #17233d;
            font-weight: bold;
            margin-bottom: 4px;
          }

          .info-status_time {
            font-size: 14px;
            color: #c5c8ce;
            display: grid;
            grid-template-columns: 1fr 2fr;
            align-items: center;

            >span {
              font-size: 14px;
            }

            .active-span {
              color: #19be6b;
            }

            .time {
              text-align: right;
            }
          }
        }
      }

    }

    .changeZy {
      border: 1px solid #fff;
    }

  }

</style>
