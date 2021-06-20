<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">页面抽屉工具栏</h3>

      <div class="drawer-item">
        <span>Theme Color</span>
      </div>

      <div class="drawer-item">
        <span>Open Tags-View</span>
      </div>

      <div class="drawer-item">
        <span>Fixed Header</span>
      </div>

      <div class="drawer-item">
        <span>Sidebar Logo</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }
}
</style>
