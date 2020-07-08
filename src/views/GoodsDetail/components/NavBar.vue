<template>
  <div class="nav-bar" v-if="scrollTop > 0" :style="navBarStyle">
    <div
      class="nav-item"
      :class="{ active: activeIndex === 0 }"
      @click="handleClick"
    >
      商品
      <span></span>
    </div>
    <div
      class="nav-item"
      :class="{ active: activeIndex === 1 }"
      @click="handleClick"
    >
      详情
      <span></span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      activeIndex: 0
    };
  }
};
</script>
<style lang="less" scoped>
.nav-bar {
  position: fixed;
  z-index: 10;
  background: white;
  left: 0;
  top: 0;
  width: 100%;
  height: 41px;
  padding-top: 5.5px;
  box-sizing: border-box;
  display: flex;
  opacity: 0;
  .nav-item {
    flex: 1;
    text-align: center;
    position: relative;
    span {
      width: 20px;
      height: 4px;
      background: #ff6a00;
      border-radius: 2px;
      position: absolute;
      bottom: 3.5px;
      left: 50%;
      transform: translateX(-50%);
      display: none;
    }
    &.active {
      span {
        display: block;
      }
    }
  }
}
</style>
