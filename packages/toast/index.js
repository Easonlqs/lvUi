import Vue from 'vue';
import LVToast from './src/toast.vue';

const obj = {}

obj.install = function(Vue) {
    const toastContrustor = Vue.extend(LVToast); // 创建构造函数
    const toast = new toastContrustor()
    toast.$mount() // 组件挂载
    document.body.appendChild(toast.$el);
    Vue.prototype.$lvToast = toast
}

export default obj;