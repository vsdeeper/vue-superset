import { directive as vClickOutside } from 'vue-clickaway'

export default {
  install (Vue) {
    Vue.directive('click-outside', vClickOutside)
  }
}