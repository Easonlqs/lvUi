<template>
  <div>
    <form>
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LvForm',
  provide(){
    return {
      LvForm: this
    }
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  data(){
    return{
      // fields 就是用来缓存所有 FormItem 实例的
      fields: []
    }
  },
  created () {
    // Vue父子组件生命周期钩子的执行顺序遵循：从外到内，然后再从内到外
    // FormItem 要先于 Form 渲染，所以form的监听需要再create阶段不能再mouted阶段
    this.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field);
    });
    this.$on('on-form-item-remove', (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  methods:{
    // 公开方法：全部重置数据
    resetFields() {
      this.fields.forEach(field => {
        field.resetField();
      });
    },
    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      return new Promise(resolve => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false;
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          });
        });
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>