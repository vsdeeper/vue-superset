<template>
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
</template>

<script>
export default {
  name: 'SideBarSet',
  data () {
    return {
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
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
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
