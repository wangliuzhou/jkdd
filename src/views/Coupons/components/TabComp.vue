<template>
  <van-tabs
    @click="onToggleTabs"
    sticky
    color="#ff6a00"
    line-width="24"
    title-active-color="#ff6a00"
  >
    <van-tab title="可用优惠券" :name="0">
      <slot name="canUse"></slot>
    </van-tab>
    <van-tab title="不可用优惠券" :name="1">
      <slot name="invalid"></slot>
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  props: {
    handleToggleTabs: {
      type: Function
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onToggleTabs(event) {
      if (event !== this.tabIndex) {
        this.$emit("handleToggleTabs", event);
      }
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.tab-class {
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.tab-active-class {
  font-size: 15px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 94, 0, 1);
}
</style>
