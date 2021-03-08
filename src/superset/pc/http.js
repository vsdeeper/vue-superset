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
  getLang (lang) {
    if (lang === 'zh') {
      return 'zh_CN'
    } else if (lang === 'en') {
      return 'en_US'
    } else {
      return lang
    }
  },
  getBaseURL (appName, config) {
    let baseURL = ''
    const env = process.env.NODE_ENV
    const map = config.interfacePathMap[appName]
    if (env === 'development') {
      baseURL = map.publicPath
    } else if (env === 'mock') {
      baseURL = map.mockPublicPath
    } else {
      baseURL = map.interfaceDomain + map.publicPath
    }
    return baseURL
  },
  catchErr (_this, msg) {
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
  },
  interactionHandle (_this, d) {
    const trans = _this.getTrans().http
    if (typeof d.success === 'boolean') {
      if (d.success === false) {
        const code = d.errorCode || ''
        if (code.indexOf('TOKEN_TIME_OUT') >= 0 || code.indexOf('USER_LOGIN_EXPIRE') >= 0 || code.indexOf('TOKEN_EXPIRED') >= 0) {
          cux.alert({
            text: trans.tokenExpired,
            icon: 'warning'
          }).then((e) => {
            if (e.value) {
              _this.onTokenTimeout()
            }
          })
        } else {
          _this.toast('error', d.errorMessage || d.errorCode || d.errmsg || d.errcode)
        }
      }
    } else {
      _this.toast(
        'error',
        d.errmsg || d.errcode
      )
    }
  },
  optimizeParams (params) {
    if (typeof params === 'object' && params !== null) {
      if (params instanceof Array) {
        params.forEach(ele => {
          if (typeof ele === 'object' && ele !== null) {
            this.optimizeParams(ele)
          }
        })
      } else {
        for (const key in params) {
          if (key.indexOf('__') >= 0) {
            delete params[key]
          } else {
            if (typeof params[key] === 'object' && params[key] !== null) {
              this.optimizeParams(params[key])
            }
          }
        }
      }
    }
    return params
  },
  /**
   * post请求
   * @param url 请求地址
   * @param action 响应名称
   * @param params 入参
   * @param options {timeout, appName, timestamp}[timeout-接口超时时间][appName-应用名称][timestamp-时间戳]
   */
  post (url, action, params, options) {
    const config = getConfig()
    const token = util.storageGet('local', 'token')
    const _options = options || {}
    const countDown = typeof _options.timeout === 'number' ? _options.timeout : config.timeout
    const appName = typeof _options.appName === 'string' ? _options.appName : config.appName
    const timestamp = typeof _options.timestamp === 'number' ? _options.timestamp : new Date().getTime()
    const baseURL = this.getBaseURL(appName, config)
    axios.defaults.withCredentials = config.withCredentials
    axios.defaults.headers.post['Content-Type'] = config.contentType
    axios.defaults.timeout = countDown // 超时时间，请求会被中断
    axios.defaults.baseURL = baseURL
    if (token) {
      axios.defaults.headers.common['token'] = token
    }

    return new Promise((resolve) => {
      const today = util.dateFormat(new Date().getTime(), 'day').replace(/-/g, '')
      const content = this.optimizeParams(params)
      const data = {
        uuid: today + '-' + util.uuid(),
        appId: config.appId,
        lang: this.getLang(config.lang),
        action,
        timestamp,
        content
      }

      const env = process.env.NODE_ENV
      if (env === 'mock') {
        data['signType'] = 'sha256'
        data['sign'] = '46125801427280'
      }

      axios({
        method: 'post',
        url,
        data
      }).then(res => {
        if (res.status === 200) {
          // 接口通了
          const d = res.data
          this.interactionHandle(this, d)
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
        this.catchErr(this, err.message).then(errorMessage => {
          resolve({
            success: false,
            errorMessage
          })
        })
      })
    })
  },
  /**
   * 模板下载
   * @param templateName 模板名称
   * @param options【appName-应用名称, basePath-基础接口路径】
   */
  downloadTpl (templateName, options) {
    const config = getConfig()
    const _options = options || {}
    const appName = typeof _options.appName === 'string' ? _options.appName : config.appName
    let basePath = ''
    if (typeof _options.basePath === 'string') {
      basePath = _options.basePath
    } else {
      basePath = '/paas/download/adminauth'
    }
    const map = config.interfacePathMap[appName]
    util.windowOpen(`${map.interfaceDomain + basePath}/getTemplate?templateName=${templateName}`)
  },
  /**
   * 下载
   * @param filePath
   * @param downloadName
   * @param options【appName-应用名称, basePath-基础接口路径】
   */
  download (filePath, downloadName, options) {
    return new Promise((resolve, reject) => {
      const config = getConfig()
      const _options = options || {}
      const appName = typeof _options.appName === 'string' ? _options.appName : config.appName
      let basePath = ''
      if (typeof _options.basePath === 'string') {
        basePath = _options.basePath
      } else {
        basePath = '/paas/download/adminauth'
      }
      const map = config.interfacePathMap[appName]
      const baseURL = map.interfaceDomain + basePath
      const instance = axios.create({
        baseURL,
        timeout: 0,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      instance({
        method: 'get',
        url: '/getFile?fileName=' + filePath,
        responseType: 'blob'
      }).then(res => {
        if (res.status === 200) {
          const idx = filePath.lastIndexOf('/')
          const idxe = filePath.lastIndexOf('.')
          const suffix = filePath.slice(idxe + 1)
          const fileName = downloadName ? (downloadName + '.' + suffix) : filePath.slice(idx + 1)
          const downloadElement = document.createElement('a')
          const href = window.URL.createObjectURL(res.data) // 创建下载的链接
          downloadElement.style.display = 'none'
          downloadElement.href = href
          downloadElement.download = fileName // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
        }
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * 上传
   * @param url 请求地址
   * @param files 文件信息 File 对象
   * @param options【appName-应用名称，basePath-基础接口路径】
   */
  upload (url, files, options) {
    return new Promise((resolve, reject) => {
      const config = getConfig()
      const _options = options || {}
      const appName = typeof _options.appName === 'string' ? _options.appName : config.appName
      let basePath = ''
      if (typeof _options.basePath === 'string') {
        basePath = _options.basePath
      } else {
        const an = appName.split('-')
        basePath = '/paas/upload/' + an[2]
      }
      const map = config.interfacePathMap[appName]
      const baseURL = map.interfaceDomain + basePath
      const instance = axios.create(
        {
          baseURL,
          timeout: 0,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      const formData = new FormData()
      if (files.length) { // 多文件
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          formData.append('file' + i, file)
        }
      } else { // 单文件
        formData.append('file', files)
      }
      instance({
        method: 'post',
        url,
        data: formData
      }).then(res => {
        if (res.status === 200) {
          // 接口通了
          const d = res.data
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
        /* eslint-disable no-console */
        console.error(err)
      })
    })
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
        return this.$root.phttpStores.post
      }
    })
    Object.defineProperty(Vue.prototype, '$download', {
      get () {
        return this.$root.phttpStores.download
      }
    })
    Object.defineProperty(Vue.prototype, '$downloadTpl', {
      get () {
        return this.$root.phttpStores.download
      }
    })
    Object.defineProperty(Vue.prototype, '$upload', {
      get () {
        return this.$root.phttpStores.upload
      }
    })
  }
}
