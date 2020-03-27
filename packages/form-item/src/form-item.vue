<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{label}}</label>
    <div>
      <slot></slot>
      <p v-if="errStatus === 'error'" class="i-form-item-message">{{errMsg}}</p>
    </div>
  </div>
</template>

<script>
import Emitter from '../../../src/mixins/emitter';
import AsyncValidator from 'async-validator' // 引入插件
export default {
  name: 'LvFormItem',
  // 注入form数据
  inject:['LvForm'],
  mixins: [ Emitter ],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String
    }
  },
  data(){
    return{
      isRequired: false,  // 是否为必填
      errStatus: '',
      errMsg: ''
    }
  },
  mounted () {
    // 如果没有传入 prop，则无需校验，也就无需缓存
    if (this.prop) {
      this.dispatch('LvForm', 'on-form-item-add', this);
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  beforeDestroy () {
    // 组件销毁前，将实例从 Form 的缓存中移除
    this.dispatch('LvForm', 'on-form-item-remove', this);
  },
  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue () {
      return this.LvForm.model[this.prop];
    }
  },
  methods: {
    setRules () {
      let rules = this.getRules();
        if (rules.length) {
          rules.every((rule) => {
            // 如果当前校验规则中有必填项，则标记出来
            this.isRequired = rule.required;
          });
        }

      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
     getRules () {
      let formRules = this.LvForm.rules;

      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(formRules || []);
    },
    // 重置数据
    resetField () {
      this.errStatus = '';
      this.errMsg = '';

      this.LvForm.model[this.prop] = this.initialValue;
    },
     // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule (trigger) {
      const rules = this.getRules();
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        return true;
      }

      // 设置状态为校验中
      this.errStatus = 'validating';

      // 以下为 async-validator 库的调用方法
      let descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      let model = {};

      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, errors => {
        this.errStatus = !errors ? 'success' : 'error';
        this.errMsg = errors ? errors[0].message : '';

        callback(this.errMsg);
      });
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      this.validate('change');
    }
    // handleValidate () {
    //   // 获取此时正在输入的值
    //   // prop 是通过 props传入的，表示当前要验证的字段，此例中指的就是 username
    //   const value = this.LvForm.model[this.prop]

    //   // 获取 username 的验证规则
    //   const rule = this.LvForm.rules[this.prop]

    //   // 描述对象
    //   const descriptor = { [this.prop]: rule }

    //   // 传入描述对象，创建验证实例
    //   const validator = new Schema(descriptor)

    //   // 校验
    //   validator.validate({ [this.prop]: value }, errors => {
    //     if (errors) {
    //       this.errMsg = errors[0].message
    //       this.errStatus = true
    //     } else {
    //       this.errMsg = ''
    //       this.errStatus = ''
    //     }
    //   })
    // }
  }
}
</script>
<style lang="scss" scoped>
  .i-form-item-label-required:before {
    content: '*';
    color: red;
  }
  .i-form-item-message {
    color: red;
  }
</style>