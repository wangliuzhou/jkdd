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

      <ChooseInfo v-if="goodsDetail.secKillStock > 0" />

      <!-- 商品详情 -->
      <GoodsDetail />

      <!-- 底部button -->
      <BottomBtns :id="id" />

      <!-- sku -->
      <Sku
        :show.sync="showSku"
        :btnStatus="btnStatus"
        :goodsDetail="goodsDetail"
        :chooseInfo="chooseInfo"
        @updateChooseInfo="updateChooseInfo"
        @confirm="handleConfirm"
      />

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
import { Toast } from "vant";
import NavBar from "./components/NavBar";
import GoodsImgs from "./components/GoodsImgs";
import GoodsInfo from "./components/GoodsInfo";
import ChooseInfo from "./components/ChooseInfo";
import GoodsDetail from "./components/GoodsDetail";
import BottomBtns from "./components/BottomBtns";
import EmptyTip from "./components/EmptyTip";
import Sku from "./components/Sku";

export default {
  props: {
    id: String,
    seckillOutId: String
  },
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
      dataIsLoad: state => state.pageSeckillGoodsDetail.dataIsLoad,
      goodsDetail: state => state.pageSeckillGoodsDetail.goodsDetail,
      chooseInfo: state => state.pageSeckillGoodsDetail.chooseInfo,
      btnStatus: state => state.pageSeckillGoodsDetail.btnStatus
    }),
    showSku: {
      get() {
        return this.$store.state.pageSeckillGoodsDetail.showSku;
      },
      set(value) {
        this.setShowSku(value);
      }
    }
  },
  mounted() {
    this.loadData({ id: this.id, seckillOutId: this.seckillOutId });
  },
  methods: {
    ...mapMutations({
      setShowSku: "pageSeckillGoodsDetail/setShowSku",
      updateChooseInfo: "pageSeckillGoodsDetail/updateChooseInfo"
    }),
    ...mapActions({
      loadData: "pageSeckillGoodsDetail/loadData"
    }),
    handleConfirm() {
      let {
        btnStatus,
        chooseInfo: { sku, num },
        goodsDetail: { isMultiAttr, valueVoList, seckillOutId }
      } = this;
      //有sku
      if (isMultiAttr != 1) {
        sku = valueVoList[0];
      }

      if (!sku) {
        return Toast({ position: "bottom", message: "请选择商品规格" });
      }

      this.setShowSku(false);

      if (btnStatus == 1) {
        //加入购物车
      } else if (btnStatus == 2) {
        //立即购买
        this.$push({
          path: `/pay/orderSettle?skuIds=${sku.singleProductOuterId}&skuNums=${num}&seckillActivityId=${seckillOutId}`
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page-goods-detail {
  padding-bottom: calc(env(safe-area-inset-bottom) + 51.5px);
}
</style>
