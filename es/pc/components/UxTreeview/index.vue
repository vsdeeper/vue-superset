<template>
  <v-row dense>
    <v-col cols="12">
      <v-text-field
        v-model="search"
        :label="searchLabel"
        single-line
        hide-details
        clearable
        class="pt-0"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <div class="d-flex justify-space-around py-7" v-if="loading">
        <v-progress-circular
          :width="3"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div class="grey--text text-body-2 py-3" v-if="!loading && !items.length">暂无数据</div>
      <template v-if="!loading">
        <v-treeview
          v-model="selection"
          selectable
          activatable
          color="primary"
          :dense="dense"
          :return-object="returnObject"
          :items="items"
          :search="search"
          :filter="filter"
          :open="open"
          :item-key="itemKey"
          :item-text="itemText"
          :open-all="openAll"
        >
          <template v-slot:label="{ item }">
            {{item[itemText]}}
            <slot name="label-after" :item="item"></slot>
          </template>
          <template v-slot:append="{ item }">
            <slot name="append" :item="item"></slot>
          </template>
        </v-treeview>
      </template>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ux-treeview',
  model: {
    prop: 'value',
    event: 'change'
  },
  data () {
    return {
      selection: this.value,
      search: null
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    searchLabel: {
      type: String,
      default: '搜索'
    },
    open: {
      type: Array,
      default () {
        return []
      }
    },
    openAll: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    returnObject: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    itemKey: {
      type: String,
      default: 'id'
    },
    itemText: {
      type: String,
      default: 'name'
    },
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    value: {
      handler (n) {
        this.selection = n
      }
    },
    selection: {
      handler (n) {
        this.$emit('change', n)
      },
      deep: true
    }
  },
  computed: {
    filter () {
      return (item, search, textKey) => {
        const v = item[textKey].toLowerCase()
        const s = search.toLowerCase()
        if (v.indexOf(s) > -1) {
          return item
        }
      }
    }
  }
}
</script>
