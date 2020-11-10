<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 全局loading -->
    <van-loading
      class="loading"
      type="spinner"
      color="#FF6A00"
      v-if="global.loading"
    />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      global: "global"
    })
  },
  methods: {
    ...mapActions({
      setBottomLogoInfo: "bottomLogo/setBottomLogoInfo"
    }),
    // 获取底部logo信息
    async getBottomInfo() {
      const { data } = await this.$fetchGet(
        "/apply/mobile/storesysLogo/getLogoInfo"
      );
      this.setBottomLogoInfo(data || {});
    }
  },
  created() {
    this.getBottomInfo();
  }
};
</script>
<style lang="less" scoped>
#app {
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
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
