<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="20" class="header_left">
          <div>欢迎使用</div>
        </el-col>
        <el-col :span="4" class="header_right">
          <el-button type="info" @click="loginOut">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="my_collapse" @click="toggleCollapse">
          {{ isCollapse ? "-》" : "《-" }}
        </div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409Eff"
          unique-opened
          router
          :collapse-transition="false"
          :default-active="menuState"
          :collapse="isCollapse"
        >
          <template v-for="item in menu">
            <template v-if="item.children">
              <!-- 一级菜单 -->
              <el-submenu :key="item.id" :index="item.id">
                <template slot="title">
                  <i :class="iconsObject[item.id]"></i>
                  <span>{{ item.authName }}</span>
                </template>
                <!-- 二级菜单 -->
                <el-menu-item
                  :index="i.path"
                  v-for="i in item.children"
                  :key="i.id"
                  @click="saveMenuState(i.path)"
                >
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ i.authName }}</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item
                :index="item.path"
                :key="item.id"
                @click="saveMenuState(item.path)"
              >
                <i :class="iconsObject[item.id]"></i>
                <span slot="title">{{ item.authName }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 面包屑 -->
        <breadcrumb @handleLink="saveMenuState"></breadcrumb>
        <!-- 主要内容显示区域 -->
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import breadcrumb from "../components/breadcrumb";
import { mapGetters } from "vuex";
import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
} from "../utils/utils";
export default {
  components: { breadcrumb },
  data() {
    return {
      isCollapse: false,
      // 侧边导航的选择状态位置
      menuState: "",
      // 图标
      iconsObject: {
        145: "iconfont icon-tupian",
        125: "iconfont icon-paihangbang",
        103: "iconfont icon-zhiwen",
        101: "iconfont icon-wenjuan",
      },
    };
  },
  created() {
    this.getMenuState();
  },
  methods: {
    // 退出功能
    loginOut() {
      removeSessionStorage("token");
      removeSessionStorage("path");
      this.$router.push("/login");
    },
    // 临时保存menu的选择位置
    saveMenuState(res) {
      this.setMenuState(res);
    },
    // 浏览器刷新的时候获取上一次选择的menu的位置
    getMenuState() {
      this.menuState = getSessionStorage("path") || "/index";
    },
    // 展开关闭侧边导航
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 设置menu的高亮和位置
    setMenuState(res) {
      this.menuState = res;
      setSessionStorage("path", res);
    },
  },

  computed: {
    ...mapGetters(["menu"]),
  },
};
</script>
<style lang="less" scoped>
// 主要内容显示区域过渡动画
.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.el-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  font-size: 20px;
  color: #fff;

  .el-row,
  .header_left,
  .header_right {
    height: 60px;
  }

  .header_left {
    display: flex;
    align-items: center;
  }
  .header_right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.el-aside {
  background-color: #333744;

  .my_collapse {
    color: #fff;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: rgb(41, 44, 54);
    }
  }

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