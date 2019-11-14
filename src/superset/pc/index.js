import cux from './cux'
import http from './http'
import components from './components'

export default {
  install (Vue) {
    Vue.use(components)
    Vue.use(cux)
    Vue.use(http)
  }
}
