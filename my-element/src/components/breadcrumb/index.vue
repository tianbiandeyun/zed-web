<template>
  <el-breadcrumb class="breadcrumb_container" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <!-- 如果设置 redirect:'noRedirect' 或者 只有一个路由的时候则不开启跳转 -->
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <!-- 否则开启跳转 -->
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!this.isIndex(first)) {
        matched = [{ path: "/index", meta: { title: "首页" } }].concat(matched);
      }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    // 是否是 index 页
    isIndex(route) {
      // 拿到路由的名字
      const name = route && route.name;
      if (!name) {
        return false;
      }
      // trim() 方法删除字符串两端的空白符
      // toLocaleLowerCase() 把字符串转为小写
      return name.trim().toLocaleLowerCase() === "首页".toLocaleLowerCase();
    },
    // 点击跳转
    handleLink(item) {
      const { path } = item;
      this.$emit("handleLink", path);
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
.breadcrumb_container {
  border: 1px solid #fff;
  color: #fff;
}
</style>
