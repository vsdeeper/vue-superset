import { Toast, Dialog } from 'vant'

/* ****全局交互方法
 * toast- 轻提示
 * loading- loading开始
 * loadend- loading结束
 * alert- 消息提示
 * confirm- 消息确认
 * asyncConfirm- 异步关闭
 */

const mcux = {
  lang: 'zh',
  timeout: 5000,
  getTrans () {
    return require(`./lang/${this.lang}.json`)
  },
  /**
   * 轻提示
   * @param message 文字信息
   */
  toast (message) {
    Toast({
      duration: 3000,
      message
    })
  },
  /**
   * loading开始
   * @param showCountDown 是否显示倒计时-Boolean-默认false
   */
  loading (showCountDown, countDown) {
    const trans = this.getTrans().cux
    let timer
    const _showCountDown = typeof showCountDown === 'undefined' ? false : showCountDown
    const _countDown = typeof countDown === 'undefined' ? this.timeout : countDown
    let second = _countDown / 1000 // 倒计时秒数，需和axios超时时间配置一致

    const toast = Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      loadingType: 'spinner'
    })

    if (_showCountDown) {
      const t = trans.loadingA.split('{second}')
      toast.message = `${t[0]}${second}${t[1]}`
      timer = setInterval(() => {
        second--
        if (second) {
          toast.message = `${t[0]}${second}${t[1]}`
        } else {
          clearInterval(timer)
          Toast.clear()
        }
      }, 1000)
    } else {
      toast.message = trans.loadingB
    }

    return timer
  },
  /**
   * loading结束
   */
  loadend () {
    return new Promise(resolve => {
      setTimeout(() => {
        Toast.clear()
        resolve()
      }, 500)
    })
  },
  /**
   * 消息提示
   * @param params
   */
  alert (params) {
    return new Promise(resolve => {
      const trans = this.getTrans().cux
      Dialog.alert({
        message: params.message,
        confirmButtonText: params.confirmButtonText || trans.ok
      }).then(() => {
        resolve()
      })
    })
  },
  /**
   * 消息确认
   * @param params
   */
  confirm (params) {
    return new Promise(resolve => {
      const trans = this.getTrans().cux
      Dialog.confirm({
        message: params.message || '',
        cancelButtonText: params.cancelButtonText || trans.cancel,
        confirmButtonText: params.confirmButtonText || trans.ok,
        closeOnClickOverlay: true
      }).then(() => {
        // on confirm
        resolve()
      }).catch(err => {
        // on cancel
        console.error(err)
      })
    })
  },
  /**
   * 异步关闭
   * @param message 消息内容
   */
  asyncConfirm (message) {
    return new Promise(resolve => {
      Dialog.confirm({
        message,
        beforeClose (action, done) {
          if (action === 'confirm') {
            resolve(done)
          } else {
            done()
          }
        }
      }).catch(err => {
        // on cancel
        console.error(err)
      })
    })
  }
}

export default {
  install (Vue, options) {
    Vue.mixin({
      data () {
        return {
          mcux
        }
      }
    })
    Object.defineProperty(Vue.prototype, options && options.hasOwnProperty('key') ? `$${options.key}cux` : '$cux', {
      get () {
        return this.$root.mcux
      }
    })
  }
}

export {
  mcux
}
