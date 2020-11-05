<template>
  <section class="setupContainer">

    <!--抬头说明-->
    <CKtitleNotice ord-message="可以查看统计数据的管理人员"></CKtitleNotice>

    <div class="setupGlobal">

      <!--列表-->
      <div class="setupUserTable" v-for="(item,i) in global_user" :key="i">
        <div class="setupUserTablePhoto">
          <img :src="item.avatar" alt="">
        </div>
        <div class="setupUserTableContent">
          <p class="setupUserTableContentName">统计管理员</p>
          <p class="setupUserTableContentDetail">
            <ww-open-data :corpid="corpid" :openid="item.userid" type="userName"></ww-open-data>
          </p>
        </div>
        <div class="setupUserTableContentRight" @click="operatDelUser(item.userid)">
          <img src="../../../static/images/more.png" alt="">
        </div>
      </div>

      <!--添加按钮-->
      <CKaddMember :obj-message="global_button_name" @addMember="operatGlobalUser"></CKaddMember>
    </div>

    <!--按钮-->
    <CKbutton name="完成设置" @operat="goIndex"></CKbutton>

    <v-overlay :show="isOverlay"></v-overlay>

  </section>
</template>

<script>
  import CKaddMember from "../../components/CK_add_member/CKaddMember";
  import CKtitleNotice from "../../components/CK_title_notice/CKtitleNotice";
  import CKbutton from "../../components/CK_button/CKbutton";
  import { mapGetters } from "vuex";

  export default {
    name: "setup",
    components: { CKaddMember, CKtitleNotice, CKbutton },
    data() {
      return {
        isOverlay: false,
        corpid: "",
        global_button_name: { title: "添加统计管理员", detail: "统计管理员拥有全局查看所有KPI数据的权限" },
        global_user: [] // 统计
      };
    },
    async mounted() {
      const that = this;
      that.$unit.showWaiting();
      that.corpid = that.registUser.data.back_value.corpid;
      that.refreshRequestSetup();
    },
    methods: {
      /**
       * 完成
       * */
      goIndex() {
        wx.navigateBack({ delta: 1 });
      },
      /**
       * 打开选择统计管理
       * */
      operatGlobalUser() {
        const that = this;
        that.isOverlay = true;
        that._selectUser(res => {
          if (res === "fail") {
            that.isOverlay = false;
            return;
          }
          that.$unit.showWaiting();
          that.global_user = [];
          that.addMemberByUser(res, 0);
        });
      },
      /**
       * 递归添加联系人
       * */
      addMemberByUser(arr, index) {
        const that = this;
        if (index > arr.length - 1) {
          that.refreshRequestSetup();
          return false;
        } else {
          that.$store.dispatch("_addGLobalMember", {
            im: that.$constData.INTER_FACE.add_statisticians,
            fps: {
              userid: that.registUser.data.back_value.userid,
              member_userid: arr[index].id,
              avatar: arr[index].avatar
            },
            url: that.$constData.REQUEST_URI
          }).then(res => {
            if (res.data.back_value) {
              index++;
              that.addMemberByUser(arr, index);
            }
            if (res.data.result === "failure") {
              that.$unit.showErrorInfo(res.data, "add_statisticians");
            }
          });
        }
      },
      /**
       * 删除联系人
       * */
      operatDelUser(userid) {
        const that = this;
        wx.showActionSheet({
          itemList: ["删除"],
          success() {
            that.$unit.showWaiting();
            that.$store.dispatch("_delGlobalMember", {
              im: that.$constData.INTER_FACE.del_statistical,
              fps: {
                userid: that.registUser.data.back_value.userid,
                member_userid: userid
              },
              url: that.$constData.REQUEST_URI
            }).then(res => {
              if (res.data.back_value) {
                that.global_user = [];
                that.refreshRequestSetup();
              }
              if (res.data.result === "failure") {
                that.$unit.showErrorInfo(res.data, "del_statistical");
              }
            });
          }
        });
      },
      /**
       * 获取已保存的联系人
       * */
      async refreshRequestSetup() {
        const that = this;
        await that.$store.dispatch("_getGlobalMember", {
          im: that.$constData.INTER_FACE.get_statistical,
          fps: {
            userid: that.registUser.data.back_value.userid
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "get_statistical");
          } else {
            that.global_user = res.data.back_value;
          }
        });
        that.$unit.closeWaiting();
        that.isOverlay = false;
      },
      /**
       * 打开选择联系人
       * */
      _selectUser(callback) {
        const that = this;
        wx.qy.selectEnterpriseContact({
          fromDepartmentId: that.getAddressMulti.data.back_value.from_department_id,
          mode: that.getAddressMulti.data.back_value.mode,
          type: that.getAddressMulti.data.back_value.type,
          success(res) {
            callback(res.result.userList);
          },
          fail(res) {
            callback("fail");
          }
        });
      }
    },
    onUnload() {
      const that = this;
      that.$unit.restData(that);
    },
    computed: {
      ...mapGetters([
        "registUser",
        "getAddressMulti"
      ])
    },
    async onPullDownRefresh() {
      const that = this;
      that.$unit.showWaiting();
      await that.refreshRequestSetup();
      wx.stopPullDownRefresh();
    }
  };
</script>

<style scoped>
  .setupContainer {
    padding-bottom: 80px;
  }

  .setupGlobal, .setupDepartment {
    background-color: #fff;
    padding: 4px 20px;
  }

  .setupUserTable {
    border-bottom: 1px solid #e8eaec;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
  }

  .setupUserTablePhoto {
    width: 35px;
    height: 35px;
    padding: 2px;
    text-align: center;
    line-height: 35px;
    font-size: 0;
  }

  .setupUserTablePhoto img {
    vertical-align: middle;
    width: 100%;
    height: 100%;
  }

  .setupUserTableContent {
    width: calc(100% - 90px);
  }

  .setupUserTableContentName {
    color: #515a6e;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .setupUserTableContentDetail {
    color: #808695;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .setupUserTableContentRight {
    font-size: 0;
  }

  .setupUserTableContentRight img {
    width: 20px;
    height: 20px;
  }
</style>
