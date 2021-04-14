<template>
  <section>
    <cover-view class="tab-bar">
      <cover-view class="tab-bar-border"></cover-view>

      <cover-view v-for="(item,index) in list" :key="index" class="tab-bar-item" :data-path='item.pagePath'
        :data-index='index' @click='switchTab'>

        <cover-image :src="_index === index ? item.selectedIconPath : item.iconPath"></cover-image>
        <cover-view :style="{color: _index === index ? selectedColor : color}">{{item.text}}</cover-view>

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
      }
    },
    data() {
      return {
        color: "#7A7E83",
        selectedColor: "#3cc51f",
        list: [{
          pagePath: "/pages/index/main",
          iconPath: "../../static/images/shouye_n.png",
          selectedIconPath: "../../static/images/shouye_y.png",
          text: "首页"
        }, {
          pagePath: "/pages/my_center/main",
          iconPath: "../../static/images/icon_API.png",
          selectedIconPath: "../../static/images/icon_API_HL.png",
          text: "我的"
        }]
      }
    },
    methods: {
      switchTab(e) {
        console.log('e :>> ', e.mp.currentTarget.dataset);
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
    height: 50px;
    background: white;
    display: flex;
    padding-bottom: env(safe-area-inset-bottom);
    border: 1px solid red;
  }

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
    border: 1px solid black;
  }

  .tab-bar-item cover-image {
    width: 30px;
    height: 30px;
  }

  .tab-bar-item cover-view {
    font-size: 14px;
  }

</style>
