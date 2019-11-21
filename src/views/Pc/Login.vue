<template>
  <v-row
    align="center"
    justify="center"
  >
    <ValidationObserver ref="observerL" tag="form" v-slot="{ invalid }">
      <v-card width="100%">
        <v-card-title class="headline">易百后管平台</v-card-title>
        <v-card-text>
          <ValidationProvider :rules="{required: true}" v-slot="{ failedRules }">
            <v-text-field
              color="success"
              label="用户名"
              single-line
              v-model="params.username"
              :error-messages="failedRules | errorMsg({
                required: '请输入用户名'
              })"
              prepend-icon="mdi-account-circle-outline"
            >
            </v-text-field>
          </ValidationProvider>
          <ValidationProvider :rules="{required: true}" v-slot="{ failedRules }">
            <v-text-field
              color="success"
              label="密码"
              single-line
              v-model="params.password"
              prepend-icon="mdi-lock-outline"
              :type="showPsw ? 'text' : 'password'"
              :append-icon="showPsw ? 'mdi-eye' : 'mdi-eye-off'"
              :error-messages="failedRules | errorMsg({
                required: '请输入密码'
              })"
              @click:append="showPsw = !showPsw"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider :rules="{required: true, max: 6, validationCode: captcha}" v-slot="{ failedRules }">
            <v-text-field
              color="success"
              label="验证码"
              single-line
              v-model="params.validationCode"
              :error-messages="failedRules | errorMsg({
                required: '请输入验证码',
                max: '验证码不能超过6位',
                validationCode: '验证码输入错误'
              })"
              prepend-icon="mdi-shield-check-outline"
            >
              <template v-slot:append>
                <img-verify-code></img-verify-code>
              </template>
            </v-text-field>
          </ValidationProvider>
          <div>
            <v-checkbox
              v-model="checkbox"
              label="记住密码"
              color="success"
              hide-details
            ></v-checkbox>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text x-large color="success">登录</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-row>
</template>

<script>
import ImgVerifyCode from '@/superset/pc/components/ImgVerifyCode'
import { extend } from 'vee-validate'
import { required, max } from 'vee-validate/dist/rules'

extend('required', {
  ...required
})
extend('max', {
  ...max
})
extend('validationCode', {
  params: ['captcha'],
  validate (input, { captcha }) {
    if (input === captcha) {
      return true
    }
    return false
  }
})

export default {
  components: {
    ImgVerifyCode
  },
  data () {
    return {
      showPsw: false,
      checkbox: true,
      captcha: '123456',
      params: {
        username: '',
        password: '',
        validationCode: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  position: relative;
  z-index: 2;
}
.v-card {
  max-width: 340px;
}
.v-application .headline {
  font-size: 18px !important;
  color: #fff;
  background: linear-gradient(60deg, #66bb6a, #43a047);
  position: absolute;
  left: 20px;
  right: 20px;
  top: -25px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 6px !important;
  justify-content: space-around;
  box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);
}
.v-card__title + .v-card__text {
  padding: 50px 20px 16px;
}
</style>
