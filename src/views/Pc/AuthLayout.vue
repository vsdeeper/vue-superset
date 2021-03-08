<template>
  <v-app :style="{backgroundImage: 'url(' + backgroundImage + ')'}">
    <!-- <v-app-bar
      app
      color="transparent"
      dark
      elevate-on-scroll
    >
      <v-toolbar-title class="mx-5">登录</v-toolbar-title>
      <v-spacer />
      <v-btn text>
        <v-icon size="20" class="mx-1">mdi-account-plus-outline</v-icon>注册
      </v-btn>
      <v-btn text>
        <v-icon size="18" class="mx-1">mdi-logout-variant</v-icon>登录
      </v-btn>
    </v-app-bar> -->
    <v-main>
      <v-container fluid class="fill-height">
      <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

export default {
  data () {
    return {
      backgroundImage: require('@/assets/img/login.jpg')
    }
  },
  created () {

  }
}
</script>

<style lang="scss" scoped>
.v-application {
  background-size: cover;
  background-position: center center;
  &:before {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    left: 0;
    top: 0;
    content: "";
    background-color: rgba(0,0,0,.5);
  }
}
</style>
