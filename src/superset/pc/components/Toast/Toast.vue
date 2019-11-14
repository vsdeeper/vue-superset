<template>
  <v-snackbar
    v-model="show"
    right
    :color="color"
    :timeout="0"
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
