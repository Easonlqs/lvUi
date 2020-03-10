import Vue from 'vue'
import App from './App.vue'
import lvui from '../packages'
// import lvui from '../lib/lv-ui.common'

Vue.use(lvui)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
