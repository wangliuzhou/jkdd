<template>
  <div class="xz-goods-wrap">
    <Big
      v-if="item.listType === 1"
      :detail="item"
      @goPage="goPage"
      @onBuy="onBuy"
    />
    <Two
      v-if="item.listType === 2"
      :detail="item"
      @goPage="goPage"
      @onBuy="onBuy"
    />
    <Three
      v-if="item.listType === 3"
      :detail="item"
      @goPage="goPage"
      @onBuy="onBuy"
    />
    <Hybrid
      v-if="item.listType === 4"
      :detail="item"
      @goPage="goPage"
      @onBuy="onBuy"
    />
    <Detail
      v-if="item.listType === 5"
      :detail="item"
      @goPage="goPage"
      @onBuy="onBuy"
    />
    <Swipe
      v-if="item.listType === 6"
      :detail="item"
      @goPage="goPage"
      @onBuy="onBuy"
    />
    <ShoppingAnimate />
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
import ShoppingAnimate from "../ShoppingAnimate";
export default {
  components: {
    Big,
    Detail,
    Hybrid,
    Swipe,
    Three,
    Two,
    ShoppingAnimate
  },
  props: ["item"],
  mounted() {
    // this.setTitle();
  },
  methods: {
    goPage(e) {
      const { dealerProductOutId, stockNum } = e;
      if (stockNum === 0) {
        Toast("该商品已售罄");
        return;
      }
      this.$push(`/goodsDetail/${dealerProductOutId}`);
    },
    onBuy({ e, item }) {
      const detail = this.item;
      if (detail.buy.btnType === 0) {
        const { stockNum, releaseStatus } = item;
        if (stockNum === 0) {
          Toast("该商品已售罄");
          return;
        }
        if (releaseStatus !== 1) {
          Toast("该商品未发布");
          return;
        }
        this.$emit("onBuy", { e, item });
      } else {
        this.goPage(item);
      }
    }
  }
};
</script>
