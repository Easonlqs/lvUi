import LvButton from './button'

const components = {
    LvButton
}

// 新建install方法
const install = function(Vue) {
    if (install.installed) return
    install.installed = true
    Object.keys(components).forEach(key => {
        // 遍历组件
        Vue.component(key, components[key]);
    });
}

export default{
    version: '0.1.0',
    install
}
