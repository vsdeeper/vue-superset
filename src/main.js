import Vue from 'vue'
import Vant from 'vant'
import App from './App.vue'
import router from './router'
import store from './store'
import AxiosConfig from '../axios.config'
import common from './superset/common'
import mobile from './superset/mobile'
import 'vant/lib/index.css'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(AxiosConfig)
Vue.use(common)
Vue.use(mobile)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
