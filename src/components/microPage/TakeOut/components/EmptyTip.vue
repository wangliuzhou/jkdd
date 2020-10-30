<template>
  <div class="empty-tip">
    <img :src="require('@/assets/images/empty-classify.png')" alt="暂无分类" />
    <div class="empty-tip-text">暂无分类</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.empty-tip {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  box-sizing: border-box;
  padding-bottom: calc(env(safe-area-inset-bottom) + 50px);
  box-sizing: border-box;
  background: white;
  img {
    display: block;
    margin: 0 auto;
    width: 97px;
  }
  .empty-tip-text {
    text-align: center;
    color: #666666;
    font-size: 15px;
    margin-top: 22px;
  }
}
</style>
