<template>
  <div v-if="showAddTagInput">
    <div class="wrapper">
      <div class="content" @click.stop>
        <div class="title">添加标签</div>
        <div class="input-box">
          <input v-model="inputValue" placeholder="请输入标签名" />
        </div>
        <div class="btn-box">
          <div class="cancel" @click="toggleAddstatus">取消</div>
          <div class="confirm" @click="handleConfirm">确定</div>
        </div>
      </div>
    </div>
    <div class="mask" @click="toggleAddstatus"></div>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  props: {
    showAddTagInput: Boolean,
    tapAddTagBtn: Function,
    hanleClcikConfirmBtn: Function
  },
  components: {},
  data() {
    return { inputValue: "" };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toggleAddstatus() {
      this.$emit("tapAddTagBtn");
    },
    formatter(value) {
      // 过滤输入的数字
      return value.replace(/\d/g, "");
    },
    handleConfirm() {
      if (this.inputValue) {
        this.$emit("hanleClcikConfirmBtn", this.inputValue);
        this.inputValue = "";
        return;
      }
      Toast("请输入标签名");
    }
  }
};
</script>
<style lang="less" scoped>
/* @import url(); 引入css类 */
.mask {
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.wrapper {
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    width: 280px;
    height: 185px;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
      width: 256px;
      height: 25px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 25px;
      margin-top: 24px;
    }
    .input-box {
      flex: 1;
      display: flex;
      align-items: center;
      input {
        width: 256px;
        background: #f0f0f0;
        border-radius: 18px;
        display: flex;
        align-items: center;
        height: 36px;
        border: none;
        padding: 0 16px;
        box-sizing: border-box;
      }
    }
    .btn-box {
      display: flex;
      height: 49px;
      align-items: center;
      border-top: 1px solid #e5e5e5;
      width: 100%;
      div {
        width: 50%;
        text-align: center;
        height: 49px;
        line-height: 49px;
        font-family: PingFangSC-Regular, PingFang SC;
      }
      .cancel {
        font-size: 15px;
        font-weight: 400;
        color: #999999;
      }
      .confirm {
        border-left: 1px solid #e5e5e5;
        font-size: 18px;
        font-weight: 600;
        color: #ff6a00;
      }
    }
  }
}
</style>
