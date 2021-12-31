import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/app.css'
import './assets/css/tailwind.css'

Vue.config.productionTip = false

import vClickOutside from 'v-click-outside'
 
Vue.use(vClickOutside)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
