<template>
  <section class="breadcrumb_container">
    <el-breadcrumb :separator="spt">
      <template v-if="crumb.length !== 0">
        <el-breadcrumb-item v-for="item in crumb" :key="item">
          {{ item }}
        </el-breadcrumb-item>
      </template>
      <template v-else> 数组不能为空 </template>
    </el-breadcrumb>
  </section>
</template>
<script>
export default {
  name: "breadcrumb",
  props: {
    spt: {
      type: String,
      default: "/",
    },
    crumb: {
      type: Array,
      default: () => {
        return [1, 2];
      },
    },
  },
};
</script>
<style lang="less" scoped>
.breadcrumb_container {
  margin-bottom: 20px;
}
</style>