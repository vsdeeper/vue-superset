import getConfig from '../config'

const config = getConfig()
const trans = require(`../lang/${config.lang}.json`)

export default {
  install (Vue) {
    /**
     * 数字加密 10**9800
     * @param num 数字
     * @param slength 开始长度
     * @param elength 结尾长度
     * @param rlength 星号长度
     */
    Vue.filter('digitalEncryption', function (num, slength, elength, rlength) {
      const _num = num + ''
      let m = ''
      try {
        if (typeof num !== 'undefined') {
          if (typeof slength === 'undefined' || typeof elength === 'undefined') {
            throw new Error('digitalEncryption: 开始长度和结束长度必须设置')
          }
          if (_num.length > slength + elength) {
            const s = _num.substring(0, slength)
            const e = _num.substring(_num.length - elength, _num.length)
            if (rlength) {
              for (let i = 0; i < rlength; i++) {
                m = m + '*'
              }
            } else {
              m = '**'
            }
            return s + m + e
          }
        }
      } catch (error) {
        console.error(error)
      }
    })
    /**
     * 数字格式化，四舍五入
     * @param num 源数字
     * @param dec 小数位
     */
    Vue.filter('numFormat', function (num, dec) {
      if (typeof num !== 'undefined' && num !== null) {
        num = Number(num)
        if (num || num === 0) {
          if (typeof dec === 'number') {
            return num.toFixed(dec).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
          } else {
            return num.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
          }
        }
      } else {
        return '--'
      }
    })
    /**
     * 日期分割
     * @param v 源值 20190312102315
     */
    Vue.filter('dateSeparate', function (v, fromat, separator) {
      if (v) {
        const vstr = v.toString()
        const year = vstr.substr(0, 4)
        const month = vstr.substr(4, 2)
        const day = vstr.substr(6, 2)
        const hour = vstr.substr(8, 2)
        const minute = vstr.substr(10, 2)
        const second = vstr.substr(12, 2)
        const s = separator || '-'
        if (fromat === 'ymd') {
          return `${year}${s}${month}${s}${day}`
        } else if (fromat === 'hms') {
          return `${hour}:${minute}:${second}`
        } else if (fromat === 'ymdhms') {
          return `${year}${s}${month}${s}${day} ${hour}:${minute}:${second}`
        }
        return '--'
      }
      return '--'
    })
    /**
     * 日期格式化
     * @param timestamp 时间戳|毫秒数
     * @param type 格式化类型
     * @param sr 分隔符
     * @param todayOrYesterday 是否显示今天或昨天
     */
    Vue.filter('dateFormat', function (timestamp, type, sr, todayOrYesterday) {
      try {
        if (typeof timestamp === 'undefined' || timestamp === null || timestamp === '') {
          return '--'
        }
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        const td = new Date()
        const yd = new Date((new Date()).setDate(td.getDate() - 1))
        const today = [td.getFullYear(), td.getMonth() + 1, td.getDate()].map(zeroFill).join(sr || '-')
        const yesterday = [yd.getFullYear(), yd.getMonth() + 1, yd.getDate()].map(zeroFill).join(sr || '-')

        let myday = [year, month, day].map(zeroFill).join(sr || '-')

        if (typeof todayOrYesterday !== 'undefined') {
          if (typeof todayOrYesterday !== 'boolean') {
            throw new Error('dateFormat: 参数{todayOrYesterday}必须为Boolean类型')
          }

          if (today === myday) {
            myday = trans['common'].today
          }
          if (yesterday === myday) {
            myday = trans['common'].tomorrow
          }
        }

        if (typeof type !== 'undefined') {
          if (type !== 'day' && type !== 'minute' && type !== 'second') {
            throw new Error('dateFormat: 参数{type}必须为day、minute、second中的一个')
          }
        }

        if (type === 'day') {
          return myday
        } else if (type === 'minute') {
          return myday + ' ' + [hour, minute].map(zeroFill).join(':')
        } else if (type === 'second') {
          return myday + ' ' + [hour, minute, second].map(zeroFill).join(':')
        } else {
          return myday
        }
      } catch (error) {
        console.error(error)
      }

      function zeroFill (num) {
        num = num.toString()
        return num[1] ? num : '0' + num
      }
    })
  }
}
