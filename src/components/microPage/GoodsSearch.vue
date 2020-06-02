<template>
  <div class="goodsSearch-container-wrap">
    <!-- <div
      class="goodsSearch-container-seize"
      :style="seizeStyle"
      v-if="fixed"
    ></div> -->
    <div class="goodsSearch-container" :style="containerStyle">
      <div class="goods-search-input-wrap" :style="inputWrapStyle">
        <div class="goods-search-input-left">
          <IconFont
            type="iconsousuo"
            :fontStyle="`font-size:0.45rem;${iconStyle}`"
          />
        </div>
        <div class="goods-search-input-right" :style="inputStyle">
          搜索词
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconFont from "@/components/IconFont";
import { px2rem } from "@/utils/index";
export default {
  props: ["item"],
  components: { IconFont },
  computed: {
    seizeStyle() {
      let { item } = this;
      if (item) {
        let { height } = item;
        let padding = 7; //px
        return `height: ${px2rem(padding + height)};`;
      }
      return "";
    },
    containerStyle() {
      let { item, fixed } = this;
      if (item) {
        let { backgroundColor } = item;
        return `${
          fixed ? "position:fixed;" : ""
        }background-color: ${backgroundColor};`;
      }
      return "";
    },
    inputWrapStyle() {
      let { item } = this;
      if (item) {
        let { boxBackgroundColor, align } = item;
        return `border-color: ${boxBackgroundColor};justify-content: ${
          align === 1 ? "flex-start" : "center"
        };`;
      }
      return "";
    },
    iconStyle() {
      let { item } = this;
      if (item) {
        let { color } = item;
        return `color:${color}`;
      }
      return "";
    },
    inputStyle() {
      let { item } = this;
      if (item) {
        let { height, color } = item;
        return `height: ${px2rem(height)}; line-height: ${px2rem(
          height
        )}; color: ${color};`;
      }
      return "";
    }
  }
};
</script>
<style lang="less" scoped>
.goodsSearch-container {
  box-sizing: border-box;
  top: 0;
  width: 100%;
  z-index: 10;
  padding: 7px 12px;
  .goods-search-input-wrap {
    display: flex;
    align-items: center;
    border-radius: 20px;
    border: 1px solid rgba(204, 204, 204, 1);
    overflow: hidden;
    min-height: 28px;
    max-height: 40px;
    background: white;
    color: #c0c4cc;
    .goods-search-input-left {
      flex: 0 0 34px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .goods-search-input-right {
      color: #909399;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
    }
  }
}
</style>
