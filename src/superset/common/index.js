import util from './util'
import pattern from './pattern'
import filters from './filters'
import facebook from './facebook'
import shake from './shake'
import weixin from './weixin'
import QRCode from './QRCode'

export default {
  install (Vue) {
    Vue.use(util)
    Vue.use(pattern)
    Vue.use(filters)
    Vue.use(facebook)
    Vue.use(shake)
  }
}

export {
  weixin,
  QRCode
}