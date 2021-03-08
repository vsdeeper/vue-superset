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
        v-model="dateTime"
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
        @click:clear="clearDateTime"
        @focus="showDate = true; showTime = false"
      ></v-text-field>
    </template>
    <v-date-picker v-show="showDate" :type="type" v-model="date" @change="changeDate"></v-date-picker>
    <v-time-picker v-show="showTime" :use-seconds="useSeconds" format="24hr" v-model="time" @input="changeTime"></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'ux-date-picker',
  data () {
    return {
      menu: false,
      dateTime: this.value,
      date: null,
      time: null,
      showDate: false,
      showTime: false
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
      default: 'mdi-calendar-clock'
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
    useSeconds: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    dateTime: {
      handler (n) {
        if (n) {
          const arr = n.split(' ')
          this.date = arr[0]
          this.time = arr[1]
        }
      },
      immediate: true
    }
  },
  methods: {
    clearDateTime () {
      this.date = null
      this.time = null
      this.$emit('change', '')
    },
    changeDate () {
      this.time = null
      this.showDate = false
      this.showTime = true
    },
    changeTime () {
      this.dateTime = this.date + ' ' + this.time
      this.$emit('change', this.dateTime)
    }
  }
}
</script>
