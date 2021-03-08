<template>
  <v-app>
    <v-navigation-drawer
      class="my-navigation-drawer"
      :class="{'display-bg-img': displayBgImg}"
      v-model="drawer"
      mini-variant-width="72"
      :expand-on-hover="expandonhover"
      :permanent="true"
      :color="sidebarBg"
      :src="siderbarSrc"
      dark
      app
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-group
            class="avatar-group"
            color="#fff"
            :value="false"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-avatar>
                <v-img src="@/assets/img/avatar.jpg"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Como Chen</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item link to="/pc/login">
              <v-list-item-action>
                <v-icon>mdi-logout-variant</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>登录退出</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list rounded dense expand>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.title"
            color="#fff"
            v-model="item.active"
            :prepend-icon="item.icon"
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
              :exact-active-class="sidebarColor"
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
            :exact-active-class="sidebarColor"
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
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <side-bar-set
          @change-sidebar-color="changeSidebarColor"
          @change-sidebar-bg="changeSidebarBg"
          @change-mini-sidebar="changeMiniSidebar"
          @change-sidebar-img="changeSidebarImg"
          @toggle-sidebar-img="toggleSidebarImg"
        ></side-bar-set>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
      <router-view></router-view>
      </v-container>
    </v-main>
    <cm-toast></cm-toast>
    <cm-loader></cm-loader>
  </v-app>
</template>

<script>
import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { Pc } from '@/superset'
import { SideBarSet } from '@/components'
import '@/superset/pc/style/common.css'
import '@/superset/pc/style/navigation.css'
import '@/superset/pc/style/swal.css'
import '@/superset/pc/fonts/PingFang-SC-Regular.css'

Vue.use(Pc)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

export default {
  components: {
    SideBarSet
  },
  data: () => ({
    drawer: true,
    expandonhover: true,
    displayBgImg: true,
    sidebarColor: 'blue',
    sidebarBg: 'black',
    siderbarSrc: require('@/assets/img/sidebar-1.jpg'),
    items: [
      {
        icon: 'mdi-apps',
        title: '面板',
        path: '/pc/home'
      },
      {
        icon: 'mdi-account-box-multiple',
        title: '通用页面',
        active: false,
        children: [
          {
            id: 'DL',
            title: '登录',
            path: '/pc/login'
          },
          {
            id: 'DT',
            title: '数据表格',
            path: '/pc/dataTable'
          }
        ]
      }
    ]
  }),
  methods: {
    changeSidebarColor (color) {
      this.sidebarColor = color
    },
    changeSidebarBg (color) {
      this.sidebarBg = color
    },
    changeMiniSidebar (e) {
      this.expandonhover = e
    },
    changeSidebarImg (e) {
      this.displayBgImg = e
    },
    toggleSidebarImg (src) {
      this.siderbarSrc = src
    }
  },
  created () {
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
