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
  width: 143px;
  height: 195px;
  margin: 50px;
  transform: scale(0.75);
  overflow: hidden;
  img.bevel {
    position: absolute;
    bottom: 195px;
    right: 143px;
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
    z-index: 3;
    background-color: #fff;
  }
  &.start {
    z-index: 2;
    clip-path: ellipse(143px 183px at -100% -120%);
    animation: aaa 0.5s ease-in-out 3s;
    background-color: #fff;
  }
  &.end {
    z-index: 1;
    background-color: #fff;
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
    clip-path: ellipse(143px 183px at 13% 28%);
  }
  70% {
    clip-path: ellipse(143px 183px at 1% 10%);
  }
  85% {
    clip-path: ellipse(143px 183px at -16% -23%);
  }
  100% {
    clip-path: ellipse(143px 183px at -100% -120%);
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
    width: 30%;
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
    bottom: 195px;
    right: 143px;
    width: 180%;
  }
}
</style>
