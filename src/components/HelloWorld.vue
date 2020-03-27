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
      <lv-form ref="form" :model="form" :rules="rules">
        <lv-form-item label="用户名" prop="name">
          <lv-input v-model="form.name"></lv-input>
        </lv-form-item>
        <lv-form-item label="邮箱" prop="mail">
          <lv-input v-model="form.mail"></lv-input>
        </lv-form-item>
      </lv-form>
      <button @click="handleSubmit">提交</button>
      <button @click="handleReset">重置</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      form: {
        name: '',
        mail: ''
      },
      rules: {
        name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ]
      }
    }
  },
  methods:{
    showToast(){
      this.$lvToast.show('Hell World！')
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
         console.log('提交成功');
        } else {
          console.log('表单校验失败');
        }
      })
    },
    handleReset () {
      this.$refs.form.resetFields();
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
