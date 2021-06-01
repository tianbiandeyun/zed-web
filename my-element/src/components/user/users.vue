<template>
  <section class="user_container">
    <!-- 面包屑 -->
    <breadcrumb :crumb="crumb"></breadcrumb>
    <el-card>
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="table" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="联系方式"></el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="create_tiem" label="创建时间"> </el-table-column>
        <el-table-column prop="role" label="用户角色"> </el-table-column>
        <el-table-column prop="user_state" label="用户状态"> </el-table-column>
        <el-table-column label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>
<script>
import breadcrumb from "../../components/Zed_breadcrumb/breadcrumb";
import { mapGetters } from "vuex";
export default {
  name: "userList",
  components: { breadcrumb },
  data() {
    return {
      crumb: ["用户管理", "用户列表"],
    };
  },
  computed: {
    ...mapGetters(["table"]),
  },
};
</script>
<style lang="less" scoped>
.user_container {
  .el-row {
    margin-bottom: 20px;
  }
}
</style>