<template>
  <div class="page-order-settle">
    <template v-if="orderInfo">
      <ChooseAddress :addressInfo="addressInfo" />
      <div class="shop-list">
        <div class="shop-title">{{ orderInfo.storeName }}</div>
        <div class="goods-list">
          <div
            class="goods-item"
            v-for="(item, i) in orderInfo.onLineStoreSingleProductList"
            :key="i"
          >
            <div
              class="goods-img"
              :style="`background-image:url(${item.mainCover})`"
            ></div>
            <div class="goods-info">
              <div class="goods-title">{{ item.dealerProductName }}</div>
              <div class="goods-desc">{{ item.attrText }}</div>
              <div class="goods-price">¥{{ item.retailPrice }}</div>
            </div>
            <div class="goods-number">
              x
              <span>{{ item.count }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="price-info">
        <div class="price-item">
          <div class="left">商品金额</div>
          <div class="right">¥{{ orderInfo.totalPrice }}</div>
        </div>
        <div class="price-item">
          <div class="left">运费</div>
          <div class="right">¥{{ orderInfo.allFreightPrice }}</div>
        </div>
        <div class="price-item">
          <div class="left">合计</div>
          <div class="right">¥{{ orderInfo.actuallyPaid }}</div>
        </div>
      </div>

      <div class="bottom-bar">
        <div class="price-wrap">
          <span class="desc">应付金额：</span>
          <span class="price">¥{{ orderInfo.actuallyPaid }}</span>
        </div>
        <button @click="handleCommit">提交订单</button>
      </div>
    </template>
  </div>
</template>
<script>
import { Toast } from "vant";
import ChooseAddress from "./components/ChooseAddress";
export default {
  components: {
    ChooseAddress
  },
  data() {
    return {
      orderInfo: null,
      addressInfo: null
    };
  },
  computed: {
    skus() {
      let { skuIds, skuNums } = this.$attrs;
      skuIds = skuIds.split(",");
      skuNums = skuNums.split(",");
      return skuIds.map((skuId, i) => {
        return {
          onlineStoreSingleProductOutId: skuId,
          onlineStoreSingleProductOrderCount: Number(skuNums[i])
        };
      });
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      let {
        $attrs: { addressId },
        addressInfo
      } = this;
      if (addressInfo) {
        this.loadOrderInfo();
      } else if (addressId) {
        //通过id加载收货地址
        this.loadAddressById().then(() => {
          this.loadOrderInfo();
        });
      } else {
        //加载默认收货地址
        this.loadDefaultAddress().then(() => {
          this.loadOrderInfo();
        });
      }
    },
    //通过id加载收货地址
    loadAddressById() {
      return this.$fetchGet(
        "/order/mobile/tenantUserReceivingAddress/findUserReceivingAddressById",
        {
          userReceivingAddressId: this.addressId
        }
      ).then(({ data }) => {
        if (data) {
          this.addressInfo = data;
        }
      });
    },
    //获取默认收货地址
    loadDefaultAddress() {
      return this.$fetchGet(
        "/order/mobile/tenantUserReceivingAddress/findUserReceivingAddressIsDefault"
      ).then(({ data }) => {
        if (data) {
          this.addressInfo = data;
        }
      });
    },
    //加载价格信息
    loadOrderInfo() {
      let { addressInfo, skus } = this;
      this.$fetchPost("/order/mobile/tenantOrder/checkOrderPage", {
        storeOutId: "TSRORVZ17ZXD9",
        consigneeAddressId: addressInfo
          ? addressInfo.userReceivingAddressId
          : null,
        onlineStoreSingleProductOutIdList: skus
      })
        .then(({ data }) => {
          this.orderInfo = data;
        })
        .catch(({ message }) => {
          Toast({ position: "bottom", message: message || "请求失败～" });
        });
    },
    //提交订单
    handleCommit() {
      let { addressInfo, orderInfo, skus } = this;
      if (!addressInfo) {
        return Toast({ position: "bottom", message: "请选择收货地址" });
      }

      this.$fetchPost("/order/mobile/tenantOrder/createOrder", {
        storeOutId: "TSRORVZ17ZXD9",
        consigneeAddressId: addressInfo
          ? addressInfo.userReceivingAddressId
          : null,
        onlineStoreSingleProductOutIdList: skus,
        actuallyPaid: orderInfo.actuallyPaid
      })
        .then(() => {
          this.$push({
            path: `/payResult?price=${orderInfo.actuallyPaid}`
          });
        })
        .catch(({ message }) => {
          return Toast({ position: "bottom", message });
        });
    }
  }
};
</script>
<style lang="less" scoped>
page {
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  background: #f8f8f8;
  padding-bottom: calc(env(safe-area-inset-bottom) + 60px);
}
.shop-list {
  margin-top: 8px;
  border-radius: 8px 8px 0 0;
  background: white;
  .shop-title {
    height: 46px;
    line-height: 46px;
    font-size: 15px;
    border-bottom: 0.5px solid #f8f8f8;
    padding-left: 15px;
  }
  .goods-list {
    .goods-item {
      padding: 10px 0 10px 14px;
      display: flex;
      position: relative;
      .goods-img {
        flex: 0 0 80px;
        height: 80px;
        background: #f0f0f0;
        border-radius: 8px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
      }
      .goods-info {
        margin-left: 12px;
        // padding-top: 5px;
        position: relative;
        flex: auto;
        padding-right: 30px;
        .goods-title {
          font-size: 15px;
          line-height: 20px;
          max-height: 40px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .goods-desc {
          margin-top: 5px;
          font-size: 13px;
          line-height: 13px;
          color: #999999;
          white-space: wrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .goods-price {
          color: #ff6a00;
          font-size: 20px;
          line-height: 20px;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
      .goods-number {
        color: #ff6a00;
        font-size: 12px;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        span {
          font-size: 20px;
        }
      }
    }
  }
}

.price-info {
  margin-top: 8px;
  background: white;
  .price-item {
    height: 33px;
    line-height: 33px;
    display: flex;
    font-size: 13px;
    padding-left: 15px;
    padding-right: 10px;
    .left {
      color: #666666;
      flex: auto;
    }
    .right {
      color: #333333;
      flex: 0 0 100px;
      text-align: right;
    }
  }
}

.bottom-bar {
  background: white;
  height: 52px;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  border-top: 0.5px solid #f8f8f8;
  padding-bottom: env(safe-area-inset-bottom);
  .price-wrap {
    position: absolute;
    left: 15px;
    top: 17px;
    line-height: 21px;
  }
  .desc {
    font-size: 15px;
    color: #333333;
  }
  .price {
    color: #ff6a00;
    font-size: 18px;
  }
  button {
    position: absolute;
    right: 10px;
    top: 6px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    color: white;
    background: #ff6a00;
    border: none;
    font-size: 15px;
  }
}
</style>
