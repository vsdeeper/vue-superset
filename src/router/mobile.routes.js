import Layout from '@/views/Mobile/Layout'
import Home from '@/views/Mobile/Home'

export default {
  path: '/mobile',
  component: Layout,
  redirect: '/mobile/home',
  children: [
    {
      path: 'home',
      name: 'mobile端示例',
      component: Home
    }
  ]
}
