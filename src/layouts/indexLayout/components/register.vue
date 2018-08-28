<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      :validate-on-rule-change="false"
      class="login-form"
      auto-complete="on"
      label-position="left">

      <h3 class="title">Register</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"/>
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="username"/>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleRegister"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-form-item class="btn">
        <el-button :loading="loading" type="primary" @click.native.prevent="handleRegister">
          注冊
        </el-button>
        <el-button :loading="loading" @click.native.prevent="$router.back()">
          返回
        </el-button>
      </el-form-item>

      <div class="tips">
        <span style="margin-right:20px;">login_username: admin</span>
        <span> login_password: admin</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import mixin from '../mixin'

export default {
  name: 'Register',

  mixins: [mixin],

  data() {
    return {}
  },

  methods: {
    handleRegister() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

