/* ****全局交互方法
 * toast- 轻提示
 * loading- loading开始
 * loadend- loading结束
 * alert- 消息提示
 * confirm- 消息确认
 * asyncConfirm- 异步关闭
 */

const pcux = {
  lang: 'zh',
  timeout: 5000,
  getTrans () {
    return require(`./lang/${this.lang}.json`)
  },
  /**
   * 轻提示
   * @param message 文字信息
   */
  toast (type, text, timeout) {

  },
  /**
   * loading开始
   * @param showCountDown 是否显示倒计时-Boolean-默认false
   */
  loading (showCountDown, countDown) {

  },
  /**
   * loading结束
   */
  loadend () {

  },
  /**
   * 消息提示
   * @param params
   */
  alert (params) {

  },
  /**
   * 消息确认
   * @param params
   */
  confirm (params) {

  },
  /**
   * 异步关闭
   * @param message 消息内容
   */
  asyncConfirm (message) {

  }
}

export default {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          pcux
        }
      }
    })
    Object.defineProperty(Vue.prototype, options && options.hasOwnProperty('key') ? `$${options.key}cux` : '$cux', {
      get () {
        return this.$root.pcux
      }
    })
  }
}

export {
  pcux
}
