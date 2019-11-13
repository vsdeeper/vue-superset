<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="timeout"
  >
    {{ text }}
    <v-btn
      dark
      text
      @click="close"
    >
      关闭
    </v-btn>
  </v-snackbar>
</template>
<script>
export default {
  name: 'Toast',
  computed: {
    timeout () {
      return this.$toastStores.timeout
    },
    text () {
      return this.$toastStores.text
    },
    color () {
      return this.$toastStores.color
    },
    show: {
      get () {
        if (this.text) {
          return true
        }
        return false
      },
      set () {}
    }
  },
  methods: {
    close () {
      this.$toastStores.text = ''
    }
  }
}
</script>
<style></style>
