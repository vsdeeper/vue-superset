import Vue from 'vue'
import VueRouter from 'vue-router'
import PcRoutes from './pc.routes'
import MobileRoutes from './mobile.routes'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/pc/home'
  },
  PcRoutes,
  MobileRoutes
]

const router = new VueRouter({
  routes
})

export default router
