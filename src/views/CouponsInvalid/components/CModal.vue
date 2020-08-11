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
import { Toast } from "vant";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    handleCancelModal() {
      this.$emit("handleToogleExchange");
    },
    handleOk() {
      //发出请求校验
      Toast("还未发出请求校验");
      this.$emit("handleToogleExchange");
    }
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
    width: 280px;
    height: 185px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    box-sizing: border-box;

    .cancel {
      position: absolute;
      right: 10px;
      top: 5px;
      font-size: 18px;
      color: #aaa;
    }

    .title {
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 25px;
      text-align: center;
      margin-top: 20px;
    }

    .body {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .input {
        width: 256px;
        height: 36px;
        background: rgba(240, 240, 240, 0.3);
        border-radius: 18px;
        padding: 0 15px;
        box-sizing: border-box;
        border: none;
        .input-placeholder {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          text-align: center;
        }
      }
    }

    .footer {
      width: 100%;
      height: 49px;
      border-top: 1px solid rgb(229, 229, 229);
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;

      .btn-item {
        height: 100%;
        width: 50%;
        text-align: center;
        line-height: 49px;

        &.exit {
          border-right: 1px solid rgb(229, 229, 229);
          font-size: 15px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }

        &.submit {
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 106, 0, 1);
        }
      }
    }
  }
}
</style>
