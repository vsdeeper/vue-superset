import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vconsole: null
  },
  mutations: {
    assignVconsole (state, obj) {
      state.vconsole = obj
    },
    destroyVconsole (state) {
      if (state.vconsole) {
        state.vconsole.destroy()
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
