import Toast from './Toast.vue'

const toastStores = {
  show: false,
  text: '',
  color: '', // success | info | error
  timer: null,
  addText (color, text, timeout) {
    try {
      if (color !== 'success' && color !== 'info' && color !== 'error') {
        throw new Error('$toast: 参数{color}必须为success、info、error中的一个')
      }
      this.color = color
      this.text = text
      if (this.show) {
        clearTimeout(this.timer)
      }
      this.show = true
      this.timer = setTimeout(() => {
        this.show = false
      }, timeout || 3000)
    } catch (error) {
      console.error(error)
    }
  }
}

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          toastStores
        }
      },
      methods: {
        toast (color, text, timeout) {
          this.toastStores.addText(color, text, timeout)
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$toast', {
      get () {
        return this.$root.toast
      }
    })
    Object.defineProperty(Vue.prototype, '$toastStores', {
      get () {
        return this.$root.toastStores
      }
    })
    Vue.component('CmToast', Toast)
  }
}
