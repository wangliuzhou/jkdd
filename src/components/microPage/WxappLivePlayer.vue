<template>
  <div class="live-player-container" v-if="roomInfo">
    <div class="live-player-left" :style="coverStyle"></div>
    <div class="live-player-right">
      <div class="live-player-title">{{ roomInfo.wxRoomName }}</div>
      <div class="live-player-time">
        {{ roomInfo.wxRoomStartTime + "-" + roomInfo.wxRoomEndTime }}
      </div>
      <div class="live-player-status" :class="statusClassName">
        {{ liveStatusStr }}
      </div>
    </div>
  </div>
</template>
<script>
import { LiveStatus } from "@/constant/index";
import { formatTime } from "@/utils/util";

export default {
  props: ["item"],
  computed: {
    //直播间信息
    roomInfo() {
      let { item } = this;
      if (item) {
        let {
          roomInfo,
          roomInfo: { wxRoomStartTime, wxRoomEndTime }
        } = item;
        return {
          ...roomInfo,
          wxRoomStartTime: formatTime(new Date(wxRoomStartTime)).substring(11),
          wxRoomEndTime: formatTime(new Date(wxRoomEndTime)).substring(11)
        };
      }
      return null;
    },
    //直播状态的样式
    statusClassName() {
      let { roomInfo, liveStatus } = this;
      if (roomInfo) {
        let { wxRoomStatus } = roomInfo;
        return `live-player-status-${liveStatus || wxRoomStatus}`;
      }
      return "";
    },
    //直播状态字符串
    liveStatusStr() {
      let { roomInfo, liveStatus } = this;
      if (roomInfo) {
        let { wxRoomStatus } = roomInfo;
        return LiveStatus[liveStatus || wxRoomStatus];
      }
      return "直播中";
    },
    coverStyle() {
      let { roomInfo } = this;
      if (roomInfo) {
        let { wxRoomCoverImg } = roomInfo;
        return `background-image: url(${wxRoomCoverImg})`;
      }
      return "";
    }
  }
};
</script>
<style lang="less" scoped>
.live-player-container {
  display: flex;
  padding: 8px 10px;
  .live-player-left {
    flex: 0 0 104px;
    height: 104px;
    border-radius: 8px;
    background: #d8d8d8;
  }
  .live-player-right {
    flex: auto;
    margin-left: 8px;
    position: relative;
    padding-top: 8px;
    .live-player-title {
      font-size: 15px;
      color: #333;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 21px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .live-player-time {
      margin-top: 5px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999;
    }
    .live-player-status {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #606266;
      position: absolute;
      bottom: 5px;
      left: 0;
      padding-left: 15px;
      display: inline-block;
      height: 19px;
      line-height: 19px;
      background: #f6f6f6;
      border-radius: 10px;
      padding-right: 6px;
      &:after {
        content: "";
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        border-radius: 100%;
        background: #15c669;
        font-size: 12px;
      }
      &.live-player-status-101 {
        &:after {
          background: #15c669;
        }
      }
      &.live-player-status-102,
      &.live-player-status-103,
      &.live-player-status-107 {
        &:after {
          background: #c0c4cc;
        }
      }
      &.live-player-status-105 {
        &:after {
          background: #ffa016;
        }
      }
      &.live-player-status-104,
      &.live-player-status-106 {
        &:after {
          background: #f24e1f;
        }
      }
    }
  }
}
</style>
