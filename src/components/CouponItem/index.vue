<template>
  <div class="coupons-item" :class="getClass" @click="handleChooseCoupon">
    <IconFont
      type="iconjiaobiao"
      fontStyle="font-size:0.667rem;color:#FF6A00"
      class="icon-jiao-biao"
      v-if="getClass === 'active'"
    />
    <div class="content-or-rules">
      <div class="left-content">
        <div class="coupons-num">
          <div class="num">
            <span>{{ getInteger }}</span>
            <span style="font-size:0.4rem">{{ getDecimal }}</span>
          </div>
          <div class="unit">
            {{ item.marketingCouponType === 1 ? "折" : "元" }}
          </div>
        </div>
        <div class="item-remarks" v-if="item.marketingCouponThreshold">
          {{
            item.marketingCouponThreshold === -1
              ? "无门槛"
              : "满" + item.marketingCouponThreshold + "元可用"
          }}
        </div>
      </div>
      <div class="right-content">
        <div class="item-title">{{ item.marketingCouponName }}</div>
        <div class="validity-date">
          有效期: {{ item.startTimeCh }}-{{ item.endTimeCh }}
        </div>
      </div>
    </div>

    <div v-if="invalid === 1" class="rules-detail">
      <div v-for="(it, index) in item.notUseReason" :key="index">{{ it }}</div>
    </div>

    <img
      v-if="invalid === 1"
      class="invalid-img"
      :src="$ali(getImageSrc, 136)"
      alt=""
    />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    choosedId: {
      type: String,
      default: ""
    },
    invalid: {
      //0可用   1失效
      type: Number
    }
  },
  data() {
    return {
      showRulesDetail: false,
      couponNotCanUseUrl:
        "http://xz-front-assets.oss-cn-hangzhou.aliyuncs.com/xz-saas-wxapp/images/coupon/coupon_not_can_use.png",
      couponUsedUrl:
        "http://xz-front-assets.oss-cn-hangzhou.aliyuncs.com/xz-saas-wxapp/images/coupon/coupon_used.png",
      couponInvalidUrl:
        "http://xz-front-assets.oss-cn-hangzhou.aliyuncs.com/xz-saas-wxapp/images/coupon/coupon_invalid.png"
    };
  },
  computed: {
    getImageSrc() {
      const {
        item,
        couponNotCanUseUrl,
        couponUsedUrl,
        couponInvalidUrl
      } = this;
      const endTime = item.marketingCouponEnd || 0;
      const nowTime = new Date().getTime();
      if (nowTime > endTime) {
        return couponInvalidUrl;
      } else if (item.marketingCouponStatus === 1) {
        return couponUsedUrl;
      } else {
        return couponNotCanUseUrl;
      }
    },
    getClass() {
      const { item, invalid, choosedId } = this;
      if (invalid === 1) {
        return "invalid";
      } else {
        return choosedId === item.userCouponOuterId ? "active" : "";
      }
    },
    getInteger() {
      const { item } = this;
      const couponNum =
        item.marketingCouponDeductionAmount ||
        item.marketingCouponDiscount * 10;
      return parseInt(couponNum);
    },
    getDecimal() {
      const { item } = this;
      const couponNum =
        item.marketingCouponDeductionAmount ||
        item.marketingCouponDiscount * 10;
      const decimal = (couponNum - parseInt(couponNum)).toFixed(2);
      return decimal.substr(1);
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleShowRulesDetail() {
      this.showRulesDetail = !this.showRulesDetail;
    },
    // 点击选择优惠券
    handleChooseCoupon() {
      if (this.invalid === 0) {
        this.$emit("handleChooseCoupon", this.item);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.coupons-item {
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 10px 0 12px 0;
  border: 1px solid #fff;
  margin-bottom: 10px;
  line-height: 1.3;
  .icon-jiao-biao {
    color: #ff6a00;
    position: absolute;
    right: -1px;
    top: -5px;
  }

  &::after {
    content: "";
    position: absolute;
    left: 31%;
    bottom: -1px;
    background: rgba(248, 248, 248, 1);
    width: 11px;
    height: 5.5px;
    border-radius: 11px 11px 0 0;
  }

  &::before {
    content: "";
    position: absolute;
    left: 31%;
    top: -1px;
    background: rgba(248, 248, 248, 1);
    width: 11px;
    height: 5.5px;
    border-radius: 0 0 11px 11px;
  }

  &.active {
    background: rgba(255, 246, 240, 1);
    border: 1px solid rgba(255, 106, 0, 1);

    &::before {
      border: 1px solid rgba(255, 106, 0, 1);
      border-top: 0;
    }

    &::after {
      border: 1px solid rgba(255, 106, 0, 1);
      border-bottom: 0;
    }
  }

  &.invalid {
    filter: grayscale(100%);
  }
  .content-or-rules {
    padding: 0 12px 0px 19.5px;
    box-sizing: border-box;
    position: relative;
    display: flex;
    width: 100%;

    .left-content {
      height: 100%;
      min-width: 31%;
      padding-bottom: 4px;
      .coupons-num {
        height: 100%;
        color: rgba(255, 106, 0, 1);
        font-weight: 500;
        display: flex;
        align-items: baseline;
        .num {
          margin-bottom: 2px;
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
        }

        .unit {
          font-size: 13px;
          font-family: PingFangHK-Medium, PingFangHK;
        }
      }
      .item-remarks {
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
    }

    .right-content {
      margin-left: 18px;
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding-top: 8px;
      .item-title {
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #666666;
        margin-bottom: 8px;
      }
      .validity-date {
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
    }
  }
  .rules-detail {
    border-top: 1px dashed #ff6a00;
    margin-top: 8px;
    padding-top: 8px;
    padding-left: 19.5px;
    box-sizing: border-box;
    border-color: #cccccc;
    view {
      line-height: 20px;
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(144, 147, 153, 1);
    }
  }
  .invalid-img {
    width: 68px;
    height: 64px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
