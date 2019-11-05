import axios from 'axios'
import { cux } from './cux'
import { util } from '../common/util'

const http = {
  /**
   * post请求
   * @param url 请求地址
   * @param action 响应名称
   * @param params 入参
   * @param args 剩余参数【isNeedLoading-boolean-是否需要显示loading提示】【isCountDown-boolean-是否显示倒计时】【countDown-number-倒计时时长s】
   */
  post (url, action, params, ...args) {
    const isNeedLoading = args.length > 0 ? args[0] : false
    const isCountDown = args.length > 1 ? args[1] : false
    const countDown = args.length > 2 ? args[2] : global.timeout

    axios.defaults.timeout = countDown // 超时时间，请求会被中断
    return new Promise((resolve, reject) => {
      const data = {
        uuid: util.uuid(),
        appId: global.appId,
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
            interactionHandle(this, d)
            resolve(d)
          } else {
            console.error('status:' + res.status, 'statusText:' + res.statusText)
          }
        }).catch((err) => {
          reject(err)
          catchErr(err.message)
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
              interactionHandle(this, d)
              resolve(d)
            })
          } else {
            console.error('status:' + res.status, 'statusText:' + res.statusText)
          }
        }).catch((err) => {
          reject(err)
          catchErr(err.message, loading)
        })
      }
    })

    function catchErr (msg, loading) {
      if (msg.indexOf('timeout') >= 0) { // 超时处理
        cux.toast('Request timed out, please try again later')
      } else if (msg.indexOf('Network') >= 0) { // 网络连接失败处理
        if (loading) {
          cux.loadend().then(() => {
            clearInterval(loading)
            cux.toast('Network connection failed')
          })
        } else {
          cux.toast('Network connection failed')
        }
      }
    }

    function interactionHandle (_this, d) {
      if (!d.success) {
        switch (d.errorCode) {
          case 'TOKEN_TIME_OUT':
            cux.alert({
              message: 'Login has expired'
            }).then(() => {
              const href = window.location.href
              const base = href.split('#')
              const qrcodeNumber = _this.storageGet('local', 'qrcodeNumber')
              _this.storageDel('local', 'token')
              window.location.replace(`${base[0]}#/welcome?qrcodeNumber=${qrcodeNumber}`)
            })
            break
          default:
            cux.toast(d.errorMessage || d.errorCode || d.errmsg || d.errcode)
            break
        }
      }
    }
  }
}

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          http
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$http', {
      get () {
        return this.$root.http
      }
    })
  }
}
