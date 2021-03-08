<template>
  <router-view/>
</template>

<script>
import Vue from 'vue'
import VConsole from 'vconsole'
import mobile from '@/superset/mobile'
import 'vant/lib/index.css'

Vue.use(mobile, { key: 'M' })

export default {
  created () {
    // console.log(this.$Mhttp)
  }
}
</script>
