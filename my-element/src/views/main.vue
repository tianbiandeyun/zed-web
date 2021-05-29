<template>
  <el-container>
    <el-header>
      <div>
        <span>后台系统</span>
      </div>
      <el-button type="info" @click="loginOut">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409Eff"
          unique-opened
          router
        >
          <!-- 判断是否由有二级菜单 -->
          <div v-for="item in menu" :key="item.id">
            <div v-if="item.children">
              <!-- 一级菜单 -->
              <el-submenu :index="item.id">
                <template slot="title">
                  <i :class="iconsObject[item.id]"></i>
                  <span>{{ item.authName }}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item
                  :index="i.path"
                  v-for="i in item.children"
                  :key="i.id"
                >
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ i.authName }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </div>
            <div v-else>
              <!-- 没有二级菜单 -->
              <el-menu-item :index="item.path">
                <i :class="iconsObject[item.id]"></i>
                <span slot="title">{{ item.authName }}</span>
              </el-menu-item>
            </div>
          </div>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 主题显示区域 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      iconsObject: {
        145: "iconfont icon-tupian",
        125: "iconfont icon-paihangbang",
        103: "iconfont icon-zhiwen",
        101: "iconfont icon-wenjuan",
      },
    };
  },
  methods: {
    // 退出功能
    loginOut() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["menu"]),
  },
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #fff;
}
.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: 0;
  }

  .iconfont {
    margin-right: 10px;
  }
}

.el-main {
  background-color: #eaedf1;
}
</style>