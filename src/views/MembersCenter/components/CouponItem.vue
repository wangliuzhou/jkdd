<template>
  <div class="coupon-item">
    <div class="left">
      <div class="price-box">
        <template v-if="item.marketingCouponType === 0">
          <span class="unit">¥</span>
          <span class="num">{{ item.marketingCouponDeductionAmount }}</span>
        </template>
        <template v-if="item.marketingCouponType === 1">
          <span class="num">{{ item.marketingCouponDiscount * 100 }}</span>
          <span class="unit">折</span>
        </template>
        <template v-if="item.marketingCouponType === 2">
          <span class="num" style="font-size:35rpx"
            >{{ item.marketingCouponRandomStart }}~{{
              item.marketingCouponRandomStart
            }}</span
          >
        </template>
      </div>
      <div class="remarks">
        {{
          item.marketingCouponType === 0
            ? "满减券"
            : item.marketingCouponType === 1
            ? "折扣券"
            : "随机金额券"
        }}
      </div>
    </div>
    <div class="right">
      <div class="title">{{ item.marketingCouponName }}</div>
      <div class="remarks">{{ item.marketingCouponNameRemark }}</div>
      <div class="coupon-num">x{{ item.count }}</div>
      <div class="right-top-bg"></div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  components: {},
  props: {
    item: {
      type: Object,
      value: {}
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>
<style lang="less" scoped>
.coupon-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 83px;
  background: linear-gradient(142deg, #fffdfa 0%, #fdecbd 100%);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}
.coupon-item .left {
  position: relative;
  width: 94px;
  height: 100%;
}
.coupon-item .left .price-box {
  text-align: center;
  margin-top: 23px;
}
.coupon-item .left .price-box .unit {
  width: 18px;
  height: 15px;
  font-size: 15px;
  font-family: AvenirLTStd-Heavy, AvenirLTStd;
  font-weight: 800;
  color: #ec3d40;
  line-height: 18px;
}
.coupon-item .left .price-box .num {
  font-size: 35px;
  font-family: AvenirLTStd-Black, AvenirLTStd;
  font-weight: 900;
  color: #ec3d40;
  line-height: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.coupon-item .left .remarks {
  text-align: center;
  height: 15px;
  font-size: 11px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #b87c41;
  line-height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.coupon-item .left::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  background: #df1e25;
  border-radius: 50%;
  transform: translate(50%, -50%);
  z-index: 2;
}
.coupon-item .left::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  background: #df1e25;
  border-radius: 50%;
  transform: translate(50%, 50%);
  z-index: 2;
}
.coupon-item .right {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  height: 100%;
  border-left: 1px dashed #b87c41;
  padding-left: 16px;
}
.coupon-item .right .title {
  height: 21px;
  font-size: 15px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #b87c41;
  line-height: 21px;
}
.coupon-item .right .remarks {
  margin-top: 8px;
  height: 18px;
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #b87c41;
  line-height: 18px;
}
.coupon-item .right .right-top-bg {
  position: absolute;
  right: 0;
  top: 0;
  width: 70px;
  height: 70px;
  background: #feecbd;
  border-radius: 50%;
  transform: translate(50%, -50%);
}
.coupon-item .right .coupon-num {
  position: absolute;
  right: 5px;
  top: 0;
  font-size: 15px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #b87c41;
  z-index: 2;
}
</style>
