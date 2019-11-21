const weixinStorage = {
  /**
   * 微信公众号授权
   * @params { appid, authorizeUrl, thirdPartyAppid, query: {} }
   * appid- 需要得到用户授权的公众号appid
   * authorizeUrl- 跳转到后端提供的授权地址
   * thirdPartyAppid- 第三方平台的appid
   * query- 将前端需要的组装储存以便于授权回跳能够拿得到，如{ activityId, productId }
   */
  authorize (params) {
    const query = params.query ? JSON.stringify(params.query) : JSON.stringify({})
    window.location.replace(
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + params.appid +
      '&redirect_uri=' + encodeURIComponent(params.authorizeUrl) + 
      '&response_type=code&scope=snsapi_userinfo&state=' + query + 
      '&component_appid=' + params.thirdPartyAppid + '#wechat_redirect'
    )
  }
}

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          weixinStorage
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$weixin', {
      get () {
        return this.$root.weixinStorage
      }
    })
  }
}