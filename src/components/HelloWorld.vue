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
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
</style>
