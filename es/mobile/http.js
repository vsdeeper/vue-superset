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
   * @param options {isNeedLoading, isCountDown, countDown, isToast, appName}【isNeedLoading-boolean-是否需要显示loading提示】【isCountDown-boolean-是否显示倒计时】【countDown-number-倒计时时长ms】【isToast-boolean-是否显示toast】【appName-string-应用名称】
   */
  post (url, action, params, options) {
    const config = getConfig()
    const _options = options || {}
    const isNeedLoading = typeof _options.isNeedLoading === 'boolean' ? _options.isNeedLoading : false
    const isCountDown = typeof _options.isCountDown === 'boolean' ? _options.isCountDown : false
    const countDown = typeof _options.countDown === 'number' ? _options.countDown : config.timeout
    const isToast = typeof _options.isToast === 'boolean' ? _options.isToast : true
    const appName = typeof _options.appName === 'string' ? _options.appName : config.appName
    const baseURL = getBaseURL(appName, config)
    axios.defaults.withCredentials = config.withCredentials
    axios.defaults.headers.post['Content-Type'] = config.contentType
    axios.defaults.timeout = countDown // 超时时间，请求会被中断
    axios.defaults.baseURL = baseURL

    const token = util.storageGet('local', 'token')
    if (token) {
      axios.defaults.headers.common['token'] = token
    }
    return new Promise((resolve) => {
      const today = util.dateFormat(new Date().getTime(), 'day').replace(/-/g, '')
      const data = {
        uuid: today + '-' + util.uuid(),
        appId: config.appId,
        lang: getLang(config.lang),
        action,
        timestamp: new Date().getTime(),
        content: params
      }
      const env = process.env.NODE_ENV
      if (env === 'mock') {
        data['signType'] = 'sha256'
        data['sign'] = '46125801427280'
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

    function getLang (lang) {
      if (lang === 'zh') {
        return 'zh_CN'
      } else if (lang === 'en') {
        return 'en_US'
      } else {
        return lang
      }
    }

    function getBaseURL (appName, config) {
      let baseURL = ''
      const env = process.env.NODE_ENV
      const map = config.interfacePathMap[appName]
      if (env === 'production' || env === 'release' || env === 'uat' || env === 'debug') { // 生产环境|测试环境|验收环境|开发环境
        baseURL = map.interfaceDomain + map.publicPath
      } else {
        if (env === 'mock') {
          baseURL = map.mockPublicPath
        } else {
          baseURL = map.publicPath
        }
      }
      return baseURL
    }

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
        const code = d.errorCode || ''
        if (code.indexOf('TOKEN_TIME_OUT') >= 0 || code.indexOf('USER_LOGIN_EXPIRE') >= 0 || code.indexOf('TOKEN_EXPIRED') >= 0) {
          cux.alert({
            message: trans.tokenExpired
          }).then(() => {
            _this.onTokenTimeout()
          })
        } else {
          if (isToast) {
            cux.toast(d.errorMessage || d.errorCode || d.errmsg || d.errcode)
          }
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
