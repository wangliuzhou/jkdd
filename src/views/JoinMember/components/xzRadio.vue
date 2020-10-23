<template>
  <div class="radio-wrap">
    <div
      :class="value === '1' ? 'radio-item active' : 'radio-item'"
      @click="onChange('1')"
    >
      男
    </div>
    <div
      :class="value === '0' ? 'radio-item active' : 'radio-item'"
      @click="onChange('0')"
    >
      女
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "1"
    };
  },
  methods: {
    onChange(e) {
      if (e === this.value) return;
      this.value = e;
      this.$emit("onChange", e);
    }
  }
};
</script>
<style lang="less" scoped>
.radio-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .radio-item {
    text-align: center;
    line-height: 28px;
    width: 55px;
    height: 28px;
    border-radius: 14px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606266;
    background: #f6f6f6;
    margin-right: 14px;
    box-sizing: border-box;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      background: #ffe9d9;
      border: 1px solid #ff6a00;
      color: #ff6a00;
    }
  }
}
</style>
