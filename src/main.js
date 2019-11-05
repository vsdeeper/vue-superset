import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosConfig from '../axios.config'
import common from './common'
import mobile from './mobile'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(AxiosConfig)
Vue.use(common)
Vue.use(mobile)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
