<template>
  <div class="page-pay-result">
    <div class="pay-result">
      <div class="result-icon">
        <IconFont
          type="iconzhifuchenggong"
          fontStyle="font-size:136rpx;color:#15C669;"
        />
      </div>
      <div class="result-text">订单支付成功</div>
      <div class="pay-info">
        微信支付
        <span>¥{{ price * 1 }}</span>
      </div>
      <div class="result-btns">
        <button class="show-order-btn" bind:tap="goOrderList">查看订单</button>
        <button class="go-index-btn" bind:tap="goHome">回到首页</button>
      </div>
    </div>

    <div class="tip">
      <div class="tip-title">
        <IconFont
          type="icontishi"
          fontStyle="font-size:24rpx;color:#C0C4CC;margin-right:8rpx;"
        />温馨提示：
      </div>
      <div class="tip-content">
        象征科技不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作。
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    price: {
      type: Number
    }
  },
  methods: {
    goOrderList() {
      this.$push("/orderList");
    },
    goHome() {
      this.$push("/");
    }
  }
};
</script>
<style lang="less" scoped>
.pay-result {
  width: 363px;
  height: 267.5px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 8px;
  text-align: center;
  .result-icon {
    padding-top: 33px;
  }
  .result-text {
    margin-top: 12px;
    font-size: 15px;
    line-height: 1;
  }
  .pay-info {
    color: #333333;
    margin-top: 25px;
    font-size: 18px;
    line-height: 1;
    span {
      color: #ff6a00;
      margin-left: 16px;
    }
  }
  .result-btns {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      width: 100px;
      height: 40px;
      line-height: 40px;
      margin: 0;
      padding: 0;
      text-align: center;
      margin-right: 60px;
      border-radius: 20px;
      font-size: 15px;
      border: none;
      &:last-child {
        margin-right: 0;
      }
      &.show-order-btn {
        border: 1px solid #ff6a00;
        color: #ff6a00;
        background: white;
      }
    }
  }
}
.tip {
  margin-top: 16px;
  color: #999999;
  padding: 0 14px;
  font-size: 12px;
  .tip-title {
  }
  .tip-content {
    margin-top: 4.5px;
    line-height: 16.5px;
  }
}
</style>
