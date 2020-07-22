<template>
  <div class="goods-detail">
    <div class="goods-detail-title">
      <span class="start"></span>
      <span class="title">商品详情</span>
      <span class="end"></span>
    </div>
    <div class="goods-detail-content">
      <img
        v-for="(item, i) in detailPic"
        :key="i"
        v-lazy="$ali(item, 375)"
        alt="商品详情图"
      />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      goodsDetail: state => state.pageGoodsDetail.goodsDetail
    }),
    detailPic() {
      let {
        goodsDetail: { detailPic }
      } = this;
      return detailPic ? detailPic.split(",") : [];
    }
  }
};
</script>
<style lang="less" scoped>
.goods-detail {
  text-align: center;
  .goods-detail-title {
    display: flex;
    padding: 17.5px 0;
    justify-content: center;
    align-items: center;
    .start {
      &::before,
      &::after {
        content: "";
        width: 10px;
        height: 10px;
        background: #ff6a00;
        display: inline-block;
        border-radius: 100%;
      }
      &::before {
        opacity: 0.2;
      }
      &::after {
        opacity: 0.6;
        margin-left: -2.5px;
      }
    }
    .title {
      padding: 0 10px;
      font-size: 15px;
      color: #333;
      line-height: 21px;
    }
    .end {
      &::before,
      &::after {
        content: "";
        width: 10px;
        height: 10px;
        background: #ff6a00;
        display: inline-block;
        border-radius: 100%;
      }
      &::after {
        opacity: 0.2;
      }
      &::before {
        opacity: 0.6;
        margin-left: -2.5px;
      }
    }
  }
  .goods-detail-content {
    padding: 0 6px;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
