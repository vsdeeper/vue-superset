import Swal from 'sweetalert2'
import getConfig from '../config'

/* ****全局交互方法
 * alert- 消息提示
 * confirm- 消息确认
 * asyncConfirm- 异步关闭
 */

const swalConfig = {
  buttonsStyling: false,
  reverseButtons: true,
  customClass: {
    popup: 'v-application',
    confirmButton: 'v-btn v-btn--contained theme--light v-size--large success',
    cancelButton: 'v-btn v-btn--contained theme--light v-size--large error'
  },
  confirmButtonText: '确定',
  cancelButtonText: '取消'
}

const pcux = {
  getTrans () {
    const config = getConfig()
    return require(`../lang/${config.lang}.json`)
  },
  /**
   * 消息提示
   * @param params
   */
  alert (params) {
    const trans = this.getTrans().cux
    swalConfig.confirmButtonText = trans.ok
    swalConfig.cancelButtonText = trans.cancel

    return new Promise(resolve => {
      Swal.fire({
        ...swalConfig,
        title: params.title || null,
        text: params.text || null,
        icon: params.icon || null, // warning | error | success | info | question
        timer: typeof params.timer === 'undefined' ? null : params.timer,
        /* eslint-disable no-unneeded-ternary */
        showCancelButton: typeof params.showCancelButton === 'undefined' ? (typeof params.timer === 'undefined' ? true : false) : params.showCancelButton,
        showConfirmButton: typeof params.showConfirmButton === 'undefined' ? (typeof params.timer === 'undefined' ? true : false) : params.showConfirmButton,
        allowOutsideClick: typeof params.allowOutsideClick === 'undefined' ? (typeof params.timer === 'undefined' ? true : false) : params.allowOutsideClick,
        onClose: params.onClose || null
      }).then(result => {
        resolve(result) // {value: true} | {dismiss: "cancel"} | {dismiss: "backdrop"}
      })
    })
  },
  /**
   * 异步操作
   * @param params
   */
  asyncOperation (params) {
    const trans = this.getTrans().cux
    swalConfig.confirmButtonText = trans.ok
    swalConfig.cancelButtonText = trans.cancel

    Swal.fire({
      ...swalConfig,
      title: params.title || null,
      text: params.text || null,
      icon: params.icon || null, // warning | error | success | info | question
      input: params.input || null,
      html: params.html || null,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: params.preConfirm
    })
  }
}

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          pcux
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$cux', {
      get () {
        return this.$root.pcux
      }
    })
  }
}

export {
  pcux
}
