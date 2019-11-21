import cux from './cux'
import http from './http'
import filters from './filters'
import components from './components'

export default {
  install (Vue) {
    Vue.use(cux)
    Vue.use(http)
    Vue.use(filters)
    Vue.use(components)
  }
}
