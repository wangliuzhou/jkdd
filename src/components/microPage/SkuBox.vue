<template>
  <div class="">
    <Sku
      paddingBottom="100"
      :show="showSku"
      :goodsDetail="goodsDetail"
      :chooseInfo="chooseInfo"
      @update-choose-info="handleUpdateChooseInfo"
      @confirm="handleConfirm"
      @close-sku="handleCloseSku"
    />

    <ShoppingAnimate ref="shoppingAnimate" />
  </div>
</template>

<script>
import ShoppingAnimate from "./ShoppingAnimate";
import Sku from "@/views/GoodsDetail/components/Sku";
import { Toast } from "vant";
export default {
  components: { ShoppingAnimate, Sku },
  data() {
    return {
      buyEvent: null,
      showSku: false,
      goodsDetail: null,
      chooseInfo: {
        sku: null, //已选中的sku信息
        selectSkuAttr: null, //选中的sku，map
        num: 1, //数量
        address: null, //选中的地址信息
        freight: 0 //运费
      }
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    onBuy({ e, item }) {
      // buyEvent是点击事件，包含点击的坐标和点击的商品详情
      const buyEvent = e;
      const goodInfo = item;
      this.buyEvent = buyEvent;
      this.goodsDetail = null;
      this.chooseInfo = {
        sku: null, //已选中的sku信息
        selectSkuAttr: null, //选中的sku，map
        num: 1, //数量
        address: null, //选中的地址信息
        freight: 0 //运费
      };
      this.getSku(goodInfo);
    },
    getSku(goodInfo = {}) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.$fetchGet("/mobile/tenantProduct/selectProductDetailById", {
        dealerProductOutId: goodInfo.dealerProductOutId,
        storeId: "TSRORVZ17ZXD9"
      })
        .then(({ data }) => {
          if (data && data.dealerProductJoinId) {
            const { isMultiAttr, valueVoList } = data;
            if (isMultiAttr === 1) {
              // 有sku，弹窗
              this.goodsDetail = data;
              this.showSku = true;
            } else {
              //没有sku
              this.insertCart(valueVoList[0].singleProductOuterId, 1);
            }
          } else {
            Toast("商品暂无");
          }
          Toast.clear();
        })
        .catch(() => {
          Toast.clear();
        });
    },
    //加入购物车
    insertCart(onlinestoreSingleProductOuterId, count) {
      this.$fetchPost("/order/mobile/tenantCart/insert", {
        storeOutId: "TSRORVZ17ZXD9",
        onlinestoreSingleProductOuterId,
        count
      }).then(res => {
        Toast("添加成功");
        // cartUtil.del(onlinestoreSingleProductOuterId);
        this.$refs.shoppingAnimate.start(this.buyEvent);
      });
    },
    //更新选中的信息
    handleUpdateChooseInfo(e) {
      let { detail: chooseInfo } = e;
      this.chooseInfo = chooseInfo;
    },
    //点击遮罩后，点击页面
    handleCloseSku() {
      this.showSku = false;
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
        return Toast("请选择商品规格");
      }

      this.handleCloseSku();

      //加入购物车
      this.insertCart(sku.singleProductOuterId, num);
    },

    //点击加入购物车｜立即购买
    handleBtnTap(e) {
      let { detail: btnStatus } = e;
      this.btnStatus = btnStatus;
      this.handleOpenSku();
    },
    //显示sku
    handleOpenSku() {
      this.showSku = true;
    }
  }
};
</script>
<style lang="less" scoped></style>
