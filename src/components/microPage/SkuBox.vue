<template>
  <div class="">
    <template v-if="goodsDetail">
      <Sku
        :show.sync="showSku"
        :btnStatus="btnStatus"
        :goodsDetail="goodsDetail"
        :chooseInfo="chooseInfo"
        @updateChooseInfo="updateChooseInfo"
        @confirm="handleConfirm"
      />
    </template>

    <ShoppingAnimate ref="shoppingAnimate" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import ShoppingAnimate from "./ShoppingAnimate";
import Sku from "@/views/GoodsDetail/components/Sku";
import { Toast } from "vant";
export default {
  components: { ShoppingAnimate, Sku },
  props: {
    isTabPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      buyEvent: null
    };
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
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setShowSku: "pageGoodsDetail/setShowSku",
      setBtnStatus: "pageGoodsDetail/setBtnStatus",
      updateChooseInfo: "pageGoodsDetail/updateChooseInfo",
      resetData: "pageGoodsDetail/resetData"
    }),
    ...mapActions({
      loadData: "pageGoodsDetail/loadData"
    }),
    onBuy({ e, item }) {
      // buyEvent是点击事件，包含点击的坐标和点击的商品详情
      this.buyEvent = e;
      this.loadData(item.dealerProductOutId);
      this.setBtnStatus(1);
      this.setShowSku(true);
    },
    //选择sku后，点击确定回调
    handleConfirm() {
      let {
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
      //加入购物车
      this.$fetchPost("/order/mobile/tenantCart/insert", {
        storeOutId: "TSRORVZ17ZXD9",
        onlinestoreSingleProductOuterId: sku.singleProductOuterId,
        count: num
      }).then(() => {
        Toast({ message: "添加成功" });
        this.$refs.shoppingAnimate.start(this.buyEvent);
        this.resetData();
      });
    }
  }
};
</script>
<style lang="less" scoped></style>
