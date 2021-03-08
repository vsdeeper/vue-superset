import Loader from './Loader.vue'

const loaderStores = {
  display: false,
  color: '',
  show (color) {
    this.color = color || 'primary'
    this.display = true
  },
  hide () {
    this.display = false
  }
}

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          loaderStores
        }
      },
      methods: {
        showLoader (color) {
          this.loaderStores.show(color)
        },
        hideLoader () {
          this.loaderStores.hide()
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$loading', {
      get () {
        return this.$root.showLoader
      }
    })
    Object.defineProperty(Vue.prototype, '$loadend', {
      get () {
        return this.$root.hideLoader
      }
    })
    Object.defineProperty(Vue.prototype, '$loaderStores', {
      get () {
        return this.$root.loaderStores
      }
    })
    Vue.component('CmLoader', Loader)
  }
}
