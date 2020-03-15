import LvButton from './button'
import LvToast from './toast'

const components = {
    LvButton
}

const commonComs = {
    LvToast
}

// 新建install方法
const install = function(Vue) {
    if (install.installed) return
    install.installed = true
    Object.keys(components).forEach(key => {
        // 组件注册方式
        Vue.component(key, components[key]);
    });
    // 插件注册方式
    Object.keys(commonComs).forEach(key => Vue.use(commonComs[key]));
}

export default{
    version: '0.1.0',
    install
}
