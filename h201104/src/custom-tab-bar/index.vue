<template>
  <section>
    <cover-view class="tab-bar">
      <cover-view class="tab-bar-border"></cover-view>

      <cover-view v-for="(item,index) in list" :key="index" class="tab-bar-item" :data-path='item.pagePath'
        :data-index='index' @click='switchTab'>

        <cover-image :src="_index === index ? item.selectedIconPath : item.iconPath"></cover-image>
        <cover-view :style="{color: _index === index ? selectedColor : color}">{{item.text}}</cover-view>
        <cover-view class="message" v-if="index === 1 && messageCount != 0">{{messageCount}}</cover-view>

      </cover-view>

    </cover-view>

  </section>
</template>
<script>
  export default {
    props: {
      selected: {
        type: Number,
        default: 0
      },
      messageCount: {
        type: Number
      }
    },
    data() {
      return {
        color: "#707070",
        selectedColor: "#2c2c2c",
        list: [{
            pagePath: "/pages/index/main",
            iconPath: "../../static/images/shouye_n.png",
            selectedIconPath: "../../static/images/shouye_y.png",
            text: "首页"
          },
          {
            pagePath: "/pages/call_line/main",
            iconPath: "../../static/images/xinxi_n.png",
            selectedIconPath: "../../static/images/xinxi_y.png",
            text: "信息"
          },
          {
            pagePath: "/pages/my_center/main",
            iconPath: "../../static/images/wode_n.png",
            selectedIconPath: "../../static/images/wode_y.png",
            text: "我的"
          }
        ]
      }
    },
    methods: {
      switchTab(e) {
        const data = e.mp.currentTarget.dataset
        const url = data.path
        wx.switchTab({
          url
        })
      }
    },
    computed: {
      _index() {
        return +this.selected
      }
    }
  }

</script>

<style lang="less" scoped>
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: white;
    display: flex;
    padding-bottom: env(safe-area-inset-bottom);

    .tab-bar-border {
      background-color: rgba(0, 0, 0, 0.33);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      transform: scaleY(0.5);
    }

    .tab-bar-item {
      flex: 1;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      position: relative;

      .message {
        position: absolute;
        top: 4px;
        right: 50%;
        padding: 0 5px;
        margin-right: -30px;
        border: 1px solid red;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        border-radius: 50%;
        background-color: red;
      }

      cover-image {
        width: 30px;
        height: 30px;
        margin-bottom: 4px;
      }

      cover-view {
        font-size: 14px;
      }
    }
  }

</style>
