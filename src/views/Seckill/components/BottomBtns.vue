<template>
  <div class="bottom-btns">
    <div class="buy">
      <button @click="handleGoBuy">立即购买</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      goodsDetail: state => state.pageGoodsDetail.goodsDetail
    })
  },
  methods: {
    ...mapMutations({
      setBtnStatus: "pageGoodsDetail/setBtnStatus",
      setShowSku: "pageGoodsDetail/setShowSku"
    }),
    handleAddCart() {
      this.setBtnStatus(1);
      this.setShowSku(true);
    },
    handleGoBuy() {
      this.setBtnStatus(2);
      this.setShowSku(true);
    }
  }
};
</script>
<style lang="less" scoped>
.bottom-btns {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 51.5px;
  background: white;
  padding-bottom: env(safe-area-inset-bottom);
  .buy {
    margin: 0 12px;
    padding-top: 6px;
    button {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      padding: 0;
      background: #ff6a00;
      color: white;
      font-size: 15px;
      border: none;
    }
  }
}
</style>
