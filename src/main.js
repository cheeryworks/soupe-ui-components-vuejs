import Vue from 'vue'
import App from './App.vue'

import Components from './components'

import router from './router'
import i18n from './i18n'

Vue.use(Components)

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
