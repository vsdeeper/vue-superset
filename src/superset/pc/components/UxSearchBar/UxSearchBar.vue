<template>
  <div class="ux-search-bar">
    <div class="top-bar">
      {{title}}
      <v-spacer></v-spacer>
      <v-btn text color="normal" @click="display = !display">
        <v-icon dense left>mdi-magnify</v-icon>{{display ? '收缩' : '展开'}}
      </v-btn>
    </div>
    <v-row align="end" ref="box" class="more-search" :class="{display: display}" :style="{maxHeight: maxHeight + 'px'}">
      <v-col v-for="(item, i) in items" :key="i">
        <template v-if="item.type === 'input'">
          <v-text-field
            clearable
            v-model="params[item.key]"
            :label="item.label"
            :hide-details="hideDetails"
            @keydown.enter="inquery"
          ></v-text-field>
        </template>
        <template v-else-if="item.type === 'select'">
          <v-select
            clearable
            v-model="params[item.key]"
            :items="item.options"
            :label="item.label"
            :hide-details="hideDetails"
            @keydown.enter="inquery"
            @change="onChangeSelect(item.key, $event)"
          ></v-select>
        </template>
        <template v-else-if="item.type === 'autocomplete'">
          <v-autocomplete
            clearable
            v-model="params[item.key]"
            :items="item.options"
            :label="item.label"
            @blur="onBlur"
            @focus="onFocus"
            @click:clear="clear(item.key)"
            @update:search-input="searchInput(item.key, $event)"
            @keydown.enter="inquery"
            :hide-details="hideDetails"
          ></v-autocomplete>
        </template>
        <template v-else-if="item.type === 'datepicker'">
          <ux-date-picker :hide-details="hideDetails" :label="item.label" v-model="params[item.key]"></ux-date-picker>
        </template>
        <template v-else-if="item.type === 'datepicker.month'">
          <ux-date-picker :hide-details="hideDetails" type="month" :label="item.label" v-model="params[item.key]"></ux-date-picker>
        </template>
        <template v-else-if="item.type === 'timepicker'">
          <ux-time-picker :hide-details="hideDetails" :label="item.label" v-model="params[item.key]"></ux-time-picker>
        </template>
        <template v-else-if="item.type === 'daterange'">
          <ux-date-range
            v-model="params[item.key]"
            :label="item.label"
            :hide-details="hideDetails"
            :hint="item.hint"
            :persistent-hint="item.persistentHint"
            :allowed-days="item.allowedDays"
          ></ux-date-range>
        </template>
        <template v-else>
          <v-text-field
            disabled
            label="未知的类型"
            :hide-details="hideDetails"></v-text-field>
        </template>
      </v-col>
      <v-col class="btns" :class="{'has-details': !hideDetails}" :style="btnsStyle">
        <v-btn color="normal" @click="reset">
          重置
        </v-btn>
        <v-btn class="ml-2" :loading="isLoading" color="primary" @click="inquery">
          搜索
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'ux-search-bar',
  data () {
    return {
      isLoading: false,
      isBlur: true,
      display: true,
      maxHeight: 'unset',
      storeMaxHeight: 0,
      params: {}
    }
  },
  props: {
    title: {
      type: String,
      default: '列表'
    },
    btnsStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    hideDetails: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    display: {
      handler (n) {
        if (n) {
          if (this.$refs.box) {
            this.maxHeight = this.$refs.box.scrollHeight
            window.addEventListener('resize', this.setMaxHeight)
          }
        } else {
          this.maxHeight = 0
          window.removeEventListener('resize', this.setMaxHeight)
        }
      },
      immediate: true
    },
    items: {
      handler (n) {
        n.forEach(ele => {
          if (ele.value) {
            this.params[ele.key] = ele.value
          }
        })
        this.$forceUpdate()
      },
      immediate: true
    }
  },
  methods: {
    setMaxHeight () {
      if (this.$refs.box) {
        this.maxHeight = Math.max.apply(null, [this.$refs.box.scrollHeight, this.storeMaxHeight])
      }
    },
    searchInput (key, value) {
      if (value !== null && !this.isBlur) {
        this.$emit('search-input', {
          key,
          value
        })
      }
    },
    onFocus () {
      this.isBlur = false
    },
    onBlur () {
      this.isBlur = true
    },
    onChangeSelect (key, value) {
      this.$emit('on-change-select', {
        key,
        value
      })
    },
    inquery () {
      const data = this.$util.clone(this.params)
      for (const key in data) {
        const ele = data[key]
        if (key.indexOf(':') >= 0) {
          const karr = key.split(':')
          const type = karr[0]
          const name = karr[1]
          switch (type) {
            case 'daterange':
              if (ele.length === 2) {
                const a = new Date(ele[0]).getTime()
                const b = new Date(ele[1]).getTime()
                if (a > b) {
                  data[name] = ele[1] + '~' + ele[0]
                } else {
                  data[name] = ele[0] + '~' + ele[1]
                }
              } else if (ele.length === 1) {
                data[name] = ele[0] + '~'
              }
              delete data[key]
              break
            case 'timepicker':
              if (data[name]) {
                data[name] = data[name] + ' ' + ele
              }
              delete data[key]
              break
            default:
              break
          }
        }
      }
      this.$emit('inquery', data)
    },
    reset () {
      this.params = {}
      this.$emit('reset')
    },
    clear (key) {
      this.$emit('clear', key)
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this.maxHeight = this.storeMaxHeight = this.$refs.box.scrollHeight
      window.addEventListener('resize', this.setMaxHeight)
    })
  }
}
</script>

<style lang="scss" scoped>
.ux-search-bar {
  width: 100%;
  .top-bar {
    display: flex;
    align-items: center;
  }
}
.more-search {
  opacity: 0;
  padding: 0 15px;
  visibility: hidden;
  transform: scaleY(0);
  transform-origin: center top;
  transition: all 0.25s ease-in 0s;
  &.display {
    visibility: visible;
    opacity: 1;
    transform: scaleY(1);
  }
}
.row {
  .col {
    padding: 10px;
    flex: 0 0 270px;
    &.btns {
      display: inline-flex;
      align-items: center;
      flex: 0 0 160px;
    }
  }
}
@media (max-width: 690px) {
  .row {
    .col {
      flex: 0 0 100%;
    }
  }
}
</style>
