<template>
  <div class="xz-goods-wrap">
    <Big v-if="item.listType === 1" :detail="item" />
    <Two v-if="item.listType === 2" :detail="item" />
    <Three v-if="item.listType === 3" :detail="item" />
    <Hybrid v-if="item.listType === 4" :detail="item" />
    <Detail v-if="item.listType === 5" :detail="item" />
    <Swipe v-if="item.listType === 6" :detail="item" />
  </div>
</template>
<script>
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
    console.log(this.item);
    this.setTitle();
  },
  methods: {
    setTitle() {
      // let { item } = this;
    }
  }
};
</script>
