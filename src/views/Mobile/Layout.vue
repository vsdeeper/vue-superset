<template>
  <router-view/>
</template>

<script>
import Vue from 'vue'
import VConsole from 'vconsole'
import mobile from '@/superset/mobile'

Vue.use(mobile, { key: 'M' })

export default {
  created () {
    // console.log(this.$Mhttp)
    /* eslint-disable no-new */
    const vconsole = new VConsole()
    this.$store.commit('assignVconsole', vconsole)
  }
}
</script>
