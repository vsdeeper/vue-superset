import Layout from '@/views/Pc/Layout'
import Home from '@/views/Pc/Home'

export default {
  path: '/pc',
  component: Layout,
  redirect: '/pc/home',
  children: [
    {
      path: 'home',
      name: 'pc端示例',
      component: Home
    }
  ]
}
