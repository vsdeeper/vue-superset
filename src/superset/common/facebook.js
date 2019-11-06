const facebook = {
  /**
   * 加载FacebookSDK
   */
  loadSdk (params) {
    /* eslint-disable */
    window.fbAsyncInit = function() {
      FB.init({
        appId      : params.appId, // 应用id
        cookie     : true,
        xfbml      : true,
        version    : params.version || 'v4.0'
      });
        
      FB.AppEvents.logPageView();   
        
    };
    
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      const lang = params.lang || 'en_US'
      js.src = `https://connect.facebook.net/${lang}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },
  /**
   * 检测window中FB对象的初始化完成
   */
  checkFB () {
    return new Promise(resolve => {
      const timer = setInterval(() => {
        if (window.FB) {
          window.clearInterval(timer)
          resolve()
        }
      }, 200)
    })
  },
}

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          facebook
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$facebook', {
      get () {
        return this.$root.facebook
      }
    })
  }
}