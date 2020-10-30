<template>
  <div class="qrcode-detail-page">
    <div v-if="!isMissing" class="qrcode-wrap">
      <van-image class="qrcode-img" :src="qrcodeUrl" />
    </div>
    <div v-if="isMissing" class="qrcode-missing">
      <img
        class="missing-qrcode"
        :src="require('@/assets/images/missing.png')"
        alt="missing"
      />
      <div class="remarks">暂无可分配的二维码~</div>
    </div>
  </div>
</template>
<script>
import api from "./api";
import account from "@/utils/account";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      qrcodeUrl: "",
      isMissing: false
    };
  },
  components: {},
  mounted() {
    if (this.$route.query.activeQrcodeOuterId) {
      this.getActiveQrcodeById(this.$route.query.activeQrcodeOuterId);
    }
  },
  methods: {
    // 获取二维码详情
    getActiveQrcodeById(activeQrcodeOuterId) {
      let userMark = account.userId
        ? account.userId
        : Cookie.get("client_token");
      this.$fetchGet(api.getActiveQrcodeById, {
        activeQrcodeOuterId: activeQrcodeOuterId,
        userMark: userMark
      }).then(({ data }) => {
        if (data) {
          this.qrcodeUrl = data.tenantActiveQrcodeDetail?.qrcodeUrl;
        } else {
          this.isMissing = true;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.qrcode-detail-page {
  overflow: hidden;
  .qrcode-wrap {
    width: 236px;
    height: 236px;
    background: rgba(216, 216, 216, 1);
    margin: 164px auto 0;
    .qrcode-img {
      width: 100%;
      height: 100%;
    }
  }
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
}
</style>
