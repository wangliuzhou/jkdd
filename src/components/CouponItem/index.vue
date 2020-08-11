<template>
  <div
    :class="[
      { active: activeIndex === index },
      { invalid: invalid === 1 },
      'coupons-item'
    ]"
    @click="handleClickCouponItem(index)"
  >
    <div class="left-content">
      <div class="coupons-num">
        <span class="num">
          {{
            item.marketingCouponDeductionAmount ||
              item.marketingCouponDiscount * 100
          }}
        </span>
        <span class="unit">{{
          item.marketingCouponType === 1 ? "折" : "元"
        }}</span>
      </div>
      <div class="coupons-type">
        {{ ["满减券", "折扣券", "随机金额券"][item.marketingCouponType] }}
      </div>
    </div>
    <div class="right-content">
      <div class="item-title">{{ item.marketingCouponName }}</div>
      <div class="item-remarks">{{ item.marketingActivityName }}</div>
      <div class="item-footer">
        <div class="validity-date">
          有效期: {{ item.startTimeCh }}-{{ item.endTimeCh }}
        </div>
        <div class="item-rule">规则详情</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    activeIndex: {
      type: Number,
      default: -1
    },
    index: {
      type: Number
    },
    invalid: {
      //0不失效   1失效
      type: Number
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    // 点击完成
    handleClickCouponItem(index) {
      this.$emit("handleClickCouponItem", index);
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.coupons-item {
  position: relative;
  display: flex;
  width: 100%;
  height: 113px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  box-sizing: border-box;
  padding: 12px 12px 10px 16px;
  border: 1px solid #fff;
  margin-bottom: 20px;
  .left-content {
    height: 100%;
    min-width: 80px;
    padding-top: 5px;
    .coupons-num {
      height: 42px;
      color: rgba(255, 106, 0, 1);
      text-align: center;
      font-weight: 500;

      .num {
        font-size: 20px;
        font-weight: 800;
        font-family: PingFangSC-Medium, PingFang SC;
        line-height: 42px;
      }

      .unit {
        height: 19px;
        font-size: 13px;
        font-family: PingFangHK-Medium, PingFangHK;
        font-weight: 500;
        line-height: 19px;
      }
    }

    .coupons-type {
      height: 15px;
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 15px;
      text-align: center;
    }
  }

  .right-content {
    margin-left: 12px;
    flex: 1;

    .item-title {
      max-width: 260px;
      height: 21px;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      line-height: 21px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }

    .item-remarks {
      max-width: 260px;
      height: 19px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 19px;
      margin-top: 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: break-all;
    }

    .item-footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 22px;

      .validity-date {
        height: 15px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 15px;
      }

      .item-rule {
        height: 15px;
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 15px;
      }
    }
  }

  &::after {
    content: "";
    position: absolute;
    left: 95px;
    bottom: -1px;
    background: rgba(248, 248, 248, 1);
    width: 11px;
    height: 5px;
    border-radius: 11px 11px 0 0;
  }

  &::before {
    content: "";
    position: absolute;
    left: 95px;
    top: -1px;
    background: rgba(248, 248, 248, 1);
    width: 11px;
    height: 5px;
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
}
</style>
