import cux from './cux'
import http from './http'

export default {
  install (Vue, options) {
    Vue.use(cux, options)
    Vue.use(http, options)
  }
}
