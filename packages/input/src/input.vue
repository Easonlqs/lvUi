<template>
  <input class="lv-input" :value="value" @input="onInput">
</template>

<script>
export default {
  name: 'LVInput',
  props: {
    value: [String, Number]
  },
  methods:{
    onInput(e) {
      // v-model 在组件中的代码实现
      this.$emit('input',e.target.value);
      this.$parent.$emit('validate'); // 输入时，使 FormItem 自身触发 validate 事件
    }
  }
}
</script>
<style lang="scss" scoped>
// .lv-input{
//     -webkit-appearance: none;
//     background-color: #fff;
//     background-image: none;
//     border-radius: 4px;
//     border: 1px solid #dcdfe6;
//     box-sizing: border-box;
//     color: #606266;
//     display: inline-block;
//     font-size: inherit;
//     height: 40px;
//     line-height: 40px;
//     outline: none;
//     padding: 0 15px;
//     transition: border-color .2s cubic-bezier(.645,.045,.355,1);
//     width: 100%;
// }
</style>