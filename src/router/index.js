import Vue from 'vue'
import VueRouter from 'vue-router'
import PcRoutes from './pc.routes'
import MobileRoutes from './mobile.routes'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    redirect: '/pc/home'
  },
  MobileRoutes
]

routes = routes.concat(PcRoutes)

const router = new VueRouter({
  routes
})

export default router
