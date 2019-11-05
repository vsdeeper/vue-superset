import axios from 'axios'
import VConsole from 'vconsole'

const global = require('./global.config')

let baseURL // 接口基础路径
const domain = document.domain // 获取页面域名

if (domain === global.prodDomain) { // 生产环境
  baseURL = 'https://' + global.prodDomain + global.prodPublicPath
} else if (domain === global.devDomain) { // 测试环境
  /* eslint-disable no-new */
  new VConsole()
  baseURL = 'https://' + global.devDomain + global.devPublicPath
} else {
  new VConsole()
  baseURL = global.mockPublicPath
}

export default {
  install () {
    // 全局配置
    axios.defaults.baseURL = baseURL
    axios.defaults.withCredentials = true // 表示跨域请求时是否需要使用凭证
    axios.defaults.headers.post['Content-Type'] = global.contentType
  }
}
