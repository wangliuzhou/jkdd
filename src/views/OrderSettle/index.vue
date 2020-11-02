<template>
  <div class="page-order-settle">
    <template v-if="orderInfo">
      <ChooseAddress
        :addressInfo="addressInfo"
        :skuIds="skuIds"
        :skuNums="skuNums"
      />
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
              :style="`background-image:url(${$ali(item.mainCover, 200)})`"
            ></div>
            <div class="goods-info">
              <div class="goods-title">{{ item.dealerProductName }}</div>
              <div class="goods-desc" v-if="item.attrText">
                {{ item.attrText }}
              </div>
              <div class="goods-price">¥{{ item.retailPrice * 1 }}</div>
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
          <div class="right">¥{{ orderInfo.totalPrice * 1 }}</div>
        </div>
        <div class="price-item coupon">
          <div class="left">优惠券</div>
          <ChooseCoupon
            :text="couponText"
            :skuIds="skuIds"
            :skuNums="skuNums"
            :couponId="couponId"
            @handleChooseCoupon="handleChooseCoupon"
          />
        </div>
        <div class="price-item">
          <div class="left">运费</div>
          <div class="right">¥{{ orderInfo.allFreightPrice * 1 }}</div>
        </div>
        <div class="price-item">
          <div class="left">合计</div>
          <div class="right">¥{{ orderInfo.actuallyPaid * 1 }}</div>
        </div>
        <div class="price-item ly">
          <div class="left">留言</div>
          <div class="right">
            <input
              placeholder="选填，请在此处添加您的留言"
              v-model="userMessage"
            />
          </div>
        </div>
      </div>

      <div class="bottom-bar">
        <div class="price-wrap">
          <span class="desc">应付金额：</span>
          <span class="price">¥{{ orderInfo.actuallyPaid * 1 }}</span>
        </div>
        <button @click="handleCommit" :disabled="global.loading">
          提交订单
        </button>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Toast } from "vant";
import Cfg from "@/config/index";
import ChooseAddress from "./components/ChooseAddress";
import ChooseCoupon from "./components/ChooseCoupon";

export default {
  props: {
    skuIds: String,
    skuNums: String,
    addressId: Number,
    couponId: String,
    seckillActivityId: String,
    fromCart: Boolean
  },
  components: {
    ChooseAddress,
    ChooseCoupon
  },
  data() {
    return {
      addressInfo: null,
      orderInfo: null,
      couponInfo: null,
      userMessage: ""
    };
  },
  computed: {
    ...mapState({
      global: "global"
    }),
    skus() {
      let { skuIds, skuNums } = this;
      skuIds = skuIds.split(",");
      skuNums = skuNums.split(",");
      return skuIds.map((skuId, i) => {
        return {
          onlineStoreSingleProductOutId: skuId,
          onlineStoreSingleProductOrderCount: Number(skuNums[i])
        };
      });
    },
    couponText(data) {
      let { orderInfo } = this;
      if (orderInfo) {
        if (orderInfo.discountPrice) {
          // 如果存在折扣金额，说明已经选择了优惠券
          return "- ¥" + orderInfo.discountPrice * 1;
        } else if (orderInfo.couponCount) {
          // 没有选择优惠券，但是有可用优惠券
          return `${orderInfo.couponCount}张可用`;
        }
      }
      return "暂无可用";
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    ...mapActions({
      setLoading: "global/setLoading"
    }),
    loadData() {
      let { addressId, addressInfo } = this;
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
      this.setLoading(true);
      return this.$fetchGet(
        "/order/mobile/tenantUserReceivingAddress/findUserReceivingAddressById",
        {
          userReceivingAddressId: this.addressId
        }
      )
        .then(({ data }) => {
          if (data) {
            this.addressInfo = data;
          }
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
    //获取默认收货地址
    loadDefaultAddress() {
      this.setLoading(true);
      return this.$fetchPost(
        "/order/mobile/tenantUserReceivingAddress/findUserReceivingAddressIsDefault",
        {
          storeOutId: Cfg.mainStoreId,
          onlineStoreSingleProductOutIdList: this.skus
        }
      )
        .then(({ data }) => {
          if (data) {
            this.addressInfo = data;
          }
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
    //加载价格信息
    loadOrderInfo() {
      let { addressInfo, couponId, seckillActivityId, skus } = this;
      this.setLoading(true);
      this.$fetchPost("/order/mobile/tenantOrder/checkOrderPage", {
        storeOutId: Cfg.mainStoreId,
        consigneeAddressId: addressInfo
          ? addressInfo.userReceivingAddressId
          : null,
        onlineStoreSingleProductOutIdList: skus,
        // 优惠券id
        couponOutId: couponId || null,
        // 秒杀活动id
        seckillActivityId: seckillActivityId || null
      })
        .then(({ data }) => {
          this.orderInfo = data;
        })
        .catch(({ message }) => {
          Toast({ position: "bottom", message: message || "请求失败～" });
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
    //提交订单
    handleCommit() {
      let {
        addressInfo,
        couponId,
        orderInfo,
        skus,
        seckillActivityId,
        fromCart,
        userMessage
      } = this;

      if (!addressInfo) {
        return Toast({ position: "bottom", message: "请选择收货地址" });
      }

      let postUrl,
        postData = {
          storeOutId: Cfg.mainStoreId,
          consigneeAddressId: addressInfo
            ? addressInfo.userReceivingAddressId
            : null,
          onlineStoreSingleProductOutIdList: skus,
          actuallyPaid: orderInfo.actuallyPaid,
          fromCart,
          userMessage
        };

      //秒杀
      if (seckillActivityId) {
        postUrl = "/order/mobile/tenantOrder/secKillOrder";
        postData.seckillActivityId = seckillActivityId;
      } else {
        postUrl = "/order/mobile/tenantOrder/createOrder";
        postData.couponOutId = couponId || null;
      }

      this.setLoading(true);
      this.$fetchPost(postUrl, postData)
        .then(() => {
          this.$push({
            path: `/payResult?price=${orderInfo.actuallyPaid}`
          });
        })
        .catch(({ message }) => {
          return Toast({ position: "bottom", message });
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
    //支付成功通知服务端
    updateOrderStatus(orderOutId) {
      this.$fetchGet("/order/mobile/tenantOrder/updateOrderStatus", {
        orderOutId
      }).then(() => {});
    },
    // 选择完优惠券回调
    handleChooseCoupon(couponId) {
      this.$replace({
        path: this.$route.path,
        query: { ...this.$route.query, couponId }
      });
    }
  },
  watch: {
    // 选择完优惠券重新加载订单信息
    couponId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadOrderInfo();
      }
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
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
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
    &.coupon {
      .right {
        color: #cccccc;
        .price {
          color: #ff6a00;
          margin-right: 5px;
          &.no-coupon {
            color: #949496;
          }
        }
      }
    }
    &.ly {
      .right {
        display: flex;
        align-items: center;
        flex: 0 0 290px;
        text-align: left;
        input {
          font-size: 13px;
          width: 100%;
          height: 100%;
          margin: 0;
          height: 33px;
          line-height: 33px;
          border: none;
          outline: none;
        }
      }
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
    font-size: 15px;
    border: none;
    &[disabled] {
      background: #ff6a00;
      color: white;
      opacity: 0.5;
    }
  }
}
</style>
