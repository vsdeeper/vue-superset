import cux from './cux'
import http from './http'

export default {
  install (Vue) {
    Vue.use(cux)
    Vue.use(http)
  }
}
