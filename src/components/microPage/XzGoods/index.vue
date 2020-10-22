<template>
  <div class="xz-goods-wrap">
    <Big
      v-if="item.listType === 1"
      :detail="item"
      :goPage="goPage"
      :onBuy="onBuy"
    />
    <Two
      v-if="item.listType === 2"
      :detail="item"
      :goPage="goPage"
      :onBuy="onBuy"
    />
    <Three
      v-if="item.listType === 3"
      :detail="item"
      :goPage="goPage"
      :onBuy="onBuy"
    />
    <Hybrid
      v-if="item.listType === 4"
      :detail="item"
      :goPage="goPage"
      :onBuy="onBuy"
    />
    <Detail
      v-if="item.listType === 5"
      :detail="item"
      :goPage="goPage"
      :onBuy="onBuy"
    />
    <Swipe
      v-if="item.listType === 6"
      :detail="item"
      :goPage="goPage"
      :onBuy="onBuy"
    />
  </div>
</template>
<script>
import { Toast } from "vant";
import Big from "./components/big";
import Detail from "./components/detail";
import Hybrid from "./components/hybrid";
import Swipe from "./components/swipe";
import Three from "./components/three";
import Two from "./components/two";
export default {
  components: {
    Big,
    Detail,
    Hybrid,
    Swipe,
    Three,
    Two
  },
  props: ["item"],
  mounted() {
    this.setTitle();
  },
  methods: {
    goPage(e) {
      const { dealerProductOutId, stockNum } = e.detail;
      if (stockNum === 0) {
        Toast("该商品已售罄");
        return;
      }
      this.$router.push(`/pages/goodsDetail/index?id=${dealerProductOutId}`);
    },
    onBuy(e) {
      const { item } = this.data;
      if (item.buy.btnType === 0) {
        const { stockNum, releaseStatus } = e.detail.currentTarget.dataset.item;
        if (stockNum === 0) {
          Toast("该商品已售罄");
          return;
        }
        if (releaseStatus !== 1) {
          Toast("该商品未发布");
          return;
        }
        this.triggerEvent("onBuy", e);
      } else {
        this.goPage({ detail: e.detail.currentTarget.dataset.item });
      }
    }
  }
};
</script>
