<template>
  <div class="qrcode-detail-page">
    <div class="qrcode-wrap">
      <van-image class="qrcode-img" :src="qrcodeUrl" />
    </div>
  </div>
</template>
<script>
import api from "./api";
import { getUserId } from "@/utils/account";
export default {
  data() {
    return {
      qrcodeUrl: ""
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
      let userMark = getUserId()
        ? getUserId()
        : localStorage.getItem("client_token");
      this.$fetchGet(api.getActiveQrcodeById, {
        activeQrcodeOuterId: activeQrcodeOuterId,
        userMark: userMark
      }).then(({ data }) => {
        if (data) {
          this.qrcodeUrl = data.tenantActiveQrcodeDetail?.qrcodeUrl;
        } else {
          this.goQrcodeMissing();
        }
      });
    },
    goQrcodeMissing() {
      this.$router.push({ path: "/qrcodeMissing" });
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
}
</style>
