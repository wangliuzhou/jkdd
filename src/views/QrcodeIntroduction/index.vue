<template>
  <div class="qrcode-introduction-page">
    <div class="qrcode-wrap">
      <van-image class="qrcode-img" :src="groupInfo.activeQrcodeWxqroupPic" />
    </div>
    <div class="qrcode-introduction">
      <div class="item">
        <div class="label">
          <span class="icon"></span>
          <span class="text">创建人介绍</span>
        </div>
        <div class="value">{{ groupInfo.createuserIntro || "-" }}</div>
      </div>
      <div class="item">
        <div class="label">
          <span class="icon"></span>
          <span class="text">创建人介绍</span>
        </div>
        <div class="value">{{ groupInfo.wxqroupIntro || "-" }}</div>
      </div>
    </div>
    <div class="join-btn" @click="onJoin">立即加入</div>
  </div>
</template>
<script>
import api from "./api";
export default {
  data() {
    return {
      groupInfo: {}
    };
  },
  components: {},
  mounted() {
    if (this.$route.query.activeQrcodeOuterId) {
      this.getGroupInfo(this.$route.query.activeQrcodeOuterId);
    }
  },
  methods: {
    onJoin() {
      this.getActiveQrcodeById();
    },
    // 获取群活码介绍
    getGroupInfo(activeQrcodeOuterId) {
      this.$fetchGet(api.getGroupActiveQrcode, {
        activeQrcodeOuterId: activeQrcodeOuterId
      }).then(({ data }) => {
        this.groupInfo = data;
      });
    },
    // 获取二维码详情
    getActiveQrcodeById() {
      this.$fetchGet(api.getActiveQrcodeById, {
        activeQrcodeOuterId: this.groupInfo.activeQrcodeOuterId,
        userMark: 1
      }).then(({ data }) => {
        if (data) {
          this.goQrcodeDetail();
        } else {
          this.goQrcodeMissing();
        }
      });
    },
    goQrcodeMissing() {
      this.$router.push({ path: "/qrcodeMissing" });
    },
    goQrcodeDetail() {
      this.$router.push({
        path: `/qrcodeDetail?activeQrcodeOuterId=${this.groupInfo.activeQrcodeOuterId}`
      });
    }
  }
};
</script>
<style lang="less" scoped>
.qrcode-introduction-page {
  overflow: hidden;
  .qrcode-wrap {
    width: 335px;
    height: 335px;
    background: rgba(216, 216, 216, 1);
    margin: 20px auto;
    .qrcode-img {
      width: 100%;
      height: 100%;
    }
  }
  .qrcode-introduction {
    padding: 0 18px;
    box-sizing: border-box;
    .item {
      min-height: 88px;
      .label {
        display: flex;
        align-items: center;
        .icon {
          display: inline-block;
          width: 4px;
          height: 15px;
          background: rgba(255, 106, 0, 1);
          border-radius: 2px;
        }
        .text {
          height: 21px;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
          margin-left: 8px;
        }
      }
      .value {
        margin-top: 8px;
        margin-left: 12px;
        font-size: 13px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 19px;
      }
    }
  }
  .join-btn {
    margin: 20px;
    text-align: center;
    background: #ff6a00;
    height: 44px;
    line-height: 44px;
    font-size: 22px;
    border-radius: 8px;
    color: #fff;
  }
}
</style>
