<template>
  <van-notice-bar
    class="notice-bar"
    left-icon="volume-o"
    :text="item.text"
    :color="item.color"
    :background="item.backgroundColor"
  />
</template>
<script>
export default {
  props: ["item"]
};
</script>
<style lang="less" scoped>
.notice-bar {
  & /deep/ .van-icon {
    color: #ff6a00;
    font-weight: bold;
  }
}
</style>
