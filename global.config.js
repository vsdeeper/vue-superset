module.exports = {
  appId: '057a1413360f4f2fa682817f9fd43644', // 应用id
  timeout: 5000, // 前端接口通讯超时时间设置，单位ms，必须为整秒
  publicPath: '/', // 项目部署的子路径，默认为域名的根路径，例如 /my-app/
  prodDomain: 'xxxx', // 生产接口域名
  devDomain: 'xxxx', // 测试接口域名
  prodPublicPath: '/xxxxx', // 生产接口公共路径
  devPublicPath: '/xxxxx', // 测试接口公共路径
  mockDomain: 'apimock.e-buychina.com', // mock接口域名
  mockPublicPath: '/mock/14/paas/app', // mock接口公共路径
  contentType: 'application/json' // 数据类型
}
