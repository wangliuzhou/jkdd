<template>
  <div class="header-box">
    <slot name="left">
      <IconFont
        type="icon-jiantouarrowhead7"
        v-if="showArrow"
        @click="pageBack"
      />
    </slot>
    <div class="title">{{ title }}</div>
    <slot name="right"></slot>
  </div>
</template>
<script>
export default {
  props: {
    showArrow: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    pageBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  position: relative;
  .title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-weight: 600;
    font-size: 16px;
  }
}
</style>
