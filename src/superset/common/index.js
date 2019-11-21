import util from './util'
import pattern from './pattern'
import filters from './filters'
import facebook from './facebook'
import weixin from './weixin'

export default {
  install (Vue) {
    Vue.use(util)
    Vue.use(pattern)
    Vue.use(filters)
    Vue.use(facebook)
    Vue.use(weixin)
  }
}
