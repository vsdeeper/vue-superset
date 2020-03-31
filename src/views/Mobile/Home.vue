<template>
  <div class="home">
    <h1>mobile端示例</h1>

    <div class="image-wrap">
      <div class="image-layer silent" v-show="show">
        <img src="@/assets/img/image_24.png" />
      </div>
      <div class="image-layer start">
        <img src="@/assets/img/image_24.png" />
      </div>
      <div class="image-layer end">
        <div class="mask"></div>
        <img src="@/assets/img/image_23.png" />
      </div>
      <img class="bevel" src="@/assets/img/bevel.png" />
    </div>
  </div>
</template>

<script>
import { weixin } from '@/superset/common'

export default {
  data () {
    return {
      show: true
    }
  },
  created () {
    console.log(weixin)
    setTimeout(() => {
      this.show = false
    }, 3100)
  }
}
</script>

<style lang="scss" scoped>
.image-wrap {
  display: inline-block;
  position: relative;
  width: 136px;
  height: 157px;
  margin: 50px;
  // transform: scale(0.75);
  overflow: hidden;
  img.bevel {
    position: absolute;
    bottom: 136px;
    right: 157px;
    width: 180%;
    z-index: 3;
    animation: ccc 0.5s ease-in-out 3s;
  }
}
.image-layer {
  position: absolute;
  left: 0;
  top: 0;
  &.silent {
    z-index: 4;
  }
  &.start {
    z-index: 2;
    clip-path: ellipse(136px 157px at -70% -80%);
    animation: aaa 0.5s ease-in-out 3s;
  }
  &.end {
    z-index: 1;
  }
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: transparent;
    animation: bbb 0.5s ease-in-out 3s;
  }
  img {
    vertical-align: middle;
  }
}
@keyframes aaa {
  0% {
    clip-path: ellipse(136px 157px at 27% 30%);
  }
  70% {
    clip-path: ellipse(136px 157px at 0% 5%);
  }
  85% {
    clip-path: ellipse(136px 157px at -22% -34%);
  }
  100% {
    clip-path: ellipse(136px 157px at -70% -80%);
  }
}
@keyframes bbb {
  0% {
    background-color: rgb(125, 56, 61, 0.75);
  }
  100% {
    background-color: transparent;
  }
}
@keyframes ccc {
  0% {
    bottom: 0;
    right: 0;
    width: 0%;
  }
  70% {
    bottom: 0;
    right: 0;
    width: 100%;
  }
  85% {
    bottom: 50px;
    right: 10px;
    width: 150%;
  }
  100% {
    bottom: 136px;
    right: 157px;
    width: 180%;
  }
}
</style>
