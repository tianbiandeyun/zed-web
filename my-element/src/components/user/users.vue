<template>
  <section class="user_container">
    <!-- 面包屑 -->
    <breadcrumb :crumb="crumb"></breadcrumb>
    <el-card>
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入搜索内容" v-model="search_val">
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
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="create_tiem" label="创建时间"></el-table-column>
        <el-table-column prop="role" label="用户角色"></el-table-column>
        <el-table-column prop="user_state" label="用户状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.user_state"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改" placement="top">
              <el-button
                type="primary"
                size="min"
                :data-d="scope"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                size="min"
                :data-d="scope"
                icon="el-icon-delete"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="设置"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                size="min"
                :data-d="scope"
                icon="el-icon-setting"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- total 总共有几条 page-size 每页显示几条 page-sizes 可选择每页显示几条 current-page 当前页数 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="100"
      >
      </el-pagination>
    </el-card>
  </section>
</template>
<script>
import breadcrumb from "../../components/Zed_breadcrumb/breadcrumb";
import { generateTable } from "../../utils/utils";
import { mapGetters } from "vuex";
export default {
  name: "userList",
  components: {
    breadcrumb,
  },
  data() {
    return {
      search_val: "",
      crumb: ["用户管理", "用户列表"], // 面包屑
      currentPage: 1, // 当前显示第几页
    };
  },
  created() {
    this.initTable();
  },
  methods: {
    // 切换页数
    handleCurrentChange(res) {
      this.initTable();
      this.$message({
        message: `成功切换到第${res}页`,
        type: "success",
      });
    },
    // 初始化 table 数据
    initTable() {
      const { table } = generateTable();
      this.$store.commit("setTableData", table);
    },
  },
  computed: {
    ...mapGetters(["table"]),
  },
};
</script>
<style lang="less" scoped>
.user_container {
  .el-row,
  .el-table {
    margin-bottom: 20px;
  }
}
</style>