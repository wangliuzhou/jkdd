<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <van-loading
      v-if="global.loading"
      class="loading"
      type="spinner"
      color="#FF6A00"
    />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      global: "global"
    })
  }
};
</script>
<style lang="less" scoped>
#app {
  width: 100%;
  min-height: 100%;
  position: relative;
  left: 0;
  top: 0;
}
.loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
