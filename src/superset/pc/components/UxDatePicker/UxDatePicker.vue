<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="date"
        :label="label"
        :prepend-icon="prependIcon"
        :prependInnerIcon="prependInnerIcon"
        readonly
        :clearable="clearable"
        :dense="dense"
        v-on="on"
        :disabled="disabled"
        :hide-details="hideDetails"
        :error-messages="errorMessages"
        :single-line="singleLine"
        :outlined="outlined"
        @click:clear="$emit('change', '')"
      ></v-text-field>
    </template>
    <v-date-picker :type="type" v-model="date" @change="$emit('change', date)"></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'ux-date-picker',
  data () {
    return {
      menu: false,
      date: this.value
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    range: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: true
    },
    prependIcon: {
      type: String,
      default: 'mdi-calendar'
    },
    prependInnerIcon: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    errorMessages: {
      type: [String, Array],
      default: ''
    },
    singleLine: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'date'
    },
    dense: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value: {
      handler (n) {
        this.date = n
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
