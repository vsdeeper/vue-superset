import Layout from '@/views/Pc/Layout'
import Home from '@/views/Pc/Home.vue'
import Test from '@/views/Pc/Test.vue'

export default {
  path: '/pc',
  component: Layout,
  redirect: '/pc/home',
  children: [
    {
      path: 'home',
      name: 'pc端示例',
      components: { default: Home }
    },
    {
      path: 'test',
      name: 'pc端test',
      components: { default: Test }
    }
  ]
}
