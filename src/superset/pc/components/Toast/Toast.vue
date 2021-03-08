<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="-1"
    right
    bottom
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        dark
        text
        v-bind="attrs"
        @click="close"
      >
        {{trans.toast.close}}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import getConfig from '../../../config'

export default {
  name: 'cm-toast',
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
