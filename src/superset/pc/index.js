import cux from './cux'
import http from './http'
import components from './components'

export default {
  install (Vue, options) {
    Vue.use(components)
    Vue.use(cux, options)
    Vue.use(http, options)
  }
}
