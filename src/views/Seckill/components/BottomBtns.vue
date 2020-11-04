<template>
  <div class="bottom-btns">
    <template v-if="goodsDetail.secKillStock > 0">
      <div class="buy" v-if="activityInfo.activityStatus == 1">
        <button disabled>
          秒杀倒计时
          {{ formatTime[1] + ":" + formatTime[2] + ":" + formatTime[3] }}
        </button>
      </div>
      <div class="buy" v-if="activityInfo.activityStatus == 2">
        <button @click="handleGoBuy">
          立即秒杀
        </button>
      </div>
      <div class="buy" v-if="activityInfo.activityStatus == 3">
        <button @click="handleGoDetail">
          按原价购买
        </button>
      </div>
    </template>
    <template v-if="!goodsDetail.secKillStock">
      <div class="ysq">
        <button disabled>商品已售磬</button>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import account, { login } from "@/utils/account";
import { formatNumber } from "@/utils/util.js";

export default {
  props: ["id"],
  computed: {
    ...mapState({
      goodsDetail: state => state.pageSeckillGoodsDetail.goodsDetail,
      activityInfo: state => state.pageSeckillGoodsDetail.activityInfo
    }),
    formatTime(data) {
      let { activityInfo } = data;
      if (activityInfo) {
        let { remainingTime } = activityInfo;
        if (remainingTime >= 0) {
          if (remainingTime) {
            let day = parseInt(remainingTime / (60 * 60 * 24 * 1000));
            let hour = parseInt((remainingTime / (60 * 60 * 1000)) % 24);
            let minu = parseInt((remainingTime / (60 * 1000)) % 60);
            let sec = parseInt((remainingTime / 1000) % 60);
            return [day, hour, minu, sec].map(formatNumber);
          }
        }
      }
      return null;
    }
  },
  methods: {
    ...mapMutations({
      setBtnStatus: "pageSeckillGoodsDetail/setBtnStatus",
      setShowSku: "pageSeckillGoodsDetail/setShowSku"
    }),
    handleGoBuy() {
      if (!account.isLogin) {
        return login();
      }
      this.setBtnStatus(2);
      this.setShowSku(true);
    },
    handleGoDetail() {
      this.$push(`/goodsDetail/${this.id}`);
    }
  }
};
</script>
<style lang="less" scoped>
.bottom-btns {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 51.5px;
  background: white;
  padding-bottom: env(safe-area-inset-bottom);
  .buy {
    margin: 0 12px;
    padding-top: 6px;
    button {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      padding: 0;
      background: #ff6a00;
      color: white;
      font-size: 15px;
      border: none;
    }
  }
  .ysq,
  .yxj {
    padding-top: 6px;
    margin: 0 12px;
    button {
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      padding: 0;
      background: #cccccc;
      color: white;
      font-size: 15px;
      border: none;
    }
  }
}
</style>
