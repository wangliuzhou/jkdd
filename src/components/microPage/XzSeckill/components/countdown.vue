<template>
  <div class="countdown-wrap">
    <div class="time">{{ formatTime[0] }}</div>
    <div class="separator">:</div>
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
  props: ["endTime"],
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
      let remainingTime = this.getCountDownNum();
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
    },
    getCountDownNum() {
      let { endTime } = this;
      if (endTime) {
        const endTimeStamp = Date.parse(endTime);
        const nowTimeStamp = new Date().getTime();
        const num = parseInt(endTimeStamp - nowTimeStamp);
        return num;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.countdown-wrap {
  position: absolute;
  right: 3px;
  bottom: 3px;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  .time {
    display: inline-block;
    width: 17px;
    height: 17px;
    background: #ff6a00;
    border-radius: 5px;
    font-size: 11px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 17px;
    text-align: center;
  }

  .separator {
    margin: 0 3px;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff6a00;
    line-height: 17px;
  }
}
</style>
