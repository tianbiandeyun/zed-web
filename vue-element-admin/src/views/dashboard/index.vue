<template>
  <div class="dashboard_container zTable zForm zDialog">
    <div class="backing">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.a" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.b" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.c" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.d" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.e" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.f" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input v-model="form.g" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.h" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div class="backing">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column fixed prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="province" label="省份"> </el-table-column>
        <el-table-column prop="city" label="市区"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="zip" label="邮编"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="提示" :visible.sync="dialogVisible">
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column fixed prop="date" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="province" label="省份"> </el-table-column>
        <el-table-column prop="city" label="市区"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="zip" label="邮编"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      dialogVisible: false,
      form: {
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        f: "",
        g: "",
        h: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClick(row) {
      this.dialogVisible = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard_container {
  padding: 20px 60px;

  .zSelect {
    border: 1px solid black;
  }
}
</style>
