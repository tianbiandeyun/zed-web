<template>
  <section>
    <!--miniprogram/custom-tab-bar/index.wxml-->
    <cover-view class="tab-bar">
      <cover-view class="tab-bar-border"></cover-view>

      <cover-view v-for="(item,index) in list" :key="index" class="tab-bar-item" :data-path='item.pagePath'
        :data-index='index' @click='switchTab'>

        <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath"></cover-image>
        <cover-view :style="{color: selected === index ? selectedColor : color}">{{item.text}}</cover-view>

      </cover-view>

    </cover-view>

  </section>
</template>
<script>
  export default {
    data() {
      return {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#3cc51f",
        list: [{
          pagePath: "pages/index/main",
          iconPath: "../../static/images/icon_component.png",
          selectedIconPath: "../../static/images/icon_component_HL.png",
          text: "首页"
        }, {
          pagePath: "pages/user_center/main",
          iconPath: "../../static/images/icon_API.png",
          selectedIconPath: "../../static/images/icon_API_HL.png",
          text: "我的"
        }]
      }
    },
    methods: {
      switchTab(e) {
        console.log('e :>> ', e);
        // const data = e.currentTarget.dataset
        // const url = data.path
        // wx.switchTab({
        //   url
        // })
        // this.setData({
        //   selected: data.index
        // })
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
    height: 48px;
    background: white;
    display: flex;
    padding-bottom: env(safe-area-inset-bottom);
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
  }

  .tab-bar-item cover-image {
    width: 27px;
    height: 27px;
  }

  .tab-bar-item cover-view {
    font-size: 10px;
  }

</style>
