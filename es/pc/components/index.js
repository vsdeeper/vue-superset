import Toast from './Toast'
import Loader from './Loader'
import ViewSkeleton from './ViewSkeleton'
import SideBarSet from './SideBarSet'
import TinymceEditor from './TinymceEditor'
import UxDatePicker from './UxDatePicker'
import UxDateTimePicker from './UxDateTimePicker'
import UxDateRange from './UxDateRange'
import UxSearchBar from './UxSearchBar'
import UxTimePicker from './UxTimePicker'
import UxColorPicker from './UxColorPicker'
import UxMore from './UxMore'
import UxTreeview from './UxTreeview'

export default {
  install (Vue) {
    Vue.use(Toast)
    Vue.use(Loader)
    Vue.use(ViewSkeleton)
    Vue.use(SideBarSet)
    Vue.use(TinymceEditor)
    Vue.use(UxDatePicker)
    Vue.use(UxDateTimePicker)
    Vue.use(UxDateRange)
    Vue.use(UxSearchBar)
    Vue.use(UxTimePicker)
    Vue.use(UxColorPicker)
    Vue.use(UxMore)
    Vue.use(UxTreeview)
  }
}
