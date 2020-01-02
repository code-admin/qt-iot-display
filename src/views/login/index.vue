<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">欢迎使用</h3>
      <h3 class="title">智能设备综合管理平台</h3>
    </div>

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" inline class="login-form" auto-complete="on" label-position="left">

      <div class="subtitle">
        用户登录
      </div>
      <el-form-item prop="username" label="登录名：">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password" label="密  码：">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->

    </el-form>
  </div>
</template>

<script>
import {
  validUsername
} from '@/utils/validate';

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/welcome' });
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#1b526e;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 50px $bg inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }
    .el-button--primary {
      height:60px;
      font-size:30px;
      border-radius: 0;
      background-color: #00f3fb81;
      border-color: #00f3fb81;
      span {
        letter-spacing: 30px;
      }
    }
    .el-form-item {
        // background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
        margin-bottom: 40px;

        &__content {
          width: 395px;
          background: url(../../assets/inline.png) no-repeat;
          background-size: cover
        }

        &__label {
          width:139px;
          height:26px;
          font-size: 22px;
          line-height: 47px;
          font-weight: bold;
          letter-spacing: 4px;
          color:rgba(255,255,255,1);
          &::before {
            margin-right: 8px;
            line-height: 47px;
            vertical-align: sub;
          }
        }
    }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    background: url(../../assets/loginbg.jpg) no-repeat;
    background-size: cover;

    .login-form {
        position: relative;
        width: 845px;
        max-width: 100%;
        height: 550px;
        padding: 100px 150px;
        margin: 0 auto;
        overflow: hidden;
        background: url(../../assets/loginformbg.png) center no-repeat;
        background-size: contain;
    }

    .subtitle {
      height:37px;
      font-size:38px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 55px;
      letter-spacing: 6px;
      color:rgba(255,255,255,1);
    }

    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;
        text-align: center;
        margin-top: 135px;
        .title {
            opacity:0.8;
            width: 800px;
            height: 75px;
            font-size:72px;
            line-height: 1;
            font-weight:bold;
            margin: 60px auto 0;
            letter-spacing: 5px;
            color:rgba(255,255,255,1);
            background: linear-gradient(0deg,rgba(85,189,243,1) 0%, rgba(255,255,255,1) 100%);
            background-clip:text;
            -webkit-background-clip:text;
            -webkit-text-fill-color:transparent;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
