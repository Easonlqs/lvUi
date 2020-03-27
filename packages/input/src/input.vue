<template>
  <input 
    class="lv-input" 
    :value="currentValue" 
    @input="handleInput"
    @blur="handleBlur"
  >
</template>

<script>
import Emitter from '../../../src/mixins/emitter';
export default {
  name: 'LVInput',
  mixins: [Emitter],
  props: {
    value: [String, Number]
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
    }
  },
  methods:{
    // 第一版
    // onInput(e) {
    //   // v-model 在组件中的代码实现
    //   this.$emit('input',e.target.value);
    //   this.$parent.$emit('validate'); // 输入时，使 FormItem 自身触发 validate 事件
    // }
    handleInput (event) {
      const value = event.target.value;
      this.currentValue = value;
      this.$emit('input', value);
      this.dispatch('iFormItem', 'on-form-change', value);
    },
    handleBlur () {
      this.dispatch('iFormItem', 'on-form-blur', this.currentValue);
    }
  }
}
</script>
<style lang="scss" scoped>
</style>