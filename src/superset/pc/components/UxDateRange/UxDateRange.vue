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
        v-model="datesText"
        :label="label"
        prepend-icon="mdi-calendar-multiple"
        readonly
        clearable
        v-on="on"
        :dense="dense"
        :hide-details="hideDetails"
        :persistent-hint="persistentHint"
        :hint="hint"
        :error-messages="errorMessages"
        :single-line="singleLine"
        @click:clear="dates = []; $emit('change', [])"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dates"
      locale="zh-cn"
      selected-items-text="2个选中"
      range
      @change="onChangeDates"
      :allowed-dates="allowedDates"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'ux-date-range',
  data () {
    return {
      menu: false,
      datesText: '',
      dates: this.value
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
    hint: {
      type: String,
      default: ''
    },
    persistentHint: {
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
    allowedDays: {
      type: Number,
      default: null
    },
    dense: {
      type: Boolean,
      default: false
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
        this.dates = n
      },
      deep: true,
      immediate: true
    },
    dates: {
      handler (n) {
        if (n.length === 2) {
          const a = new Date(n[0].replace(/-/g, '/')).getTime()
          const b = new Date(n[1].replace(/-/g, '/')).getTime()
          if (a > b) {
            this.datesText = n[1] + '~' + n[0]
          } else {
            this.datesText = n[0] + '~' + n[1]
          }
        } else if (n.length === 1) {
          this.datesText = n[0] + '~'
        } else {
          this.datesText = ''
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    startTime () {
      const sd = this.dates[0]
      if (sd) {
        return new Date(sd.replace(/-/g, '/')).getTime()
      }
      return null
    },
    validTimeStart () {
      if (this.startTime && this.allowedDays) {
        return this.$util.msDifference('before', this.startTime, this.allowedDays)
      }
      return null
    },
    validTimeEnd () {
      if (this.startTime && this.allowedDays) {
        return this.$util.msDifference('after', this.startTime, this.allowedDays)
      }
      return null
    }
  },
  methods: {
    onChangeDates (e) {
      const a = new Date(e[0].replace(/-/g, '/')).getTime()
      const b = new Date(e[1].replace(/-/g, '/')).getTime()
      if (a > b) {
        this.$emit('change', e.reverse())
      } else {
        this.$emit('change', e)
      }
    },
    allowedDates (val) {
      if (this.allowedDays) {
        if (this.startTime) {
          const ct = new Date(val.replace(/-/g, '/')).getTime()
          if (ct <= this.validTimeEnd && ct >= this.validTimeStart) {
            return val
          }
        } else {
          return val
        }
      } else {
        return val
      }
    }
  }
}
</script>
