<template>
  <section class="call_line-container">

    <v-tabs :active="active" color="#19be6b" animated swipeable @change="clickTabs">
      <v-tab title="我收到的会话">
        <div class="call" v-for="(item,index) in call_line_list" :key="index">
          <get-line :item="item" @getCall="getCall" @delGetCall="delGetCall"></get-line>
        </div>
      </v-tab>
      <v-tab title="我建立的会话">
        <div class="call" v-for="(item,index) in call_line_list" :key="index">
          <created-line :item="item"></created-line>
        </div>
      </v-tab>
    </v-tabs>

  </section>
</template>

<script>
  import getLine from "@/components/get_line";
  import createdLine from "@/components/create_lline";

  export default {
    name: "call_line",
    components: {
      getLine,
      createdLine
    },
    data() {
      return {
        active: 0,
        call_line_list: []
      };
    },
    mounted() {
      this.$Utils.showWaiting();
      // 先获取一下 我收到的留言
      this.refreshCallLine("accepter_ukey", this.$root.$mp.query.u_key);
    },
    methods: {
      /**
       * 删除留言
       */
      delGetCall(res) {
        console.log("delGetCall");
      },
      /**
       * 留言详情
       */
      getCall(res) {
        wx.navigateTo({
          url: `/pages/get_call/main`
        });
      },
      /**
       * tab 点击
       */
      clickTabs(event) {
        this.$Utils.showWaiting();
        this.call_line_list = [];
        if (event.mp.detail.index === 0) {
          // 我收到的 accepter_ukey
          this.refreshCallLine("accepter_ukey", this.$root.$mp.query.u_key);
        } else {
          // 我建立的 trigger_ukey
          this.refreshCallLine("trigger_ukey", this.$root.$mp.query.u_key);
        }
      },
      /**
       * 获取留言信息
       */
      refreshCallLine(...res) {
        let [type, key] = [...res];
        this.$store.dispatch("fetch", {
          im: this.$Config.INTER_FACE.get_chat_record_list,
          fps: {
            u_key: key,
            type_str: type
          },
          url: this.$Config.REQUEST_URI
        }).then(res => {
          if (res.result === "failure") {
            this.$Utils.closeWaiting();
            this.$Utils.showErrorInfo(res, "get_chat_record_list");
          } else {
            this.call_line_list = res.back_value;
            this.$Utils.closeWaiting();
          }
        });
      }
    }
  };

</script>

<style lang="less" scoped>
  .call_line-container {
    background-color: #fff;

    .call {
      border-bottom: 1px solid #dcdee2;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 10px 14px 10px 14px;
    }
  }

</style>
