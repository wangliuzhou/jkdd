<template>
  <div class="page-goods-detail">
    <template v-if="goodsDetail">
      <NavBar
        class="nav-bar-component"
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

      <Sku :show.sync="showSku" :btnStatus="btnStatus" />

      <!-- cms -->
      <!-- <Cms /> -->
    </template>

    <template v-if="dataIsLoad && !goodsDetail">
      <EmptyTip />
    </template>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import NavBar from "./components/NavBar";
import GoodsImgs from "./components/GoodsImgs";
import GoodsInfo from "./components/GoodsInfo";
import ChooseInfo from "./components/ChooseInfo";
import GoodsDetail from "./components/GoodsDetail";
import BottomBtns from "./components/BottomBtns";
import EmptyTip from "./components/EmptyTip";
import Sku from "./components/Sku";

export default {
  components: {
    NavBar,
    GoodsImgs,
    GoodsInfo,
    ChooseInfo,
    GoodsDetail,
    BottomBtns,
    EmptyTip,
    Sku
  },
  computed: {
    ...mapState({
      dataIsLoad: state => state.pageGoodsDetail.dataIsLoad,
      goodsDetail: state => state.pageGoodsDetail.goodsDetail,
      btnStatus: state => state.pageGoodsDetail.btnStatus
    }),
    showSku: {
      get() {
        return this.$store.state.pageGoodsDetail.showSku;
      },
      set(value) {
        this.setShowSku(value);
      }
    }
  },
  mounted() {
    this.loadData(this.$attrs.id);
  },
  methods: {
    ...mapMutations({
      setShowSku: "pageGoodsDetail/setShowSku"
    }),
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
