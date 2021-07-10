<template>
  <!-- :header-row-class-name="headerRowClass"
      :row-class-name="rowClass" -->
  <div class="dashboard_container">
    <el-table :data="tableData" border style="width: 100%" stripe>
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
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
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
    handleClick(row) {
      console.log(row);
    },
    // headerRowClass() {
    // return "b";
    // },
    // rowClass({ rowIndex }) {
    // console.log(rowIndex);
    // console.log(rowIndex % 2 === 0);
    // if (rowIndex % 2 === 0) {
    //   return "c";
    // }
    // return "";
    // },
  },
};
</script>
<style lang="scss">
.dashboard_container {
  // 修改表格头部背景
  // .el-table th{
  //     background: red;
  //   }
  // 修改表格行背景
  // .el-table tr{
  //    background:blue;
  //   }
  // 修改斑马线表格的背景
  // .el-table--striped .el-table__body tr.el-table__row--striped td {
  //     background: goldenrod;
  //   }
  // 修改行内线的颜色
  // .el-table td,.building-top .el-table th.is-leaf {
  //     border-bottom:  1px solid goldenrod;
  //   }
  // 修改表格最底部边框颜色和高度
  // .el-table::before{
  //    border-bottom:  1px solid blue;
  //     height: 2px
  //   }
  // 修改表头字体颜色
  // .el-table thead {
  //   color: #8eb7fa;
  //   font-weight: 800;
  // }
  // 修改表格内容字体颜色和字体大小
  // .el-table{
  //     color: #6B81CE;
  //     font-size: 14px;
  //   }
  // 修改表格无数据的时候背景，字体颜色
  // .el-table__empty-block{
  //     background: #16603C;
  //   }
  // .el-table__empty-text{
  //   color: #blue
  // }
  // 修改表格鼠标悬浮hover背景色
  // .el-table--enable-row-hover .el-table__body tr:hover>td {
  //     background-color: blue;
  // }

  // .el-table .b th {
  //   background-color: rgb(8, 51, 133) !important;
  //   color: #fff;
  // }

  // .el-table .c td {
  //   background-color: rgb(201, 82, 14) !important;
  //   color: #fff;
  // }
}
</style>
<style lang="scss" scoped>
.dashboard_container {
  padding: 20px 60px;
}
</style>
