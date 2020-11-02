<template>
  <section class="home">
    <h1 class="home-title">莱特兄弟飞行体验票（专属领取）</h1>

    <div class="home-signin">
      <p class="home-time">日期：{{ time1 }}</p>
      <p class="home-remaining">剩余：{{ a }}张</p>
      <input
        type="button"
        class="home-select"
        value="领取"
        @click="getTicket(time1, aId, a)"
      />
    </div>

    <div class="home-signin">
      <p class="home-time">日期：{{ time2 }}</p>
      <p class="home-remaining">剩余：{{ b }}张</p>
      <input
        type="button"
        class="home-select"
        value="领取"
        @click="getTicket(time2, bId, b)"
      />
    </div>

    <div class="home-signin">
      <p class="home-time">日期：{{ time3 }}</p>
      <p class="home-remaining">剩余：{{ c }}张</p>
      <input
        type="button"
        class="home-select"
        value="领取"
        @click="getTicket(time3, cId, c)"
      />
    </div>

    <div class="home-signin">
      <p class="home-time">日期：{{ time4 }}</p>
      <p class="home-remaining">剩余：{{ d }}张</p>
      <input
        type="button"
        class="home-select"
        value="领取"
        @click="getTicket(time4, dId, d)"
      />
    </div>

    <div class="home-signin">
      <p class="home-time">日期：{{ time5 }}</p>
      <p class="home-remaining">剩余：{{ e }}张</p>
      <input
        type="button"
        class="home-select"
        value="领取"
        @click="getTicket(time5, eId, e)"
      />
    </div>

    <div class="home-signin">
      <p class="home-time">日期：{{ time6 }}</p>
      <p class="home-remaining">剩余：{{ f }}张</p>
      <input
        type="button"
        class="home-select"
        value="领取"
        @click="getTicket(time6, fId, f)"
      />
    </div>

    <div class="home-signin">
      <p class="home-time">日期：{{ time7 }}</p>
      <p class="home-remaining">剩余：{{ g }}张</p>
      <input
        type="button"
        class="home-select"
        value="领取"
        @click="getTicket(time7, gId, g)"
      />
    </div>

    <Spin size="large" fix v-if="spinShow"></Spin>
  </section>
</template>

<script>
import * as config from "../../unit/config";
import { mapGetters } from "vuex";
import wx from "weixin-js-sdk";

export default {
  name: "home",
  data() {
    return {
      bossOoenid: [
        "otbq70dDm2pfGwMZjtxpmyAgsosE-Le720e",
        "otbq70S-oU1xuNV7UAWBheyXBD-s-L5e616",
        "otbq70caqn5pcgbMRI3sanFRJxDk-Lde255",
        "otbq70Z3tI3COrkOFGNblp0-T0-0-L18d2c",
        "otbq70U4-c1wMZRRcqXJ-p3gT9Vg-L52efc"
      ],
      spinShow: true,
      // 时间
      time1: "2020/01/09",
      time2: "2020/01/10",
      time3: "2020/01/11",
      time4: "2020/01/12",
      time5: "2020/01/13",
      time6: "2020/01/14",
      time7: "2020/01/15",
      // 票数量
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
      g: "",
      // 卡劵ID
      aId: "",
      bId: "",
      cId: "",
      dId: "",
      eId: "",
      fId: "",
      gId: ""
    };
  },
  inject: ["reload"],
  components: {},
  created() {},
  async mounted() {
    const that = this;

    /**
     * 获取 openid
     * */
    await that.$store.dispatch("_getOpenid", {
      im: config.requestInterface.getOpenid,
      fps: {},
      url: config.CONST_FETCH_REQUEST_URI
    });

    /**
     * 获取卡劵 ID
     * */
    await that.getAcrdType("2020/01/09").then(res => {
      that.aId = res;
      that.getAcrdStockById(res).then(res => {
        that.a = res.quantity;
      });
    });
    await that.getAcrdType("2020/01/10").then(res => {
      that.bId = res;
      that.getAcrdStockById(res).then(res => {
        that.b = res.quantity;
      });
    });
    await that.getAcrdType("2020/01/11").then(res => {
      that.cId = res;
      that.getAcrdStockById(res).then(res => {
        that.c = res.quantity;
      });
    });
    await that.getAcrdType("2020/01/12").then(res => {
      that.dId = res;
      that.getAcrdStockById(res).then(res => {
        that.d = res.quantity;
      });
    });
    await that.getAcrdType("2020/01/13").then(res => {
      that.eId = res;
      that.getAcrdStockById(res).then(res => {
        that.e = res.quantity;
      });
    });
    await that.getAcrdType("2020/01/14").then(res => {
      that.fId = res;
      that.getAcrdStockById(res).then(res => {
        that.f = res.quantity;
      });
    });
    await that.getAcrdType("2020/01/15").then(res => {
      that.gId = res;
      that.getAcrdStockById(res).then(res => {
        that.g = res.quantity;
        that.spinShow = false;
      });
    });
  },
  methods: {
    /**
     * 点击领取 卡劵
     * */
    getTicket(p, cardid, num) {
      const that = this;
      if (that.bossOoenid.includes(that.getOpenidInfo.open_id)) {
        if (num === 0) {
          alert("没有票了");
          return;
        }
        // 获取卡劵配置
        that.getCardConfigById(that.getOpenidInfo.open_id, cardid).then(res => {
          that.getAddCard(res.back_value).then(res => {
            if (res) {
              that.spinShow = false;
              that.reload();
            }
          });
        });
      } else {
        alert("没有权限领取!");
      }
    },
    /**
     * 领取卡券
     * */
    getAddCard(params) {
      return new Promise(resolve => {
        wx.addCard({
          cardList: [
            {
              cardId: params.cardId,
              cardExt:
                '{"openid":"' +
                params.openid +
                '",' +
                '"nonce_str":"' +
                params.nonce_str +
                '",' +
                '"timestamp":"' +
                params.timestamp +
                '",' +
                '"signature":"' +
                params.signature +
                '"}'
            }
          ],
          success() {
            resolve(true);
          }
        });
      });
    },
    /**
     * 获取卡劵 配置
     * */
    getCardConfigById(openid, cardid) {
      const that = this;
      return new Promise(resolve => {
        that.$store
          .dispatch("_getCardConfig", {
            im: config.requestInterface.getCardConfig,
            fps: {
              open_id: openid,
              card_id: cardid
            },
            url: config.CONST_FETCH_REQUEST_URI
          })
          .then(res => {
            resolve(res);
          });
      });
    },
    /**
     * 获取当前时间
     * */
    dateFormat(fmt) {
      let date = new Date();
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString() // 日
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    /**
     * 获取卡劵 ID
     * */
    getAcrdType(date) {
      const that = this;
      return new Promise(resolve => {
        that.$store
          .dispatch("_setAcrdType", {
            im: config.requestInterface.setAcrdType,
            fps: {
              date: date
            },
            url: config.CONST_FETCH_REQUEST_URI
          })
          .then(res => {
            resolve(res.back_value);
          });
      });
    },
    /**
     * 获取卡劵 数量
     * */
    getAcrdStockById(id) {
      const that = this;
      return new Promise(resolve => {
        that.$store
          .dispatch("_getAcrdStock", {
            im: config.requestInterface.getAcrdStock,
            fps: {
              card_id: id
            },
            url: config.CONST_FETCH_REQUEST_URI
          })
          .then(res => {
            resolve(res.back_value);
          });
      });
    }
  },
  computed: {
    ...mapGetters([
      "getOpenidInfo",
      "setAcrdTypeInfo",
      "getCardConfigInfo",
      "getAcrdStockInfo"
    ])
  }
};
</script>
<style lang="less">
.home {
  height: 100%;
  background-color: #2d8cf0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px 40px 0px 40px;
  color: #fff;

  .home-title {
    font-weight: bold;
    font-size: 40px;
    text-align: center;
    line-height: 4;
  }

  .home-signin {
    display: flex;
    justify-content: space-between;
    line-height: 2;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px 0px;
    margin-bottom: 30px;

    p {
      font-size: 30px;
    }

    .home-select {
      background-color: #ff9900;
      color: #fff;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0px 30px;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
      font-size: 30px;
      -webkit-appearance: none;
    }
    .home-select-active {
      background-color: #cacaca;
    }
  }
}
</style>
