###  #基于vue框架技术的超集合

* 经过众多移动端和PC端项目的实践，以本人所在公司项目的特点而创建
* 主要为方便前端通用代码块的统一维护和更新，目前包含common和mobile两个模块集合
* 想要作为自己公司项目的依赖来开发的，请谨慎使用

集合结构预览：
```
common- 无任何依赖通用模块
  util- 常用工具函数集合
    uuid- 生成uuid
    platform- 判断当前平台环境
    getTimezoneOffset- 获取时区偏移
    numFormat- 数字格式化，四舍五入
    countDown- 简易倒计时
    zeroFill- 0位填充
    remainTime- 剩余时间（分秒）
    timeMinus- 计算2个时间差
    msDifference- 计算某一个日期多少天之后(之前)的毫秒数
    dateFormat- 日期格式化
    storageSet- 本地存储值设置
    storageGet- 本地存储值获取
    storageDel- 本地存储值删除
    readerImgUrl- 生成可预览的图片路径
    getWh- 获取屏幕高度
    getWw- 获取屏幕宽度
    getBrowserLang- 获取当前浏览器的语言
    imgsPreload- 图片预加载
    getAge- 获取年龄周岁
    clone- 克隆对象
    base64Encode- base64编码
    base64Decode- base64解码

  filters- 常用过滤器集合
    digitalEncryption- 数字加密，如：10**9800
    numFormat- 数字格式化，四舍五入
    dateFormat- 日期格式化

  facebook- facebook sdk集成
    loadSdk- 加载sdk
    checkFB- 检测window对象中FB对象的初始化完成

  weixin- 常用微信功能方法，只适用于微信中，按需引用，如：import { weixin } from 'vue-superset/common'
    authorize- 微信公众号授权

  pattern- 常用正则集合
    sum- 金额：可以为0，第一位不能为0，小数位不超过2位
    discount- 折扣：0-10之间的数字，不等于临界值，小数位不超过2位
    num- 件数 / 次数 / 天数 / 积分：可以为0，第一个数字不能为0，整数
    numNoZero- 件数 / 次数 / 天数 / 积分：不可以为0，第一个数字不能为0，整数
    hr- 小时：00-24，不等于24
    min- 分钟：00-60，不等于60
    phone- 手机号验证（中国）
    telephone- 座机号验证，如：021-1234567(8)
    nohanzi- 不能输入中文汉字
    numbydot- 输入数字用英文逗号分离
    numEnbydot- 输入纯数字或者纯英文或者数字英文字母组合用英文逗号分离
    idCard- 身份证号
    bankCard- 银行卡号
    noSpace- 不能有空格
    phonei18n- 国际手机号正则集合
```

```
mobile- 主要针对移动端的集合，第三方基础依赖：vant，axios
  cux- 常用交互反馈
    toast- 轻提示
    loading- loading开始
    loadend- loading结束
    alert- 弹框提示
    confirm- 确认框
    asyncConfirm- 异步确认框

  http- 接口交互方法
    onTokenTimeout- 登录失效（token）的回调逻辑配置
    post- post请求方法
```

```
pc- 主要针对pc端的集合，定位开发后管平台，第三方基础依赖：vuetify，sweetalert2，vee-validate，axios
  cux- 常用交互反馈
    lang- 语言设置，支持zh/en
    alert- 弹框提示和确认框统一
    asyncConfirm- 异步确认框

  filters- 全局过滤器
    errorMsg- vee-validate校验错误提示信息方法

  http- 接口交互方法配置
    onTokenTimeout- 登录失效（token）的回调逻辑配置
```


### #安装使用

```
npm i vue-superset --save
```

#### ##全局配置

```
import { custom } from 'vue-superset/config'

...

custom.config = {
  appId: '900105',
  timeout: 5000,
  lang: 'zh'
}
```

#### ##mobile端

main.js中引入：

```
import common from 'vue-superset/common'
import mobile from 'vue-superset/mobile'

...

Vue.use(common)
Vue.use(mobile)
```

#### ##使用说明-mobile端

引入后，产生Vue全局变量：$util, $pattern, $cux, $http，$facebook

调用示例：
```
this.$util.uuid()
this.$cux.toast('轻提示')
this.$http.post(url, action, params, ...args)
```

#### ##pc端

main.js中引入：

```
import common from 'vue-superset/common'
import mobile from 'vue-superset/pc'

...

Vue.use(common)
Vue.use(pc)
```

#### ##使用说明-pc端

引入后，产生Vue全局变量：$util, $pattern, $cux, $http，$facebook

相对于mobile端的不同：
cux集合中的toast，loading，loadend方法提出来作为全局变量$toast，$loading，$loadend
http集合中post方法提出来作为全局变量$post

调用示例：
```
this.$util.uuid()
this.$toast('success', '轻提示')  // success | info | error
this.$post(url, action, params, ...args)
```

### #附录
涉及到第三方插件的使用，统一来源：

* [日期处理类库](https://github.com/moment/moment/)
* [涉及频率限制的工具库](https://github.com/lodash/lodash)
* [表单校验工具](https://logaretm.github.io/vee-validate)
