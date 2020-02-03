<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="0"
    right
    bottom
  >
    {{ text }}
    <v-btn
      dark
      text
      @click="close"
    >
      {{trans.toast.close}}
    </v-btn>
  </v-snackbar>
</template>

<script>
import getConfig from '../../../config'

export default {
  name: 'Toast',
  computed: {
    lang () {
      return getConfig().lang
    },
    trans () {
      return require(`../../../lang/${this.lang}.json`)
    },
    timeout () {
      return this.$toastStores.timeout
    },
    text () {
      return this.$toastStores.text
    },
    color () {
      return this.$toastStores.color
    },
    show () {
      return this.$toastStores.show
    }
  },
  methods: {
    close () {
      this.$toastStores.show = false
      clearTimeout(this.$toastStores.timer)
    }
  }
}
</script>
<style></style>
