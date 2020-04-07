/**
 * 原生摇一摇方法
 * ios13+里面需要用户手动触发
 * 代码示例：
 * const start = Shake.start({
 *   shakeSingle: false,
 *   speed: 2000
 * })
 * if (start) {
 *   window.addEventListener('shake', (times) => {
 *     console.log(times)
 *   })
 * } else {
 *   this.$cux.toast('Your device does not support shaking')
 * }
 */
export default {
  times: -1, // 记录摇动次数
  hasShaked: false, // 标记是否触发摇动
  shakeSingle: true, // 只触发单次摇动开关
  last_time: 0, // 上一次摇动时的时间戳
  speed: 800, // 加速度变化临界值
  last_x: 0, // 上一次X轴加速度值
  last_y: 0, // 上一次Y轴加速度值
  last_z: 0, // 上一次Z轴加速度值
  createEvent (type, data) {
    var event = document.createEvent('Events')
    event.initEvent(type, true, true)
    if (data) {
      for (var i in data) {
        if (data.hasOwnProperty(i)) {
          event[i] = data[i]
        }
      }
    }
    return event
  },
  shake (e) {
    const acceleration = e.accelerationIncludingGravity
    const curTime = new Date().getTime()
    const diffTime = curTime - this.last_time
    let x, y, z
    // 每隔100ms进行判断
    if (diffTime > 100) {
      x = acceleration.x
      y = acceleration.y
      z = acceleration.z
      const speed = Math.abs(x + y + z - this.last_x - this.last_y - this.last_z) / diffTime * 10000

      if (this.shakeSingle) {
        if (speed > this.speed && !this.hasShaked) {
          this.hasShaked = true
          this.times++
          // 向window对象中派发事件
          const evt = this.createEvent('shake', { times: this.times })
          window.dispatchEvent(evt)
        }
      } else {
        // 判断手机确实发生了摇动而不是正常的移动
        if (speed > this.speed) {
          this.times++
          // 向window对象中派发事件
          const evt = this.createEvent('shake', { times: this.times })
          window.dispatchEvent(evt)
        }
      }
      this.last_time = curTime
      this.last_x = x
      this.last_y = y
      this.last_z = z
    }
  },
  start (options) {
    if (window.DeviceMotionEvent) {
      // 获取设备的移动与方向权限
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission().then(permissionState => {
          if (permissionState === 'granted') {
            console.log('permissionState:', 'granted')
            if (typeof options === 'object') {
              for (const key in options) {
                if (options.hasOwnProperty(key)) {
                  const val = options[key]
                  this[key] = val
                }
              }
            }
            window.addEventListener('devicemotion', this.shake.bind(this), false)
          } else {
            console.error('permissionState:', 'denied')
          }
        }).catch(console.error)
      } else {
        // 处理常规的非iOS 13设备
        if (typeof options === 'object') {
          for (const key in options) {
            if (options.hasOwnProperty(key)) {
              const val = options[key]
              this[key] = val
            }
          }
        }
        window.addEventListener('devicemotion', this.shake.bind(this), false)
      }
      return true
    } else {
      return false
    }
  },
  stop () {
    if (window.DeviceMotionEvent) {
      window.removeEventListener('devicemotion', this.shake.bind(this), false)
    }
  }
}
