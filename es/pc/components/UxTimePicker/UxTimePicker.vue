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
        v-model="time"
        :label="label"
        prepend-icon="mdi-clock-outline"
        readonly
        :clearable="clearable"
        v-on="on"
        :disabled="disabled"
        :hide-details="hideDetails"
        :error-messages="errorMessages"
        :single-line="singleLine"
        :dense="dense"
        :class="className"
        @click:clear="$emit('change', '')"
      ></v-text-field>
    </template>
    <v-time-picker :use-seconds="useSeconds" format="24hr" v-model="time" @input="$emit('change', time)"></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'ux-time-picker',
  data () {
    return {
      menu: false,
      time: this.value
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
    dense: {
      type: Boolean,
      default: false
    },
    useSeconds: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value: {
      handler (n) {
        this.time = n
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
