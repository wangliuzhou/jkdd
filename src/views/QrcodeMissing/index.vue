<template>
  <div class="qrcode-missing">
    <img
      class="missing-qrcode"
      :src="require('@/assets/images/missing.png')"
      alt="missing"
    />
    <div class="remarks">暂无可分配的二维码~</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.qrcode-missing {
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  .missing-qrcode {
    margin-top: 157px;
    width: 157px;
    height: 125px;
  }
  .remarks {
    width: 150px;
    height: 21px;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 21px;
    margin-top: 22px;
  }
}
</style>
