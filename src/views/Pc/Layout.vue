<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      mini-variant-width="72"
      :expand-on-hover="expandonhover"
      permanent
      dark
      app
    >
      <v-list rounded dense>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.icon"
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
        transition="scale-transition"
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
        <v-card class="side-bar-set">
          <v-list dense>
            <v-list-item class="header">
              侧边栏色调
            </v-list-item>
            <v-list-item class="colors">
              <span
                v-for="item in sidebarColors" :key="item.color"
                :class="[item.color, {active: item.active}]"
              ></span>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="header">
              侧边栏背景色
            </v-list-item>
            <v-list-item class="colors">
              <span
                v-for="item in sidebarBg" :key="item.color"
                :class="[item.color, {active: item.active}]"
              ></span>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="switchs">
              迷你侧边栏
              <v-switch color="purple"></v-switch>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="switchs">
              侧边栏背景图
              <v-switch color="purple"></v-switch>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="header">
              图片
            </v-list-item>
            <v-list-item class="imgs">
              <img v-for="item in sidebarImages" :key="item.src" :src="item.src" :class="[{active: item.active}]" />
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
      主体内容
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: true,
    expandonhover: true,
    sidebarBackgroundColor: 'black',
    sidebarBackground: 'green',
    sidebarBackgroundImage: './assets/img/sidebar-2.jpg',
    sidebarMini: true,
    sidebarImg: true,
    sidebarColors: [
      { color: 'purple', active: false },
      { color: 'blue', active: false },
      { color: 'green', active: true },
      { color: 'orange', active: false },
      { color: 'pink', active: false },
      { color: 'red', active: false }
    ],
    sidebarBg: [
      { color: 'black', active: true },
      { color: 'red', active: false }
    ],
    sidebarImages: [
      { src: require('@/assets/img/sidebar-1.jpg'), active: false },
      { src: require('@/assets/img/sidebar-2.jpg'), active: true },
      { src: require('@/assets/img/sidebar-3.jpg'), active: false },
      { src: require('@/assets/img/sidebar-4.jpg'), active: false }
    ],
    items: [
      {
        icon: 'mdi-apps',
        title: '面板'
      },
      {
        icon: 'mdi-account-box-multiple',
        title: '客户管理',
        active: false,
        children: [
          {
            id: 'cl',
            title: '客户列表'
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
  created () {
    this.$store.commit('destroyVconsole')
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
.side-bar-set {
  .header {
    font-size: 14px;
    justify-content: space-around;
  }
  .switchs {
    font-size: 14px;
    justify-content: space-between;
  }
  .colors {
    display: block;
    text-align: center;
    span {
      display: inline-block;
      cursor: pointer;
      width: 15px;
      height: 15px;
      margin: 0 4px;
      border-radius: 50%;
      border: 3px solid #fff !important;
      box-sizing: content-box;
      &.active {
        border-color: #CDDC39 !important;
      }
    }
  }
  .imgs {
    img {
      width: 65px;
      border-radius: 10px;
      border: 3px solid #fff;
      &.active {
        border-color: #CDDC39;
      }
    }
  }
}
</style>
