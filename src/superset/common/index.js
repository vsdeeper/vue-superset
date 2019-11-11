import util from './util'
import pattern from './pattern'
import filters from './filters'
import directives from './directives'
import facebook from './facebook'

export default {
  install (Vue) {
    Vue.use(util)
    Vue.use(pattern)
    Vue.use(filters)
    Vue.use(directives)
    Vue.use(facebook)
  }
}
