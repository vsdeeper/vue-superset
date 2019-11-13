<template>
  <v-card width="100%">
    <v-card-title class="headline">标题</v-card-title>
    <v-card-subtitle>副标题</v-card-subtitle>
    <v-card-text>正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文正文</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn>重置</v-btn>
      <v-btn color="success">提交</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      params: {
        phoneNumber: '15000291276',
        verificationCode: '333333'
      }
    }
  },
  methods: {
    // 接口封装示例
    // 第4个参数-isNeedLoading（可选）-boolean-是否需要显示loading提示-默认不需要
    // 第5个参数-isCountDown（可选）-boolean-是否显示倒计时-默认不显示
    // 第6个参数-countDown（可选）-number-倒计时时长s-默认和全局超时时间配置一致
    register (params) {
      return this.$http.post('/demo/demoApi', 'register', params, true, true, 2000)
    },
    aa () {
      this.register(this.params).then((d) => {
        if (d.success) {
          this.data = d
        }
      })
    }
  }
}
</script>
