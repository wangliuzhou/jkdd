<template>
  <div
    :class="{
      hasScroll: column >= 3
    }"
  >
    <div :class="`coupon-list-${column}`">
      <div
        v-for="couponItem in list"
        :key="couponItem.marketingCouponOuterId"
        :class="[
          `coupon-item-type-${item.cardType}-${column}`,
          {
            enabled: couponItem.status == 0,
            disabled: couponItem.status != 0
          }
        ]"
        @click="receiveCoupon(couponItem)"
      >
        <div class="left">
          <span class="price">
            <template
              v-if="
                couponItem.marketingCouponType == 0 ||
                  couponItem.marketingCouponType == 1
              "
            >
              <span class="integer">{{ couponItem.integer }}</span>
              <span class="decimal" v-if="couponItem.decimal"
                >.{{ couponItem.decimal }}</span
              >
              <span>{{
                couponItem.marketingCouponType == 0 ? "元" : "折"
              }}</span>
            </template>
            <template v-if="couponItem.marketingCouponType == 2">
              <span class="section"
                >{{ couponItem.marketingCouponRandomStart }}-{{
                  couponItem.marketingCouponRandomEnd
                }}</span
              >
            </template>
          </span>
        </div>
        <div class="right">
          <div class="name">{{ couponItem.marketingCouponName }}</div>
          <div class="desc">{{ couponItem.discountsContent }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import account, { login } from "@/utils/account";
import Cfg from "@/config/index";

export default {
  props: ["item"],
  computed: {
    column() {
      return Math.min(this.item.coupons.length, 3);
    },
    list() {
      let { item } = this;
      if (item && item.coupons) {
        return item.coupons.map(coupon => {
          let integer, decimal;
          //优惠券类型 0满减券 1折扣券 2随机金额券
          if (coupon.marketingCouponType == 0) {
            if (
              coupon.marketingCouponDeductionAmount ==
              parseInt(coupon.marketingCouponDeductionAmount)
            ) {
              integer = parseInt(coupon.marketingCouponDeductionAmount);
            } else {
              integer = Math.floor(coupon.marketingCouponDeductionAmount);
              decimal = (
                parseFloat(coupon.marketingCouponDeductionAmount) + ""
              ).split(".")[1];
            }
          } else if (coupon.marketingCouponType == 1) {
            if (
              coupon.marketingCouponDiscount ==
              parseInt(coupon.marketingCouponDiscount)
            ) {
              integer = parseInt(coupon.marketingCouponDiscount * 10);
            } else {
              integer = Math.floor(coupon.marketingCouponDiscount * 10);
              decimal = (coupon.marketingCouponDiscount * 10 - integer)
                .toFixed(2)
                .split(".")[1];
            }
          }
          return { ...coupon, integer, decimal };
        });
      }
      return [];
    }
  },
  methods: {
    receiveCoupon(item) {
      if (!account.isLogin) {
        return login();
      }
      return this.$fetchGet("/apply/mobile/tenantMarketingCoupon/getCoupon", {
        marketingCouponOuterId: item.marketingCouponOuterId,
        storeOuterId: Cfg.mainStoreId
      }).then(() => {
        Toast("领取成功");
      });
    }
  }
};
</script>
<style lang="less" scoped>
.hasScroll {
  overflow-y: auto;
}
.coupon-list-1 {
  background: white;
  padding: 12px 0px 12px 12px;
  color: white;
  .coupon-item-type-1-1,
  .coupon-item-type-2-1,
  .coupon-item-type-3-1 {
    flex: 0 0 351px;
    width: 351px;
    height: 61px;
    display: flex;
    &.coupon-item-type-1-1.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/1-1.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-2-1.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/2-1.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-3-1.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/3-1.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-1-1.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/1-1.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-2-1.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/2-1.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-3-1.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/3-1.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    .left {
      flex: 0 0 98px;
      display: flex;
      align-items: center;
      justify-content: center;
      .price {
        white-space: nowrap;
        font-size: 13px;
        .integer {
          font-size: 30px;
        }
        .decimal {
        }
      }
    }
    .right {
      flex: auto;
      min-width: 0;
      padding: 0 7px;
      padding-top: 11px;
      .name {
        font-size: 15px;
        line-height: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .desc {
        font-size: 13px;
        line-height: 19px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .coupon-item-type-4-1 {
    flex: 0 0 170px;
    width: 170px;
    height: 95px;
    &.coupon-item-type-4-1.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/1-4.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-4-1.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/1-4.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 36px;
      height: 36px;
      padding-top: 15px;
      .price {
        white-space: nowrap;
        font-size: 13px;
        .integer {
          font-size: 30px;
        }
        .decimal {
        }
      }
    }
    .right {
      text-align: center;
      padding: 0 10px;
      padding-top: 3px;
      .name {
        font-size: 15px;
        line-height: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .desc {
        font-size: 13px;
        line-height: 19px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.coupon-list-2 {
  background: white;
  padding: 12px 0px 12px 12px;
  color: white;
  display: flex;
  .coupon-item-type-1-2,
  .coupon-item-type-2-2,
  .coupon-item-type-3-2 {
    flex: 0 0 170px;
    width: 170px;
    height: 61px;
    display: flex;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &.coupon-item-type-1-2.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/1-2.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-2-2.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/2-2.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-3-2.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/3-2.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-1-2.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/1-2.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-2-2.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/2-2.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-3-2.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/3-2.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    .left {
      flex: 0 0 63px;
      display: flex;
      align-items: center;
      justify-content: center;
      .price {
        white-space: nowrap;
        font-size: 13px;
        .integer {
          font-size: 18px;
        }
        .section {
          font-size: 15px;
        }
        .decimal {
        }
      }
    }
    .right {
      flex: auto;
      min-width: 0;
      padding: 0 7px;
      padding-top: 11px;
      .name {
        font-size: 15px;
        line-height: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .desc {
        font-size: 13px;
        line-height: 19px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .coupon-item-type-4-2 {
    flex: 0 0 170px;
    min-width: 0;
    height: 95px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &.coupon-item-type-4-2.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/1-4.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-4-2.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/1-4.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 32px;
      height: 32px;
      padding-top: 12.5px;
      .price {
        white-space: nowrap;
        font-size: 20px;
        .integer {
          font-size: 30px;
        }
        .decimal {
        }
      }
    }
    .right {
      text-align: center;
      padding: 0 10px;
      padding-top: 3px;
      .name {
        font-size: 15px;
        line-height: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .desc {
        font-size: 13px;
        line-height: 19px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.coupon-list-3 {
  background: white;
  padding: 12px;
  color: white;
  display: flex;
  flex-wrap: nowrap;
  .coupon-item-type-1-3,
  .coupon-item-type-2-3,
  .coupon-item-type-3-3 {
    flex: 0 0 160px;
    width: 160px;
    height: 61px;
    display: flex;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &.coupon-item-type-1-3.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/1-3.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-2-3.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/2-3.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-3-3.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/3-3.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-1-3.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/1-3.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-2-3.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/2-3.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-3-3.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/3-3.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    .left {
      flex: 0 0 63px;
      display: flex;
      align-items: center;
      justify-content: center;
      .price {
        white-space: nowrap;
        font-size: 13px;
        .integer {
          font-size: 18px;
        }
        .decimal {
        }
      }
    }
    .right {
      flex: auto;
      min-width: 0;
      padding-left: 7px;
      padding-top: 11px;
      .name {
        font-size: 15px;
        line-height: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .desc {
        font-size: 13px;
        line-height: 19px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .coupon-item-type-4-3 {
    flex: 0 0 104px;
    width: 104px;
    height: 95px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
    &.coupon-item-type-4-3.enabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/enabled/4-1.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    &.coupon-item-type-4-3.disabled {
      background: url("https://frontassets.xzintl.com/xz-saas-wxapp/images/coupon/disabled/4-1.png")
        no-repeat center center;
      background-size: 100% 100%;
    }
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 36px;
      height: 36px;
      padding-top: 15px;
      .price {
        white-space: nowrap;
        font-size: 13px;
        .integer {
          font-size: 30px;
        }
        .decimal {
        }
      }
    }
    .right {
      text-align: center;
      padding: 0 8px;
      padding-top: 3px;
      .name {
        font-size: 15px;
        line-height: 21px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .desc {
        font-size: 13px;
        line-height: 19px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.coupon-wrap {
  text-align: left;
}
</style>
