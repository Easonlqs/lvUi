<template>
  <div class="hello">
    <h1>以Vue为基础的UI组件库</h1>
    <div class="btnDemo">
      <lv-button @click="showToast">默认按钮</lv-button>
      <lv-button type="primary">普通按钮</lv-button>
      <lv-button type="success">成功按钮</lv-button>
      <lv-button type="info">信息按钮</lv-button>
      <lv-button type="warn">警告按钮</lv-button>
      <lv-button type="danger">危险按钮</lv-button>
    </div>
    <div class="demo">
      <lv-form :model="form" :rules="rules" ref="form">
        <lv-form-item label="用户名" prop="username">
          <lv-input v-model="form.username" />
        </lv-form-item>
        <lv-form-item label="密码" prop="password">
          <lv-input v-model="form.password" />
        </lv-form-item>
        <lv-form-item label="确认密码" prop="checkPass">
          <lv-input v-model="form.checkPass" />
        </lv-form-item>
      </lv-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return{
      form: {
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    showToast(){
      this.$lvToast.show('Hell World！')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.btnDemo{
  button{
    margin-left: 10px;
  }
}
.demo{
  margin-top: 20px;
}
</style>
