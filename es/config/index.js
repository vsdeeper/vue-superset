/**
 * 全局配置文件
 * @param lang 目前支持 zh|en
 */
const config = {
  default: {
    lang: 'zh',
    timeout: 10000,
    appId: 'ebuy8a8c2b8fc849', // 应用ID（必配项）
    appName: 'paas-app-admin', // 应用名称（必配项）
    contentType: 'application/json', // 数据类型
    withCredentials: true, // 表示跨域请求时是否需要使用凭证
    interfacePathMap: { // 接口路径映射
      'paas-app-admin': {
        interfaceDomain: 'https://paas-app-admin.e-buy.com',
        publicPath: '/paas/app/admin',
        mockPublicPath: '/mock/160/paas/app/admin'
      }
    }
  },
  custom: {}
}
const getConfig = () => Object.assign(config.default, config.custom)

export default getConfig
export {
  config
}
