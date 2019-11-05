const global = require('./global.config')
const proxy = {}

proxy[global.mockPublicPath] = {
  target: 'https://' + global.mockDomain,
  changeOrigin: true // 允许使用localhost
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? global.publicPath : '/',
  devServer: {
    proxy
  }
}
