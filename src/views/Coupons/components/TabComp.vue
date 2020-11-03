<template>
  <van-tabs
    @click="onToggleTabs"
    sticky
    color="#ff6a00"
    line-width="24"
    tab-class="tab-class"
    tab-active-class="tab-active-class"
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
</style>
