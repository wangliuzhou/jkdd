<template>
  <Sku
    v-if="showSku"
    :show.sync="showSku"
    :goodsDetail="goodsDetail"
    :chooseInfo="chooseInfo"
    @update-choose-info="handleUpdateChooseInfo"
    @close="handleCloseSku"
    @add-cart="addCart"
  >
    <div v-if="isTabPage" style="height:1.333rem"></div>
  </Sku>
</template>
<script>
import { Toast } from "vant";
import Cfg from "@/config/index";
import Sku from "./Sku";
import * as cartUtil from "@/utils/cart";
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
      goodsDetail: {},
      chooseInfo: {
        sku: null, //已选中的sku信息
        selectSkuAttr: null //选中的sku，map
      }
    };
  },
  methods: {
    initData({ dealerProductOutId, count }) {
      // 重置数据
      this.goodsDetail = {};
      this.chooseInfo = {
        sku: null, //已选中的sku信息
        selectSkuAttr: null //选中的sku，map
      };
      this.loadData({ dealerProductOutId, count });
    },
    // 获取商品详情 sku 信息
    loadData({ dealerProductOutId, count }) {
      this.$fetchGet("/mobile/tenantProduct/selectProductDetailById", {
        storeId: Cfg.mainStoreId,
        dealerProductOutId
      }).then(({ data }) => {
        Toast.clear();
        if (data && data.dealerProductJoinId) {
          const { valueVoList } = data;
          if (valueVoList.length > 1) {
            // 有sku，弹窗
            this.goodsDetail = data;
            this.showSku = true;
          } else {
            //没有sku，直接加入购物车
            this.addCart(valueVoList[0].singleProductOuterId, count).then(
              () => {
                this.$emit("select-sku-callback");
              }
            );
          }
        } else {
          Toast("没有找到指定商品信息");
        }
      });
    },
    //加入购物车
    addCart(onlinestoreSingleProductOuterId, count) {
      return this.$fetchPost("/order/mobile/tenantCart/insert", {
        storeOutId: Cfg.mainStoreId,
        onlinestoreSingleProductOuterId,
        count
      }).then(res => {
        if (count > 0) {
          // wx.showToast({
          //   title: "添加成功",
          //   icon: "none",
          // });
          //购物车的缓存管理
          cartUtil.del(onlinestoreSingleProductOuterId);
          // 购物车动画
          // if (this.isTabPage) {
          //   const shoppingAnimate = this.selectComponent("#shoppingAnimate");
          //   if (shoppingAnimate) shoppingAnimate.start(this.data.buyEvent);
          // }
        }
      });
    },
    //更新sku的选中信息
    handleUpdateChooseInfo(chooseInfo) {
      this.chooseInfo = chooseInfo;
    },
    //点击遮罩后，点击页面
    handleCloseSku() {
      this.showSku = false;
      this.$emit("select-sku-callback");
    }
  }
};
</script>
