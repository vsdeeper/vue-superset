/* ****自定义工具类方法
 * uuid- 生成uuid
 * platform- 判断当前平台环境
 * getTimezoneOffset- 获取时区偏移
 * numFormat- 数字格式化，四舍五入
 * countDown- 简易倒计时
 * zeroFill- 0位填充
 * remainTime- 倒计时 分/秒
 * timeMinus- 计算2个时间差
 * msDifference- 计算某一个日期多少天之后(之前)的毫秒数
 * dateSeparate- 日期时间分割
 * dateFormat- 日期格式化
 * storageSet- 本地存储值设置
 * storageGet- 本地存储值获取
 * storageDel- 本地存储值删除
 * readerImgUrl- 生成可预览的图片路径
 * getWh- 获取屏幕高度
 * getWw- 获取屏幕宽度
 * getBrowserLang- 获取当前浏览器的语言
 * imgsPreload- 图片预加载
 * getAge- 获取年龄周岁
 * clone- 克隆对象
 * base64Encode- base64编码
 * base64Decode- base64解码
 * storageUsageRate- 可使用存储空间的使用比例
 * windowOpen- 打开浏览器窗口
 * platform- 获取平台信息
 * strTransAry- 字符串转数组
 * isJSON- 判断字符串是否为JSON格式
 * ddlogin- 钉钉扫码登录
 * getInterfaceDomain- 获取接口域名
 * extractArray- 提取指定字段的数组数据
 * extractObject- 提取指定字段的map数据
 */
import getConfig from '../config'

const util = {
  getTrans () {
    const config = getConfig()
    return require(`../lang/${config.lang}.json`)
  },
  /**
   * 生成uuid
   */
  uuid () {
    let s = []
    const hexDigits = 'abcdefABCDEF1234567890'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = ''

    return s.join('')
  },
  /**
   * 判断当前平台环境
   */
  platform () {
    const inBrowser = typeof window !== 'undefined'
    const UA = inBrowser && window.navigator.userAgent.toLowerCase()
    return {
      isIE: UA && /msie|trident/.test(UA),
      isIE9: UA && UA.indexOf('msie 9.0') > 0,
      isEdge: UA && UA.indexOf('edge/') > 0,
      isAndroid: UA && UA.indexOf('android') > 0,
      isIOS: UA && /iphone|ipad|ipod|ios/.test(UA),
      isIpad: UA && /ipad/.test(UA),
      isChrome: UA && /chrome\/\d+/.test(UA) && !this.isEdge,
      isPhantomJS: UA && /phantomjs/.test(UA),
      isFF: UA && /firefox\/(\d+)/.test(UA),
      isWeixin: UA && UA.match(/MicroMessenger/i) === 'micromessenger'
    }
  },
  /**
   * 获取时区偏移 如：+08:00
   */
  getTimezoneOffset () {
    const d = Date()
    const t = d.split('GMT')[1].split(' ')[0]
    const a = t.split('')
    a.splice(3, 0, ':')
    return a.join('')
  },
  /**
   * 数字格式化
   * @param num 源数字
   * @param dec 小数位
   */
  numFormat (num, dec) {
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
  },
  /**
   * 简易倒计时
   * @param sec 秒数
   * @param changeFun 每秒变化时的回调
   * @param doneFun 倒计时完成时的回调
   */
  countDown (sec, changeFun, doneFun) {
    const timer = setInterval(() => {
      sec--
      if (sec) {
        changeFun(sec)
      } else {
        clearInterval(timer)
        if (doneFun) {
          doneFun()
        }
      }
    }, 1000)
  },
  /**
   * 0位填充
   * @param num 需格式化的数字
   */
  zeroFill (num) {
    num = num.toString()
    return num[1] ? num : '0' + num
  },
  /**
   * 剩余时间 分、秒
   * @param sec 秒数
   */
  remainTime (sec) {
    const remainMinute = Math.floor(sec / 60)
    const remainSecond = sec - remainMinute * 60
    return (
      this.zeroFill(remainMinute) + '分' + this.zeroFill(remainSecond) + '秒'
    )
  },
  /**
   * 计算2个时间差
   * @param stime 开始时间 毫秒数
   * @param etime 结束时间 毫秒数
   */
  timeMinus (stime, etime) {
    if (stime && etime) {
      const time = etime - stime
      const dayTime = time / 1000 / 60 / 60 / 24
      const day = Math.floor(dayTime)
      const hourTime = (dayTime - day) * 24
      const hour = Math.floor(hourTime)
      const minuteTime = (hourTime - hour) * 60
      const minute = Math.floor(minuteTime)
      const secondTime = (minuteTime - minute) * 60
      const second = Math.floor(secondTime)

      return {
        mse: time,
        day: day,
        hour: hour,
        minute: minute,
        second: second
      }
    }
  },
  /**
   * 计算某一个日期多少天之后(之前)的毫秒数
   * @param type 类型 after before
   * @param time 日期
   * @param days 天数
   */
  msDifference (type, time, days) {
    if (type === 'after') {
      // 之后
      const ms = Number(new Date(time))
      const _ms = days * 24 * 60 * 60 * 1000
      const myms = ms + _ms
      return myms
    } else if (type === 'before') {
      // 之前
      const ms = Number(new Date(time))
      const _ms = days * 24 * 60 * 60 * 1000
      const myms = ms - _ms
      return myms
    }
  },
  /**
   * 日期分割
   * @param v 源值 20190312102315
   */
  dateSeparate (v, fromat, separator) {
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
  },
  /**
   * 日期格式化
   * @param timestamp 时间戳|毫秒数
   * @param type 格式化类型
   * @param sr 分隔符
   * @param todayOrYesterday 是否显示今天或昨天
   */
  dateFormat (timestamp, type, sr, todayOrYesterday) {
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
      const today = [td.getFullYear(), td.getMonth() + 1, td.getDate()].map(this.zeroFill).join(sr || '-')
      const yesterday = [yd.getFullYear(), yd.getMonth() + 1, yd.getDate()].map(this.zeroFill).join(sr || '-')

      let myday = [year, month, day].map(this.zeroFill).join(sr || '-')

      if (typeof todayOrYesterday !== 'undefined') {
        if (typeof todayOrYesterday !== 'boolean') {
          throw new Error('dateFormat: {todayOrYesterday}必须为Boolean类型')
        }
        const trans = this.getTrans()['common']
        if (today === myday) {
          myday = trans.today
        }
        if (yesterday === myday) {
          myday = trans.tomorrow
        }
      }

      if (typeof type !== 'undefined') {
        if (type !== 'day' && type !== 'minute' && type !== 'second') {
          throw new Error('dateFormat: {type}必须为day、minute、second中的一个')
        }
      }

      if (type === 'day') {
        return myday
      } else if (type === 'minute') {
        return myday + ' ' + [hour, minute].map(this.zeroFill).join(':')
      } else if (type === 'second') {
        return myday + ' ' + [hour, minute, second].map(this.zeroFill).join(':')
      } else {
        return myday
      }
    } catch (error) {
      console.error(error)
    }
  },
  /**
   * 日期分割
   * @param v 源值 20190312102315 =>
   * @param fromat 格式标准
   * @param separator 分隔符
   */
  dateSeparate (v, fromat, separator) {
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
  },
  /**
   * 本地存储值设置
   * @param type 类别
   * @param name 存储名
   * @param value 存储值
   */
  storageSet (type, name, value) {
    if (type === 'local') {
      localStorage.setItem(name, value)
    } else if (type === 'session') {
      sessionStorage.setItem(name, value)
    }
  },
  /**
   * 本地存储值获取
   * @param type 类别
   * @param name 存储名
   */
  storageGet (type, name) {
    let value
    if (type === 'local') {
      value = localStorage.getItem(name)
    } else if (type === 'session') {
      value = sessionStorage.getItem(name)
    }
    return value
  },
  /**
   * 本地存储值删除
   * @param type 类别
   * @param name 存储名
   */
  storageDel (type, name) {
    if (type === 'local') {
      localStorage.removeItem(name)
    } else if (type === 'session') {
      sessionStorage.removeItem(name)
    }
  },
  /**
   * 生成可预览的图片路径
   * @param imgFile 类别
   */
  readerImgUrl (imgFile) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onloadstart = (e) => {
        console.log('开始读取....')
      }
      reader.onprogress = (e) => {
        console.log('正在读取中....')
      }
      reader.onabort = (e) => {
        console.log('中断读取....')
      }
      reader.onerror = (e) => {
        console.log('读取异常....')
      }
      reader.onload = (e) => {
        console.log('成功读取....')
        resolve(e.target.result)
      }
      reader.readAsDataURL(imgFile)
    })
  },
  /**
   * 获取屏幕高度
   */
  getWh () {
    return document.documentElement.clientHeight || document.body.clientHeight
  },
  /**
   * 获取屏幕宽度
   */
  getWw () {
    return document.documentElement.clientWidth || document.body.clientWidth
  },
  /**
   * 获取当前浏览器的语言
   */
  getBrowserLang () {
    const language = navigator.language || navigator.browserLanguage
    return language
  },
  /**
   * 图片预加载
   * @param imgsSrc 图片路径数组
   */
  imgsPreload (imgsSrc) {
    return new Promise(resolve => {
      let count = 0
      imgsSrc.forEach((src, i) => {
        let image = new Image()
        image.src = src
        image.onload = () => {
          count++
          resolve(count)
        }
      })
    })
  },
  /**
   * 获取年龄周岁
   * @param strBirthday 指的是出生日期，格式为"1990-01-01"
   */
  getAge (strBirthday) {
    let returnAge
    let strBirthdayArr = strBirthday.split('-')
    let birthYear = strBirthdayArr[0]
    let birthMonth = strBirthdayArr[1]
    let birthDay = strBirthdayArr[2]
    let d = new Date()
    let nowYear = d.getFullYear()
    let nowMonth = d.getMonth() + 1
    let nowDay = d.getDate()
    if (nowYear === birthYear) {
      returnAge = 0 // 同年 则为0周岁
    } else {
      const ageDiff = nowYear - birthYear // 年之差
      if (ageDiff > 0) {
        if (nowMonth === birthMonth) {
          const dayDiff = nowDay - birthDay // 日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        } else {
          const monthDiff = nowMonth - birthMonth // 月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        }
      } else {
        returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge // 返回周岁年龄
  },
  /**
   * 克隆对象
   * @param obj 需要克隆的对象
   */
  clone (obj) {
    let o
    if (typeof obj === 'object') {
      if (obj === null) {
        o = null
      } else {
        if (obj instanceof Array) {
          o = []
          for (let i = 0, len = obj.length; i < len; i++) {
            o.push(this.clone(obj[i]))
          }
        } else {
          o = {}
          for (let j in obj) {
            o[j] = this.clone(obj[j])
          }
        }
      }
    } else {
      o = obj
    }
    return o
  },
  /**
   * base64编码
   * @param obj 编码对象
   */
  base64Encode (obj) {
    obj = encodeURIComponent(JSON.stringify(obj))
    return window.btoa(obj)
  },
  /**
   * base64解码
   * @param obj 解码对象
   */
  base64Decode (obj) {
    obj = window.atob(obj)
    return JSON.parse(decodeURIComponent(obj))
  },
  /**
   * 可使用存储空间的使用比例
   */
  storageUsageRate () {
    return new Promise(resolve => {
      navigator.storage.estimate().then(estimate => {
        const rate = (estimate.usage / estimate.quota * 100).toFixed(2)
        resolve(rate)
      })
    })
  },
  /*
   * 打开浏览器窗口
   * @url 指定的页面的URL
   * @target 指定target属性或窗口的名称  _blank _parent _self _top
  */
  windowOpen (url, target) {
    window.open(url, target || '_blank')
  },
  /**
   * 判断当前平台信息
   */
  platform () {
    const inBrowser = typeof window !== 'undefined'
    const UA = inBrowser && window.navigator.userAgent.toLowerCase()
    return {
      isIE: UA && /msie|trident/.test(UA),
      isIE9: UA && UA.indexOf('msie 9.0') > 0,
      isEdge: UA && UA.indexOf('edge/') > 0,
      isAndroid: (UA && UA.indexOf('android') > 0),
      isIOS: (UA && /iphone|ipad|ipod|ios/.test(UA)),
      isIpad: UA && /ipad/.test(UA),
      isChrome: UA && /chrome\/\d+/.test(UA) && !this.isEdge,
      isPhantomJS: UA && /phantomjs/.test(UA),
      isFF: UA && /firefox\/(\d+)/.test(UA),
      isWeixin: UA && (UA.match(/MicroMessenger/i) !== null),
      isAlipay: UA && (UA.match(/AlipayClient/i) !== null)
    }
  },
  /**
   * 字符串转数组
   * @param v 源字符串 fdsa,fdsafdsa,gfdfas
   */
  strTransAry (v, separator) {
    if (v) {
      return v.split(separator || ',')
    }
    return []
  },
  /**
   * 判断字符串是否为JSON格式
   * @param v 源字符串
   */
  isJSON (str) {
    if (typeof str == 'string') {
      try {
        const obj = JSON.parse(str)
        if (typeof obj == 'object' && obj ) {
          return true
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    }
  },
  /**
   * 钉钉登录
   * @param params
   */
  ddlogin (params) {
    const redirectUri = encodeURIComponent(`${params.redirectUri}`)
    const fullUrl = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${params.appid}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${redirectUri}`
    const goto = encodeURIComponent(fullUrl)
    /* eslint-disable */
    DDLogin({
      id: `${params.id}`, // 这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
      goto: `${goto}`, // 扫码跳转连接
      style: params.style || 'border:none; background-color:#FFFFFF;',
      width: `${params.width}`,
      height: `${params.height}`
    })
    const handleMessage = function (event) {
      const origin = event.origin
      if (origin === "https://login.dingtalk.com") { // 判断是否来自ddLogin扫码事件。
          const loginTmpCode = event.data // 拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          window.location.href = fullUrl + '&loginTmpCode=' + loginTmpCode
      }
    }
    if (typeof window.addEventListener !== 'undefined') {
      window.addEventListener('message', handleMessage, false)
    } else if (typeof window.attachEvent !== 'undefined') {
      window.attachEvent('onmessage', handleMessage)
    }
  },
  /**
   * 获取接口域名
   * @param env 环境变量
   * @param options { appName, countryCode }
   */
  getInterfaceDomain (env, options) {
    let envPath
    const appName = typeof options.appName === 'string' ? options.appName : 'paas-app-admin'
    const countryCode = typeof options.countryCode === 'string' ? (options.countryCode === 'cn' ? '' : options.countryCode + '-') : ''
    if (env === 'production') {
      envPath = ''
    } else if (env === 'debug' || env === 'development') {
      envPath = 'dev-'
    } else {
      envPath = env + '-'
    }
    if (env === 'production') {
      return `https://${countryCode}${appName}.e-buy.com`
    } else if (env === 'mock') {
      return `https://apimock.e-buy.com`
    } else {
      return `https://${envPath}${appName}.e-buy.com`
    }
  },
  /**
   * 提取指定字段的数组数据
   * @param keystr 属性组，例"marketId,marketName"
   * @param source 数据源 []
   */
  extractArray (keystr, source) {
    const arr = []
    const keys = keystr ? keystr.split(',') : []
    source.forEach(ele => {
      const obj = {}
      keys.forEach(key => {
        obj[key] = ele[key]
      })
      arr.push(obj)
    })
    return arr
  },
  /**
   * 提取指定字段的map数据
   * @param keystr 属性组，例"marketId,marketName"
   * @param source 数据源 {}
   */
  extractObject (keystr, source) {
    const obj = {}
    const keys = keystr ? keystr.split(',') : []
    keys.forEach(key => {
      obj[key] = source[key]
    })
    return obj
  }
}

export default {
  install (Vue) {
    Vue.mixin({
      data () {
        return {
          util
        }
      }
    })
    Object.defineProperty(Vue.prototype, '$util', {
      get () {
        return this.$root.util
      }
    })
  }
}

export {
  util
}
