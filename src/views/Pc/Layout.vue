<template>
  <v-app id="inspire">
    <v-navigation-drawer
      class="my-navigation-drawer"
      v-model="drawer"
      mini-variant-width="72"
      :expand-on-hover="expandonhover"
      permanent
      color="purple"
      dark
      app
    >
      <v-list rounded dense expand>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.title"
            color="#fff"
            v-model="item.active"
            :prepend-icon="item.icon"
            active-class="header-active"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="item in item.children"
              :key="item.title"
              :to="item.path"
              exact-active-class="children-active"
              link
            >
              <v-list-item-action>
                <p class="text-uppercase">{{item.id}}</p>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item
            v-else
            :key="item.title"
            :to="item.path"
            exact-active-class="children-active"
            link
          >
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"/>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="rgb(250, 250, 250, 0.95)"
      elevate-on-scroll
    >
      <v-app-bar-nav-icon @click.stop="expandonhover = !expandonhover"></v-app-bar-nav-icon>
      <v-toolbar-title>后管平台</v-toolbar-title>
      <v-spacer />
      <v-text-field
        hide-details
        label="搜索..."
        class="hidden-sm-and-down app-bar-search"
      />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-menu
        transition="slide-x-reverse-transition"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            icon
          >
            <v-icon>mdi-settings</v-icon>
          </v-btn>
        </template>
        <side-bar-set></side-bar-set>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
      <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { SideBarSet } from '@/components'

export default {
  components: {
    SideBarSet
  },
  data: () => ({
    drawer: true,
    expandonhover: true,
    items: [
      {
        icon: 'mdi-apps',
        title: '面板',
        path: '/pc/home'
      },
      {
        icon: 'mdi-account-box-multiple',
        title: '客户管理',
        active: false,
        children: [
          {
            id: 'cl',
            title: '客户列表',
            path: '/pc/test'
          }
        ]
      },
      {
        icon: 'mdi-wallet',
        title: '入库管理',
        active: false,
        children: [
          {
            id: 'be',
            title: '入库列表'
          }
        ]
      },
      {
        icon: 'mdi-clipboard-text',
        title: '订单管理',
        active: false,
        children: [
          {
            id: 'ol',
            title: '订单列表'
          }
        ]
      },
      {
        icon: 'mdi-truck',
        title: '发货管理',
        active: false,
        children: [
          {
            id: 'pg',
            title: '配卡管理'
          },
          {
            id: 'wg',
            title: '物流管理'
          }
        ]
      },
      {
        icon: 'mdi-cash-usd',
        title: '财务管理',
        active: false,
        children: [
          {
            id: 'sk',
            title: '审核开票'
          },
          {
            id: 'kj',
            title: '开票记录'
          }
        ]
      }
    ]
  }),
  methods: {
    isActive (item) {
      if (this.$route && this.$route.path) {
        return this.$route.path.startsWith(item.path)
      }
      return false
    }
  },
  created () {
    this.$store.commit('destroyVconsole')
    const path = this.$route.path
    this.items.find(ele1 => {
      if (ele1.children) {
        ele1.children.find(ele2 => {
          if (ele2.path && ele2.path.startsWith(path)) {
            ele1.active = true
          }
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.v-toolbar {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.03), 0px 3px 10px 0px rgba(0, 0, 0, 0.05);
}
.app-bar-search {
  flex: 0 1 200px;
}
</style>
