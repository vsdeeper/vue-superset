<template>
  <span>
    <template v-if="items.length > 1">
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <a v-on="on">共{{items.length}}个</a>
        </template>

        <v-list dense>
          <template v-if="!simple">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="$emit('click', item[keyId])"
            >
              <v-list-item-title>{{ item[keyText] }}</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </template>
    <template v-else-if="items.length === 1">
      <template v-if="!simple">
        <a @click="$emit('click', items[0][keyId])">{{ items[0][keyText] }}</a>
      </template>
      <template v-else>
        {{ items[0] }}
      </template>
    </template>
    <template v-else>
      {{elseText}}
    </template>
  </span>
</template>

<script>
export default {
  name: 'ux-more',
  props: {
    items: {
      type: Array,
      default () {
        return []
      }
    },
    simple: {
      type: Boolean,
      default: true
    },
    keyId: {
      type: String,
      default: undefined
    },
    keyText: {
      type: String,
      default: undefined
    },
    elseText: {
      type: String,
      default: '--'
    }
  }
}
</script>
