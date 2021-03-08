<template>
  <div>
    <div class="d-flex align-center" v-if="breadcrumbs.length || btnGroupsItems.length">
      <v-breadcrumbs :items="breadcrumbs" divider="/" />
      <v-spacer />
      <v-btn-toggle
        v-model="btnGroupsActive"
        rounded
        dense
        mandatory
      >
        <v-btn class="cs" v-for="(item, i) in btnGroupsItems" :key="i" @click="onBtnGroups(item)">
          {{item.text}}
          <span class="cs-badge" v-if="typeof item.badge !== 'undefined'">{{item.badge}}</span>
        </v-btn>
      </v-btn-toggle>
    </div>
    <template v-if="showTabConts">
      <v-card class="cs" :class="[`mb-${mb}`]" :elevation="elevation">
        <v-tabs
          dark
          show-arrows
          background-color="primary"
          :value="tabActive"
          @change="onChangeTab"
          v-if="tabItems.length"
          class="cs"
        >
          <v-tabs-slider color="blue lighten-3"></v-tabs-slider>
          <v-tab v-for="(item, i) in tabItems" :key="i" :href="`#tab-${i}`">
            {{item.text}}
          </v-tab>
          <v-tab-item
            v-for="(item, i) in tabItems"
            :key="i"
            :value="'tab-' + i"
          >
            <v-card-title v-if="searchItems.length">
              <ux-search-bar
                ref="uxSearchBar"
                :title="title"
                :items="searchItems"
                :hide-details="hideDetails"
                :btns-style="btnsStyle"
                @inquery="inquery"
                @reset="reset"
                @clear="clear"
                @search-input="$emit('search-input', $event)"
                @on-change-select="$emit('on-change-select', $event)"
              ></ux-search-bar>
            </v-card-title>
            <v-card-text :style="{padding: padding}">
              <slot :name="'cont' + i"></slot>
            </v-card-text>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </template>
    <template v-else>
      <v-card :class="[`mb-${mb}`]" :elevation="elevation">
        <v-tabs
          dark
          show-arrows
          background-color="primary"
          :value="tabActive | getTabActiveIdx"
          @change="onChangeTab"
          v-if="tabItems.length"
        >
          <v-tabs-slider color="blue lighten-3"></v-tabs-slider>
          <v-tab v-for="(item, i) in tabItems" :key="i">
            {{item.text}}
          </v-tab>
        </v-tabs>
        <v-card-text v-if="state">
          <slot name="state"></slot>
        </v-card-text>
        <v-card-title v-if="searchItems.length">
          <ux-search-bar
            ref="uxSearchBar"
            :title="title"
            :items="searchItems"
            :hide-details="hideDetails"
            :btns-style="btnsStyle"
            @inquery="inquery"
            @reset="reset"
            @clear="clear"
            @search-input="$emit('search-input', $event)"
            @on-change-select="$emit('on-change-select', $event)"
          ></ux-search-bar>
        </v-card-title>
        <v-card-text :style="{padding: padding}">
          <slot name="cont"></slot>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  name: 'view-skeleton',
  data () {
    return {
      btnGroupsActive: 0,
      btnsStyle: {}
    }
  },
  props: {
    title: {
      type: String,
      default: '列表'
    },
    padding: {
      type: String,
      default: '0'
    },
    tabItems: {
      type: Array,
      default () {
        return []
      }
    },
    showTabConts: {
      type: Boolean,
      default: false
    },
    state: {
      type: Boolean,
      default: false
    },
    tabActive: {
      type: String,
      default: 'tab-0'
    },
    btnGroupsItems: {
      type: Array,
      default () {
        return []
      }
    },
    breadcrumbs: {
      type: Array,
      default () {
        return []
      }
    },
    searchItems: {
      type: Array,
      default () {
        return []
      }
    },
    mb: {
      type: Number,
      default: 8
    },
    elevation: {
      type: Number,
      default: 2
    },
    hideDetails: {
      type: Boolean,
      default: true
    }
  },
  filters: {
    getTabActiveIdx (v) {
      const a = v.split('-')
      if (a.length > 0) {
        return Number(a[1])
      }
      return null
    }
  },
  watch: {
    hideDetails: {
      handler (n) {
        if (n) {
          this.btnsStyle = {}
        } else {
          this.btnsStyle = { height: '100px' }
        }
      },
      immediate: true
    }
  },
  methods: {
    inquery (e) {
      this.$emit('inquery', {
        target: this.$refs.uxSearchBar,
        params: e
      })
    },
    reset () {
      this.$emit('reset')
    },
    clear (key) {
      this.$emit('clear', key)
    },
    onBtnGroups (e) {
      this.$emit('on-btn-groups', e)
    },
    onChangeTab (e) {
      if (typeof e === 'number') {
        this.$emit('on-change-tab', this.tabItems[e])
      } else {
        const a = e.split('-')
        const b = a[1]
        this.$emit('on-change-tab', this.tabItems[b])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cs-badge {
    position: absolute;
    right: -10px;
    top: -15px;
    min-width: 16px;
    padding: 0 3px;
    font-size: 11px;
    line-height: normal;
    color: #fff;
    background-color: #F44336;
    border-radius: 50px;
}
.v-btn.cs:not(.v-btn--round).v-size--default {
  height: 32px;
}
::v-deep.cs .v-tabs-bar {
  border-radius: 4px 4px 0 0 !important;
}
.cs.v-card:not(.v-sheet--tile):not(.v-card--shaped) {
  overflow: hidden;
}
</style>
