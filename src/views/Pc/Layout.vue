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
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="搜索"
        class="hidden-sm-and-down"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
      主体内容
      </v-container>
    </v-content>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create contact
        </v-card-title>
        <v-container>
          弹框内容
        </v-container>
        <v-card-actions>
          <v-btn
            text
            color="primary"
          >更多</v-btn>
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >取消</v-btn>
          <v-btn
            text
            @click="dialog = false"
          >确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: true,
    expandonhover: true,
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
</style>
