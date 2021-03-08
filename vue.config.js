const proxy = {}
const env = process.env.NODE_ENV
const secondLevelDir = process.env.VUE_APP_SECONDLEVEL_DIR
const interfaceDomain = process.env.VUE_APP_INTERFACE_DOMAIN
proxy['/'] = {
  target: interfaceDomain,
  changeOrigin: true // 允许使用localhost
}

module.exports = {
  publicPath: (env === 'production' || env === 'release') ? secondLevelDir : '/',
  devServer: {
    proxy
  },
  configureWebpack: {
    devtool: 'source-map' // 确保所构建的内容每个环境都具有sourcemap
  }
}
