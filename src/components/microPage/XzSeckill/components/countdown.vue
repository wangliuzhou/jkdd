<template>
  <div class="countdown-wrap">
    <div class="time">{{ formatTime[1] }}</div>
    <div class="separator">:</div>
    <div class="time">{{ formatTime[2] }}</div>
    <div class="separator">:</div>
    <div class="time">{{ formatTime[3] }}</div>
  </div>
</template>
<script>
import { formatNumber } from "@/utils/index";
export default {
  props: ["detail"],
  data: () => {
    return {
      remainingTime: 2000000
    };
  },
  computed: {
    formatTime() {
      let { remainingTime } = this;
      remainingTime = remainingTime || 0;
      if (remainingTime) {
        let day = parseInt(remainingTime / (60 * 60 * 24 * 1000));
        let hour = parseInt((remainingTime / (60 * 60 * 1000)) % 24);
        let minu = parseInt((remainingTime / (60 * 1000)) % 60);
        let sec = parseInt((remainingTime / 1000) % 60);
        return [day, hour, minu, sec].map(formatNumber);
      }
      return [0, 0, 0, 0];
    }
  },
  mounted() {
    this.countDown();
  },
  methods: {
    countDown() {
      let { remainingTime } = this;
      remainingTime = remainingTime <= 0 ? 0 : remainingTime;
      //如果剩余倒计时小于等于0则不进行倒计时
      if (remainingTime <= 0) return;
      //设置初始值
      this.remainingTime = remainingTime;
      //开始倒计时
      this.timer = setInterval(() => {
        remainingTime = this.remainingTime - 1000;
        if (remainingTime <= 0) {
          //倒计时结束
          remainingTime = 0;
          clearInterval(this.timer);
        }
        this.remainingTime = remainingTime;
      }, 1000);
    }
  }
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
