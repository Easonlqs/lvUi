import LvButton from './src/button.vue';

LvButton.install = function(Vue) {
    Vue.component(LvButton.name, LvButton);
};

export default LvButton;