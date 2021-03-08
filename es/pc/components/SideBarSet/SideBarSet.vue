<template>
  <v-card class="side-bar-set">
    <v-list dense>
      <v-list-item class="header">
        侧边栏色调
      </v-list-item>
      <v-list-item class="colors">
        <span
          v-for="(item, i) in params.sidebarColors" :key="item.color"
          :class="[item.color, {active: item.active}]"
          @click="changeSidebarColor(i, item.active, item.color)"
        ></span>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="header">
        侧边栏背景色
      </v-list-item>
      <v-list-item class="colors">
        <span
          v-for="(item, i) in params.sidebarBg" :key="item.color"
          :class="[item.color, {active: item.active}]"
          @click="changeSidebarBg(i, item.active, item.color)"
        ></span>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="switchs">
        迷你侧边栏
        <v-spacer />
        <v-switch v-model="params.mini" color="purple"></v-switch>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="switchs">
        侧边栏背景图
        <v-spacer />
        <v-switch v-model="params.displayBgImg" color="purple"></v-switch>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="header">
        图片
      </v-list-item>
      <v-list-item class="imgs">
        <img
          v-for="(item, i) in params.sidebarImages"
          :key="item.src"
          :src="item.src"
          :class="[{active: item.active}]"
          @click="toggleSidebarImg(i, item.active, item.src)" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'side-bar-set',
  data () {
    return {
      params: this.value
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    params: {
      handler (n) {
        this.$util.storageSet('local', 'sideBarSettings', JSON.stringify(n))
      },
      deep: true
    }
  },
  methods: {
    changeSidebarColor (i, active, color) {
      if (!active) {
        this.params.sidebarColors.find(ele => {
          if (ele.active) {
            ele.active = false
          }
        })
        this.params.sidebarColors[i].active = true
      }
    },
    changeSidebarBg (i, active, color) {
      if (!active) {
        this.params.sidebarBg.find(ele => {
          if (ele.active) {
            ele.active = false
          }
        })
        this.params.sidebarBg[i].active = true
      }
    },
    toggleSidebarImg (i, active, src) {
      if (!active) {
        this.params.sidebarImages.find(ele => {
          if (ele.active) {
            ele.active = false
          }
        })
        this.params.sidebarImages[i].active = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar-set {
  .header {
    display: block;
    font-size: 14px;
    text-align: center;
    padding-top: 10px;
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
