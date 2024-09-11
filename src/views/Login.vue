<template>
  <div class="login">
   <div class="form">
    <h1>SCDQ</h1>
    <el-form ref="form" :model="form" label-width="80px">
      <p><el-input v-model="form.username" placeholder="账号"></el-input></p>
      <p><el-input v-model="form.password" placeholder="密码"></el-input></p>
      <p class="codebox"><el-input v-model="form.code" placeholder="验证码" class="code"></el-input><img :src="form.img" alt=""></p>
      <p><el-checkbox v-model="checked">记住密码</el-checkbox></p>
      <p class="btn"><el-button type="primary" @click="onsubmit">登录</el-button></p>
    </el-form>
   </div>
  </div>
</template>
<script>
import { encrypt } from '../encryption/index.js'
import login from '../api/login'
import code from '../api/code'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: 'web-58',
        img: '',
        uuid: '',
        code: ''
      },
      checked: false
    }
  },
  methods: {
    onsubmit () {
      login({
        code: this.form.code,
        uuid: this.form.uuid,
        username: this.form.username,
        password: encrypt(this.form.password)
      }).then(() => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push('/')
      }).catch(err => {
        this.$message({
          message: err.response.data.message,
          type: 'error'
        })
        code().then(res => {
          this.form.uuid = res.uuid
          this.form.img = res.img
        })
      })
    }
  },
  mounted () {
    code().then(res => {
      this.form.uuid = res.uuid
      this.form.img = res.img
    })
  }
}
</script>
<style>
.login {
  width: 100%;
  height: 100vh;
  background: url(../assets/bj.jpg) no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
button{
  width: 100%;
}
.form{
  padding: 20px 30px ;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 260px;
  background: #fff;
}
p{
margin-bottom: 20px;
}
.code{
  width: 50%;
}
.btn{
  margin-bottom: 0px;
}
h1{
  margin: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
}
.codebox{
  display: flex;
  flex-direction:row;
  align-items: center;
}
</style>
