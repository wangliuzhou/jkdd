<template>
  <span class="iconfont" :class="type" :style="fontStyle"></span>
</template>
<script>
export default {
  props: ["type", "fontStyle"]
};
</script>
<style lang="less" scoped>
.goodsSearch-container {
  box-sizing: border-box;
  top: 0;
  width: 100%;
  z-index: 10;
  padding: 7px 12px;
  .goods-search-input-wrap {
    display: flex;
    align-items: center;
    border-radius: 20px;
    border: 1px solid rgba(204, 204, 204, 1);
    overflow: hidden;
    min-height: 28px;
    max-height: 40px;
    background: white;
    color: #c0c4cc;
    .goods-search-input-left {
      flex: 0 0 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .goods-search-input-right {
      color: #909399;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
    }
  }
}
</style>
