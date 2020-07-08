<template>
  <div class="empty-tip">
    <img :src="require('@/assets/images/empty-goods.png')" alt="暂未发布商品" />
    <div class="empty-tip-text">暂未发布商品～</div>
  </div>
</template>
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
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  img {
    display: block;
    margin: 0 auto;
    width: 156.5px;
  }
  .empty-tip-text {
    text-align: center;
    color: #666666;
    font-size: 15px;
    margin-top: 22px;
  }
}
</style>
