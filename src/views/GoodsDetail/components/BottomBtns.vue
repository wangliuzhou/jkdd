<template>
  <div class="bottom-btns">
    <div class="customer-service">
      <img
        :src="require('@/assets/images/customer-service-icon.png')"
        alt="客服"
      />
      <span>客服</span>
    </div>
    <div class="cart">
      <img :src="require('@/assets/images/cart-icon.png')" alt="购物车" />
      <span>购物车</span>
    </div>
    <template v-if="goodsDetail.productOnsaleStatus === 1">
      <template v-if="goodsDetail.stockSum > 0">
        <div class="add-cart">
          <button @click="handleAddCart">加入购物车</button>
        </div>
        <div class="buy">
          <button @click="handleGoBuy">立即购买</button>
        </div>
      </template>
      <template v-if="!goodsDetail.stockSum">
        <div class="ysq">
          <button disabled>商品已售磬</button>
        </div>
      </template>
    </template>
    <template v-if="goodsDetail.productOnsaleStatus === 0">
      <div class="yxj">
        <button disabled>商品已下架</button>
      </div>
    </template>
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
      this.setShowSku();
    },
    handleGoBuy() {
      this.setBtnStatus(2);
      this.setShowSku();
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
  display: flex;
  padding-left: 12px;
  padding-bottom: env(safe-area-inset-bottom);
  .customer-service {
    padding-top: 7px;
    flex: 0 0 55px;
    text-align: center;
    img {
      width: 21px;
      height: 21px;
      display: block;
      margin: 0 auto;
    }
    span {
      display: block;
      color: #999999;
      font-size: 11px;
      margin-top: 2.5px;
    }
  }
  .cart {
    padding-top: 7px;
    flex: 0 0 55px;
    text-align: center;
    img {
      width: 22px;
      height: 21px;
      display: block;
      margin: 0 auto;
    }
    span {
      display: block;
      color: #999999;
      font-size: 11px;
      margin-top: 2.5px;
    }
  }
  .add-cart {
    padding-top: 6px;
    margin-left: 13px;
    button {
      width: 110px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      border: 0.5px solid #ff6a00;
      background: #ffe9d9;
      padding: 0;
      color: #ff6a00;
      font-size: 15px;
      border: none;
    }
  }
  .buy {
    padding-top: 6px;
    margin-left: 10px;
    button {
      width: 110px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      padding: 0;
      background: #ff6a00;
      color: white;
      font-size: 15px;
      &:after {
        border: none;
      }
    }
  }
  .ysq,
  .yxj {
    padding-top: 6px;
    margin-left: 10px;
    button {
      width: 230px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      padding: 0;
      background: #cccccc;
      color: white;
      font-size: 15px;
      border: none;
    }
  }
}
</style>
