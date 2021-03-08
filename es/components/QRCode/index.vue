<template>
  <div class="qr-code"></div>
</template>

<script>
import { QRCode } from '../../common'
export default {
  name: 'qr-code',
  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 256
    },
    color: {
      type: String,
      default: '#000000'
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    }
  },
  data () {
    return {
      qrCode: {}
    }
  },
  watch: {
    text () {
      this.clear()
      this.makeCode(this.text)
    }
  },
  methods: {
    clear () {
      this.qrCode.clear()
    },
    makeCode (text) {
      this.qrCode.makeCode(text)
    }
  },
  mounted () {
    this.qrCode = new QRCode(this.$el, {
      text: this.text,
      width: this.size,
      height: this.size,
      colorDark: this.color,
      colorLight: this.bgColor,
      correctLevel: QRCode.CorrectLevel.H
    })
  }
}
</script>
