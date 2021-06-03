<template>
  <section class="home_container">首页</section>
</template>
<script>
  import Mock from "mockjs";

  export default {
    created() {
      let mockDate = Mock.mock({
        "table|1-10": [{
          "id|+1": 1,
          username: "@cname",
          mobile: /^1[0-9]{10}$/,
          "type|1-2": 1,
          email: "@email()",
          create_time: '@date("yyyy-MM-dd")',
          "user_state|1": true,
          role: function () {
            return this.user_state ? "超级管理员" : "普通用户";
          },
        }, ],
      });
      this.$store.commit("setTableData", mockDate);
    },
  };
</script>