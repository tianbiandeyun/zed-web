<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo -->
      <div class="logo">logo</div>

      <!-- usernam password -->
      <!-- 表单验证一定要有表单的数据对象属性 model rules是验证规则 prop是使用某个验证规则的验证属性 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
        <!-- usernam -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-wodeguanzhu"
          ></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-zhiwen"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- option -->
        <el-form-item class="button_box">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="restLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "jack",
        password: "1013",
      },
      //   验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //   模拟登录
    login() {
      this.$refs.loginFormRef.validate((boolean) => {
        if (!boolean) return this.$message.error("登录失败");
        this.$message.success("登陆成功");
        window.sessionStorage.setItem("token", "cel");
        this.$router.push("/main");
      });
    },
    //   重置登录表单
    restLoginForm() {
      this.$refs.loginFormRef.resetFields();
      this.$message.success("重置数据成功");
    },
  },
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .logo {
      width: 120px;
      height: 120px;
      background-color: #fff;
      box-shadow: 0 0 5px 5px #ddd;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 120px;
      text-align: center;
    }

    .el-form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .button_box {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>