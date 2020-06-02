<template>
  <div class="devision-container" :style="containerStyle">
    <div
      v-if="item.divisionType === 1"
      class="division"
      :style="lineStyle"
    ></div>
  </div>
</template>
<script>
import { px2rem } from "@/utils/index";
export default {
  props: ["item"],
  computed: {
    containerStyle() {
      let { item } = this;
      if (item) {
        let { height, paddingLeft, paddingRight } = item;
        return `height:${px2rem(height)};padding-left:${px2rem(
          paddingLeft
        )};padding-right:${px2rem(paddingRight)}`;
      }
      return "";
    },
    lineStyle() {
      let { item } = this;
      if (item) {
        let { divisionStyle, borderColor } = item;
        return `border-top:1px ${
          { 1: "solid", 2: "dashed", 3: "dotted" }[divisionStyle]
        } ${borderColor}`;
      }
      return "";
    }
  }
};
</script>
<style lang="less" scoped>
.devision-container {
  display: flex;
  align-items: center;
  justify-content: center;
  .division {
    width: 100%;
  }
}
</style>
