<template>
  <div>
    <div v-if="formatTime" class="countdown-wrap">
      <div class="time">{{ formatTime[0] }}</div>
      <div class="separator">:</div>
      <div class="time">{{ formatTime[1] }}</div>
      <div class="separator">:</div>
      <div class="time">{{ formatTime[2] }}</div>
    </div>
    <div
      v-if="calcActivityStatus !== 3"
      :class="`countdown-label ${isTree ? ' left-top' : ''}`"
    >
      {{
        calcActivityStatus === 1
          ? "距开始"
          : calcActivityStatus === 2
          ? "进行中"
          : ""
      }}
    </div>
  </div>
</template>
<script>
import { formatNumber } from "@/utils/index";
export default {
  props: ["endTime", "startTime", "currentTime", "isTree"],
  data: () => {
    return {
      remainingTime: 0
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
        return [day * 24 + hour, minu, sec].map(formatNumber);
      }
      return null;
    },
    calcActivityStatus(data) {
      let { endTime, startTime, currentTime } = this;
      if (endTime && startTime && currentTime) {
        let end = endTime.replace(/-/g, "/");
        let start = startTime.replace(/-/g, "/");
        // let current = currentTime.replace(/-/g, "/");

        const endTimeStamp = Date.parse(end);
        const startTimeStamp = Date.parse(start);
        const currentTimeStamp = currentTime;
        //未开始
        if (currentTimeStamp < startTimeStamp) {
          return 1;
        }
        // 进行中
        if (
          currentTimeStamp >= startTimeStamp &&
          currentTimeStamp < endTimeStamp
        ) {
          return 2;
        }
        // 已结束
        if (currentTimeStamp >= endTimeStamp) {
          return 3;
        }
      }
      return 3;
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
      let { endTime, startTime, currentTime } = this;
      if (endTime && startTime) {
        let end = endTime.replace(/-/g, "/");
        let start = startTime.replace(/-/g, "/");
        const endTimeStamp = Date.parse(end);
        const startTimeStamp = Date.parse(start);
        const currentTimeStamp = currentTime || new Date().getTime();
        //未开始
        if (currentTimeStamp < startTimeStamp) {
          return parseInt(startTimeStamp - currentTimeStamp);
        }
        // 进行中
        if (
          currentTimeStamp >= startTimeStamp &&
          currentTimeStamp < endTimeStamp
        ) {
          return parseInt(endTimeStamp - currentTimeStamp);
        }
        // 已结束
        if (currentTimeStamp >= endTimeStamp) {
          return 0;
        }
        return 0;
      }
      return 0;
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
    min-width: 19px;
    height: 19px;
    padding: 0 2px;
    background: #ff6a00;
    border-radius: 5px;
    font-size: 11px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 19px;
    text-align: center;
    box-sizing: border-box;
  }

  .separator {
    margin: 0 3px;
    font-size: 11px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff6a00;
    line-height: 19px;
  }
}

.countdown-label {
  position: absolute;
  left: 3px;
  bottom: 3px;
  width: 40px;
  height: 16px;
  background: #00000060;
  border-radius: 0 2px 2px 0;
  font-size: 11px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 16px;
  text-align: center;

  &.left-top {
    top: 0;
    left: 0;
  }
}
</style>
