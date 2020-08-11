<template>
  <div v-if="isShow" class="modal-page">
    <div class="modal-marks" @click="handleCancelModal"></div>
    <div class="modal-main">
      <div class="cancel" @click="handleCancelModal">x</div>
      <div class="title">兑换优惠码</div>
      <div class="body">
        <input
          class="input"
          placeholder-class="input-placeholder"
          placeholder="请输入兑换码"
          type="text"
          cursor-spacing="200"
        />
      </div>
      <div class="footer">
        <div class="btn-item exit" @click="handleCancelModal">取消</div>
        <div class="btn-item submit" @click="handleOk">兑换</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isShow: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleShowModal() {
      this.isShow = true;
    },
    handleCancelModal() {
      this.isShow = false;
    },
    handleOk() {}
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.modal-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  .modal-marks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 998;
  }

  .modal-main {
    position: absolute;
    left: 50%;
    top: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transform: translate(-50%, -50%);
    z-index: 999;
    width: 560rpx;
    height: 369rpx;
    background: rgba(255, 255, 255, 1);
    border-radius: 16rpx;
    box-sizing: border-box;

    .cancel {
      position: absolute;
      right: 20rpx;
      top: 10rpx;
      line-height: 28rpx;
    }

    .title {
      height: 50rpx;
      font-size: 36rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 50rpx;
      text-align: center;
      margin-top: 40rpx;
    }

    .body {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .input {
        width: 512rpx;
        height: 72rpx;
        background: rgba(240, 240, 240, 0.3);
        border-radius: 36rpx;
        padding: 0 30rpx;
        box-sizing: border-box;

        .input-placeholder {
          font-size: 32rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          text-align: center;
        }
      }
    }

    .footer {
      width: 100%;
      height: 98rpx;
      border-top: 1rpx solid rgb(229, 229, 229);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      .btn-item {
        height: 100%;
        width: 50%;
        text-align: center;
        line-height: 98rpx;

        &.exit {
          border-right: 1rpx solid rgb(229, 229, 229);
          font-size: 30rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }

        &.submit {
          font-size: 36rpx;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 106, 0, 1);
        }
      }
    }
  }
}
</style>
