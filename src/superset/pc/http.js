import axios from 'axios'
import { util } from '../common/util'

const phttpStores = {
  appId: '100000pc',
  lang: 'zh',
  timeout: 5000,
  toast () {},
  onTokenTimeout: () => {},
  getTrans () {
    return require(`./lang/${this.lang}.json`)
  },
  /**
   * post请求
   * @param url 请求地址
   * @param action 响应名称
   * @param params 入参
   * @param args 剩余参数
   */
  post (url, action, params, ...args) {
    const countDown = args.length > 2 ? args[2] : global.timeout
    axios.defaults.timeout = countDown // 超时时间，请求会被中断

    return new Promise((resolve, reject) => {
      const data = {
        uuid: util.uuid(),
        appId: this.appId,
        action,
        timestamp: new Date().getTime(),
        content: params
      }
      axios({
        method: 'post',
        url,
        data
      }).then(res => {
        if (res.status === 200) {
          // 接口通了
          const d = res.data
          interactionHandle(this, url, d)
          resolve(d)
        } else {
          /* eslint-disable no-console */
          console.error(
            'status:' + res.status,
            'statusText:' + res.statusText
          )
        }
      }).catch(err => {
        reject(err)
        catchErr(err.message)
      })
    })

    function catchErr (msg) {
      if (msg.indexOf('timeout') >= 0) {
        // 超时处理
        this.toast('error', '请求超时')
      } else if (msg.indexOf('Network') >= 0) {
        // 网络连接失败处理
        this.toast('error', '网络连接失败')
      }
    }

    function interactionHandle (_this, url, d) {
      if (typeof d.success === 'boolean') {
        if (d.success === false) {
          _this.toast(
            'error',
            d.errorMessage || d.errorCode
          )
        }
      } else {
        _this.toast(
          'error',
          d.errmsg || d.errcode
        )
      }
    }
  }
}

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          phttpStores
        }
      },
      methods: {
        ppost (url, action, params, ...args) {
          this.phttpStores.toast = this.$toast
          return this.phttpStores.post(url, action, params, ...args)
        }
      }
    })

    Object.defineProperty(Vue.prototype, '$http', {
      get () {
        return this.$root.phttpStores
      }
    })

    Object.defineProperty(Vue.prototype, '$post', {
      get () {
        return this.$root.ppost
      }
    })
  }
}
