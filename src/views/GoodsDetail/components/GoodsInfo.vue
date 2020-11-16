<template>
  <div class="goods-info">
    <!-- <div class="zan-wrap">
    <image src="../../../../assets/image/zan-icon.png" />
    <text>关注</text>
  </div> -->
    <div class="goods-price">
      <span class="sell-price">¥{{ goodsDetail.minPrice * 1 }}</span>
      <span class="del-price" v-if="goodsDetail.minDelPrice * 1"
        >¥{{ goodsDetail.minDelPrice * 1 }}</span
      >
      <span class="xg" v-if="goodsDetail.saleLimit"
        >限购{{ goodsDetail.saleLimit }}件</span
      >
    </div>
    <div class="goods-title">{{ goodsDetail.productName }}</div>
    <div class="goods-desc-wrap">
      <div class="goods-desc" v-if="goodsDetail.sellingPoint">
        {{ goodsDetail.sellingPoint }}
      </div>
      <!-- <div class="sell-count">月销136件</div> -->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      goodsDetail: state => state.pageGoodsDetail.goodsDetail
    })
  }
};
</script>
<style lang="less" scoped>
.goods-info {
  background: white;
  padding: 13px 12px 16px 12px;
  position: relative;
  .zan-wrap {
    position: absolute;
    top: 10px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 21px;
      height: 18.5px;
    }
    span {
      color: #999999;
      font-size: 11px;
      margin-left: 4px;
    }
  }
  .goods-price {
    .sell-price {
      color: #ff6a00;
      font-size: 18px;
      margin-right: 8px;
    }
    .del-price {
      color: #999999;
      text-decoration: line-through;
      font-size: 15px;
    }
    .xg {
      color: #ff6a00;
      font-size: 12px;
      margin-left: 9.5px;
    }
  }
  .goods-title {
    margin-top: 10px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 15px;
    line-height: 21px;
    max-height: 42px;
  }
  .goods-desc-wrap {
    margin-top: 6px;
    color: #999;
    font-size: 13px;
    display: flex;
    white-space: nowrap;
    .goods-desc {
      flex: auto;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
    }
    .sell-count {
      margin-left: 12px;
      white-space: nowrap;
    }
  }
}
</style>
