<template>
  <Sku
    v-if="showSku"
    :show="showSku"
    :goodsDetail="goodsDetail"
    :chooseInfo="chooseInfo"
    @updateChooseInfo="handleUpdateChooseInfo"
    @confirm="handleConfirm"
    @closeSku="handleCloseSku"
  >
    <div v-if="isTabPage" style="height:1.333rem"></div>
  </Sku>
</template>
<script>
import { Toast } from "vant";
import Cfg from "@/config/index";
import Sku from "@/views/GoodsDetail/components/Sku";
export default {
  components: {
    Sku
  },
  props: {
    isTabPage: {
      type: Boolean,
      defalut: false
    }
  },
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
  methods: {
    initData({ e, dealerProductOutId, count }) {
      // buyEvent是点击事件，包含点击的坐标和点击的商品详情
      this.count = count;
      // 重置数据
      this.buyEvent = e;
      this.goodsDetail = null;
      this.chooseInfo = {
        sku: null, //已选中的sku信息
        selectSkuAttr: null, //选中的sku，map
        num: 1, //数量
        address: null, //选中的地址信息
        freight: 0 //运费
      };
      this.loadData({ dealerProductOutId });
    },
    // 获取商品详情 sku 信息
    loadData({ dealerProductOutId }) {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.$fetchGet("/mobile/tenantProduct/selectProductDetailById", {
        storeId: Cfg.mainStoreId,
        dealerProductOutId
      }).then(({ data }) => {
        Toast.clear();
        if (data && data.dealerProductJoinId) {
          const { isMultiAttr, valueVoList } = data;
          if (isMultiAttr === 1) {
            // 有sku，弹窗
            this.goodsDetail = data;
            this.showSku = true;
          } else {
            //没有sku，直接加入购物车
            this.addCart(valueVoList[0].singleProductOuterId, this.count);
          }
        } else {
          Toast("没有找到指定商品信息");
        }
      });
    },
    //加入购物车
    addCart(onlinestoreSingleProductOuterId, count) {
      this.$fetchPost("/order/mobile/tenantCart/insert", {
        storeOutId: Cfg.mainStoreId,
        onlinestoreSingleProductOuterId,
        count
      }).then(res => {
        if (count > 0) {
          // wx.showToast({
          //   title: "添加成功",
          //   icon: "none",
          // });
          // 购物车的缓存管理
          // cartUtil.del(onlinestoreSingleProductOuterId);
          // 购物车动画
          // if (this.isTabPage) {
          //   const shoppingAnimate = this.selectComponent("#shoppingAnimate");
          //   if (shoppingAnimate) shoppingAnimate.start(this.data.buyEvent);
          // }
        }

        this.$emit("handleSelectSkuCallback", {
          goodsDetail: this.goodsDetail,
          chooseInfo: this.chooseInfo,
          count: this.count
        });

        this.showSku = false;
      });
    },
    //更新sku的选中信息
    handleUpdateChooseInfo(chooseInfo) {
      this.chooseInfo = chooseInfo;
    },
    //点击遮罩后，点击页面
    handleCloseSku() {
      this.showSku = false;
      this.$emit("handleSelectSkuCallback");
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

      //加入购物车
      this.addCart(sku.singleProductOuterId, num);
    },
    //显示sku
    handleOpenSku() {
      this.showSku = true;
    }
  }
};
</script>
