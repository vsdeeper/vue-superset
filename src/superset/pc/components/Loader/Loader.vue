<template>
  <v-dialog
    v-model="display"
    :overlay-opacity="0"
    persistent
    width="300"
  >
    <v-card
      :color="color"
      dark
    >
      <v-card-text>
        {{trans.loader.wait}}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import getConfig from '../../../config'

export default {
  computed: {
    lang () {
      return getConfig().lang
    },
    trans () {
      return require(`../../../lang/${this.lang}.json`)
    },
    color () {
      return this.$loaderStores.color
    },
    display () {
      return this.$loaderStores.display
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card__text {
  text-align: center;
  font-size: 0.675rem;
}
</style>
