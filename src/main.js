import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'
import { toast } from './vue-toast'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  toast,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
