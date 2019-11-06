<template>
  <router-view/>
</template>

<script>
import Vue from 'vue'
import mobile from '@/superset/mobile'

Vue.use(mobile, { key: 'M' })

export default {
  created () {
    // console.log(this.$Mhttp)
  }
}
</script>
