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
      components: { default: Home },
      meta: {
        breadcrumbs: [
          {
            text: '面板',
            disabled: false,
            href: '#/pc/'
          }
        ]
      }
    },
    {
      path: 'test',
      name: 'pc端test',
      components: { default: Test },
      meta: {
        breadcrumbs: [
          {
            text: '客户管理',
            disabled: false,
            href: '#/pc/'
          },
          {
            text: '客户列表',
            disabled: true,
            href: '#/pc/test'
          }
        ]
      }
    }
  ]
}
