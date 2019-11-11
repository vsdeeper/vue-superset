<template>
  <div class="fixed-plugin" v-click-outside="closeDropDown">
    <div class="dropdown show-dropdown" :class="{ show: isOpen }">
      <a data-toggle="dropdown">
        <v-icon @click="toggleDropDown">mdi-settings</v-icon>
      </a>
      <ul class="dropdown-menu" :class="{ show: isOpen }">
        <li class="header-title">侧边栏色调</li>
        <li class="adjustments-line text-center">
          <span
            v-for="item in sidebarColors"
            :key="item.color"
            class="badge filter"
            :class="[`badge-${item.color}`, { active: item.active }]"
            :data-color="item.color"
            @click="changeSidebarBackground(item)"
          >
          </span>
        </li>
        <li class="header-title">侧边栏背景色</li>
        <li class="adjustments-line text-center">
          <span
            v-for="item in sidebarBg"
            :key="item.colorBg"
            class="badge filter"
            :class="[`badge-${item.colorBg}`, { active: item.active }]"
            :data-color="item.colorBg"
            @click="changeSidebarBg(item)"
          >
          </span>
        </li>
        <li class="adjustments-line sidebar-mini">
          迷你侧边栏
          <v-switch
            :value="!sidebarMini"
            @change="val => updateValue('sidebarMini', val)"
          ></v-switch>
        </li>
        <li class="adjustments-line sidebar-img">
          侧边栏背景图
          <v-switch
            :value="!sidebarImg"
            @change="val => updateValueImg('sidebarImg', val)"
          ></v-switch>
        </li>

        <li class="header-title">图片</li>
        <li
          v-for="item in sidebarImages"
          :key="item.image"
          :class="{ active: item.active }"
          @click="changeSidebarImage(item)"
        >
          <a class="img-holder switch-trigger">
            <img :src="item.image" alt="" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    sidebarMini: Boolean,
    sidebarImg: Boolean
  },
  data () {
    return {
      isOpen: false,
      backgroundImage: './img/sidebar-2.jpg',
      sidebarColors: [
        { color: 'purple', active: false },
        { color: 'azure', active: false },
        { color: 'green', active: true },
        { color: 'orange', active: false },
        { color: 'rose', active: false },
        { color: 'danger', active: false }
      ],
      sidebarBg: [
        { colorBg: 'black', active: true },
        { colorBg: 'white', active: false },
        { colorBg: 'red', active: false }
      ],
      sidebarImages: [
        { image: './img/sidebar-1.jpg', active: false },
        { image: './img/sidebar-2.jpg', active: true },
        { image: './img/sidebar-3.jpg', active: false },
        { image: './img/sidebar-4.jpg', active: false }
      ]
    }
  },
  methods: {
    toggleDropDown () {
      this.isOpen = !this.isOpen
    },
    closeDropDown () {
      this.isOpen = false
    },
    toggleList (list, itemToActivate) {
      list.forEach(listItem => {
        listItem.active = false
      })
      itemToActivate.active = true
    },
    updateValue (name, val) {
      this.$emit(`update:${name}`, val)
    },
    updateValueImg (name, val) {
      this.$emit(`update:${name}`, val)

      if (this.sidebarImg) {
        document.body.classList.toggle('sidebar-image')
        this.$emit('update:image', '')
      } else {
        document.body.classList.toggle('sidebar-image')
        this.$emit('update:image', this.backgroundImage)
      }
    },
    changeSidebarBackground (item) {
      this.$emit('update:color', item.color)
      this.toggleList(this.sidebarColors, item)
    },
    changeSidebarBg (item) {
      this.$emit('update:colorBg', item.colorBg)
      this.toggleList(this.sidebarBg, item)
    },
    changeSidebarImage (item) {
      if (this.sidebarImg) {
        this.$emit('update:image', item.image)
      }
      this.backgroundImage = item.image
      this.toggleList(this.sidebarImages, item)
    }
  }
}
</script>
<style lang="scss" scoped>
.centered-row {
  display: flex;
  height: 100%;
  align-items: center;
}

.button-container .btn {
  margin-right: 10px;
}

.centered-buttons {
  display: flex;
  justify-content: center;
}
.fixed-plugin {
  position: fixed;
  right: 0;
  width: 64px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1031;
  border-radius: 8px 0 0 8px;
  text-align: center;
  top: 85px;
  .mdi-settings {
    color: #FFFFFF;
    padding: 10px;
    border-radius: 0 0 6px 6px;
    width: auto;
  }
  .dropdown {
    .dropdown-menu {
      cursor: pointer;
      padding-top: 10px;
      padding-bottom: 10px;
      transform: scale(0);
      opacity: 0;
      transform-origin: 0 0;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    &.show {
      .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: scale(1);
        transform-origin: 100% 0;
      }
    }
  }
}
</style>
