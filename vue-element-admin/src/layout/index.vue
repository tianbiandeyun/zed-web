<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 左侧侧边栏 -->
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': !fixedHeader }">
        <!-- 顶部导航 -->
        <navbar />
        <!-- 快捷标签  needTagsView 是否展示快捷标签-->
        <tags-view v-if="needTagsView" />
      </div>
      <!-- 主要显示区域 -->
      <app-main />
      <!-- 右侧齿轮  -->
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
// 右侧齿轮的东西 RightPanel
import RightPanel from "@/components/RightPanel";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
// 监控页面尺寸的东西 ResizeMixin
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar, // 左侧侧边栏状态
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings, // 是否显示右侧齿轮
      needTagsView: (state) => state.settings.tagsView, // 是否显示快捷标签
      fixedHeader: (state) => state.settings.fixedHeader, // 顶部导航是否固定在顶部
    }),
    // 根据左侧侧边栏的展开状态设置class
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened, // 关闭
        openSidebar: this.sidebar.opened, // 打开
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile",
      };
    },
  },
  methods: {
    handleClickOutside() {
      // 关闭左侧菜单栏
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
