import Layout from '@/views/Pc/Layout'
import AuthLayout from '@/views/Pc/AuthLayout'
import Home from '@/views/Pc/Home.vue'
import Login from '@/views/Pc/Login.vue'
import DataTable from '@/views/Pc/DataTable'

const AuthRoutes = {
  path: '/pc',
  component: AuthLayout,
  children: [
    {
      path: 'login',
      name: 'pc端登录',
      components: { default: Login },
      meta: {
        breadcrumbs: [
          {
            text: '通用页面',
            disabled: false,
            href: '#/pc/'
          },
          {
            text: '登录',
            disabled: true
          }
        ]
      }
    }
  ]
}

const ExampleRoutes = {
  path: '/pc',
  component: Layout,
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
      path: 'dataTable',
      name: '数据表格',
      components: { default: DataTable },
      meta: {
        breadcrumbs: [
          {
            text: '通用页面',
            disabled: false,
            href: '#/pc/'
          },
          {
            text: '数据表格',
            disabled: true
          }
        ]
      }
    }
  ]
}

const routes = [
  {
    path: '/pc',
    redirect: '/pc/home'
  },
  AuthRoutes,
  ExampleRoutes
]

export default routes
