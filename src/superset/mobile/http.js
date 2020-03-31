import axios from 'axios'
import { mcux as cux } from './cux'
import { util } from '../common/util'
import getConfig from '../config'

const mhttp = {
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
   * @param args 剩余参数【isNeedLoading-boolean-是否需要显示loading提示】【isCountDown-boolean-是否显示倒计时】【countDown-number-倒计时时长ms】【isToast-boolean-是否显示toast】
   */
  post (url, action, params, ...args) {
    const isNeedLoading = args.length > 0 ? args[0] : false
    const isCountDown = args.length > 1 ? args[1] : false
    const countDown = args.length > 2 ? args[2] : getConfig().timeout
    const isToast = args.length > 3 ? args[3] : true

    axios.defaults.timeout = countDown // 超时时间，请求会被中断
    return new Promise((resolve) => {
      const today = util.dateFormat(new Date().getTime(), 'day').replace(/-/g, '')
      const data = {
        uuid: today + '-' + util.uuid(),
        appId: getConfig().appId,
        action,
        timestamp: new Date().getTime(),
        content: params
      }
      if (!isNeedLoading) {
        axios({
          method: 'post',
          url,
          data
        }).then((res) => {
          if (res.status === 200) { // 接口通了
            const d = res.data
            interactionHandle(this, d, isToast)
            resolve(d)
          } else {
            console.error('status:' + res.status, 'statusText:' + res.statusText)
          }
        }).catch((err) => {
          console.error(err)
          catchErr(this, err.message, false, isToast).then((errorMessage) => {
            resolve({
              success: false,
              errorMessage
            })
          })
        })
      } else {
        const loading = cux.loading(isCountDown, countDown)
        axios({
          method: 'post',
          url,
          data
        }).then((res) => {
          if (res.status === 200) { // 接口通了
            const d = res.data
            cux.loadend().then(() => {
              clearInterval(loading)
              interactionHandle(this, d, isToast)
              resolve(d)
            })
          } else {
            console.error('status:' + res.status, 'statusText:' + res.statusText)
          }
        }).catch((err) => {
          console.error(err)
          catchErr(this, err.message, loading, isToast).then((errorMessage) => {
            resolve({
              success: false,
              errorMessage
            })
          })
        })
      }
    })

    function catchErr (_this, msg, loading, isToast) {
      return new Promise(resolve => {
        const trans = _this.getTrans().http
        if (msg.indexOf('timeout') >= 0) { // 超时处理
          if (isToast) {
            cux.toast(trans.timeout)
          }
          resolve(trans.timeout)
        } else if (msg.indexOf('Network') >= 0) { // 网络连接失败处理
          if (loading) {
            cux.loadend().then(() => {
              clearInterval(loading)
              if (isToast) {
                cux.toast(trans.networkFail)
              }
              resolve(trans.networkFail)
            })
          } else {
            if (isToast) {
              cux.toast(trans.networkFail)
            }
            resolve(trans.networkFail)
          }
        }
      })
    }

    function interactionHandle (_this, d, isToast) {
      const trans = _this.getTrans().http
      if (!d.success) {
        switch (d.errorCode) {
          case 'TOKEN_TIME_OUT':
            cux.alert({
              message: trans.tokenExpired
            }).then(() => {
              _this.onTokenTimeout()
            })
            break
          default:
            if (isToast) {
              cux.toast(d.errorMessage || d.errorCode || d.errmsg || d.errcode)
            }
            break
        }
      }
    }
  }
}

export default {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          mhttp
        }
      }
    })

    Object.defineProperty(Vue.prototype, options && options.hasOwnProperty('key') ? `$${options.key}http` : '$http', {
      get () {
        return this.$root.mhttp
      }
    })
  }
}
