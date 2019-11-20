<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-card width="100%">
      <v-card-title class="headline">星巴克B2B订单系统</v-card-title>
      <v-card-text>
        范德萨发生
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="success">登录</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<style lang="scss" scoped>
.row {
  position: relative;
  z-index: 2;
}
.v-card {
  max-width: 340px;
}
.v-application .headline {
  font-size: 16px !important;
  color: #fff;
  background: linear-gradient(60deg, #66bb6a, #43a047);
  position: absolute;
  left: 30px;
  right: 30px;
  top: -25px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 6px !important;
  justify-content: space-around;
  box-shadow: 0 12px 20px -10px rgba(76,175,80,.28), 0 4px 20px 0 rgba(0,0,0,.12), 0 7px 8px -5px rgba(76,175,80,.2);
}
.v-card__title + .v-card__text {
  padding-top: 60px;
}
</style>
