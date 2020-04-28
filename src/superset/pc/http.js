import axios from 'axios'
import { pcux as cux } from './cux'
import { util } from '../common/util'
import getConfig from '../config'

const phttpStores = {
  toast () {},
  onTokenTimeout: () => {},
  getTrans () {
    const config = getConfig()
    return require(`../lang/${config.lang}.json`)
  },
  /**
   * post请求
   * @param url 请求地址
   * @param action 响应名称
   * @param params 入参
   * @param args 剩余参数[timeout, baseURL]
   */
  post (url, action, params, ...args) {
    const token = util.storageGet('local', 'token')
    const countDown = args.length > 0 ? args[0] : getConfig().timeout
    const defaultBaseURL = axios.defaults.baseURL
    const baseURL = args.length > 1 ? args[1] : defaultBaseURL
    axios.defaults.timeout = countDown // 超时时间，请求会被中断
    if (token) {
      axios.defaults.headers.common['token'] = token
    }

    return new Promise((resolve) => {
      const today = util.dateFormat(new Date().getTime(), 'day').replace(/-/g, '')
      const data = {
        uuid: today + '-' + util.uuid(),
        appId: getConfig().appId,
        action,
        timestamp: new Date().getTime(),
        content: params
      }

      axios({
        method: 'post',
        url,
        baseURL,
        data
      }).then(res => {
        if (res.status === 200) {
          // 接口通了
          const d = res.data
          interactionHandle(this, d)
          resolve(d)
        } else {
          /* eslint-disable no-console */
          console.error(
            'status:' + res.status,
            'statusText:' + res.statusText
          )
        }
      }).catch(err => {
        console.error(err)
        catchErr(this, err.message).then(errorMessage => {
          resolve({
            success: false,
            errorMessage
          })
        })
      })
    })

    function catchErr (_this, msg) {
      return new Promise(resolve => {
        const trans = _this.getTrans().http
        if (msg.indexOf('timeout') >= 0) {
          // 超时处理
          _this.toast('error', trans.timeout)
          resolve(trans.timeout)
        } else if (msg.indexOf('Network') >= 0) {
          // 网络连接失败处理
          _this.toast('error', trans.networkFail)
          resolve(trans.networkFail)
        }
      })
    }

    function interactionHandle (_this, d) {
      const trans = _this.getTrans().http
      if (typeof d.success === 'boolean') {
        if (d.success === false) {
          switch (d.errorCode) {
            case 'TOKEN_TIME_OUT':
              cux.alert({
                text: trans.tokenExpired,
                icon: 'warning'
              }).then(() => {
                _this.onTokenTimeout()
              })
              break
            default:
              _this.toast('error', d.errorMessage || d.errorCode || d.errmsg || d.errcode)
              break
          }
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
          return this.phttpStores.post(url, action, params, ...args)
        }
      },
      created () {
        this.phttpStores.toast = this.$toast
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
