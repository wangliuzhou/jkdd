<template>
  <div class="page-goods-detail">
    <template v-if="goodsDetail">
      <NavBar
        class="nav-bar-component"
        :scrollTop="scrollTop"
        bind:tap-nav-bar-item="handleNavBarTap"
      />

      <GoodsImgs />

      <GoodsInfo />

      <!-- <view class="discount-info">优惠</view> -->

      <ChooseInfo />

      <!-- 商品详情 -->
      <GoodsDetail />

      <!-- 底部button -->
      <BottomBtns />

      <!-- sku -->
      <van-popup
        :show="showSku"
        bind:close="handleCloseSku"
        position="bottom"
        closeable
      >
        <Sku
          :goodsDetail="goodsDetail"
          :chooseInfo="chooseInfo"
          bind:update-choose-info="handleUpdateChooseInfo"
          bind:confirm="handleConfirm"
        />
      </van-popup>

      <!-- cms -->
      <Cms />
    </template>

    <template v-if="dataIsLoad && !goodsDetail">
      <EmptyTip />
    </template>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import GoodsImgs from "./components/GoodsImgs";
import GoodsInfo from "./components/GoodsInfo";
import ChooseInfo from "./components/ChooseInfo";
import GoodsDetail from "./components/GoodsDetail";
import BottomBtns from "./components/BottomBtns";
import EmptyTip from "./components/EmptyTip";

export default {
  components: {
    GoodsImgs,
    GoodsInfo,
    ChooseInfo,
    GoodsDetail,
    BottomBtns,
    EmptyTip
  },
  computed: {
    ...mapState({
      dataIsLoad: state => state.pageGoodsDetail.dataIsLoad,
      goodsDetail: state => state.pageGoodsDetail.goodsDetail
    })
  },
  mounted() {
    this.loadData(this.$attrs.id);
  },
  methods: {
    ...mapActions({
      loadData: "pageGoodsDetail/loadData"
    })
  }
};
</script>
<style lang="less" scoped>
.page-goods-detail {
  padding-bottom: calc(env(safe-area-inset-bottom) + 51.5px);
}
</style>
