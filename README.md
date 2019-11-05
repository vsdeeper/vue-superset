###  基于vue框架技术的超集合

为实现前端通用代码块的统一维护和更新创建，目前包含common和mobile两个模块集合。

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
      { 
        'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
        'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
        'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
        'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
        'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
        'de-DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
        'da-DK': /^(\+?45)?(\d{8})$/,
        'el-GR': /^(\+?30)?(69\d{8})$/,
        'en-AU': /^(\+?61|0)4\d{8}$/,
        'en-GB': /^(\+?44|0)7\d{9}$/,
        'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
        'en-IN': /^(\+?91|0)?[789]\d{9}$/,
        'en-NZ': /^(\+?64|0)2\d{7,9}$/,
        'en-ZA': /^(\+?27|0)\d{9}$/,
        'en-ZM': /^(\+?26)?09[567]\d{7}$/,
        'es-ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
        'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
        'fr-FR': /^(\+?33|0)[67]\d{8}$/,
        'he-IL': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
        'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
        'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
        'ja-JP': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
        'ms-MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
        'nb-NO': /^(\+?47)?[49]\d{7}$/,
        'nl-BE': /^(\+?32|0)4?\d{8}$/,
        'nn-NO': /^(\+?47)?[49]\d{7}$/,
        'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
        'pt-BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
        'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
        'ru-RU': /^(\+?7|8)?9\d{9}$/,
        'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
        'tr-TR': /^(\+?90|0)?5\d{9}$/,
        'vi-VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
        'zh-CN': /^(\+?0?86\-?)?1[012345789]\d{9}$/,
        'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
      }
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
    post- post请求方法

```


### 安装使用

```
npm i vue-superset --save
```

#### mobile移动端

main.js中引入：

```
import common from 'vue-superset/common'
import mobile from 'vue-superset/mobile'

...

Vue.use(common)
Vue.use(mobile)
```

集成框架：http://gitlab.e-buychina.com.cn/dev/ebuyweb-vue-h5.git

#### 使用说明

引入后，产生Vue全局变量：$util, $pattern, $cux, $http

调用示例：
```
this.$util.uuid()
this.$cux.toast('轻提示')
this.$http.post(url, action, params, ...args)
```

### 附录

涉及到第三方插件的使用，统一来源：

日期处理类库- https://github.com/moment/moment/
涉及频率限制的工具库- https://github.com/lodash/lodash
# vue-superset
