<template>
  <v-card width="100%">
    <v-card-title class="headline">通用交互示例</v-card-title>
    <v-card-subtitle>通用交互示例调试调试调试调试调试</v-card-subtitle>
    <v-card-text>
      <v-btn color="primary" @click="onToast('success')">toast轻提示success</v-btn>
      <v-btn color="primary" @click="onToast('info')">toast轻提示info</v-btn>
      <v-btn color="primary" @click="onToast('error')">toast轻提示danger</v-btn>
    </v-card-text>
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
      return this.$http.post('/demo/demoApi', 'demoApi', params)
    },
    onToast (type) {
      if (type === 'success') {
        this.$toast('success', '成功提示')
      } else if (type === 'info') {
        this.$toast('info', '信息提示')
      } else if (type === 'error') {
        this.$toast('error', '错误提示')
      }
    }
  }
}
</script>
