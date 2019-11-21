import Toast from './Toast'
import Loader from './Loader'
import ImgVerifyCode from './ImgVerifyCode'

export default {
  install (Vue) {
    Vue.use(Toast)
    Vue.use(Loader)
  }
}

export {
  ImgVerifyCode
}
