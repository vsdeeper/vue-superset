export default {
  install (Vue) {
    /**
     * vee-validate校验错误提示
     * @param v 源值
     */
    Vue.filter('errorMsg', function (v, obj) {
      try {
        let msg = ''
        if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
          for (const key in v) {
            if (v.hasOwnProperty(key)) {
              msg = obj[key]
              break
            }
          }
          return msg
        } else {
          throw new Error('过滤器errorMsg：{obj}参数不正确')
        }
      } catch (error) {
        console.error(error)
      }
    })
  }
}
