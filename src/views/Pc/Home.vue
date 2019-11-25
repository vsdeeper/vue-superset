<template>
  <div>
    <v-breadcrumbs :items="$route.meta.breadcrumbs" divider="/" />
    <v-card width="100%">
      <v-card-title class="headline">通用交互示例</v-card-title>
      <v-card-subtitle>通用交互示例调试调试调试调试调试</v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <div class="d-inline mx-2">
              <v-btn color="success" @click="onToast('success')">toast轻提示success</v-btn>
            </div>
            <div class="d-inline mx-2">
              <v-btn color="info" @click="onToast('info')">toast轻提示info</v-btn>
            </div>
            <div class="d-inline mx-2">
              <v-btn color="error" @click="onToast('error')">toast轻提示danger</v-btn>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="d-inline mx-2">
              <v-btn color="primary" @click="onLoading">loader效果</v-btn>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="d-inline mx-2">
              <v-btn color="primary" @click="onHttp" :loading="isSubmitting">http调试</v-btn>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="d-inline mx-2">
              <v-btn color="primary" @click="onConfirm">confirm弹出</v-btn>
            </div>
            <div class="d-inline mx-2">
              <v-btn color="primary" @click="onAlert">alert弹出</v-btn>
            </div>
            <div class="d-inline mx-2">
              <v-btn color="primary" @click="onSuccess">success弹出</v-btn>
            </div>
            <div class="d-inline mx-2">
              <v-btn color="primary" @click="onAsync">异步确认弹框</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey lighten-2">重置</v-btn>
        <v-btn color="success">提交</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      isSubmitting: false,
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
    demoApi (params) {
      return this.$post('/demo/demoApi', 'demoApi', params)
    },
    onToast (type) {
      if (type === 'success') {
        this.$toast('success', '成功提示')
      } else if (type === 'info') {
        this.$toast('info', '信息提示')
      } else if (type === 'error') {
        this.$toast('error', '错误提示')
      }
    },
    onLoading () {
      this.$loading()
      setTimeout(() => {
        this.$loadend()
      }, 3000)
    },
    onHttp () {
      this.isSubmitting = true
      this.demoApi({
        phoneNumber: '15000291276',
        verificationCode: '344333'
      }).then(d => {
        this.isSubmitting = false
      })
    },
    onAlert () {
      this.$cux.alert({
        text: 'alert弹框',
        showCancelButton: false
      })
    },
    onConfirm () {
      this.$cux.alert({
        text: 'confirm弹框',
        icon: 'question'
      })
    },
    onSuccess () {
      this.$cux.alert({
        text: 'success弹框',
        icon: 'success',
        timer: 1000
      })
    },
    onAsync () {
      this.$cux.asyncOperation({
        text: '异步确认弹框',
        icon: 'warning',
        preConfirm: () => {
          return this.demoApi({
            phoneNumber: '15000291276',
            verificationCode: '344333'
          }).then(d => {
            if (d.success) {
              this.$cux.alert({
                text: '操作成功',
                icon: 'success',
                timer: 1000
              })
            }
            return false
          })
        }
      })
    }
  },
  created () {
    console.log(this.$util.dateFormat(Number(new Date())))
  }
}
</script>
