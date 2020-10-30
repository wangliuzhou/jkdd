<template>
  <div class="xz-goods-wrap">
    <Big v-if="item.listType === 1" :detail="item" @goPage="goPage" />
    <Two v-if="item.listType === 2" :detail="item" @goPage="goPage" />
    <Three v-if="item.listType === 3" :detail="item" @goPage="goPage" />
    <Hybrid v-if="item.listType === 4" :detail="item" @goPage="goPage" />
    <Detail v-if="item.listType === 5" :detail="item" @goPage="goPage" />
    <Swipe v-if="item.listType === 6" :detail="item" @goPage="goPage" />
  </div>
</template>
<script>
import Big from "./components/big";
import Detail from "./components/detail";
import Hybrid from "./components/hybrid";
import Swipe from "./components/swipe";
import Three from "./components/three";
import Two from "./components/two";
import { Toast } from "vant";
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
  mounted() {},
  methods: {
    goPage(e) {
      const { dealerProductJoinOuterId, marketingActivityId, stockNum } = e;
      if (stockNum === 0) {
        Toast("该商品已售罄");
        return;
      }
      this.$push(`/seckill/${dealerProductJoinOuterId}/${marketingActivityId}`);
    }
  }
};
</script>
