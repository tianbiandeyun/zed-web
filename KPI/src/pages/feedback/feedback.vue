<template>
  <section class="feedback-container">

    <!--选择反馈类型-->
    <div class="feedback-radio">
      <v-radio-group :value="radio" @change="operatSelectFeedBack">
        <div class="feedback-radio-item">
          <v-radio name="2" checked-color="#07c160">意见反馈</v-radio>
        </div>
        <div class="feedback-radio-item">
          <v-radio name="3" checked-color="#07c160">BUG反馈</v-radio>
        </div>
      </v-radio-group>
    </div>

    <!--选择行业-->
    <div class="feedback-industry">
      <div class="feedback-industry-item">
        <p class="feedback-industry-name">选择行业：</p>
        <picker class="feedback-industry-value" @change="operatChangeIndustry" :value="index" :range="array">
          {{array[index]}}
        </picker>
      </div>
    </div>

    <!--备注-->
    <div class="feedback-textarea">
      <textarea adjust-position placeholder="请输入..." @blur="operatGetContent"></textarea>
    </div>

    <div class="feedback-tip">当前程序版本{{version}}，本程序软件著作及解释权归属“北京慧致天诚企业管理咨询有限公司”所有。</div>

    <!--按钮-->
    <CKbutton name="提交反馈" @operat="sendFeedBack"></CKbutton>

  </section>
</template>

<script>
  import CKbutton from "../../components/CK_button/CKbutton";
  import { mapGetters } from "vuex";

  export default {
    name: "feedback",
    components: { CKbutton },
    data() {
      return {
        radio: "2",
        faeedBackContent: "",
        version: this.$constData.VERSION,
        array: ["以便我们有针对性的改进功能", "生产", "加工", "制造", "服务", "娱乐", "政治", "科研", "教育", "农业", "管理", "其他"],
        index: 0
      };
    },
    methods: {
      /**
       * 选择反馈意见
       * */
      operatSelectFeedBack(event) {
        const that = this;
        that.radio = event.mp.detail;
      },
      /**
       * 选择分数
       * */
      operatChangeIndustry(e) {
        const that = this;
        that.index = parseInt(e.mp.detail.value);
      },
      /**
       * 输入框文本
       * */
      operatGetContent(e) {
        const that = this;
        that.faeedBackContent = e.mp.detail.value;
      },
      /**
       * 提交
       * */
      sendFeedBack() {
        const that = this;
        // 设置问题反馈 意见反馈=2,BUG反馈=3
        that.$store.dispatch("_setFeedback", {
          im: that.$constData.INTER_FACE.set_feedback_content,
          fps: {
            userid: that.registUser.data.back_value.userid,
            type: that.radio,
            content: that.faeedBackContent,
            industry: that.array[that.index]
          },
          url: that.$constData.REQUEST_URI
        }).then(res => {
          if (res.data.back_value) {
            wx.showModal({
              title: "提交成功",
              content: `感谢使用并且发现问题反馈给我们`,
              showCancel: false,
              confirmText: "好的",
              success() {
                wx.navigateBack({
                  delta: 1
                });
              }
            });
          }
          if (res.data.result === "failure") {
            that.$unit.showErrorInfo(res.data, "set_feedback_content");
          }
        });
      }
    },
    computed: {
      ...mapGetters([
        "registUser"
      ])
    }
  };
</script>

<style>
  .feedback-radio-item, .feedback-textarea, .feedback-tip, .feedback-industry {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .feedback-container {
    padding-top: 20px;
  }

  .feedback-radio, .feedback-industry {
    background-color: #fff;
    padding: 4px 20px;
    margin-bottom: 10px;
  }

  .feedback-radio .feedback-radio-item {
    border-bottom: 1px solid #e8eaec;
    padding: 10px 60px 10px 0px;
    font-size: 16px;
  }

  .feedback-radio .feedback-radio-item:nth-of-type(2) {
    border: none;
  }

  .feedback-industry-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: #515a6e;
    padding: 10px 0px;
  }

  .feedback-industry-item .feedback-industry-name {
    width: 80px;
  }

  .feedback-industry-item .feedback-industry-value {
    color: #808695;
    width: calc(100% - 90px);
    text-align: left;
  }

  .feedback-textarea {
    height: 100px;
    background-color: #fff;
    padding: 10px 20px;
    margin-bottom: 10px;
  }

  .feedback-textarea textarea {
    width: 100%;
    height: 100%;
    font-size: 16px;
  }

  .feedback-tip {
    font-size: 14px;
    color: #808695;
    padding: 10px 20px;
  }
</style>
