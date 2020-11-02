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
import storesys from "@/utils/storesys";
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
    id: String
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
      dataIsLoad: state => state.pageGoodsDetail.dataIsLoad,
      goodsDetail: state => state.pageGoodsDetail.goodsDetail,
      chooseInfo: state => state.pageGoodsDetail.chooseInfo,
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
    this.loadData(this.id);
  },
  methods: {
    ...mapMutations({
      setShowSku: "pageGoodsDetail/setShowSku",
      updateChooseInfo: "pageGoodsDetail/updateChooseInfo"
    }),
    ...mapActions({
      loadData: "pageGoodsDetail/loadData"
    }),
    handleConfirm() {
      let {
        btnStatus,
        chooseInfo: { sku, num },
        goodsDetail: { isMultiAttr, valueVoList }
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
        this.$fetchPost("/order/mobile/tenantCart/insert", {
          storeOutId: "TSRORVZ17ZXD9",
          onlinestoreSingleProductOuterId: sku.singleProductOuterId,
          count: num
        }).then(() => {
          Toast({ message: "添加成功" });
        });
      } else if (btnStatus == 2) {
        //立即购买
        this.$push({
          path: `/pay/orderSettle?storesysId=${storesys.storesysId}&skuIds=${sku.singleProductOuterId}&skuNums=${num}`
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
