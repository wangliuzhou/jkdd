<template>
  <div class="countdown-wrap">
    <div class="time">01</div>
    <div class="separator">:</div>
    <div class="time">02</div>
    <div class="separator">:</div>
    <div class="time">03</div>
  </div>
</template>
<script>
export default {
  props: ["detail"],
  data: () => {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.countdown-wrap {
  position: absolute;
  right: 6px;
  bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: start;
  .time {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #ff6a00;
    border-radius: 5px;
    font-size: 11px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 20px;
    text-align: center;
  }

  .separator {
    margin: 0 5px;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff6a00;
    line-height: 20px;
  }
}
</style>
